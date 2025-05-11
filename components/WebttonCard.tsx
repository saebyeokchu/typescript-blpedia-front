import Link from "next/link";

// components/WebtoonCard.tsx
interface WebtoonCardProps {
  title: string;
  company: string;
  keyword: string;
  image_url: string;
  slug: string;
  is_recommended?: boolean; // ✅ NEW
}
  
export default function WebtoonCard({
  title,
  company,
  keyword,
  image_url,
  slug,
  is_recommended
}: WebtoonCardProps) {
    return (
      <Link href={`/webtoon/${slug}`}>


        <div className="relative flex gap-3 items-start cursor-pointer hover:bg-gray-100 p-2 rounded-md transition">
          <img
            src={image_url}
            alt={title}
            className="w-24 h-32 object-cover rounded-md bg-gray-200"
          />
          {is_recommended && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-white text-[10px] px-2 py-0.5 rounded shadow font-bold">
              추천 ⭐
            </div>
          )}
          <div className="text-sm space-y-1">
            <p className="font-semibold">{title}</p>
            <p className="text-gray-600">{company}</p>
            <p className="text-xs text-blue-600">#{keyword}</p>
          </div>
        </div>
      </Link>
    );
  }
  