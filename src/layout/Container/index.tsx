import logoLikado from '@/assets/image/logoLikado.png'
import style from '@/common.module.scss'
import { CaretDownOutlined } from '@ant-design/icons'
import { Search } from '@material-ui/icons'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import PinDropIcon from '@mui/icons-material/PinDrop'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import LogoAdmin from '@/assets/image/logoAdmin.svg'
import Logout from '@/assets/image/logout.svg'
import { MenuFoldOutlined } from '@ant-design/icons'

import cartApi from '@/adapter/cart'
import Footer from '@/components/footer/Footer'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { Button, ConfigProvider, Input, Layout } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import SideBar from './SideBar'
import './index.scss'

const { Sider } = Layout

const ContainerBody = () => {
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

  const [isHover, setIsHover] = useState(false)

  const onHoverMenuHandler = () => {
    setIsHover(true)
  }

  const onLeaveMenuHandler = () => {
    setIsHover(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    location.replace(URL.HOME)
  }

  return (
    <div className={style.wrapper}>
      {decode?.role === 0 ? (
        <div>
          <Sider
            trigger={null}
            collapsible
            className="h-screen bg-[#001233] fixed top-0 left-0 transition-all duration-500"
            width={250}
          >
            <div className="relative h-screen cursor-pointer">
              <div
                className="px-4 py-[4px] bg-white h-[60px] flex justify-center items-center"
                onClick={() => navigate(URL.HOME)}
              >
                <img src={logoLikado} width={150} height={50} />
              </div>

              <div className="mt-2">
                <SideBar />
              </div>
            </div>
          </Sider>

          <div className="ml-[250px] h-screen transition-all duration-500 top-0 inset-x-0 fixed z-30 transition-position lg:w-auto">
            <div>
              <div className="h-[60px] flex justify-between items-center pr-4 ">
                <MenuFoldOutlined style={{ fontSize: '30px', color: '' }} />

                <div className="flex gap-2 cursor-pointer justify-end">
                  <img src={LogoAdmin} width={18} height={23}></img>
                  <label className="cursor-pointer mt-[3px] font-bold">
                    {decode?.name}
                  </label>

                  <div
                    className="flex gap-2 cursor-pointer ml-4 justify-end items-center"
                    onClick={handleLogout}
                  >
                    <label className="cursor-pointer text-red-primary font-semibold underline -translate-y-[1px] mt-[3px]">
                      Đăng xuất
                    </label>
                    <img src={Logout} width={20} height={18}></img>
                  </div>
                </div>
              </div>
              <div className="bg-[#001233] h-1"></div>
            </div>
            <div className="bg-[#F5F5F5] min-h-[calc(100vh-64px)] overflow-auto h-[calc(100vh-64px)]">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-black-main h-[104px] w-full flex justify-between items-center z-[9999]">
            <div
              className="pt-[4px] flex gap-2 cursor-pointer justify-start w-full h-full"
              style={{
                background: 'linear-gradient(-180deg, #01921d, #8be336)',
              }}
            >
              <img
                src={logoLikado}
                height={150}
                className="mt-[-15px] my-auto ml-[80px] bg-cover"
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
                        className="flex w-[30px] h-[50px] my-auto hover:scale-125"
                        onClick={() =>
                          decode?.id
                            ? navigate(URL.ACCOUNT)
                            : navigate(URL.LOGIN)
                        }
                      >
                        <AccountCircleIcon
                          style={{ fontSize: '30px' }}
                          className="flex items-center cursor-pointer my-auto text-[#E3F4E3]"
                        />
                      </div>

                      <Link
                        to={URL.CART}
                        className="flex w-[30px] h-[50px] my-auto relative hover:scale-125"
                      >
                        <div className="absolute right-[-10px] rounded-[50%] bg-yellow-main w-[25px] h-[25px] text-center leading-[25px] text-white text-[13px]">
                          {dataCart?.carts?.length}
                        </div>
                        <ShoppingCartIcon
                          style={{ fontSize: '30px' }}
                          // hover:size-9
                          className="flex items-center cursor-pointer my-auto text-[#E3F4E3]"
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

          <div className="bg-[#F5F5F5] min-h-[calc(100vh-104px)] overflow-x-hidden">
            {/* <Outlet context={[inputEntered]} /> */}
            <Outlet />
          </div>

          <Footer />
        </div>
      )}
    </div>
  )
}

export default ContainerBody
