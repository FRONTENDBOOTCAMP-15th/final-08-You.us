import { deleteCartItem } from '@/lib/api/cart';
import { CartItemOnList } from '@/types/cart.types';

interface AllcheckProps {
  items: CartItemOnList[];
  setItems: (items: CartItemOnList[]) => void;
}

export default function Allcheck({ items, setItems }: AllcheckProps) {
  const allChecked = items.length > 0 && items.every((item) => item.checked);
  const checkedCount = items.filter((item) => item.checked).length;

  const handleAllCheck = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };
  const handleDeleteSelected = async () => {
    try {
      const selectedIds = items
        .filter((item) => item.checked)
        .map((item) => item._id);
      await Promise.all(selectedIds.map((id) => deleteCartItem(id)));
      setItems(items.filter((item) => !item.checked));
    } catch (error) {
      console.error('선택 삭제 실패:', error);
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

        <button
          className="text-body-sm cursor-pointer rounded-sm border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 lg:mr-[465px]"
          aria-label="선택한 상품 삭제"
          onClick={handleDeleteSelected}
        >
          선택삭제
        </button>
      </nav>
    </section>
  );
}
