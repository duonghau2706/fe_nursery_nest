import OrderItem from './OrderItem'

const OrderList = ({ setOrderDetail, lstOrder }: any) => {
  return (
    <div className="flex flex-col gap-3">
      {lstOrder?.map((order: any) => (
        <OrderItem
          key={order?.id}
          setOrderDetail={setOrderDetail}
          id={order?.id}
          orderCode={order?.orderCode}
          statusMoney={order?.statusMoney}
          statusShip={order?.statusShip}
          address={order?.address}
          full_address={order?.fullAddress}
          ward={order?.ward}
          district={order?.district}
          province={order?.province}
          totalMoney={order?.totalMoney}
          createdAt={order?.createdAt}
        />
      ))}
    </div>
  )
}

export default OrderList
