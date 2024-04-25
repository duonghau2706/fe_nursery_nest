import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const create = async (params?: any) =>
  await sendPost(`${endpoint.create_discount}`, params).then((res) => res.data)

const getDiscountByCode = async (params?: any) =>
  await sendGet(`${endpoint.get_discount_by_code}`, params).then(
    (res) => res.data
  )

const getAllDiscount = async (params?: any) =>
  await sendGet(`${endpoint.get_all_discount}`, params).then((res) => res.data)

const getById = async (params?: any) =>
  await sendGet(`${endpoint.get_discout_by_id}`, params).then((res) => res.data)

const updateDiscount = async (params?: any) =>
  await sendPost(`${endpoint.update_discount}`, params).then((res) => res.data)

const deleteDiscount = async (params?: any) =>
  await sendPost(`${endpoint.delete_discount}`, params).then((res) => res.data)

const discountApi = {
  create,
  updateDiscount,
  getDiscountByCode,
  getAllDiscount,
  getById,
  deleteDiscount,
}

export default discountApi
