export const LogoLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen w-full flex-col items-center bg-[#F3E7E9] pt-10 lg:pt-20">
    <h1 className="sr-only">선물 추천 테스트 페이지</h1>
    <img
      src="/icons/LOGO.svg"
      className="box-content w-65 self-start pl-35"
      alt="유어스"
    />
    {children}
  </div>
)
