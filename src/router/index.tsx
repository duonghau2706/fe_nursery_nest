import AdminProduct from '@/components/product/admin/AdminProduct'
import ContainerBody from '@/layout/Container'
// import ContainerRegister from '@/layout/Container/Register'
import Account from '@/pages/account/Account'
import AdminActionBlog from '@/pages/blog/admin/AdminActionBlog'
import AdminBlog from '@/pages/blog/admin/AdminBlog'
import Cart from '@/pages/cart/Cart'
import AdminActionCategory from '@/pages/category/AdminActionCategory'
import AdminCategory from '@/pages/category/AdminCategory'
import AdminActionComment from '@/pages/crud/admin/AdminActionComment'
import AdminActionDiscount from '@/pages/crud/admin/AdminActionDiscount'
import AdminActionOrder from '@/pages/crud/admin/AdminActionOrder'
import AdminActionProduct from '@/pages/crud/admin/AdminActionProduct'
import AdminActionUser from '@/pages/crud/admin/AdminActionUser'
import AdminComment from '@/pages/crud/admin/AdminComment'
import AdminDiscount from '@/pages/crud/admin/AdminDiscount'
import AdminOrder from '@/pages/crud/admin/AdminOrder'
import AdminUser from '@/pages/crud/admin/AdminUser'
import DashBoard from '@/pages/dashBoard/DashBoard'
import { URL } from '@/utils/constants'
import { Route, Routes } from 'react-router-dom'

