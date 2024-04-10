import bannerLikado from '@/assets/image/likado.png'
import { URL } from '@/utils/constants'
import { Button, ConfigProvider } from 'antd'
import { useNavigate } from 'react-router-dom'
import PaymentListProduct from './PaymentListProduct'

const PaymentSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className="text-[14px] bg-[#f5f5f5] text-black-main min-h-[100vh]">
      <div>
        <img
          src={bannerLikado}
          alt="img"
          className="h-[150px] block mx-auto mb-[-13px]"
        />
      </div>

      <div className="flex justify-between">
        <div className="px-[50px]">
          <div className="flex">
            <div className="h-[100px]">
              <img
                src="https://migrationtrust.com/wp-content/uploads/2020/09/431-4312134_transparent-success-icon-hd-png-download-2-500x320.png"
                alt="icon check"
                className="h-full pl-0 ml-0"
              />
            </div>

            <div className="flex flex-col justify-between py-3 ml-[-20px]">
              <div className="font-[800] text-[18px]">
                Cảm ơn bạn đã đặt hàng
              </div>
              <div>
                <div className="text-[13px]">
                  Một email xác nhận đã được gửi tới cuopbien123a8@gmail.com.
                </div>
                <div className="text-[13px]">
                  Xin vui lòng kiểm tra email của bạn.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7 border border-solid border-gray-borderSecondary ml-[50px] px-4 pt-3 pb-6 mt-5">
            <div className="flex justify-between">
              <div className="w-1/2">
                <div className="font-[600] text-[20px]">Thông tin mua hàng</div>
                <div className="flex flex-col gap-[4px] mt-[6px]">
                  <div>Duong Hau</div>
                  <div>duonghau2706@gmail.com</div>
                  <div>039112345</div>
                </div>
              </div>

              <div className="w-1/2">
                <div className="font-[600] text-[20px]">Địa chỉ nhận hàng</div>
                <div className="mt-[6px]">
                  Xã AA, Huyện BB, Tỉnh CC amamamsnncb amsn asndm anansnm
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2">
                <div className="font-[600] text-[20px]">
                  Phương thức thanh toán
                </div>
                <div>Thanh toán khi giao hàng (COD) </div>
              </div>

              <div className="w-1/2">
                <div className="font-[600] text-[20px]">
                  Phương thức vận chuyển
                </div>
                <div>Giao hàng tận nơi</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mr-[60px] h-full pl-[27px] pr-[10px] w-1/3 flex flex-col justify-center">
          <div className="ml-[-27px] pl-[27px] py-3 flex justify-start items-center text-[18px] font-[900] border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            Đơn hàng #1008 (7)
          </div>
          <div className="pt-[18px] pb-4 pr-1 h-[100px] overflow-y-scroll border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            <PaymentListProduct />
          </div>

          <div className="text-[#717171] font-[500] flex flex-col gap-[10px] pt-5 pb-3 border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            <div className="flex justify-between">
              <div>Tạm tính</div>
              <div>1.346.000₫</div>
            </div>
            <div className="flex justify-between">
              <div>Giảm giá</div>
              <div>0₫</div>
            </div>
            <div className="flex justify-between">
              <div>Phí vận chuyển </div>
              <div>Miễn phí</div>
            </div>
          </div>

          <div className="py-3 font-[500] text-[#717171]">
            <div className="flex justify-between">
              <div className="text-[16px] font-[500]">Tổng cộng</div>
              <div className="text-[21px] text-[#2a9dcc] font-[600]">
                1.346.000₫
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: { colorPrimary: 'white', controlOutline: 'transparent' },
        }}
      >
        <Button
          className="font-Quicksand font-[800] mt-10 bg-[#009b4d] hover:bg-[#007439] px-[28px] py-[24px] text-white flex mx-auto items-center"
          onClick={() => navigate(URL.HOME)}
        >
          Tiếp tục mua hàng
        </Button>
      </ConfigProvider>
    </div>
  )
}

export default PaymentSuccess
