import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const getAllCart = async (params?: any) =>
  await sendGet(`${endpoint.get_all_cart}`, params).then((res) => res.data)

const updateCart = async (params?: any) =>
  await sendPost(`${endpoint.update_cart}`, params).then((res) => res.data)

const cartApi = {
  getAllCart,
  updateCart,
}

export default cartApi
