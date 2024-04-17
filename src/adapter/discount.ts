import { sendGet } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getDiscountByCode = async (params?: any) =>
  await sendGet(`${endpoint.get_discount_by_code}`, params).then(
    (res) => res.data
  )

const discountApi = {
  getDiscountByCode,
}

export default discountApi
