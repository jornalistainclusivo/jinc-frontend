'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Loader2, Volume2, VolumeX, Brain } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

function createWavBlob(pcmData: Uint8Array, sampleRate: number): Blob {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  const pcmView = new Uint8Array(buffer, 44);
  pcmView.set(pcmData);

  return new Blob([buffer], { type: 'audio/wav' });
}

export function ArticleAudioPlayer({ text, title, onToggleFocusMode, isFocusMode }: { text: string, title: string, onToggleFocusMode?: () => void, isFocusMode?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([]);
  const pcmChunksRef = useRef<Uint8Array[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const prefetchStartedRef = useRef(false);
  const streamFinishedRef = useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isStreaming) {
      interval = setInterval(() => {
        if (audioCtxRef.current) {
          setElapsedTime(audioCtxRef.current.currentTime);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isStreaming]);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.pause();
      audio.src = '';
      
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const initWebAudio = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass({ sampleRate: 24000 });
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.connect(audioCtxRef.current.destination);
      gainNodeRef.current.gain.value = isMuted ? 0 : volume;
      nextStartTimeRef.current = audioCtxRef.current.currentTime;
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playPcmChunk = (bytes: Uint8Array) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    
    const float32Array = new Float32Array(bytes.length / 2);
    const dataView = new DataView(bytes.buffer);
    for (let i = 0; i < float32Array.length; i++) {
      float32Array[i] = dataView.getInt16(i * 2, true) / 32768;
    }
    
    const audioBuffer = audioCtxRef.current.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);
    
    const source = audioCtxRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = playbackRate;
    source.connect(gainNodeRef.current);
    
    const currentTime = audioCtxRef.current.currentTime;
    if (nextStartTimeRef.current < currentTime) {
      nextStartTimeRef.current = currentTime;
    }
    
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    sourceNodesRef.current.push(source);
  };

  const startPrefetch = async () => {
    if (prefetchStartedRef.current || hasAudio) return;
    prefetchStartedRef.current = true;
    setIsStreaming(true);
    streamFinishedRef.current = false;
    pcmChunksRef.current = [];
    sourceNodesRef.current = [];
    
    abortControllerRef.current = new AbortController();
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Chave da API do Gemini não configurada.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Leia o seguinte texto de forma clara, profissional e acolhedora, como um âncora de jornal. Faça pausas adequadas na pontuação.\n\nTítulo: ${title}\n\n${text}`;

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      for await (const chunk of responseStream) {
        if (abortControllerRef.current?.signal.aborted) break;
        
        const base64Audio = chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const binaryString = window.atob(base64Audio);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          
          pcmChunksRef.current.push(bytes);
          
          // Se o usuário já clicou em play, toca o chunk imediatamente
          if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
            playPcmChunk(bytes);
          }
        }
      }

      if (!abortControllerRef.current?.signal.aborted) {
        streamFinishedRef.current = true;
        
        const totalLength = pcmChunksRef.current.reduce((acc, chunk) => acc + chunk.length, 0);
        const allPcmData = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of pcmChunksRef.current) {
          allPcmData.set(chunk, offset);
          offset += chunk.length;
        }
        
        const wavBlob = createWavBlob(allPcmData, 24000);
        const audioUrl = URL.createObjectURL(wavBlob);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.volume = isMuted ? 0 : volume;
          audioRef.current.playbackRate = playbackRate;
        }
        setHasAudio(true);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Error generating audio:", error);
      }
      prefetchStartedRef.current = false;
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
    }
  };

  const handleMouseEnter = () => {
    if (!prefetchStartedRef.current && !hasAudio && !isStreaming) {
      startPrefetch();
    }
  };

  const handlePlayPause = () => {
    if (isLoading && !isStreaming) return;

    if (!prefetchStartedRef.current) {
      setIsLoading(true);
      startPrefetch();
      initWebAudio();
      setIsPlaying(true);
      
      // Toca os chunks que já chegaram (se houver algum muito rápido)
      pcmChunksRef.current.forEach(chunk => playPcmChunk(chunk));
      return;
    }

    if (isStreaming && !streamFinishedRef.current) {
      if (!isPlaying) {
        const wasUninitialized = !audioCtxRef.current || audioCtxRef.current.state === 'closed';
        initWebAudio();
        setIsPlaying(true);
        
        if (wasUninitialized) {
          pcmChunksRef.current.forEach(chunk => playPcmChunk(chunk));
        } else {
          audioCtxRef.current?.resume();
        }
      } else {
        audioCtxRef.current?.suspend();
        setIsPlaying(false);
      }
      return;
    }

    if (hasAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
           audioCtxRef.current.suspend();
           audioRef.current.currentTime = audioCtxRef.current.currentTime;
        }
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (isStreaming) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsStreaming(false);
      setIsPlaying(false);
      setIsLoading(false);
      prefetchStartedRef.current = false;
      pcmChunksRef.current = [];
      sourceNodesRef.current = [];
      setElapsedTime(0);
      return;
    }

    if (audioRef.current && hasAudio) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
      setElapsedTime(0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (audioRef.current && hasAudio && duration) {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      audioRef.current.currentTime = (newProgress / 100) * duration;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newMutedState ? 0 : volume;
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
    sourceNodesRef.current.forEach(source => {
      try {
        source.playbackRate.value = newRate;
      } catch (e) {}
    });
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // If the original container is scrolled out of view (above the viewport)
        setIsSticky(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Invisible placeholder to maintain layout when sticky */}
      <div ref={containerRef} className="h-0" aria-hidden="true" />
      
      <div 
        className={`p-5 z-40 transform-gpu transition-all duration-200 ease-out
          ${isSticky 
            ? 'fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-[380px] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-200/60 bg-white/85 backdrop-blur-xl translate-y-0 opacity-100' 
            : 'relative rounded-2xl my-8 w-full shadow-sm bg-neutral-50 border border-neutral-200 translate-y-0 opacity-100'
          }
        `}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`flex-shrink-0 bg-brand-primary/10 p-3.5 rounded-full text-brand-primary hidden sm:block ${isSticky ? 'hidden sm:hidden' : ''}`}>
            <Volume2 className="h-6 w-6" aria-hidden="true" />
          </div>
          
          <div className="flex-1 w-full">
            <h3 className={`font-bold text-neutral-900 mb-1 ${isSticky ? 'text-sm line-clamp-1' : 'text-base'}`}>
              {isSticky ? title : 'Ouvir este artigo'}
            </h3>
            <p className={`text-neutral-500 mb-3 ${isSticky ? 'text-xs mb-2' : 'text-sm'}`}>
              Áudio gerado por Inteligência Artificial
            </p>
            
            {/* Progress Bar */}
            <div className="w-full mb-2">
              <label htmlFor="audio-progress" className="sr-only">Progresso do áudio</label>
              {isStreaming ? (
                <div className="w-full h-2 bg-neutral-200 rounded-lg overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-brand-primary/50 w-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 h-full bg-brand-primary w-1/3 animate-[slide_2s_ease-in-out_infinite]"></div>
                </div>
              ) : (
                <input
                  id="audio-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  disabled={!hasAudio}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-neutral-50"
                  aria-label="Progresso da reprodução do áudio"
                />
              )}
            </div>
            
            {/* Time indicators & Extra Controls */}
            {(hasAudio || isStreaming) && (
              <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500 mt-2 gap-4">
                <div className="flex items-center gap-2 font-mono" aria-live="polite">
                  {isStreaming ? (
                    <span className="text-brand-primary font-medium animate-pulse">Gerando...</span>
                  ) : (
                    <>
                      <span aria-label="Tempo decorrido">{formatTime(audioRef.current?.currentTime || 0)}</span>
                      <span aria-hidden="true">/</span>
                      <span aria-label="Tempo total">{formatTime(duration)}</span>
                    </>
                  )}
                </div>
                
                <div className={`flex items-center gap-4 ${isSticky ? 'hidden' : 'flex'}`}>
                  {/* Speed Control */}
                  <div className="flex items-center gap-1">
                    <label htmlFor="playback-speed" className="sr-only">Velocidade de reprodução</label>
                    <select
                      id="playback-speed"
                      value={playbackRate}
                      onChange={handleSpeedChange}
                      className="bg-transparent border border-neutral-300 text-xs font-medium text-neutral-700 focus:ring-2 focus:ring-brand-primary rounded p-1 cursor-pointer"
                      aria-label="Ajustar velocidade de reprodução"
                    >
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-neutral-500 hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary rounded p-1"
                      aria-label={isMuted || volume === 0 ? "Ativar som" : "Silenciar áudio"}
                    >
                      {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                    </button>
                    <label htmlFor="audio-volume" className="sr-only">Volume do áudio</label>
                    <input
                      id="audio-volume"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                      aria-label="Ajustar volume"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`flex items-center gap-3 w-full sm:w-auto justify-end mt-2 sm:mt-0 ${isSticky ? 'absolute right-4 top-4 mt-0 w-auto' : ''}`}>
            {onToggleFocusMode && (
              <button
                onClick={onToggleFocusMode}
                className={`p-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest
                  ${isFocusMode 
                    ? 'bg-brand-primary text-white hover:bg-brand-dark' 
                    : 'text-neutral-500 hover:text-brand-primary hover:bg-brand-primary/10'
                  }
                  ${isSticky ? 'hidden md:hidden' : ''}
                `}
                aria-label={isFocusMode ? "Desativar Modo Foco Profundo" : "Ativar Modo Foco Profundo"}
                title="Modo Foco Profundo"
                aria-pressed={isFocusMode}
              >
                <Brain className="h-5 w-5" aria-hidden="true" />
                <span className="hidden lg:inline">{isFocusMode ? 'Foco Ativo' : 'Foco Profundo'}</span>
              </button>
            )}
            {(hasAudio || isStreaming) && !isSticky && (
              <button 
                onClick={handleStop}
                className="p-2.5 text-neutral-500 hover:text-brand-primary hover:bg-brand-primary/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Parar áudio"
                title="Parar áudio"
              >
                <Square className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
            )}
            <button 
              onClick={handlePlayPause}
              disabled={isLoading}
              className={`flex items-center justify-center bg-brand-primary text-white rounded-full hover:bg-brand-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 shadow-sm
                ${isSticky ? 'w-10 h-10' : 'w-12 h-12'}
              `}
              aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
              title={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
            >
              {isLoading ? (
                <Loader2 className={`animate-spin ${isSticky ? 'h-5 w-5' : 'h-6 w-6'}`} aria-hidden="true" />
              ) : isPlaying ? (
                <Pause className={`fill-current ${isSticky ? 'h-5 w-5' : 'h-6 w-6'}`} aria-hidden="true" />
              ) : (
                <Play className={`fill-current ml-1 ${isSticky ? 'h-5 w-5' : 'h-6 w-6'}`} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
