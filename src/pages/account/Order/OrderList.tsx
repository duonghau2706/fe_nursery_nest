import OrderItem from './OrderItem'

const OrderList = ({ setOrderDetail }: any) => {
  return (
    <div className="flex flex-col gap-3">
      <OrderItem setOrderDetail={setOrderDetail} />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </div>
  )
}

export default OrderList
