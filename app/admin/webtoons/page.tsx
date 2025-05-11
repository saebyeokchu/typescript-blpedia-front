'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Webtoon {
  id: string;
  title: string;
  slug: string;
  image_url: string;
}

export default function AdminWebtoonListPage() {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();

  const fetchWebtoons = async () => {
    const res = await fetch('http://localhost:8000/api/webtoons/', {
      cache: 'no-store',
    });
    const data = await res.json();
    setWebtoons(data);
  };

  useEffect(() => {
    fetchWebtoons();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 웹툰을 선택해주세요.');
      return;
    }

    const confirm = window.confirm(`${selectedIds.length}개의 웹툰을 삭제하시겠습니까?`);
    if (!confirm) return;

    const token = localStorage.getItem('blpedia_access');

    await Promise.all(
      selectedIds.map((id) =>
        fetch(`http://localhost:8000/api/webtoons/${id}/delete/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
    );

    alert('삭제 완료!');
    setWebtoons((prev) => prev.filter((w) => !selectedIds.includes(w.id)));
    setSelectedIds([]);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">📋 웹툰 목록 (다중 삭제)</h1>
    
        <div className="flex gap-2">
            <button
                onClick={() => router.push('/admin')}
                className="cursor-pointer w-full py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm font-medium"
            >
                🔙 관리자 메뉴로 돌아가기
            </button>
            <button
                onClick={fetchWebtoons}
                className="cursor-pointer w-full py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm font-medium"
            >
                🔄 새로고침
            </button>
        </div>

        {selectedIds.length > 0 && (
            <button
            onClick={handleBulkDelete}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm font-medium"
            >
            🗑 선택한 {selectedIds.length}개 삭제
            </button>
        )}

      <div className="space-y-4">
        {webtoons.map((w) => (
            <div
                key={w.id}
                onClick={() => toggleSelect(w.id)}
                className={`flex items-center gap-3 p-2 border rounded transition cursor-pointer
                    ${selectedIds.includes(w.id) ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}
                `}
                >
                <img
                    src={w.image_url}
                    alt={w.title}
                    className="w-14 h-14 object-cover rounded"
                />
                <span className="text-sm font-medium">{w.title}</span>
                {selectedIds.includes(w.id) && (
                    <span className="ml-auto text-blue-600 text-xs font-semibold">선택됨</span>
                )}
            </div>
        ))}
      </div>
    </div>
  );
}
