'use client';

import { useRouter } from 'next/navigation';

export default function HiddenMenu() {
  const router = useRouter();

  return (
    <header className="flex justify-center items-center flex-col px-4 py-2 space-y-1">
      <p className="text-sm cursor-pointer">
        @ all rights reserved by{' '}
        <span
          onClick={() => router.push('/admin')}
        >
          Saebyeok
        </span>
      </p>
      <p className="text-sm cursor-pointer">
        😊
        <span className="underline text-blue-500 pr-1">
          <a href="mailto:cuu2252@gmail.com">contact me</a>
        </span>
        for future projects
      </p>
    </header>
  );
}
