import OrderDetailItem from './OrderDetailItem'

const OrderDetailList = ({ lstOrder }: any) => {
  return (
    <div className="flex flex-col gap-3">
      {lstOrder?.map((order: any) => (
        <OrderDetailItem
          key={order?.id}
          productId={order?.productId}
          name={order?.name}
          originalPrice={order?.originalPrice}
          quantity={order?.quantity}
          img={order?.img}
          amount={order?.amount}
        />
      ))}
    </div>
  )
}

export default OrderDetailList
