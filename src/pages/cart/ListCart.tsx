import CartItem from './CartItem'

const ListCart = ({ carts }: any) => {
  // const dispatch = useDispatch()

  // const [carts, setCarts] = useState(
  //   useSelector((state: any) => state?.cartReducers?.cart)
  // )

  return (
    <div className="flex flex-col gap-6">
      {carts?.map((cart: any) => (
        <CartItem
          amount={cart?.amount}
          img={cart?.img}
          name={cart?.name}
          productId={cart?.productId}
          price={cart?.originalPrice}
          quantity={cart?.quantity}
          totalMoney={cart?.totalMoney}
          // handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  )
}

export default ListCart
