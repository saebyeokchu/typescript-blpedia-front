// components/WebtoonSection.tsx
"use client"

import WebtoonCard from "./WebttonCard";
import Link from "next/link";

interface Props {
  title: string;
  webtoons: {
    title: string;
    company: string;
    keyword: string;
    image_url: string;
    slug: string;
    is_recommended?: boolean; 
    themes: { id: number; name: string; slug: string }[];
  }[];
}

export default function WebtoonSection({ title, webtoons}: Props) {
  const visibleWebtoons = webtoons.slice(0, 3);
  console.log('webtoons', webtoons);

  return (
    <section className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* 더보기 버튼 */}
        {webtoons.length > 3 && (
          <Link href={`/webtoon/theme/${webtoons[0].themes[0].slug}`}>
            <div className="text-center">
              <button
                onClick={()=>console.log("더보기 클릭")}
                className="cursor-pointer text-sm text-blue-600 hover:underline font-medium"
              >
                더보기
              </button>
            </div>
          </Link>
        )}
      </div>
      <div className="space-y-4">
        {visibleWebtoons.map((w, idx) => (
          <div key={`webtoon-card-main-${idx}`} className="hover:bg-gray-100 hover:cursor-pointer transition rounded-lg p-2">
            <WebtoonCard key={idx} {...w} />
          </div>
        ))}
         
      </div>
    </section>
  );
}
