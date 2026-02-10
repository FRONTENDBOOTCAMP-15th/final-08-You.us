import Image from 'next/image';

type ProductSummaryProps = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  total: number | string;
  scope: { rating: number } | null;
  deliveryStatus: 'SHIPPING' | 'DELIVERED';
  reviewStatus: 'NONE' | 'WRITTEN';
};

export default function ProductSummary({
  imageSrc,
  imageAlt,
  name,
  total,
  scope,
  deliveryStatus,
  reviewStatus,
}: ProductSummaryProps) {
  return (
    <div className="flex items-center gap-2 bg-white">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={100}
        height={100}
        className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
      />
      <div className="leading-8 *:line-clamp-1">
        <p className="text-body-md line-clamp-1">{name}</p>
        <p className="text-body-md">{total}원</p>
        {Option ? (
          <p>
            옵션:{item.cost.option} x {item.products.length()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
