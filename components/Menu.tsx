'use client';

import { Theme } from '@/types/webtoon';
import Link from 'next/link';
import { useState } from 'react';

export default function Menu({ themes }: { themes: Theme[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  console.log("Menu themes", themes);

  return (
    <div className="relative z-50">
      <button
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
        className="p-2 cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">메뉴</h2>
            <button
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="text-gray-600 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="space-y-6 text-lg">
            <li className="hover:underline cursor-pointer "><Link href={'/'}>웹툰 전체 보기</Link></li>
            <li className="hover:underline cursor-pointer"><Link href="/webtoon/status/serializing">연재 작품 보기</Link></li>
            <li className="hover:underline cursor-pointer"><Link href="/webtoon/status/completed">완결 작품 보기</Link></li>

            <li>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="w-full text-left hover:underline cursor-pointer"
              >
                테마별 보기 {isThemeOpen ? '▲' : '▼'}
              </button>

              {isThemeOpen && (
                <ul className="mt-4 pl-4 space-y-4 text-base text-gray-700">
                  {themes && themes.map((theme) => (
                    <li className="hover:underline cursor-pointer" key={theme.id}>
                      <Link
                        href={`/webtoon/theme/${theme.slug}`}
                      >
                        {theme.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
