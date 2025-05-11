'use client';

import { useState } from 'react';
import WebtoonSection from './WebtoonSection';

interface Theme {
  id: number;
  name: string;
  slug: string;
}

interface Webtoon {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  is_recommended?: boolean;
  company: { name: string };
  themes: { id: number; name: string; slug: string }[];
}

export default function ThemeFilteredWebtoons({
  themes,
  webtoons,
}: {
  themes: Theme[];
  webtoons: Webtoon[];
}) {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  // Group by theme
  const themeMap: Record<string, Webtoon[]> = {};
  webtoons.forEach((w) => {
    w.themes.forEach((t) => {
      if (!themeMap[t.slug]) themeMap[t.slug] = [];
      themeMap[t.slug].push(w);
    });
  });

  return (
    <>
        <div className="overflow-x-auto whitespace-nowrap scroll-smooth px-4 py-2">
            <div className="inline-flex gap-2">
                {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() =>
                    setActiveTheme((prev) => (prev === theme.slug ? null : theme.slug))
                    }
                    className={`px-3 py-1 rounded-full text-sm border shrink-0 ${
                    activeTheme === theme.slug
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                >
                    #{theme.name}
                </button>
                ))}
            </div>
        </div>

      {(activeTheme
        ? [[activeTheme, themeMap[activeTheme] ?? []]]
        : Object.entries(themeMap)
      ).map(([themeSlug, group]) => {
        const themeName = typeof themeSlug === 'string' ? (themes.find((t) => t.slug === themeSlug)?.name ?? themeSlug) : '';

        return (
          <WebtoonSection
            title={themeName}
            webtoons={Array.isArray(group) ? group.map((w) => ({
              title: w.title,
              company: w.company.name,
              keyword: themeName,
              image_url: w.image_url,
              slug: w.slug,
              is_recommended: w.is_recommended,
              themes: w.themes,
            })) : []}
          />
        );
      })}
    </>
  );
}
