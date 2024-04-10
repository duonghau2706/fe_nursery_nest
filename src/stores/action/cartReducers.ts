import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../types'

export const addProductToCart: any = (param: any) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: param,
  }
}

export const removeProductFromCart: any = (param: any) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: param,
  }
}
