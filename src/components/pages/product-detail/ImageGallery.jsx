'use client'

import { useState } from 'react'

export default function ImageGallery() {
  // 현재 보여줄 이미지 번호 (0부터 시작)
  const [currentImage, setCurrentImage] = useState(0)

  // 이미지 목록 (나중에 실제 이미지로 바꾸기)
  const images = [
    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800',
    'https://images.unsplash.com/photo-1543528176-61b239494933?w=800',
  ]

  return (
    <div className="space-y-4">
      {/* 큰 이미지 */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="relative aspect-square">
          <img
            src={images[currentImage]}
            alt="제품 이미지"
            className="h-full w-full object-cover"
          />

          {/* 점 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentImage
                    ? 'w-8 bg-rose-500' // 선택된 점
                    : 'w-2 bg-gray-300' // 선택 안된 점
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 썸네일 */}
      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl transition-all ${
              index === currentImage
                ? 'ring-4 ring-rose-500' // 선택된 썸네일
                : 'ring-2 ring-gray-200' // 선택 안된 썸네일
            }`}
          >
            <img
              src={img}
              alt={`썸네일 ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
