'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.access) {
      localStorage.setItem('blpedia_token', data.access);
      localStorage.setItem('blpedia_refresh', data.refresh);
      alert('로그인 성공!');
      router.push('/admin');
    } else {
      alert('로그인 실패: 아이디나 비밀번호를 확인하세요' + password);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-6">관리자 로그인</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded text-sm"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full px-3 py-2 border rounded text-sm"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer w-full py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="cursor-pointer w-full py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
        >
          메뉴로 돌아가기
        </button>
        
      </form>
    </div>
  );
}
