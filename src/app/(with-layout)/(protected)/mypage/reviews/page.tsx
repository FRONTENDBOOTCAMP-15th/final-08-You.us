'use client';

import MyPageSection from '@/components/pages/mypage/main/MyPageSection';
import ReviewCard from '@/components/pages/mypage/reviews/ReviewCard';
import { getMyReviews } from '@/lib/api/mypage';
import { ReviewItem } from '@/types/review.types';
import { useEffect, useState } from 'react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getMyReviews();
      setReviews(data.item ?? []);
    };
    fetchReviews();
  }, []);

  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <h1 className="sr-only">나의 후기</h1>

      {/* 나의 후기 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title="나의 후기">
          <ul className="flex flex-col gap-4">
            {reviews.length === 0 && (
              <li className="flex min-h-50 items-center justify-center text-gray-400">
                작성하신 리뷰가 없습니다.
              </li>
            )}
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                type="written"
                reviewId={review._id}
                productId={review.product._id}
                imageSrc={review.product.image.path}
                imageAlt={review.product.name}
                name={review.product.name}
                price=""
                rating={review.rating}
                createdAt={review.createdAt}
                reviewContent={review.content}
                reviewImages={review.extra?.images ?? []}
              />
            ))}
          </ul>
        </MyPageSection>
      </section>
    </main>
  );
}
