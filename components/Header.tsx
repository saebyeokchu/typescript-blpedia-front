// components/Header.tsx
export default function Header() {
    return (
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <h1 className="text-2xl font-bold">blpedia</h1>
        <button aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
    );
  }
  