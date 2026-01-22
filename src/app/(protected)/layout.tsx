export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* AuthGuard, 사용자 정보 표시 */}
      <main>{children}</main>
    </div>
  )
}
