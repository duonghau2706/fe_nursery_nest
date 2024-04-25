import useToken from '@/hook/token'
import { URL } from '@/utils/constants'
import { FormOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CategoryIcon from '@mui/icons-material/Category'
import DiscountIcon from '@mui/icons-material/Discount'
import InventoryIcon from '@mui/icons-material/Inventory'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const SideBar = () => {
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const location = useLocation()
  const { currentPage } = useParams()
  const [selectedKeys, setSelectedKeys] = useState([location.pathname])

  useEffect(() => {
    if (currentPage) {
      const arrString = location.pathname.split('/')
      const subString = arrString.slice(0, arrString.length - 1).join('/')
      setSelectedKeys([subString])
    } else setSelectedKeys([location.pathname])

    // if (
    //   location.pathname !== URL.EMAIL_MANAGEMENT &&
    //   location.pathname !== URL.INQUIRY_MANAGEMENT
    // ) {
    //   return
    // }

    const keys = ['sub1', 'sub3']
    setOpenKeys(keys)
  }, [location.pathname])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const items: MenuItem[] = useMemo(() => {
    // switch (decode?.role) {
    //   //0: role admin
    //   //1: role toolmail user
    //   //2: role salekit user
    //   case 0:

    //   case 1:
    //     return [
    //       getItem('Dashboard', URL.HOME, <HomeOutlined />),
    //       getItem(
    //         'Quản lý Nguồn khách hàng',
    //         URL.CUSTOMER_RESOURCE,
    //         <GlobalOutlined />
    //       ),
    //       getItem('Quản lý khách hàng', URL.CUSTOMER, <TeamOutlined />),
    //       getItem('Quản lý người dùng', URL.USER, <UserOutlined />),
    //       getItem('Quản lý gửi', 'sub3', <MailOutlined />, [
    //         getItem('Quản lý gửi mail', URL.EMAIL_MANAGEMENT),
    //         getItem('Quản lý gửi inquiry', URL.INQUIRY_MANAGEMENT),
    //       ]),
    //       getItem(
    //         'Quản lý template',
    //         URL.TEMPLATE_MANAGEMENT,
    //         <FileTextOutlined />
    //       ),
    //       getItem(
    //         'Thông tin liên hệ',
    //         URL.CONTACT_INFOR,
    //         <InfoCircleOutlined />
    //       ),
    //     ]
    //   case 2:
    //     return [getItem('Quản lý tài liệu', URL.DOCUMENT, <FileTextOutlined />)]
    //   default:
    //     return []
    // }
    return [
      ...(decode?.role === 0
        ? [
            getItem('Dashboard', URL.ADMIN_HOME_LIST, <HomeOutlined />),
            getItem(
              'Quản lý người dùng',
              URL.ADMIN_USER_LIST,
              <UserOutlined />
            ),
            getItem(
              'Quản lý sản phẩm',
              URL.ADMIN_PRODUCT_LIST,
              <InventoryIcon />
            ),
            getItem(
              'Quản lý đơn hàng',
              URL.ADMIN_ORDER_LIST,
              <AssignmentIcon />
            ),
            getItem(
              'Quản lý thể loại',
              URL.ADMIN_CATEGORY_LIST,
              <CategoryIcon />
            ),
            // getItem(
            //   'Quản lý bình luận',
            //   URL.ADMIN_COMMENT_LIST,
            //   <CommentOutlined />
            // ),
            getItem('Quản lý bài viết', URL.ADMIN_BLOG_LIST, <FormOutlined />),
            getItem(
              'Quản lý mã giảm giá',
              URL.ADMIN_DISCOUNT_LIST,
              <DiscountIcon />
            ),
            // getItem('Thông tin liên hệ', URL.CONTACT, <InfoCircleOutlined />),
          ]
        : []),
    ]
  }, [])

  const handleClick = (keys: any) => {
    // if (keys.key !== URL.CUSTOMER) localStorage.removeItem('dataSearch')
    navigate(keys.key)
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={handleClick}
      selectedKeys={selectedKeys}
      // items={items}
    >
      {items.map((item: any) =>
        item?.children ? (
          <SubMenu key={item.key} title={item.label} icon={item.icon}>
            {item.children.map((subItem: any) => (
              <Menu.Item key={subItem.key} icon={subItem.icon}>
                <Link to={subItem.key} className="font-normal">
                  {subItem.label}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key} className="font-normal">
              {item.label}
            </Link>
          </Menu.Item>
        )
      )}
    </Menu>
  )
}

export default SideBar
