import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const create = async (params?: any) =>
  await sendPost(`${endpoint.create_order}`, params).then((res) => res.data)

const getOrdersByUserId = async (params?: any) =>
  await sendGet(`${endpoint.get_orders_by_user_id}`, params).then(
    (res) => res.data
  )

const orderApi = {
  create,
  getOrdersByUserId,
}

export default orderApi
