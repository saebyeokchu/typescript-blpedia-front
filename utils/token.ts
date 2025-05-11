// utils/token.ts
export async function getValidAccessToken(): Promise<string | null> {
  let access = localStorage.getItem('blpedia_access');
  const refresh = localStorage.getItem('blpedia_refresh');

  // Try a test API call to see if access is still valid
  const isValid = await fetch('http://localhost:8000/api/test-token/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }).then(res => res.ok).catch(() => false);

  if (isValid) return access;

  // If access token is expired, try to refresh
  const res = await fetch('http://localhost:8000/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    console.warn('⚠️ Refresh token expired or invalid');
    localStorage.removeItem('blpedia_access');
    localStorage.removeItem('blpedia_refresh');
    return null;
  }

  const data = await res.json();
  localStorage.setItem('blpedia_access', data.access);
  return data.access;
}
