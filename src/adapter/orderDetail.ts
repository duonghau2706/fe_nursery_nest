import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const create = async (params?: any) =>
  await sendPost(`${endpoint.create_order_detail}`, params).then(
    (res) => res.data
  )

const getByOrderId = async (params?: any) =>
  await sendGet(`${endpoint.get_order_detail_by_order_id}`, params).then(
    (res) => res.data
  )

const orderDetailApi = {
  create,
  getByOrderId,
}

export default orderDetailApi
