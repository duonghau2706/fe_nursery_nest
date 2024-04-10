import { URL } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'

const OrderItem = ({ setOrderDetail }: any) => {
  const navigate = useNavigate()

  const onSelectOrderItem = () => {
    setOrderDetail(true)
    navigate(`${URL.ACCOUNT}/orders/1088`)
  }

  return (
    <div
      className="cursor-pointer hover:border-[#ffcc00] hover:shadow-border flex flex-col gap-[2px] px-4 pt-[14px] pb-[10px] rounded-[10px] border border-solid border-gray-borderSecondary"
      onClick={onSelectOrderItem}
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="text-[#ffcc00] font-[600]">#1088</div>
          <div className="mx-1">-</div>
          <div className="text-[#dc3545]">Chưa thu tiền</div>
          <div className="mx-1">-</div>
          <div className="text-[#dc3545]">Chưa chuyển</div>
        </div>

        <div>
          <div className="text-[#ff0000] font-[800]">57.000₫</div>
        </div>
      </div>

      <div className="font-[800]">
        Địa chỉ: 129 Lý Thái Tổ, Hoàng Hoa Thám, Bắc Từ Liêm, Hà Nội
      </div>

      <div className="text-[14px]">Ngày: 31/03/2024</div>
    </div>
  )
}

export default OrderItem
