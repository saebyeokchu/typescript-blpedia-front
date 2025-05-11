import Header from "@/components/Header";
import WebtoonListWithFilter from "@/components/WebtoonListWithFilter";
import { fetchAllThemes } from "@/lib/api";

export default async function WebtoonStatusPage({ params }: { params: { stat: string } }) {
  const res = await fetch(`http://localhost:8000/api/status/${params.stat}/webtoons/`, { cache: 'no-store' });
  const webtoons = await res.json();
    const themes = await fetchAllThemes();

  const label = params.stat === 'serializing' ? '연재 작품' : '완결 작품';

  return (
        <>
          <Header themes={themes}/>
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-center mb-4">📘 {label}</h1>
      <WebtoonListWithFilter webtoons={webtoons} />
    </div>
    </>
  );
}
