import Header from "@/components/Header";
import { fetchAllThemes, Webtoon } from "@/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q : '';

  const res = await fetch(`http://localhost:8000/api/search/?q=${encodeURIComponent(query)}`, {
    cache: 'no-store',
  });

  const themes = await fetchAllThemes();
  const webtoons = await res.json();

  return (
    <>
      <Header themes={themes} />
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold text-center">🔍 검색결과: &quot;{query}&quot;</h1>
        {webtoons.map((w : Webtoon) => (
          <div key={w.id} className="cursor-pointer border rounded p-2 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <img src={w.image_url} className="w-14 h-14 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold">{w.title}</p>
                <p className="text-sm text-gray-500">{w.company.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
