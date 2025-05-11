// app/webtoon/[slug]/page.tsx
import Header from '@/components/Header';
import { fetchAllThemes, fetchWebtoonDetail } from '@/lib/api';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return {
    title: `${(await params).slug} | BLPedia`,
  };
}

export default async function WebtoonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const webtoon = await fetchWebtoonDetail((await params).slug);
  const themes = await fetchAllThemes();

  return (
    <>
    <Header themes={themes}/>
    <div className="px-4 py-6 space-y-6">
      
      <h1 className="text-2xl font-bold">{webtoon.title}</h1>

      <img
        src={webtoon.image_url}
        alt={webtoon.title}
        className="w-full aspect-square object-cover rounded-lg bg-gray-200"
      />

      <a
        href={webtoon.link_url}
        target="_blank"
        className="block text-center py-2 px-4 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition"
      >
        웹툰 보러 가기
      </a>

      <div className="space-y-1 text-sm text-gray-700">
        <p><strong>제공:</strong> {webtoon.company.name}</p>
        <p>
          <strong>태그:</strong>{' '}
          {webtoon.themes.map((t) => (
            <span key={t.id} className="text-blue-600 mr-2">#{t.name}</span>
          ))}
        </p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
        <p className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09L5.5 12.18.122 7.91l6.64-.97L10 1l3.238 5.94 6.64.97-5.378 4.27 1.378 5.91z" />
          </svg>
          blpedia 후기
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {webtoon.review?.content? webtoon.review.content : '후기를 작성중입니다.'}
        </p>
      </div>

      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800 ">
        {webtoon.description.replace(/\\n/g, '\n')}
      </p>
    </div>
    </>
  );
}
