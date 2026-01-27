// SectionHeader.tsx (또는 CategoryHeader.tsx)
interface SectionHeaderProps {
  title: string
  accentColor?: string // 밑줄 색상 커스터마이징 가능
}

export default function SectionHeader({
  title,
  accentColor = 'bg-red-500',
}: SectionHeaderProps) {
  return (
    <div className="mb-6 lg:mb-13">
      <h2 className="color-gray-900 font-pretendard text-title-sm mb-3 lg:mb-4">
        {title}
      </h2>
      <div className={`h-0.75 w-16 rounded-lg ${accentColor} lg:w-20`}></div>
    </div>
  )
}
