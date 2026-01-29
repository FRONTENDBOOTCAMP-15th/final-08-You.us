export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto min-h-screen bg-gray-50 lg:max-w-375 lg:min-w-5xl">
      {/* AuthGuard, 사용자 정보 표시 */}
      <main>{children}</main>
    </div>
  )
}
