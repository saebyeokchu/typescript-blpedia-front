export interface Review {
  id: number;
  content: string;
  created_at: string;
}

export interface Theme {
  id: number;
  name: string;
  slug: string;
}

export interface Webtoon {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  link_url: string;
  is_recommended?: boolean;
  recommendation_reason?: string;
  status: 'serializing' | 'completed';
  review: Review; 
  company: { id: number; name: string };
  themes: { id: number; name: string; slug: string }[];
}


export async function fetchAllThemes(): Promise<Theme[]> {
  const res = await fetch('http://localhost:8000/api/themes', {
    cache: 'no-store',
  });

  console.log('res', res);
  
  if (!res.ok) throw new Error('Failed to fetch webtoons');
  return res.json();
}


export async function fetchWebtoons(): Promise<Webtoon[]> {
  const res = await fetch('http://localhost:8000/api/webtoons/', {
    cache: 'no-store',
  });

  console.log('res', res);
  
  if (!res.ok) throw new Error('Failed to fetch webtoons');
  return res.json();
}

export async function fetchWebtoonDetail(slug: string): Promise<Webtoon> {
  const res = await fetch(`http://localhost:8000/api/webtoons/${slug}/`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch webtoon');
  return res.json();
}

