import orderApi from '@/adapter/order'
import iconLogout from '@/assets/image/logout_account.svg'
import iconUser from '@/assets/image/user_account.svg'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import Order from './Order/Order'
import OrderDetail from './OrderDetail/OrderDetail'

const Account = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  // const [isInfo, setIsInfo] = useState<boolean>(pathname === '/account')

  const [isOrderedDetail, setIsOrderedDetail] = useState(
    pathname.length > '/account/orders'.length
  )

  const [isOrdered, setIsOrdered] = useState<boolean>()

  useEffect(() => {
    setIsOrderedDetail(pathname.length > '/account/orders'.length)
    setIsOrdered(pathname === '/account/orders')
  }, [pathname])

  const { data: dataOrders = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ORDERS_BY_USER_ID],
    queryFn: () =>
      orderApi.getOrdersByUserId({ userId: decode?.id }).then((res: any) => {
        return res?.data?.data
      }),
  })

  const logoutHandler = () => {
    localStorage.removeItem('token')
    navigate(URL.HOME)
  }

  const showOrderedHandler = () => {
    navigate(`${URL.ACCOUNT}/orders`)
    setIsOrdered(true)
    setIsOrderedDetail(false)
  }

  const showAccountHandler = () => {
    navigate(URL.ACCOUNT)
    setIsOrdered(false)
    setIsOrderedDetail(false)
  }

  return (
    <div className="flex gap-6 mx-[75px] my-5 px-4 py-3 pb-7 text-black-nur">
      <div className="w-2/3 flex flex-col gap-4">
        <div className="w-full flex justify-between gap-4">
          <div
            className="w-1/2 py-[14px] border-solid border-transparent rounded-[10px] bg-white cursor-pointer hover:text-green-main"
            onClick={showOrderedHandler}
          >
            <img
              src="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/checklist.png?1709020209536"
              alt="icon"
              className="w-[23px] h-[23px] flex mx-auto mb-2"
            />
            <div
              className={
                isOrdered
                  ? 'font-[800] text-center text-green-main'
                  : 'font-[800] text-center'
              }
            >
              Lịch sử đơn hàng
            </div>
          </div>

          <div className="w-1/2 py-[14px] border-solid border-transparent rounded-[10px] bg-white hover:text-green-main cursor-pointer">
            <img
              src="//bizweb.dktcdn.net/100/480/125/themes/900039/assets/account.png?1709020209536"
              alt="icon"
              className="w-[23px] h-[23px] flex mx-auto mb-2"
            />
            <div
              className="flex font-[800] justify-center"
              onClick={showAccountHandler}
            >
              <div>Xin chào,</div>
              <div className="text-green-main ml-1">{decode?.name}!</div>
            </div>
          </div>
        </div>

        {isOrderedDetail ? (
          <OrderDetail />
        ) : isOrdered ? (
          <div>
            <Order setOrderDetail={setIsOrderedDetail} lstOrder={dataOrders} />
          </div>
        ) : (
          <div className="w-full px-4 py-3 pb-6 border-solid border-transparent rounded-[10px] bg-white">
            <div className="text-green-main text-[20px] font-[800] mb-2">
              Thông tin tài khoản
            </div>

            <div className="flex flex-col gap-[3px]">
              <div className="flex">
                <div className="font-[800] mr-1">Họ tên:</div>
                <div>{decode?.name}</div>
              </div>

              <div className="flex">
                <div className="font-[800] mr-1">Email: </div>
                <div>{decode?.email}</div>
              </div>

              <div className="flex">
                <div className="font-[800] mr-1">Điện thoại: </div>
                <div>{decode?.phone}</div>
              </div>

              <div className="flex">
                <div className="font-[800] mr-1">Địa chỉ:</div>
                <div>{decode?.address}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-1/3 px-5 pb-3 py-2 border-solid border-transparent rounded-[10px] bg-white">
        <div className="py-4 flex gap-3 border border-solid border-gray-borderSecondary border-x-0 border-t-0">
          <img src={iconUser} alt="icon" className="w-[20px] h-[20px]" />
          <div className="font-[800] text-green-main cursor-pointer">
            Thông tin cá nhân
          </div>
        </div>

        <div className="py-4 flex gap-3 border border-solid border-gray-borderSecondary border-x-0 border-t-0">
          <img src={iconLogout} alt="icon" className="w-[20px] h-[20px]" />
          <div
            className="font-[500] cursor-pointer hover:text-green-main"
            onClick={logoutHandler}
          >
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
