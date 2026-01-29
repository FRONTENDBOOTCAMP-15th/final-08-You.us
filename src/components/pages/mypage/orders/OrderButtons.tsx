import Button from '@/components/common/Button'
import Link from 'next/dist/client/link'

export default function OrderButtons({
  deliveryStatus,
  reviewStatus,
}: {
  deliveryStatus: 'SHIPPING' | 'DELIVERED'
  reviewStatus: 'NONE' | 'WRITTEN'
}) {
  if (deliveryStatus === 'SHIPPING') {
    return (
      <div className="flex flex-col gap-2 p-2">
        <Button aria-label="주문 상세 보기" className="text-body-sm">
          주문상세
        </Button>
        <Button
          aria-label="내 배송 조회하기"
          variant="update"
          className="text-body-sm"
        >
          배송현황
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <Button aria-label="주문 상세 보기" className="text-body-sm">
        주문상세
      </Button>

      {reviewStatus === 'NONE' ? (
        <Link href="/mypage/reviews/create">
          <Button
            aria-label="내 후기 쓰기"
            className="text-body-sm px-auto bg-primary-hover hover:bg-primary md:px-[var(--spacing-button-x)]"
          >
            후기쓰기
          </Button>
        </Link>
      ) : (
        <Link href="/mypage/reviews">
          <Button
            aria-label="내 후기 보기"
            variant="update"
            className="text-body-sm px-1 py-3.5 hover:bg-gray-200"
          >
            내 후기 보기
          </Button>
        </Link>
      )}
    </div>
  )
}
