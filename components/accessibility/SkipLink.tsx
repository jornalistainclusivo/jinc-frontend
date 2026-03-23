import Link from 'next/link';

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-neutral-950 focus:text-white focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:rounded-sm focus:outline-none focus:ring-4 focus:ring-neutral-900 focus:ring-offset-2 transition-all"
    >
      Pular para o conteúdo principal
    </Link>
  );
}
