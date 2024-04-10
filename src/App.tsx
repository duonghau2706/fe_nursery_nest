import './App.css'

import Authentication from '@/layout/Authentication/Authentication'
import { ForgotPassword, Login } from '@/pages'
import Root from '@/router'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductItemDetail from './components/product/ProductItemDetail'
import ContainerBody from './layout/Container'
import Home from './pages/Home'
import About from './pages/about/About'
import Blog from './pages/blog/Blog'
import Register from './pages/common/Register'
import Contact from './pages/contact/Contact'
import Payment from './pages/payment/Payment'
import CreditOptions from './pages/register/CreditOptions'
import PlanForm from './pages/register/PlanForm'
import Regis from './pages/register/Regis'
import SetupPayment from './pages/register/SetupPayment'
import { URL } from './utils/constants'
import PaymentSuccess from './pages/payment/PaymentSuccess'
import Category from './pages/category/Category'

dayjs.extend(weekday)
dayjs.extend(localeData)
/**
 *Tắt gọi Api khi focus
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

function App() {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'white',
            // colorBgContainer: 'white',
          },
          // components: {
          //   Input: {
          //     activeBorderColor: 'red',
          //     hoverBorderColor: 'red',
          //   },
          // },
        }}
      >
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route>
                <Route path={URL.LOGIN} element={<Login />} />
                <Route path={URL.REGISTER} element={<Register />} />
                <Route
                  path={URL.FORGOT_PASSWORD}
                  element={<ForgotPassword />}
                />
                <Route path={URL.CREDIT_OPTIONS} element={<CreditOptions />} />
                <Route path={URL.PLANFORM} element={<PlanForm />} />
                <Route path={URL.SIGNUP} element={<Regis />} />
                <Route path={URL.PAYMENT} element={<Payment />} />
                <Route path={URL.SETUP_PAYMENT} element={<SetupPayment />} />
                <Route path={URL.RECHARGE} element={<CreditOptions />} />

                <Route path={URL.THANKYOU} element={<PaymentSuccess />} />
                <Route path={URL.PAYMENT} element={<Payment />} />
                <Route element={<ContainerBody />}>
                  <Route path={URL.HOME} element={<Home />} />
                  <Route
                    path={`${URL.CATEGORY}/:type`}
                    element={<Category />}
                  />
                  <Route
                    path={`${URL.PRODUCT}/:id`}
                    element={<ProductItemDetail />}
                  />
                  <Route path={URL.ABOUT} element={<About />} />
                  <Route path={URL.CONTACT} element={<Contact />} />
                  <Route path={URL.BLOG} element={<Blog />} />
                </Route>

                <Route element={<Authentication />}>
                  <Route path="/*" element={<Root />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ConfigProvider>
    </div>
    // <PDFViewer>
    //   <Report />
    // </PDFViewer>
  )
}

export default App
