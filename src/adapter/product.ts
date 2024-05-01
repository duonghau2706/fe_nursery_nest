import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAllProduct = async (params?: any) =>
  await sendGet(`${endpoint.get_all_product}`, params).then((res) => res.data)

const getCommentByProductId = async (params?: any) =>
  await sendGet(`${endpoint.get_comment_by_product_id}`, params).then(
    (res) => res.data
  )

const getProductByCategory = async (params?: any) =>
  await sendGet(`${endpoint.get_product_by_category}`, params).then(
    (res) => res.data
  )

const getAll = async (params?: any) =>
  await sendGet(`${endpoint.get_all_prd}`, params).then((res) => res.data)

const getInfoProductById = async (params?: any) =>
  await sendGet(`${endpoint.get_info_product_by_id}`, params).then(
    (res) => res.data
  )

const createProduct = async (params?: any) =>
  await sendPost(`${endpoint.create_product}`, params).then((res) => res.data)

const updateProduct = async (params?: any) =>
  await sendPost(`${endpoint.update_product}`, params).then((res) => res.data)

const deleteProduct = async (params?: any) =>
  await sendPost(`${endpoint.delete_product}`, params).then((res) => res.data)

const sortByCondition = async (params?: any) =>
  await sendGet(`${endpoint.get_sorted_product_by_condition}`, params).then(
    (res) => res.data
  )

const productApi = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAll,
  getAllProduct,
  getProductByCategory,
  getCommentByProductId,
  getInfoProductById,
  sortByCondition,
}

export default productApi
