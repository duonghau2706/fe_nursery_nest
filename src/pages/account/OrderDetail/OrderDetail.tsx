import orderDetailApi from '@/adapter/orderDetail'
import { QUERY_KEY } from '@/utils/constants'
import { renderFullrAdress } from '@/utils/helper'
import moment from 'moment'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import OrderDetailList from './OrderDetailList'

const OrderDetail = () => {
  const { pathname } = useLocation()

  const arr = pathname.split('/')
  const orderId = arr?.[arr.length - 1]

  const { data: dataOrderDetail = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ORDER_DETAIL_BY_ORDER_ID],
    queryFn: () =>
      orderDetailApi.getByOrderId({ orderId }).then((res: any) => {
        return res?.data?.data
      }),
  })

  return (
    <div className="text-[16px] px-4 pt-3 pb-4 border-solid border-transparent rounded-[10px] bg-white">
      <div className="pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="text-green-main font-[800] text-[20px]">
          Chi tiết đơn hàng #{dataOrderDetail?.[0]?.orderCode}
        </div>
        <div>
          Ngày tạo:{' '}
          {moment(dataOrderDetail?.[0]?.createdAt).format('DD/MM/YYYY')}
        </div>
        <div
          className={
            dataOrderDetail?.[0]?.statusShip === 0
              ? 'text-[#dc3545] font-[800]'
              : 'text-green-main font-[800]'
          }
        >
          {dataOrderDetail?.[0]?.statusShip === 0
            ? 'Chưa giao hàng'
            : 'Đã giao hàng'}
        </div>
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
            <div className="w-1/2">{dataOrderDetail?.[0]?.userName}</div>
            <div className="w-1/2">{dataOrderDetail?.[0]?.phone}</div>
          </div>
        </div>
      </div>

      <div className="pt-[14px] pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] text-[14px]">Địa chỉ</div>
        <div>
          {renderFullrAdress(
            dataOrderDetail?.[0]?.adress,
            dataOrderDetail?.[0]?.ward,
            dataOrderDetail?.[0]?.district,
            dataOrderDetail?.[0]?.province
          )}
        </div>
      </div>

      <div className="pt-[14px] pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] text-[14px]">Trạng thái thanh toán</div>
        <div
          className={
            dataOrderDetail?.[0]?.statusMoney === 0
              ? 'text-[#dc3545] font-[800]'
              : 'text-green-main font-[800]'
          }
        >
          {dataOrderDetail?.[0]?.statusMoney === 0
            ? 'Chưa thanh toán'
            : 'Đã thanh toán'}
        </div>
      </div>

      <div className="pt-[14px] pb-4 border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[800] text-[17px] mb-3">Các Sản Phẩm Đã Chọn</div>
        <OrderDetailList lstOrder={dataOrderDetail} />
      </div>

      <div className="flex pt-[10px] pb-[10px] border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] w-1/2">Khuyến mại</div>
        <div className="font-[500] w-1/2">
          -{Number(dataOrderDetail?.[0]?.sale).toLocaleString()}₫
        </div>
      </div>

      <div className="flex pt-[10px] pb-[10px] border-solid border-gray-borderSecondary border-x-0 border-t-0 border ">
        <div className="font-[500] w-1/2">Phí vận chuyển</div>
        <div className="font-[500] w-1/2">
          {Number(dataOrderDetail?.[0]?.ship).toLocaleString()}₫
        </div>
      </div>

      <div className="flex pt-[10px]">
        <div className="font-[500] w-1/2">Tổng tiền</div>
        <div className="font-[800] w-1/2 text-[#ff0000]">
          {Number(dataOrderDetail?.[0]?.totalMoney).toLocaleString()}₫
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
