function SkeletonCard() {
  return (
    <div className="flex h-full flex-col rounded border border-gray-200 bg-white p-4">
      <div className="relative mb-4 aspect-square animate-pulse rounded bg-gray-200" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function ProductCategorySectionSkeleton() {
  return (
    <div className="mb-12 lg:mb-16">
      {/* 헤더 스켈레톤 */}
      <div className="mb-6 lg:mb-13">
        <div className="mb-3 flex items-center justify-between lg:mb-4">
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-0.75 w-16 animate-pulse rounded-lg bg-gray-200 lg:w-20" />
      </div>

      {/* 모바일 2x2 */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* 데스크톱 4열 */}
      <div className="hidden grid-cols-4 gap-6 lg:grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
