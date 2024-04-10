import { sendGet } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAllProduct = async (params?: any) =>
  await sendGet(`${endpoint.get_all_product}`, params).then((res) => res.data)

const getCommentByProductId = async (params?: any) =>
  await sendGet(`${endpoint.get_comment_by_product_id}`, params).then(
    (res) => res.data
  )

const getInfoProductById = async (params?: any) =>
  await sendGet(`${endpoint.get_info_product_by_id}`, params).then(
    (res) => res.data
  )

const sortByCondition = async (params?: any) =>
  await sendGet(`${endpoint.get_sorted_product_by_condition}`, params).then(
    (res) => res.data
  )

const productApi = {
  getAllProduct,
  getCommentByProductId,
  getInfoProductById,
  sortByCondition,
}

export default productApi
