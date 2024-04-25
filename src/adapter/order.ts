import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAllOrder = async (params?: any) =>
  await sendGet(`${endpoint.get_all_order}`, params).then((res) => res.data)

const getOrdersByUserId = async (params?: any) =>
  await sendGet(`${endpoint.get_orders_by_user_id}`, params).then(
    (res) => res.data
  )
const create = async (params?: any) =>
  await sendPost(`${endpoint.create_order}`, params).then((res) => res.data)

const updateOrder = async (params?: any) =>
  await sendPost(`${endpoint.update_order}`, params).then((res) => res.data)

const deleteOrder = async (params?: any) =>
  await sendPost(`${endpoint.delete_order}`, params).then((res) => res.data)

const orderApi = {
  getAllOrder,
  getOrdersByUserId,
  create,
  updateOrder,
  deleteOrder,
}

export default orderApi
