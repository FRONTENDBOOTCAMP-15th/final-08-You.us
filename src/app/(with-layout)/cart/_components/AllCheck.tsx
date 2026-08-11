import Button from '@/components/ui/Button';
import { deleteCartItem } from '@/lib/api/cart';
import { fetchServerCartCount } from '@/lib/zustand/cartStore';
import { CartItemOnList } from '@/types/cart.types';
import { toast } from 'react-toastify';

interface AllcheckProps {
  items: CartItemOnList[]; // 전체 장바구니 상품 목록
  setItems: (items: CartItemOnList[]) => void; // 상품 목록 업데이트 함수
}

export default function Allcheck({ items, setItems }: AllcheckProps) {
  const allChecked = items.length > 0 && items.every((item) => item.checked);
  const checkedCount = items.filter((item) => item.checked).length;

  const handleAllCheck = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };
  const handleDeleteSelected = async () => {
    // 1. 체크된 상품들의 ID 추출
    const selectedIds = items
      .filter((item) => item.checked)
      .map((item) => item._id);

    if (selectedIds.length === 0) return;

    // 2. 모든 삭제 API를 병렬로 호출 (일부 실패해도 나머지 결과는 그대로 확인)
    const results = await Promise.allSettled(
      selectedIds.map((id) => deleteCartItem(id)),
    );

    // 3. 실제로 삭제에 성공한 상품만 화면에서 제거
    const deletedIds = new Set(
      selectedIds.filter((_, index) => results[index]?.status === 'fulfilled'),
    );
    const failedCount = results.length - deletedIds.size;

    if (deletedIds.size > 0) {
      setItems(items.filter((item) => !deletedIds.has(item._id)));
      fetchServerCartCount();
    }

    if (failedCount > 0) {
      console.error('선택 삭제 일부 실패:', results);
      toast.error(`${failedCount}개 상품 삭제에 실패했습니다.`);
    }
  };

  return (
    <section className="mx-auto mb-6 max-w-[1500px] px-4">
      <nav
        className="flex items-center justify-between"
        aria-label="장바구니 관리"
      >
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="ml-[20px] h-4 w-4 lg:ml-[35px]"
            id="select-all"
            aria-label="전체 상품 선택"
            checked={allChecked}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
          <span className="text-body-sm">
            전체선택 ({checkedCount}/{items.length}개)
          </span>
        </label>

        <Button
          className="text-primary hover:bg-primary text-body-sm bg-white px-3 py-2 hover:text-white lg:mr-[510px]"
          aria-label="선택한 상품 삭제"
          onClick={handleDeleteSelected}
        >
          선택삭제
        </Button>
      </nav>
    </section>
  );
}
