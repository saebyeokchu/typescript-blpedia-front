'use client';

import { useState } from 'react';

interface Webtoon {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  is_recommended: boolean;
  company: { id: number; name: string };
  themes: { id: number; name: string; slug: string }[];
}

export default function WebtoonListWithFilter({ webtoons }: { webtoons: Webtoon[] }) {
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  const allCompanies = [...new Set(webtoons.map((w) => w.company.name))];
  const allThemes = [
    ...new Set(webtoons.flatMap((w) => w.themes.map((t) => t.name))),
  ];

  const filtered = webtoons.filter((w) => {
    const matchTitle = w.title.includes(search);
    const matchCompany = !company || w.company.name === company;
    const matchTheme = !theme || w.themes.some((t) => t.name === theme);
    return matchTitle && matchCompany && matchTheme;
  });

  return (
    <div className="space-y-6">
      {/* 🔍 Search */}
      <div className="flex items-center gap-2">
        <input
            type="text"
            placeholder="제목으로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm bg-gray-50 focus:bg-white"
        />
    </div>

    {/* 🏢 Company Filter */}
    <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">📦 플랫폼</p>
        <div className="flex flex-wrap gap-2">
            {allCompanies.map((c) => (
            <button
                key={c}
                onClick={() => setCompany((prev) => (prev === c ? null : c))}
                className={`px-3 py-1 text-sm rounded-full border ${
                company === c
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
            >
                {c}
            </button>
            ))}
        </div>
        </div>

        {/* 🏷 Theme Filter */}
        <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">🏷 키워드</p>
        <div className="flex flex-wrap gap-2">
            {allThemes.map((t) => (
            <button
                key={t}
                onClick={() => setTheme((prev) => (prev === t ? null : t))}
                className={`px-3 py-1 text-sm rounded-full border ${
                theme === t
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
            >
                #{t}
            </button>
            ))}
        </div>
        </div>

      {/* 📋 Filtered List */}
      <div className="space-y-4">
        {filtered.map((w) => (
          <div key={w.id} className="border rounded p-2 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <img src={w.image_url} alt={w.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold">{w.title}</p>
                <p className="text-sm text-gray-500">{w.company.name}</p>
              </div>
              {w.is_recommended && (
                <span className="text-xs bg-yellow-400 px-2 py-1 rounded text-white font-medium">
                  추천
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
