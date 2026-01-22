export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* 중앙 정렬, 미니멀 헤더 */}
      <main className="w-full max-w-md p-6">{children}</main>
    </div>
  )
}
