// import LogoAdmin from '@/assets/image/logoAdmin.svg'
// import Logout from '@/assets/image/logout.svg'
import style from '@/common.module.scss'
import { Outlet } from 'react-router-dom'
// import { SearchOutlined } from '@ant-design/icons'
import './index.scss'
// import useToken from '@/hook/token'
import Footer from '@/components/footer/Footer'
import useToken from '@/hook/token'
import { useEffect, useState } from 'react'
import MenuAdmin from './MenuAdmin'
import MenuUser from './MenuUser'
// import { useState } from 'react'

const ContainerBody = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

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

  return (
    <div className={style.wrapper}>
      {decode?.role === 0 ? <MenuAdmin /> : <MenuUser />}

      <div className="bg-[#F5F5F5] min-h-[calc(100vh-104px)] overflow-x-hidden">
        {/* <Outlet context={[inputEntered]} /> */}
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default ContainerBody
