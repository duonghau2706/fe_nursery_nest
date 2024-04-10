// import LogoAdmin from '@/assets/image/logoAdmin.svg'
// import Logout from '@/assets/image/logout.svg'
import style from '@/common.module.scss'
import { CaretDownOutlined } from '@ant-design/icons'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import PinDropIcon from '@mui/icons-material/PinDrop'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, Outlet, useNavigate } from 'react-router-dom'
// import { SearchOutlined } from '@ant-design/icons'
import { Search } from '@material-ui/icons'

import './index.scss'
// import useToken from '@/hook/token'
import Footer from '@/components/footer/Footer'
import useToken from '@/hook/token'
import { URL } from '@/utils/constants'
import { Button, ConfigProvider, Input } from 'antd'
import { useState } from 'react'
// import { useState } from 'react'

const ContainerBody = () => {
  // useQuery({
  //   queryKey: [QUERY_KEY.GET_PROFILE_USER, isMember],
  //   queryFn: () => {
  //     userApi.getProfile({ userId: decode?.id }).then((res) => {
  //       setIsMember(res?.data?.data?.[0]?.is_member)
  //     })
  //   },
  // })

  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const navigate = useNavigate()

  const [isHover, setIsHover] = useState(false)

  const onHoverMenuHandler = () => {
    setIsHover(true)
  }

  const onLeaveMenuHandler = () => {
    setIsHover(false)
  }

  return (
    <div className={style.wrapper}>
      <div
        className="bg-black-main h-[104px] w-full flex justify-between items-center z-[9999]"
        // style={{
        //   background: isScrolled
        //     ? '#0b0b0b'
        //     : 'linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.8) 100%)',
        // }}
      >
        <div
          className="flex gap-2 cursor-pointer justify-start w-full h-full"
          style={{
            background: 'linear-gradient(-180deg, #01921d, #8be336)',
          }}
        >
          <img
            src="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/logo.png?1704944126628"
            height={73}
            className="my-auto pl-[80px] bg-cover"
          />

          <div className="flex flex-col gap-1 align-middle">
            <div className="flex gap-10 h-1/2 pr-10 items-center justify-between pt-[10px] pl-[10px]">
              <div className="flex cursor-pointer relative">
                <Input
                  placeholder="Từ khóa..."
                  className="placeholder:text-[#000000a4] placeholder:font-Quicksand font-[400] pl-[18px] py-[8px] w-[450px]"
                />
                <div className="flex items-center ">
                  <Search className="text-[#000000c5] absolute right-2" />
                </div>
              </div>

              <div className="flex font-[700] gap-7">
                <div className="flex gap-2">
                  <PhoneInTalkIcon
                    style={{ fontSize: '30px' }}
                    className="cursor-pointer my-auto"
                  />
                  <div className="flex items-center hover:text-[#ffc107]">
                    0918 806 277
                  </div>
                </div>

                <div className="flex gap-1">
                  <div className="flex">
                    <PinDropIcon
                      style={{ fontSize: '30px' }}
                      className="cursor-pointer my-auto"
                    />
                  </div>
                  <div className="flex flex-col hover:text-[#ffc107]">
                    <div>Cửa hàng</div>
                    <div>Gần bạn</div>
                  </div>
                </div>

                <div className="flex gap-3 ml-8">
                  <div
                    className="flex w-[30px] h-[50px] my-auto"
                    onClick={() =>
                      decode?.id ? navigate(URL.ACCOUNT) : navigate(URL.LOGIN)
                    }
                  >
                    <AccountCircleIcon
                      style={{ fontSize: '30px' }}
                      className="flex items-center cursor-pointer my-auto hover:size-9 text-[#E3F4E3]"
                    />
                  </div>

                  <Link
                    to={URL.CART}
                    className="flex w-[30px] h-[50px] my-auto"
                  >
                    <ShoppingCartIcon
                      style={{ fontSize: '30px' }}
                      className="flex items-center cursor-pointer my-auto hover:size-9 text-[#E3F4E3]"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimaryHover: '#ffc107',
                  },
                },
              }}
            >
              <div className="flex h-1/2 items-center gap-8">
                <Link to={URL.HOME}>
                  <Button className="uppercase font-QuicksandBold text-[16px] bg-transparent border-none text-white font-semibold px-[10px]">
                    Trang chủ
                  </Button>
                </Link>
                <Link to={URL.ABOUT}>
                  <Button className="uppercase font-QuicksandBold text-[16px] bg-transparent border-none text-white font-semibold px-[10px]">
                    Giới thiệu
                  </Button>
                </Link>
                <div className="hover:text-yellow-menu">
                  <Button className="relative uppercase font-QuicksandBold text-[16px] bg-transparent border-none text-white font-semibold px-[10px]">
                    <div
                      className="flex gap-1"
                      onMouseOver={() => onHoverMenuHandler()}
                    >
                      Sản phẩm
                      <CaretDownOutlined />
                    </div>
                    {isHover && (
                      <div
                        onMouseLeave={() => onLeaveMenuHandler()}
                        className="text-left grid grid-cols-3 text-black-nur bg-white left-[-280px] absolute gap-x-[80px] gap-y-[10px] w-[750px] px-[20px] py-[10px] top-[40px] z-[5000]"
                      >
                        <div
                          className="hover:text-green-main"
                          onClick={() =>
                            navigate(`${URL.CATEGORY}/khan_lau_mat`, {
                              state: { type: 'KHAN_LAU_MAT' },
                            })
                          }
                        >
                          Khăn lau mặt
                        </div>
                        <div
                          className="hover:text-green-main"
                          onClick={() =>
                            navigate(`${URL.CATEGORY}/bong_tay_trang`, {
                              state: { type: 'BONG_TAY_TRANG' },
                            })
                          }
                        >
                          Bông tẩy trang
                        </div>
                        <div
                          className="hover:text-green-main"
                          onClick={() =>
                            navigate(`${URL.CATEGORY}/khan_kho_da_nang`, {
                              state: { type: 'KHAN_KHO_DA_NANG' },
                            })
                          }
                        >
                          Khăn khô đa năng
                        </div>
                        <div
                          className="hover:text-green-main"
                          onClick={() =>
                            navigate(`${URL.CATEGORY}/khan_nen`, {
                              state: { type: 'KHEN_NEN' },
                            })
                          }
                        >
                          Khăn nén
                        </div>

                        <div
                          className="hover:text-green-main"
                          onClick={() =>
                            navigate(`${URL.CATEGORY}/may_hut_sua`, {
                              state: { type: 'MAY_HUT_SUA' },
                            })
                          }
                        >
                          Máy hút sữa
                        </div>
                      </div>
                    )}
                  </Button>
                </div>

                <Link to={URL.BLOG}>
                  <Button className="uppercase font-QuicksandBold text-[16px] bg-transparent border-none text-white font-semibold px-[10px]">
                    Tin tức
                  </Button>
                </Link>

                <Link to={URL.CONTACT}>
                  <Button className="uppercase font-QuicksandBold text-[16px] bg-transparent border-none text-white font-semibold px-[10px]">
                    Liên hệ
                  </Button>
                </Link>
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#F5F5F5] min-h-[calc(100vh)] overflow-x-hidden h-[calc(100vh)]"> */}
      <div className="bg-[#F5F5F5] overflow-x-hidden">
        {/* <div> */}
        {/* <Outlet context={[inputEntered]} /> */}
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default ContainerBody
