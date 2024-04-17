import { productApi } from '@/adapter'
import { QUERY_KEY, URL } from '@/utils/constants'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const OrderDetailItem = ({
  productId,
  name,
  originalPrice,
  quantity,
  img,
  amount,
}: any) => {
  const navigate = useNavigate()

  const { data: prd = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, productId],
    queryFn: () =>
      productApi.getInfoProductById({ id: productId }).then((res) => {
        return res?.data?.data?.[0]
      }),
  })

  const handleViewDetailProduct = () => {
    navigate(`${URL.PRODUCT}/${productId}`, { state: { prd } })
  }

  return (
    <div
      className="cursor-pointer flex gap-2 hover:border-[#ffcc00] hover:shadow-border pl-[26px] pr-[15px] pt-[14px] pb-[10px] rounded-[10px] border border-solid border-gray-borderSecondary"
      onClick={handleViewDetailProduct}
    >
      <div className="text-[#ffc107] font-[800] flex items-center w-[10%]">
        {Number(quantity).toLocaleString()} x{' '}
      </div>
      <div className="flex justify-between w-full gap-4">
        <div className="flex gap-5">
          <img src={img} alt="img" className="w-[70px] h-[70px]" />
          <div className="flex flex-col gap-[2px] justify-center">
            <div className="font-[800]">{name}</div>
            <div className="text-[14px]">
              {Number(originalPrice).toLocaleString()}₫
            </div>
          </div>
        </div>

        <div className="flex items-center text-[#ff0000] font-[800]">
          {Number(amount).toLocaleString()}₫
        </div>
      </div>
    </div>
  )
}

export default OrderDetailItem
