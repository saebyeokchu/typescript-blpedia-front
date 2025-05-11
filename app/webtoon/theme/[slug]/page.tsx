// app/webtoon/theme/[slug]/page.tsx'
import Header from '@/components/Header';
import { fetchAllThemes } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Webtoon {
  id: string;
  title: string;
  image_url: string;
  slug: string;
  company: { name: string };
  is_recommended: boolean;
}

interface ThemeData {
  name: string;
  slug: string;
  webtoons: Webtoon[];
}

export default async function ThemePage({ params }: { params : Promise<{ slug: string }> }) {
  const themes = await fetchAllThemes();
  const res = await fetch(`http://localhost:8000/api/themes/${(await params).slug}/`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

 const data: ThemeData = await res.json();

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <Header themes={themes} />
      <h1 className="text-xl font-bold text-center">🔖 #{data.name}</h1>
      <div className="space-y-4">
        {data.webtoons.map((w) => (
            <div key={w.id} className="border rounded p-2 hover:bg-gray-50">
              <Link href={`/webtoon/${w.slug}`} >

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
              </Link>
            </div>
        ))}
        </div>
    </div>
  );
}
