import Link from 'next/link';

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:font-bold focus:rounded-md focus:outline-none focus:ring-4 focus:ring-brand-dark focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </Link>
  );
}
