import logoLikado from '@/assets/image/logoLikado.png'
import logoLikado2 from '@/assets/image/logo_likado.png'
import { URL } from '@/utils/constants'
import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LogoAdmin from '@/assets/image/logoAdmin.svg'
import Logout from '@/assets/image/logout.svg'

import useToken from '@/hook/token'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import SideBar from './SideBar'

const { Sider } = Layout

const MenuAdmin = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const navigate = useNavigate()

  const collapsedString: string | null = localStorage.getItem('collapsed')
  const isCollapsed: boolean = collapsedString
    ? JSON.parse(collapsedString)
    : window.innerWidth <= 1024
  const [collapsed, setCollapsed] = useState(isCollapsed)
  localStorage.setItem('collapsed', JSON.stringify(collapsed))

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    location.replace(URL.HOME)
  }

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen bg-[#001233] fixed top-0 left-0 transition-all duration-500"
        width={250}
      >
        <div className="relative h-screen cursor-pointer">
          {!collapsed ? (
            <div
              className="px-4 py-[4px] bg-white h-[60px] flex justify-center items-center"
              onClick={() => navigate(URL.HOME)}
            >
              <img src={logoLikado} width={150} height={50} />
            </div>
          ) : (
            <div
              className="px-4 py-[4px] bg-white h-[60px] flex justify-center items-center"
              onClick={() => navigate(URL.HOME)}
            >
              <img src={logoLikado2} width={35} height={45} />
            </div>
          )}
          <div className="mt-2">
            <SideBar />
          </div>
        </div>
      </Sider>

      <div
        className={`${
          collapsed ? 'ml-[80px]' : 'ml-[250px]'
        } h-screen transition-all duration-500 top-0 inset-x-0 fixed z-30 transition-position lg:w-auto`}
      >
        <div>
          <div className="h-[60px] flex justify-between items-center pr-4 ">
            {collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: '30px', color: '' }}
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                style={{ fontSize: '30px', color: '' }}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}

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
      </div>
    </div>
  )
}

export default MenuAdmin
