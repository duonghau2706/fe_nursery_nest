import cartApi from '@/adapter/cart'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import ListCart from './ListCart'

const Cart = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const navigate = useNavigate()

  const { data: dataCart = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CART],
    queryFn: () =>
      cartApi.getAllCart({ userId: decode?.id }).then((res: any) => {
        return res?.data?.data
      }),
  })
  // const totalMoney = useSelector(
  //   (state: any) => state?.cartReducers?.totalMoney
  // )

  // console.log('totalMoney', totalMoney)

  // console.log('dataCart', dataCart)

  const total = dataCart?.totalMoney?.[0]?.totalMoney

  return (
    <div className="min-h-[65vh] flex justify-between gap-2 mx-[75px] my-5 px-4 py-3 pb-7 bg-white rounded-[10px]">
      {total > 0 ? (
        <ListCart carts={dataCart?.carts} />
      ) : (
        <div className="flex w-full h-fit text-[#856404] bg-[#fff3cd] px-5 py-3">
          <div> Không có sản phẩm nào. Quay lại</div>
          <div
            className="text-[#533f03] mx-1 font-[800] cursor-pointer hover:text-green-main"
            onClick={() => navigate(`${URL.CATEGORY}/khan_lau_mat`)}
          >
            cửa hàng
          </div>
          <div> để tiếp tục mua sắm.</div>
        </div>
      )}
      {total > 0 && (
        <div className="flex flex-col w-[350px] gap-6">
          <div className="flex justify-between text-white bg-yellow-main items-center px-5 py-3 rounded-[10px]">
            <div className="uppercase text-[16px] font-[700]">Tổng</div>
            <div className="text-[24px] font-[800]">
              {Number(total).toLocaleString()} ₫
            </div>
          </div>

          <Link
            to={URL.PAYMENT}
            className="cursor-pointer text-center px-10 py-2 bg-white border-[1px] border-solid border-green-main rounded-[10px] uppercase text-[16px] text-green-main font-[700] hover:bg-green-main hover:text-white"
          >
            Thanh toán
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
