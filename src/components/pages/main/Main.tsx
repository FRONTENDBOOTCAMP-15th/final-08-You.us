'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import styles from './Main-swiper.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade' // Fade CSS 추가!
import ProductCard from '@/components/common/ProductCard'
import SectionHeader from '@/components/common/SectionHeaderProps'
import getCategorySeller from '@/lib/api/main/main'
import { ProductResponse } from '@/types/main/ProductType'

export default function Main() {
  const productCategories = getCategorySeller('식품')

  return (
    <>
      {/* <main className="">     
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
        > */}
      {/* <SwiperSlide>
            <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
              <div className="text-center text-white">
                <h2 className="text- mb-4 font-bold lg:text-5xl">
                  신년 특별 이벤트
                </h2>
                <p className="mb-6 text-lg lg:text-2xl">
                  전 상품 최대 30% 할인
                </p>
                <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                  지금 확인 →
                </button>
              </div>
            </div>
          </SwiperSlide> */}
      {/* <SwiperSlide>
            <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-amber-500 to-orange-600">
              <div className="text-center text-white">
                <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
                  특가 세일
                </h2>
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
      </div> */}

      {/* <div className="mx-auto max-w-[1500px] px-4 py-8 lg:mb-[60px]">
       
        {productCategories.map((category: ProductResponse) => (
          <div key={category._id} className="mb-12 lg:mb-16">
            <div className="mb-6 lg:mb-13">
              <SectionHeader title={category.title} id={category.id} />
            </div>

           
            <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:hidden">
              {category.products.slice(0, 4).map((product, index) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.mainImages[index]}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                />
              ))}
            </div>

          
            <div className="hidden lg:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={4}
                navigation={true}
                slidesPerGroup={4}
                className={styles.productSwiper}
                loop={true}
              >
                {category.products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </main> */}
    </>
  )
}
