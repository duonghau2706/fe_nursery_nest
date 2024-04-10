import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../types'
const initState: any = {
  totalMoney: 0,
  cart: [],
}

const cartReducers = (state = initState, action: any) => {
  const data = action?.payload

  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const idx = state.cart?.findIndex((prod: any) => prod.id === data?.id)
      state.totalMoney = state.totalMoney + data?.price * data?.quantity

      if (idx !== -1) {
        state.cart[idx].quantity = state.cart[idx].quantity + data.quantity
      } else {
        state.cart.push({
          id: data?.id,
          price: data?.price,
          quantity: data?.quantity,
        })
      }

      return state

    case REMOVE_PRODUCT_FROM_CART:
      const idxRm = state.cart?.findIndex((prod: any) => prod.id === data?.id)
      const p = state.cart[idxRm].price
      const q = state.cart[idxRm].quantity

      state.totalMoney = state.totalMoney - p * q
      state.cart = state.cart?.filter(
        (cartItem: any) => cartItem?.id !== data?.id
      )

      return state

    default:
      return state
  }
}

export default cartReducers
