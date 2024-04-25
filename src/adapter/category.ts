import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAllCategories = async (params?: any) =>
  await sendGet(`${endpoint.get_all_categories}`, params).then(
    (res) => res.data
  )

const getCategoryById = async (params?: any) =>
  await sendGet(`${endpoint.get_category_by_id}`, params).then(
    (res) => res.data
  )

const createCategory = async (params?: any) =>
  await sendPost(`${endpoint.create_category}`, params).then((res) => res.data)

const updateCategory = async (params?: any) =>
  await sendPost(`${endpoint.update_category}`, params).then((res) => res.data)

const deleteCategory = async (params?: any) =>
  await sendPost(`${endpoint.delete_category}`, params).then((res) => res.data)

const categoryApi = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}

export default categoryApi