const Root = () => {
  return (
    <Routes>
      <Route element={<ContainerBody />}>
        <Route path={URL.CART} element={<Cart />} />
        <Route path={URL.ACCOUNT} element={<Account />} />
        <Route path={`${URL.ACCOUNT}/:action`} element={<Account />} />
        <Route path={`${URL.ACCOUNT}/:action/:id`} element={<Account />} />
        {/* <Route path={URL.SERIES_MOVIE} element={<SeriesMovie />} />
        <Route path={URL.SINGLE_MOVIE} element={<SingleMovie />} />
        <Route path={`${URL.DETAIL_MOVIE}/:id`} element={<DetailMovie />} />
        <Route path={URL.USER_LIST_MOVIE} element={<UserListMovie />} />
        <Route path={`${URL.USER}/:type`} element={<User />} />
        <Route path={`${URL.USER}/:type/:id`} element={<User />} />
        <Route path={`${URL.MOVIE}/:type`} element={<Movie />} />
        <Route path={`${URL.MOVIE}/:type/:id`} element={<Movie />} /> */}
        <Route path={`${URL.ADMIN_HOME}`} element={<DashBoard />} />
        <Route path={`${URL.ADMIN_PRODUCT}`} element={<AdminProduct />} />
        {/* ********BLOG***********/}
        <Route path={`${URL.ADMIN_BLOG_LIST}`} element={<AdminBlog />} />
        <Route
          path={`${URL.ADMIN_BLOG_LIST}/:currentPage`}
          element={<AdminBlog />}
        />
        <Route path={`${URL.ADMIN_BLOG}/:type`} element={<AdminActionBlog />} />
        <Route
          path={`${URL.ADMIN_BLOG}/:type/:id`}
          element={<AdminActionBlog />}
        />

        {/* ********USER***********/}
        <Route path={`${URL.ADMIN_USER_LIST}`} element={<AdminUser />} />
        <Route
          path={`${URL.ADMIN_USER_LIST}/:currentPage`}
          element={<AdminUser />}
        />
        <Route path={`${URL.ADMIN_USER}/:type`} element={<AdminActionUser />} />
        <Route
          path={`${URL.ADMIN_USER}/:type/:id`}
          element={<AdminActionUser />}
        />

        {/* ********CATEGORY***********/}
        <Route
          path={`${URL.ADMIN_CATEGORY_LIST}`}
          element={<AdminCategory />}
        />
        <Route
          path={`${URL.ADMIN_CATEGORY_LIST}/:currentPage`}
          element={<AdminCategory />}
        />
        <Route
          path={`${URL.ADMIN_CATEGORY}/:type`}
          element={<AdminActionCategory />}
        />
        <Route
          path={`${URL.ADMIN_CATEGORY}/:type/:id`}
          element={<AdminActionCategory />}
        />

        {/* ********DISCOUNT***********/}
        <Route
          path={`${URL.ADMIN_DISCOUNT_LIST}`}
          element={<AdminDiscount />}
        />
        <Route
          path={`${URL.ADMIN_DISCOUNT_LIST}/:currentPage`}
          element={<AdminDiscount />}
        />
        <Route
          path={`${URL.ADMIN_DISCOUNT}/:type`}
          element={<AdminActionDiscount />}
        />
        <Route
          path={`${URL.ADMIN_DISCOUNT}/:type/:id`}
          element={<AdminActionDiscount />}
        />

        {/* ********COMMENT***********/}
        <Route path={`${URL.ADMIN_COMMENT_LIST}`} element={<AdminComment />} />
        <Route
          path={`${URL.ADMIN_COMMENT_LIST}/:currentPage`}
          element={<AdminComment />}
        />
        <Route
          path={`${URL.ADMIN_COMMENT}/:type`}
          element={<AdminActionComment />}
        />
        <Route
          path={`${URL.ADMIN_COMMENT}/:type/:id`}
          element={<AdminActionComment />}
        />

        {/* ********ORDER***********/}
        <Route path={`${URL.ADMIN_ORDER_LIST}`} element={<AdminOrder />} />
        <Route
          path={`${URL.ADMIN_ORDER_LIST}/:currentPage`}
          element={<AdminOrder />}
        />
        <Route
          path={`${URL.ADMIN_ORDER}/:type`}
          element={<AdminActionOrder />}
        />
        <Route
          path={`${URL.ADMIN_ORDER}/:type/:id`}
          element={<AdminActionOrder />}
        />

        {/* ********PRODUCT***********/}
        <Route path={`${URL.ADMIN_PRODUCT_LIST}`} element={<AdminProduct />} />
        <Route
          path={`${URL.ADMIN_PRODUCT_LIST}/:currentPage`}
          element={<AdminProduct />}
        />
        <Route
          path={`${URL.ADMIN_PRODUCT}/:type`}
          element={<AdminActionProduct />}
        />
        <Route
          path={`${URL.ADMIN_PRODUCT}/:type/:id`}
          element={<AdminActionProduct />}
        />

        {/* <Route path={`${URL.ADMIN}/:type`} element={<Admin />} />
        <Route path={`${URL.ADMIN}/:type/:id`} element={<Admin />} /> */}
        {/* <Route path={URL.DASH_BOARD} element={<DashBoard />} /> */}
        {/* <Route path={URL.MANAGE_MOVIE} element={<ManagaMovie />} />
        <Route
          path={`${URL.MANAGE_MOVIE}/:currentPage`}
          element={<ManagaMovie />}
        />
        <Route path={URL.MANAGE_USER} element={<ManagaUser />} />
        <Route path={URL.MANAGE_ADMIN} element={<ManagaAdmin />} /> */}
      </Route>
      {/* <Route path={URL.CHANGE_PLAN} element={<ChangePlan />} />
      <Route path={URL.SETUP_RECHARGE} element={<SetupRecharge />} />
      <Route path={`${URL.WATCH}/:id`} element={<Watch />} />
      <Route path={`${URL.WATCH}/:id/:episode`} element={<Watch />} />
      <Route path={URL.MANAGE} element={<Settings />} /> */}

      {/* <Route element={<ContainerRegister />}> */}
      {/* <Route path={URL.REGISTER} element={<Register />} /> */}
      {/* </Route> */}
      {/* <Route path={URL.LOGIN} element={<Login />} /> */}

      {/* <Route path={URL.RESET_PASSWORD} element={<ResetPassword />} /> */}
    </Routes>
  )
}
export default Root
