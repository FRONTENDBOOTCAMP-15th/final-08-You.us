import Button from '@/components/common/Button'
import ProductCard from '@/components/common/ProductCard'
import Image from 'next/image'
import Link from 'next/link'

export default function MyPage() {
  return (
    <div className="mx-auto mt-10 flex w-full max-w-375 flex-col gap-8.5 px-4 pb-8.5 md:px-8 lg:px-12">
      <h1 className="sr-only">마이페이지</h1>
      {/* 주문 내역, 포인트, 쿠폰 등 */}
      {/* 사용자 정보 요약 (이름, 이메일 등) */}
      <section className="flex flex-col gap-2">
        <div className="flex justify-between pb-1">
          <h2 className="text-caption font-bold">내 정보</h2>
          <Link
            href="/mypage/profile"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">내 정보 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <div className="border-primary flex items-center gap-5 border-y p-5 px-3">
          <Image
            src="/images/common/basic-profile-img.png"
            alt="사용자 프로필 이미지"
            width={100}
            height={100}
            className="border-primary h-25 w-25 rounded-(--radius) border-4 lg:hidden"
          />
          <div className="*:text-body-md flex flex-col gap-3 px-3 py-1 *:flex *:gap-4">
            <p>
              <span>이름</span>
              <span>|</span>
              <span>홍길동</span>
            </p>
            <p>
              <span>전화</span>
              <span>|</span>
              <span>010-1234-5678</span>
            </p>
            <p>
              <span className="shrink-0">주소</span>
              <span>|</span>
              <span className="line-clamp-1">
                서울특별시 강남구 테헤란로 123
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-caption font-bold">주문/배송내역</h2>
          <Link
            href="/mypage/orders"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">내 주문/배송내역 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <div className="border-primary ml-3 flex items-center border-y p-2">
              <svg
                aria-hidden="true"
                width="24"
                height="20"
                viewBox="0 0 40 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2"
              >
                <path
                  d="M26.6665 23.4167V1.75H1.6665V23.4167H26.6665ZM26.6665 23.4167H38.3332V15.0833L33.3332 10.0833H26.6665L26.6665 23.4167ZM13.3332 27.5833C13.3332 29.8845 11.4677 31.75 9.1665 31.75C6.86532 31.75 4.99984 29.8845 4.99984 27.5833C4.99984 25.2821 6.86532 23.4167 9.1665 23.4167C11.4677 23.4167 13.3332 25.2821 13.3332 27.5833ZM34.9998 27.5833C34.9998 29.8845 33.1344 31.75 30.8332 31.75C28.532 31.75 26.6665 29.8845 26.6665 27.5833C26.6665 25.2821 28.532 23.4167 30.8332 23.4167C33.1344 23.4167 34.9998 25.2821 34.9998 27.5833Z"
                  stroke="#1E1E1E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-body-md text-primary font-bold">배송중</p>
              <time
                dateTime="2026-01-23"
                className="text-body-sm ml-7.5 text-gray-500"
              >
                2026.01.23
              </time>
            </div>
            <div className="border-primary ml-3 flex items-center gap-2 border-b">
              <Image
                src="/images/products/mypage/image-food-apple.png"
                alt="상품이미지"
                width={100}
                height={100}
                className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="text-body-md line-clamp-1">
                  유명산지 사과세트 3.8kg(14~15입)
                </p>
                <p className="text-body-md">254,900원</p>
                <p className="hidden">
                  <span className="text-gray-300">☆☆☆☆☆</span> ?/5
                </p>
              </div>
              <div className="ml-auto flex shrink-0 flex-col gap-2">
                <Button
                  aria-label="사과세트 주문 상세 보기"
                  className="text-body-sm shrink-0 px-(--spacing-button-x) py-(--spacing-button-y)"
                >
                  주문상세
                </Button>
                <Button
                  aria-label="내 배송 조회하기"
                  variant="update"
                  className="text-body-sm shrink-0 py-3.5 hover:bg-gray-200"
                >
                  배송현황
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="border-primary ml-3 flex items-center border-y p-2">
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-2"
              >
                <path
                  d="M35.0833 16.8929V18.4262C35.0813 22.0202 33.9175 25.5173 31.7656 28.3959C29.6136 31.2745 26.5888 33.3803 23.1423 34.3994C19.6957 35.4184 16.0121 35.296 12.6408 34.0505C9.26947 32.805 6.39109 30.503 4.43493 27.488C2.47878 24.4729 1.54965 20.9063 1.78613 17.3201C2.0226 13.7338 3.41201 10.3201 5.74713 7.58799C8.08225 4.8559 11.238 2.95184 14.7436 2.15978C18.2493 1.36772 21.9171 1.7301 25.2 3.19287M35.0833 5.09287L18.4167 21.7762L13.4167 16.7762"
                  stroke="#1E1E1E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-body-md font-bold text-gray-500">배송완료</p>
              <time
                dateTime="2026-01-23"
                className="text-body-sm ml-7.5 text-gray-500"
              >
                2026.01.23
              </time>
            </div>
            <div className="border-primary ml-3 flex items-center gap-2 border-b">
              <Image
                src="/images/products/mypage/image-food-cookie.png"
                alt="상품이미지"
                width={100}
                height={100}
                className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
              />
              <div className="flex flex-col gap-2">
                <p className="text-body-md line-clamp-1">제니쿠키 4믹스 쿠키</p>
                <p className="text-body-md">26,877원</p>
                <p>
                  <span className="text-gray-300">☆☆☆☆☆</span> ?/5
                </p>
              </div>
              <div className="ml-auto flex shrink-0 flex-col gap-2">
                <Button
                  aria-label="제니쿠키 주문 상세 보기"
                  className="text-body-sm px-(--spacing-button-x) py-(--spacing-button-y)"
                >
                  주문상세
                </Button>
                <Button
                  aria-label="내 후기 쓰기"
                  className="text-body-sm bg-primary-hover hover:bg-primary py-3.5"
                >
                  후기쓰기
                </Button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-caption font-bold">나의 후기</h2>
          <Link
            href="/mypage/reviews"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">내 후기 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <div className="border-primary ml-3 flex items-center justify-between gap-2 border-y">
              <Image
                src="/images/products/mypage/image-food-fish.png"
                alt="상품이미지"
                width={100}
                height={100}
                className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
              />
              <div className="mr-auto flex flex-col gap-2">
                <p className="text-body-md line-clamp-1">
                  옥돔&갈치&민어굴비 세트
                </p>
                <p className="text-body-md">119,000원</p>
                <p>
                  <span className="text-primary">★★★★★</span> 5/5
                </p>
              </div>
              <time
                dateTime="2026-01-01"
                className="text-body-sm hidden shrink-0 place-self-end pr-3 pb-6.5 text-gray-300 lg:flex"
              >
                작성일 : 2026.01.01
              </time>
              <div className="flex shrink-0 flex-col gap-2">
                <Button
                  aria-label="내가 쓴 후기 보기"
                  className="text-body-sm px-(--spacing-button-x) py-(--spacing-button-y)"
                >
                  보기
                </Button>
                <Button
                  aria-label="내 후기 수정하기"
                  variant="update"
                  className="text-body-sm py-3.5 hover:bg-gray-200"
                >
                  수정하기
                </Button>
              </div>
            </div>
          </li>
          <li>
            <div className="border-primary ml-3 flex items-center justify-between gap-2 border-y">
              <Image
                src="/images/products/mypage/image-food-meat.png"
                alt="상품이미지"
                width={100}
                height={100}
                className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
              />
              <div className="mr-auto flex flex-col gap-2">
                <p className="text-body-md line-clamp-1">
                  횡성축협한우 1++ 프리미엄 1호
                </p>
                <p className="text-body-md">218,000원</p>
                <p>
                  <span className="text-primary">★★★★★</span> 5/5
                </p>
              </div>
              <time
                dateTime="2026-01-01"
                className="text-body-sm hidden shrink-0 place-self-end pr-3 pb-6.5 text-gray-300 lg:flex"
              >
                작성일 : 2026.01.01
              </time>
              <div className="flex shrink-0 flex-col gap-2">
                <Button
                  aria-label="내가 쓴 후기 보기"
                  className="text-body-sm px-(--spacing-button-x) py-(--spacing-button-y)"
                >
                  보기
                </Button>
                <Button
                  aria-label="내 후기 수정하기"
                  variant="update"
                  className="text-body-sm shrink-0 py-3.5 hover:bg-gray-200"
                >
                  수정하기
                </Button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-caption font-bold">찜한 선물</h2>
          <Link
            href="/mypage/wishlist"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">찜한 선물 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <div className="flex flex-row gap-4 p-4">
          <ProductCard
            key={1}
            id={1}
            image={'/images/products/mypage/image-food-cookie.png'}
            name={'제니쿠키 4믹스 쿠키'}
            price={'26,877원'}
            rating={'5.0 ★'}
          />
          <ProductCard
            key={2}
            id={2}
            image={'/images/products/mypage/image-food-cookie.png'}
            name={'제니쿠키 4믹스 쿠키'}
            price={'26,877원'}
            rating={'5.0 ★'}
          />
          <ProductCard
            key={3}
            id={3}
            image={'/images/products/mypage/image-food-cookie.png'}
            name={'제니쿠키 4믹스 쿠키'}
            price={'26,877원'}
            rating={'5.0 ★'}
          />
          <ProductCard
            key={4}
            id={4}
            image={'/images/products/mypage/image-food-cookie.png'}
            name={'제니쿠키 4믹스 쿠키'}
            price={'26,877원'}
            rating={'5.0 ★'}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-caption font-bold">나의 Q&A</h2>
          <Link
            href="/mypage/qna"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">내 문의 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <ul>
          <li>
            <div className="ml-3 flex items-center justify-end gap-2 border-t border-gray-300 p-3">
              <div className="flex grow flex-col gap-1 *:line-clamp-1">
                <p className="text-body-sm shrink-0 text-gray-300 before:content-['>']">
                  횡성축협한우 1++ 프리미엄 1호
                </p>
                <Link href="/mypage/qna" className="text-body-md shrink-0">
                  세트 구성과 부위는 어떻게 되나요?
                </Link>
              </div>
              <time
                dateTime="2026-01-18"
                className="text-body-sm hidden text-gray-300 lg:flex"
              >
                2026.01.18
              </time>
              <p className="text-body-sm shrink-0 rounded-lg border-3 border-gray-400 px-6.5 py-2.5 text-black">
                답변대기중
              </p>
              {/* <Button variant="update" className="text-body-sm border-2 border-gray-100 hover:bg-gray-200">답변대기</Button> */}
            </div>
          </li>
          <li>
            <div className="ml-3 flex items-center justify-end gap-2 border-t border-gray-300 p-3">
              <div className="flex grow flex-col gap-1 *:line-clamp-1">
                <p className="text-body-sm shrink-0 text-gray-300 before:content-['>']">
                  횡성축협한우 1++ 프리미엄 1호
                </p>
                <Link href="/mypage/qna" className="text-body-md shrink-0">
                  선물용으로 구매해도 괜찮을까요?
                </Link>
              </div>
              <time
                dateTime="2026-01-01"
                className="text-body-sm hidden text-gray-300 lg:flex"
              >
                2026.01.01
              </time>
              <p className="text-body-sm shrink-0 rounded-lg border-3 border-blue-400 px-8 py-2.5 text-black">
                답변완료
              </p>
              {/* <Button className="text-body-sm border-3 text-gray-900 hover:text-gray-900 hover:bg-gray-300 border-blue-500 bg-white py-0 px-0">답변완료</Button> */}
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
