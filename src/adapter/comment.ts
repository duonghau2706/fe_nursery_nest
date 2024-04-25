import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAllComment = async (params?: any) =>
  await sendGet(`${endpoint.get_all_comment}`, params).then((res) => res.data)

const getCommentById = async (params?: any) =>
  await sendGet(`${endpoint.get_comment_by_id}`, params).then((res) => res.data)

const createComment = async (params?: any) =>
  await sendPost(`${endpoint.create_comment}`, params).then((res) => res.data)

const updateComment = async (params?: any) =>
  await sendPost(`${endpoint.update_comment}`, params).then((res) => res.data)

const deleteComment = async (params?: any) =>
  await sendPost(`${endpoint.delete_comment}`, params).then((res) => res.data)

const commentApi = {
  getAllComment,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
}

export default commentApi
