export default function ProductDtailContent({ content }: { content: string }) {
  return (
    <div className="space-y-8 py-8">
      {/* 상품정보 */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
