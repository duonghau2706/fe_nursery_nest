import OrderList from './OrderList'

const Order = ({ setOrderDetail }: any) => {
  return (
    <div className="px-4 pt-3 pb-4 border-solid border-transparent rounded-[10px] bg-white">
      <div className="text-[20px] text-green-main font-[800] mb-1">
        Đơn hàng của bạn
      </div>
      <OrderList setOrderDetail={setOrderDetail} />
    </div>
  )
}

export default Order
