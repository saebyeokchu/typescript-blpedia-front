// components/WebtoonCard.tsx
interface Props {
    title: string;
    company: string;
    keyword: string;
  }
  
  export default function WebtoonCard({ title, company, keyword }: Props) {
    return (
      <div className="flex gap-3">
        <div className="w-24 h-32 bg-gray-300 flex-shrink-0 rounded-md" />
        <div className="flex flex-col justify-center text-sm">
          <p className="font-medium">{title}</p>
          <p className="text-gray-600">{company}</p>
          <p className="text-blue-600">#{keyword}</p>
        </div>
      </div>
    );
  }
  