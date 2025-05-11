"use client"

import { useRouter } from 'next/navigation';
import Menu from './Menu';
import { Theme } from '@/types/webtoon';

export default function Header({ themes }: { themes: Theme[] }) {
  const router = useRouter();


  return (
    <header className="flex items-center justify-between px-4 py-2 border-b relative">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>router.push("/")}>blpedia</h1>
      <Menu themes={themes}/>
    </header>
  );
}
