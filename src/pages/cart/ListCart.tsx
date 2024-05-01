import CartItem from './CartItem'

const ListCart = ({ carts }: any) => {
  return (
    <div className="flex flex-col gap-6">
      {carts?.map((cart: any) => (
        <CartItem
          prd={cart}
          amount={cart?.amount}
          img={cart?.img}
          name={cart?.name}
          productId={cart?.product_id}
          price={cart?.original_price}
          quantity={cart?.quantity}
          // totalMoney={cart?.total_money}
          // handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  )
}

export default ListCart
