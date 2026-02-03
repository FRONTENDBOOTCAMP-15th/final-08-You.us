import getCategoryCode from '@/lib/api/cods';
import HeaderClient from './HeaderClient';

export default async function Header() {
  //캐싱 관리로 인한 컴포넌트 분리
  const categoryRes = await getCategoryCode();
  const categories =
    'item' in categoryRes ? categoryRes.item.nested.productCategory.codes : [];

  return <HeaderClient categories={categories} />;
}
