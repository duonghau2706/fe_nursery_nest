import { useLocation } from 'react-router-dom'
import OrderDetailList from './OrderDetailList'

const OrderDetail = () => {
  const { pathname } = useLocation()
  const arr = pathname.split('/')
  const id = arr?.[arr.length - 1]

  return (
    <div className="text-[16px] px-4 pt-3 pb-4 border-solid border-transparent rounded-[10px] bg-white">
      <div className="pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="text-green-main font-[800] text-[20px]">
          Chi tiết đơn hàng #{id}
        </div>
        <div>Ngày tạo: 31/03/2024</div>
        <div className="text-[#dc3545] font-[800]">Chưa giao hàng</div>
      </div>

      <div className="pt-[14px] pb-5 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="text-green-main font-[800] text-[20px] pb-[6px]">
          Thông tin đơn hàng
        </div>

        <div className="flex flex-col w-full">
          <div className="flex">
            <div className="w-1/2 text-[14px]">Tên người nhận:</div>
            <div className="w-1/2 text-[14px]">Số điện thoại:</div>
          </div>
          <div className="font-[500] flex">
            <div className="w-1/2">Dương Dương</div>
            <div className="w-1/2">0123456789</div>
          </div>
        </div>
      </div>

      <div className="pt-[14px] pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] text-[14px]">Địa chỉ</div>
        <div>Street, Huyện Châu Đức, Bà Rịa-Vũng Tàu</div>
      </div>

      <div className="pt-[14px] pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] text-[14px]">Trạng thái thanh toán</div>
        <div className="text-[#dc3545] font-[800]">Chưa thanh toán</div>
      </div>

      <div className="pt-[14px] pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[800] text-[17px] mb-3">Các Sản Phẩm Đã Chọn</div>
        <OrderDetailList />
      </div>

      <div className="flex pt-[10px] pb-[10px] border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] w-1/2">Khuyến mại</div>
        <div className="font-[500] w-1/2">-0₫</div>
      </div>

      <div className="flex pt-[10px] pb-[10px] border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] w-1/2">Phí vận chuyển</div>
        <div className="font-[500] w-1/2">20.000₫</div>
      </div>

      <div className="flex pt-[10px]">
        <div className="font-[500] w-1/2">Tổng tiền</div>
        <div className="font-[800] w-1/2 text-[#ff0000]">57.000₫</div>
      </div>
    </div>
  )
}

export default OrderDetail
