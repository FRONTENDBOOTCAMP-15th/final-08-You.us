export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Header - 일반 헤더/푸터 레이아웃 */}
      <main>{children}</main>
      {/* Footer */}
    </div>
  )
}
