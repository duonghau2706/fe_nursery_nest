import PaymentProductItem from './PaymentProductItem'

const PaymentListProduct = ({ lstPrd }: any) => {
  return (
    <div className="flex flex-col gap-4">
      {lstPrd?.map((prd: any) => (
        <PaymentProductItem
          img={prd.img}
          name={prd.name}
          quantity={prd.quantity}
          amount={prd.amount}
        />
      ))}
    </div>
  )
}

export default PaymentListProduct
