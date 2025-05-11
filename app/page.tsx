import Header from '@/components/Header';
import HiddenMenu from '@/components/HiddenMenu';
import SearchBar from '@/components/SearchBar';
import ThemeFilteredWebtoons from '@/components/ThemeFilteredWebtoons';
import { fetchAllThemes, fetchWebtoons } from '@/lib/api';

export default async function Home() {
  const webtoons = await fetchWebtoons();
  const themes = await fetchAllThemes();

  return (
    <>
      <Header themes={themes}/>
      <SearchBar />
      <ThemeFilteredWebtoons themes={themes} webtoons={webtoons} />
      <HiddenMenu />
    </>
  );
}
