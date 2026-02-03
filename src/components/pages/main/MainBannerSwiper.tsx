'use client'

import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import styles from './Main-swiper.module.css'

export default function MainBannerSwiper() {
  return (
    <div className="relative my-[43px] h-[280px] w-full lg:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className={`${styles.bannerSwiper} min-w-[360px]`}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={500}
      >
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
            <div className="text-center text-white">
              <h2 className="text- mb-4 font-bold lg:text-5xl">
                신년 특별 이벤트
              </h2>
              <p className="mb-6 text-lg lg:text-2xl">전 상품 최대 30% 할인</p>
              <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                지금 확인 →
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-amber-500 to-orange-600">
            <div className="text-center text-white">
              <h2 className="mb-4 text-3xl font-bold lg:text-5xl">특가 세일</h2>
              <p className="mb-6 text-lg lg:text-2xl">오늘만 특별한 가격</p>
              <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                지금 확인 →
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-green-500 to-teal-600">
            <div className="text-center text-white">
              <h2 className="mb-4 text-sm font-bold lg:text-5xl">
                신상품 출시
              </h2>
              <p className="mb-6 text-lg lg:text-2xl">최신 트렌드 상품</p>
              <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                지금 확인 →
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
