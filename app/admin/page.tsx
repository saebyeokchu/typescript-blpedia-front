'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getValidAccessToken } from '@/utils/token';

export default function AdminMenuPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    refreshToken();
  }, []); // ✅ Only run once

  const refreshToken = async () => {
    const token = localStorage.getItem('blpedia_token');
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem('blpedia_token');
    location.reload();
    alert('로그아웃되었습니다');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">관리자 메뉴</h1>

      <div className="space-y-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full text-center py-3 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700 transition"
          >
            🔐 관리자 로그아웃
          </button>
        ) : (
          <MenuLink href="/admin/login" label="🔐 관리자 로그인" />
        )}
        <MenuLink href="/webtoon/new" label="➕ 웹툰 등록하기" />
        <MenuLink href="/admin/webtoons" label="📋 웹툰 목록 보기" />
        <MenuLink href="/" label="❤️ blpedia 돌아가기" />
      </div>
    </div>
  );
}

function MenuLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block w-full text-center py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
    >
      {label}
    </Link>
  );
}
