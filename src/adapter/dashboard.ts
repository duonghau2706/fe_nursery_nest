import { sendGet } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAll = async (params?: any) =>
  await sendGet(`${endpoint.get_all_db}`, params).then((res) => res.data)

const dashBoardApi = {
  getAll,
}

export default dashBoardApi
