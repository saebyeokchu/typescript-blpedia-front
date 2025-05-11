// components/SearchBar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
    const [input, setInput] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    };

    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2 px-4 py-3 border-b">
        <input
          type="text"
          placeholder="웹툰 제목, 태그, 플랫폼 등 검색"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md bg-gray-100 text-sm focus:bg-white"
        />
        <button aria-label="Search">
          <svg className="w-5 h-5 cursor-pointer text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </button>
      </form>
    );
  }
  