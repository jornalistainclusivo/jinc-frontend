'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Loader2, Volume2, VolumeX, Brain, Rewind, FastForward } from 'lucide-react';

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
      const response = await fetch('/api/ai/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title }),
        signal: abortControllerRef.current.signal
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        if (abortControllerRef.current?.signal.aborted) break;

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Separa os pacotes SSE
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const base64Audio = line.replace('data: ', '').trim();
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
      } catch (e) { }
    });
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const skipBackward = () => {
    if (audioRef.current && hasAudio) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
    }
  };

  const skipForward = () => {
    if (audioRef.current && hasAudio && duration) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 15);
    }
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

      {isSticky ? (
        /* STICKY PLAYER - Ultra minimalista, horizontal, nativo do navegador */
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-4 py-3 flex items-center justify-center animate-in slide-in-from-bottom-full duration-300">
          <div className="w-full max-w-[70ch] flex items-center gap-4 sm:gap-6">
            <div className="font-serif font-bold text-sm text-neutral-900 truncate max-w-[120px] sm:max-w-[200px]" title={title}>
              {title}
            </div>

            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-8 h-8 flex-shrink-0 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:opacity-50"
              aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" aria-hidden="true" />
              ) : isPlaying ? (
                <Pause className="fill-current h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="fill-current ml-0.5 h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <div className="flex-1 flex items-center">
              <label htmlFor="sticky-audio-progress" className="sr-only">Progresso do áudio</label>
              {isStreaming ? (
                <div className="w-full h-1.5 bg-neutral-200 rounded-lg overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-neutral-400 w-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 h-full bg-neutral-900 w-1/3 animate-[slide_2s_ease-in-out_infinite]"></div>
                </div>
              ) : (
                <input
                  id="sticky-audio-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  disabled={!hasAudio}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                />
              )}
            </div>

            <div className="font-mono text-xs text-neutral-500 flex-shrink-0" aria-live="polite">
              {isStreaming ? (
                <span className="animate-pulse">Gerando...</span>
              ) : (
                <>
                  <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                  <span className="mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* INLINE PLAYER - Módulo editorial integrado ao grid (max 70ch) */
        <div
          className="relative w-full max-w-[70ch] mx-auto my-12 bg-neutral-50 border border-neutral-200 p-8 sm:p-10 rounded-none"
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleMouseEnter}
        >
          <div className="flex flex-col gap-8">
            {/* Linha 1: Título + Subtítulo */}
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                Ouvir este artigo
              </h3>
              <p className="text-sm font-sans text-neutral-500">
                Áudio gerado por Inteligência Artificial
              </p>
            </div>

            {/* Linha 2: Progresso */}
            <div className="w-full">
              <label htmlFor="inline-audio-progress" className="sr-only">Progresso do áudio</label>
              {isStreaming ? (
                <div className="w-full h-2 bg-neutral-200 rounded-lg overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-neutral-400 w-full animate-pulse"></div>
                  <div className="absolute top-0 left-0 h-full bg-neutral-900 w-1/3 animate-[slide_2s_ease-in-out_infinite]"></div>
                </div>
              ) : (
                <input
                  id="inline-audio-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  disabled={!hasAudio}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
                />
              )}
            </div>

            {/* Linha 3: Controles | Tempo | Foco Profundo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Controles Principais */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={skipBackward}
                    disabled={!hasAudio}
                    className="text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-full p-1"
                    aria-label="Voltar 15 segundos"
                  >
                    <Rewind className="h-5 w-5 fill-current" aria-hidden="true" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    disabled={isLoading}
                    className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 disabled:opacity-50 shadow-md"
                    aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin h-6 w-6" aria-hidden="true" />
                    ) : isPlaying ? (
                      <Pause className="fill-current h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Play className="fill-current ml-1 h-6 w-6" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    onClick={skipForward}
                    disabled={!hasAudio}
                    className="text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-full p-1"
                    aria-label="Avançar 15 segundos"
                  >
                    <FastForward className="h-5 w-5 fill-current" aria-hidden="true" />
                  </button>
                </div>

                {/* Tempo */}
                <div className="font-mono text-sm text-neutral-500" aria-live="polite">
                  {isStreaming ? (
                    <span className="animate-pulse">Gerando...</span>
                  ) : (
                    <>
                      <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                      <span className="mx-1">/</span>
                      <span>{formatTime(duration)}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Foco Profundo */}
              {onToggleFocusMode && (
                <button
                  onClick={onToggleFocusMode}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-none border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900
                    ${isFocusMode
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-transparent text-neutral-700 border-neutral-300 hover:border-neutral-900 hover:text-neutral-900'
                    }
                  `}
                  aria-label={isFocusMode ? "Desativar Modo Foco Profundo" : "Ativar Modo Foco Profundo"}
                  aria-pressed={isFocusMode}
                >
                  <Brain className="h-4 w-4" aria-hidden="true" />
                  <span>{isFocusMode ? 'Foco Ativo' : 'Foco Profundo'}</span>
                </button>
              )}
            </div>

            {/* Linha 4: Velocidade + Volume */}
            {(hasAudio || isStreaming) && (
              <div className="flex items-center justify-center sm:justify-start gap-8 pt-6 border-t border-neutral-200">
                {/* Speed Control */}
                <div className="flex items-center gap-2">
                  <label htmlFor="playback-speed" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Velocidade</label>
                  <select
                    id="playback-speed"
                    value={playbackRate}
                    onChange={handleSpeedChange}
                    className="bg-transparent border-none text-sm font-mono text-neutral-900 focus:ring-0 cursor-pointer p-0"
                  >
                    <option value="0.75">0.75x</option>
                    <option value="1">1.00x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.50x</option>
                    <option value="2">2.00x</option>
                  </select>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="text-neutral-500 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded p-1 transition-colors"
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
                    className="w-20 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
