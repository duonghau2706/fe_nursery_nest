import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const getAllUser = async (params?: any) =>
  await sendGet(`${endpoint.get_all_user}`, params).then((res) => res.data)

const getUserById = async (params?: any) =>
  await sendGet(`${endpoint.get_user_by_id}`, params).then((res) => res.data)

const createUser = async (params?: any) =>
  await sendPost(`${endpoint.create_user}`, params).then((res) => res.data)

const updateUser = async (params?: any) =>
  await sendPost(`${endpoint.update_user}`, params).then((res) => res.data)

const deleteUser = async (params?: any) =>
  await sendPost(`${endpoint.delete_user}`, params).then((res) => res.data)

const userApi = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}

export default userApi
