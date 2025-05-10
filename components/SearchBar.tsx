// components/SearchBar.tsx
export default function SearchBar() {
    return (
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-3 py-2 border rounded-md bg-gray-100 text-sm"
        />
        <button aria-label="Search">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </button>
      </div>
    );
  }
  