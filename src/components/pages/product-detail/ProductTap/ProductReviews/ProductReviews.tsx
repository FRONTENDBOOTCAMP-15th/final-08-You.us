'use client';

import { useState, useReducer, useEffect } from 'react';
import ReviewsComponent from '@/components/pages/product-detail/ProductTap/ProductReviews/ReviewsComponent';
import Pagination from '@/components/common/Pagination';
import ImageModal from '@/components/pages/product-detail/ProductTap/ProductReviews/ImageModal';
import { modalReducer, initialModalState } from './modalReducer';
import fetchClient from '@/lib/api/fetchClient';
import { ReviewItem, ReviewResponse } from '@/types/review.types';
import { useParams } from 'next/navigation';

export default function ProductReviews() {
  const { id } = useParams();

  const [reviews, setReviews] = useState<ReviewResponse>({
    ok: 0,
    item: [],
    pagination: { page: 1, limit: 5, total: 0, totalPages: 0 },
  });
  const [page, setPage] = useState<number>(1);
  const [sortType, setSortType] = useState('latest');

  useEffect(() => {
    let url = `/replies/products/${id}?page=${page}&limit=4`;

    switch (sortType) {
      case 'latest':
        url += `&sort={"createdAt":-1}`;
        break;
      case 'rating':
        url += `&sort={"rating":-1}`;
        break;
      case 'photo':
        url += `&custom={"extra.image":true}`;
        break;
    }

    fetchClient<ReviewResponse>(url).then((data) => {
      setReviews(data);
    });
  }, [id, page, sortType]);

  // 모달 이벤트 Reducer로 관리
  const [modal, dispatch] = useReducer(modalReducer, initialModalState);

  const handleImageClick = (images: string[], index: number) => {
    dispatch({ type: 'OPEN', images, index });
  };
  const handleCloseModal = () => dispatch({ type: 'CLOSE' });
  const handlePrev = () => dispatch({ type: 'PREV' });
  const handleNext = () => dispatch({ type: 'NEXT' });

  return (
    <div className="min-x-[360px] lg:px-15">
      <div className="space-y-6">
        {/* 필터 버튼들 */}
        <div
          role="group"
          aria-label="리뷰 정렬 옵션"
          className="flex justify-end gap-2 border-b pb-4"
        >
          {[
            { id: 'latest', label: '최신순으로' },
            { id: 'rating', label: '별점순으로' },
            { id: 'photo', label: '사진 리뷰만' },
          ].map((button, index, array) => (
            <button
              key={button.id}
              onClick={() => {
                setSortType(button.id);
                setPage(1);
              }}
              aria-pressed={sortType === button.id}
              className={`text-body-sm cursor-pointer border-r border-r-gray-300 px-4 py-2 ${
                index == array.length - 1 && 'border-none'
              } ${sortType === button.id && 'font-bold text-gray-500'} `}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* 리뷰 목록 */}
        <div className="min-h-[700px] space-y-6">
          {reviews.item &&
            reviews.item.map((review) => (
              <ReviewsComponent
                key={review._id}
                review={review}
                onImageClick={handleImageClick}
              />
            ))}
        </div>
      </div>

      <div className="mx-auto mt-15.5 w-fit">
        <Pagination
          currentPage={page}
          totalPages={reviews.pagination?.totalPages}
          maxVisible={reviews.pagination?.limit}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      </div>

      {/* 이미지 확대 모달 */}
      {modal.images && (
        <ImageModal
          images={modal.images}
          currentIndex={modal.currentIndex}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
