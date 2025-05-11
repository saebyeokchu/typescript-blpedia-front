'use client';

import Header from '@/components/Header';
import { getValidAccessToken } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { fetchAllThemes } from '@/lib/api';

interface Company {
  id: number;
  name: string;
}

interface Theme {
  id: number;
  name: string;
  slug: string;
}

export default function NewWebtoonPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [status, setStatus] = useState<'serializing' | 'completed'>('serializing');
  const router = useRouter();
  const [isRecommended, setIsRecommended] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  const [companyId, setCompanyId] = useState<number>(1);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [menuThemes, setMenuThemes] = useState<Theme[]>([]);
  

  useEffect(() => {
    refreshToken();
    fetchMenuThemes();
  }, []);

  const fetchMenuThemes = async () => {
    const res = await fetchAllThemes();
    setMenuThemes(res)
  }

  const refreshToken = async () => {
    const token = await getValidAccessToken();
    if (!token) {
      alert('로그인이 필요합니다');
      router.push('/admin/login');
    }
    fetch('http://localhost:8000/api/companies/')
      .then((res) => res.json())
      .then(setCompanies);
    fetch('http://localhost:8000/api/themes/')
      .then((res) => res.json())
      .then(setThemes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getValidAccessToken();
    if (!token) {
      alert('인증과정에서 오류가 발생했습니다. 다시 로그인 해주세요.');
    }else{
      const res = await fetch('http://localhost:8000/api/webtoons/create/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // 🔐 JWT Auth
            },
            body: JSON.stringify({
              title,
              slug,
              description,
              image_url: imageUrl,
              link_url: linkUrl,
              status,
              company: companyId,
              themes: selectedThemes,
              is_recommended: isRecommended,
              review: {
                content: reviewContent || '리뷰 작성중',
              },
            }),
          });

          console.log({
              title,
              slug,
              description,
              image_url: imageUrl,
              link_url: linkUrl,
              status,
              company: companyId,
              themes: selectedThemes,
              is_recommended: isRecommended,
                review: {
                  content: reviewContent,
                },
            });
            console.log(res);

          if (res.ok) {
            setShowModal(true);
          } else {
            alert('오류 발생!');
          }
    }
    
  };

  const toggleTheme = (id: number) => {
    setSelectedThemes((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header themes={menuThemes}/>
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-xl font-bold mb-6">새 웹툰 추가</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">슬러그</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">이미지 URL</label>
            <input
              type="text"
              value={imageUrl}
              maxLength={200}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <p className={`text-xs mt-1 ${imageUrl.length >= 200 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
              {imageUrl.length}/200자 {imageUrl.length >= 200 && ' (최대 길이에 도달했습니다)'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">링크 URL</label>
            <input
              type="text"
              value={linkUrl}
              maxLength={200}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <p className={`text-xs mt-1 ${linkUrl.length >= 200 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
              {linkUrl.length}/200자 {linkUrl.length >= 200 && ' (최대 길이에 도달했습니다)'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">연재 상태</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'serializing' | 'completed')}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="serializing">연재중</option>
              <option value="completed">완결</option>
            </select>
          </div>

           {/* 회사 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">플랫폼 선택</label>
          <select className="w-full px-3 py-2 border rounded-md text-sm" value={companyId} onChange={(e) => setCompanyId(Number(e.target.value))}>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* 테마 선택 */}
        <div className="text-sm space-y-2">
          <p className="font-medium">테마 선택</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {themes.map((t) => (
              <label key={t.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedThemes.includes(t.id)}
                  onChange={() => toggleTheme(t.id)}
                  className="accent-blue-600"
                />
                <span>{t.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            리뷰
          </label>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="작품을 읽고 리뷰를 남겨주세요."
            rows={4}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="isRecommended"
            checked={isRecommended}
            onChange={(e) => setIsRecommended(e.target.checked)}
            className="accent-yellow-500"
          />
          <label htmlFor="isRecommended" className="font-medium">
            📌 BLpedia 추천 작품으로 등록
          </label>
        </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            등록
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="w-full py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition"
          >
            메뉴로 돌아가기
          </button>
        </form>
      </div>
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-sm rounded bg-white p-6 shadow space-y-4">
            <Dialog.Title className="text-lg font-bold">✅ 웹툰이 등록되었습니다!</Dialog.Title>
            <p className="text-sm text-gray-600">다음 작업을 선택해주세요:</p>

            <div className="space-y-2">
              <button
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setShowModal(false);
                  router.push('/webtoon/new');
                }}
              >
                ➕ 새 웹툰 계속 등록하기
              </button>
              <button
                className="w-full py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                onClick={() => router.push('/admin')}
              >
                🛠 관리자 메뉴로 이동
              </button>
              <button
                className="w-full py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                onClick={() => router.push('/')}
              >
                🏠 홈으로 이동
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
