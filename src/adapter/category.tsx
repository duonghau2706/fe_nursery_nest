import { sendGet } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getAllCategories = async (params?: any) =>
  await sendGet(`${endpoint.get_all_categories}`, params).then(
    (res) => res.data
  )

const categoryApi = {
  getAllCategories,
}

export default categoryApi
