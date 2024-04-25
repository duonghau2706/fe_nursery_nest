import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const create = async (params?: any) =>
  await sendPost(`${endpoint.create_blog}`, params).then((res) => res.data)

const getAllBlog = async (params?: any) =>
  await sendGet(`${endpoint.get_all_blog}`, params).then((res) => res.data)

const getById = async (params?: any) =>
  await sendGet(`${endpoint.get_by_id}`, params).then((res) => res.data)

const getInfo = async (params?: any) =>
  await sendGet(`${endpoint.get_info}`, params).then((res) => res.data)

const updateBlog = async (params?: any) =>
  await sendPost(`${endpoint.update_blog}`, params).then((res) => res.data)

const uploadBlog = async (params?: any) =>
  await sendPost(`${endpoint.upload_blog}`, params).then((res) => res.data)

const deleteBlog = async (params?: any) =>
  await sendPost(`${endpoint.delete_blog}`, params).then((res) => res.data)

const blogApi = {
  create,
  getAllBlog,
  getById,
  getInfo,
  updateBlog,
  deleteBlog,
  uploadBlog,
}

export default blogApi
