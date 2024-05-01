/* eslint-disable no-unused-vars */
import { URL } from '@/utils/constants'
import { Button, ConfigProvider, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

// import useInput from '@/hook/use-input'
import { useMutation } from 'react-query'

import { loginApi } from '@/adapter'
import { toast } from 'react-toastify'

/* eslint-disable no-template-curly-in-string */
// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//   },
// }
// const windowProps = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=800, height=800`

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  // const [showMessage, setShowMessage] = useState('')

  const mutationLogin = useMutation({
    mutationFn: (params: any) => loginApi.postLogin(params),
    onSuccess: (res) => {
      if (!res.data.token.token) {
        return
      }

      localStorage.setItem('token', res?.data?.token.token)
      res.data.token.token && res.data.token?.existedUser?.role === 1
        ? navigate(URL.ADMIN_HOME)
        : navigate(URL.HOME)
    },
    onError: () => {
      toast.error('Tài khoản hoặc mật khẩu không đúng.')
    },
  })

  // const { data } = useQuery({
  //   queryKey: [QUERY_KEY.LOGIN, enteredAccount, enteredPass],
  //   queryFn: () => {
  //     loginApi
  //       .postLogin({ email: enteredAccount, passsword: enteredPass })
  //       .then((res) => {
  //         console.log('res', res)
  //         return res
  //       })
  //   },
  // })

  // const onChange = (e: CheckboxChangeEvent) => {
  //   // console.log(`checked = ${e.target.checked}`)
  // }

  const handlerLogin = () => {
    mutationLogin.mutate({
      email: form.getFieldValue('email'),
      password: form.getFieldValue('password'),
    })
  }

  return (
    <div
      className="bg-auto relative flex items-center"
      style={{
        background: `linear-gradient(to bottom, rgba(1, 146, 29, 1) 0%, rgba(139, 227, 54, 1) 100%)`,
      }}
      //   style={{
      //     background: `linear-gradient(to top,
      //   rgba(0, 0, 0, 0.25) 0%,
      //   rgba(0, 0, 0, 0.5) 100%), repeating-linear-gradient(to bottom,
      //   rgba(0, 0, 0, 0.25) 0%,
      //   rgba(0, 0, 0, 0.5) 100%),
      // url(${bgHome})`,
      //   }}
    >
      <div
        className=" mx-auto w-2/5 rounded-[10px] text-[#ffffff] my-5"
        style={{
          border: '1px solid rgba(255,255,255,0.5)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          boxShadow: '0px 25px 45px rgba(0,0,0,0.1)',
        }}
      >
        <div className="px-8 py-5 text-center">
          <div className="text-[28px] mb-2 font-QuicksandBold">Đăng nhập</div>
          <div className="text-[13px] mb-3">
            Trang chủ / Đăng nhập tài khoản
          </div>

          <Form form={form}>
            <div
              className="border-[2px] solid border-[red] mb-4 mx-2"
              style={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.05)' }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorText: 'white',
                  },
                  components: {
                    Input: {
                      activeBg: '#ffffff33',
                    },
                  },
                }}
              >
                <Form.Item name="email">
                  <Input
                    size="large"
                    placeholder="Email"
                    className="h-[42px] rounded-[20px] px-5 placeholder:text-[#ffffff] bg-[#ffffff33] border-none hover:bg-[#ffffff33]"
                    style={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.05)' }}
                  />
                </Form.Item>
              </ConfigProvider>
            </div>
            <div
              className="border-[2px] solid border-[red] mb-4 mx-2"
              style={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.05)' }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorText: 'white',
                  },
                  components: {
                    Input: {
                      activeBg: '#ffffff33',
                    },
                  },
                }}
              >
                <Form.Item name="password">
                  <Input
                    type="password"
                    size="large"
                    placeholder="Mật khẩu"
                    className="h-[42px] rounded-[20px] px-5 placeholder:text-[#ffffff] bg-[#ffffff33] border-none hover:bg-[#ffffff33]"
                    style={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.05)' }}
                  />
                </Form.Item>
              </ConfigProvider>
            </div>
          </Form>

          <div className="flex justify-between pb-3 mt-1 mx-2">
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainerDisabled: 'red',
                  colorPrimaryHover: 'black',
                },
              }}
            >
              <Button className="flex h-[43px] rounded-[30px] border-none hover:bg-[#ffd000] bg-[#FFCC00] ">
                <div
                  className="text-[17px] h-full flex items-center font-semibold text-[#ffffff]"
                  onClick={handlerLogin}
                >
                  Đăng nhập
                </div>
              </Button>
            </ConfigProvider>

            <div className="font-QuicksandBold flex items-center">
              Quên mật khẩu?
            </div>
          </div>

          <div className="h-[1px] bg-[#ffffff] my-5"></div>

          <div>
            <div className="text-[28px] mb-2 font-QuicksandBold">Đăng ký</div>
            <div className="px-2 py-2 border-[1px] border-white border-solid rounded-[5px]">
              Tạo tài khoản để quản lý đơn hàng, và các thông tin thanh toán,
              gửi hàng một cách đơn giản hơn.
            </div>
            <div className="mt-3">
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainerDisabled: 'red',
                    colorPrimaryHover: 'black',
                  },
                }}
              >
                <Button
                  onClick={() => navigate(URL.REGISTER)}
                  className="flex h-[43px] rounded-[30px] border-none hover:bg-[#ffd000] bg-[#A0E17A] w-full justify-center mt-2"
                >
                  <div className="text-[17px] h-full flex items-center font-semibold text-[#ffffff]">
                    Tạo tài khoản
                  </div>
                </Button>

                <Button
                  onClick={() => navigate(URL.HOME)}
                  className="flex h-[43px] rounded-[30px] border-none hover:bg-[#ffd000] bg-[#A0E17A] w-full justify-center mt-2"
                >
                  <div className="text-[17px] h-full flex items-center font-semibold text-[#ffffff]">
                    Quay về trang chủ
                  </div>
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
