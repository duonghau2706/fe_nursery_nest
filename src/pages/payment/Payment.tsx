import { LeftOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Radio, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import PaymentListProduct from './PaymentListProduct'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUERY_KEY, URL } from '@/utils/constants'
import { useQuery } from 'react-query'
import cartApi from '@/adapter/cart'
import useToken from '@/hook/token'
import { useForm } from 'antd/es/form/Form'
// import axios from 'axios'

const Payment = () => {
  const navigate = useNavigate()

  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const [form] = useForm()

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
  //   )

  //   console.log('ressss', res?.data)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // console.log('data', data)

  const data = [
    {
      id: '01',
      name: 'Hà Nộiii',
      district: [
        {
          id: '001',
          name: 'Nam Từ Liêm',
          ward: [{ id: '0001', name: 'Mỹ Đình 2' }],
        },
      ],
    },
    {
      id: '02',
      name: 'Nam Định',
      district: [
        { id: '001', name: 'Huyện ND', ward: [{ id: '001', name: 'Xã ND' }] },
      ],
    },
  ]

  const [selectedProvince, setSelectedProvince] = useState<{
    label: string
    value: string
  }>()

  const [selectedDistrict, setSelectedDistrict] = useState<{
    label: string
    value: string
  }>()

  const [selectedWard, setSelectedWard] = useState<{
    label: string
    value: string
  }>()

  const provinces = data.map((province: any) => {
    return { label: province.name, value: province.id }
  })

  const [districts, setDistricts] = useState<any>()
  const [wards, setWards] = useState<any>()

  const selectProvinceHandler = (value: any, province: any) => {
    setSelectedProvince(province)
  }

  const selectDistrictHandler = (value: any, district: any) => {
    setSelectedDistrict(district)
  }

  const selectWardHandler = (value: any, ward: any) => {
    setSelectedWard(ward)
  }

  useEffect(() => {
    setSelectedDistrict(undefined)
    setSelectedDistrict(undefined)

    const curProvince: any = data.filter(
      (p) => p.id === selectedProvince?.value
    )

    setDistricts(
      curProvince?.[0]?.district?.map((d: any) => {
        return { label: d.name, value: d.id }
      })
    )
  }, [selectedProvince])

  useEffect(() => {
    setSelectedWard(undefined)

    const curP: any = data?.filter((p) => p?.id === selectedProvince?.value)
    const curD: any = curP?.[0]?.district.filter(
      (d: any) => d?.id === selectedDistrict?.value
    )

    setWards(
      curD?.[0]?.ward?.map((w: any) => {
        return { label: w.name, value: w.id }
      })
    )
  }, [selectedDistrict])

  const { data: dataCart = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CART],
    queryFn: () =>
      cartApi.getAllCart({ userId: decode?.id }).then((res: any) => {
        return res?.data?.data
      }),
  })

  const total = dataCart?.totalMoney?.[0]?.totalMoney

  return (
    <div className="bg-white text-black-primary text-[14px] flex justify-between pl-[60px] pr-5">
      <div className="w-2/3 pb-8">
        <img
          src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/353672737_257697366846138_1682770389796949429_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHhE33SEkIz5FwM78Y1chwummrbAKoz-jSaatsAqjP6NLEObJZPuzaLXa7OTr31Xvtd7hWcF_TB4STaGjl0H5Qf&_nc_ohc=21lkytWOeowAb6_iSkY&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBtQtBVa6IpNFofj6vsMaETP-VOQ1H0mASTlsYUY8c1Zw&oe=66146F34"
          alt="img"
          className="h-[150px] block mx-auto mb-[-13px]"
        />
        <Form form={form} className="font-Quicksand">
          <div className="flex justify-between gap-7 pr-9">
            <div className="w-1/2">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[18px] font-[800]">
                  Thông tin nhận hàng
                </div>
                <div className="flex gap-[2px] cursor-pointer">
                  <i
                    className="fa fa-sign-out text-[#2a9dcc] "
                    style={{ fontSize: '20px' }}
                  ></i>
                  <div className="text-[#2a9dcc] font-[600] ">Đăng xuất</div>
                </div>
              </div>

              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">Email</div>
                <Form.Item name={'inputEmail'} initialValue={decode?.email}>
                  <Input className="border-none p-0 " />
                </Form.Item>
              </div>

              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">
                  Họ và tên
                </div>
                <Form.Item name={'inputName'} initialValue={decode?.name}>
                  <Input value={'Dương Hậu'} className="border-none p-0" />
                </Form.Item>
              </div>

              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <Form.Item name={'inputPhone'} initialValue={decode?.phone}>
                  <Input
                    placeholder={'Số điện thoại (tùy chọn)'}
                    className="border-none p-0 placeholder:text-[#999]"
                  />
                </Form.Item>
              </div>

              {/* TINHHHHHHHHHHHHHHHHHHHHH */}
              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">
                  Tỉnh thành
                </div>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#d9d9d9',
                    },
                  }}
                >
                  <Select
                    variant="borderless"
                    className="w-[106%] relative left-[-11px]"
                    options={provinces}
                    onChange={selectProvinceHandler}
                    value={selectedProvince}
                  />
                </ConfigProvider>
              </div>

              {/* HUYENNNNNNNNNNNN */}
              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">
                  Quận huyện (tùy chọn)
                </div>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#d9d9d9',
                    },
                  }}
                >
                  <Select
                    variant="borderless"
                    className="w-[106%] relative left-[-11px]"
                    options={districts}
                    onChange={selectDistrictHandler}
                    value={selectedDistrict}
                  />
                </ConfigProvider>
              </div>

              {/* XAAAAAAAAAAAA */}
              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">
                  Xã (tùy chọn)
                </div>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#d9d9d9',
                    },
                  }}
                >
                  <Select
                    variant="borderless"
                    className="w-[106%] relative left-[-11px]"
                    options={wards}
                    onChange={selectWardHandler}
                    value={selectedWard}
                  />
                </ConfigProvider>
              </div>

              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <Input
                  placeholder={'Địa chỉ (tùy chọn)'}
                  className="border-none p-0 placeholder:text-[#999]"
                />
              </div>

              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#d9d9d9',
                  },
                }}
              >
                <TextArea
                  placeholder="Ghi chú (tùy chọn)"
                  rows={2}
                  className="placeholder:text-[#999]"
                />
              </ConfigProvider>
            </div>

            <div className="flex flex-col gap-[36px] w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-[18px] font-[800]">Vận chuyển</div>
                <div className="bg-[#d1ecf1] px-[20px] py-[12px] font-[500] rounded-[5px]">
                  Vui lòng nhập thông tin giao hàng
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-[18px] font-[800]">Thanh toán</div>
                <div className="flex justify-between">
                  <div className="w-full flex justify-between border border-solid border-[#D9D9D9] px-[20px] py-[12px] font-[500] rounded-[5px]">
                    <div className="flex">
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: '#1677ff',
                          },
                        }}
                      >
                        <Radio />
                      </ConfigProvider>
                      <div>Thanh toán khi giao hàng (COD)</div>
                    </div>
                    <i
                      className="fa fa-money text-[#1990c6] my-auto"
                      style={{ fontSize: '24px' }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className=" h-full pl-[27px] pr-[10px] w-1/3 flex flex-col justify-center border-[1px] border-solid border-gray-borderSecondary border-y-0 border-r-0">
        <div className="ml-[-27px] pl-[27px] py-4 flex justify-start items-center text-[18px] font-[900] border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
          Đơn hàng ({Number(dataCart?.carts?.length).toLocaleString()} sản phẩm)
        </div>
        <div className="pt-[24px] pb-4 pr-1 h-[100px] overflow-y-scroll border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
          <PaymentListProduct lstPrd={dataCart?.carts} />
        </div>
        <div className="flex justify-between pt-4 pb-5 border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
          <ConfigProvider
            theme={{
              token: { colorPrimary: '#01921d', controlOutline: 'transparent' },
            }}
          >
            <Input
              className="w-[250px] h-[44px] border-[#dee2e6] border-[1px] border-solid rounded-[5px] flex items-center placeholder:text-gray-account placeholder:font-Quicksand"
              placeholder="Nhập mã giảm giá"
            />
          </ConfigProvider>

          <ConfigProvider
            theme={{
              token: { colorPrimary: 'white', controlOutline: 'transparent' },
            }}
          >
            <Button className="opacity-[.6] bg-[#009b4d] hover:bg-[#007439] w-[100px] h-[44px] text-white">
              Áp dụng
            </Button>
          </ConfigProvider>
        </div>

        <div className="text-[#717171] font-[500] flex flex-col gap-[10px] pt-5 pb-3 border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
          <div className="flex justify-between">
            <div>Tạm tính</div>
            <div>{Number(total).toLocaleString()} ₫</div>
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
            <div className="text-[21px] text-[#2a9dcc] font-[600]">₫</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div
            className="flex gap-[2px] text-[#2a9dcc] hover:text-[#2a6395] cursor-pointer"
            onClick={() => navigate(URL.CART)}
          >
            <LeftOutlined style={{ fontSize: '12px', fontWeight: '600' }} />
            <div className="flex items-center font-[600] text-[14px]">
              Quay về giỏ hàng
            </div>
          </div>

          <ConfigProvider
            theme={{
              token: { colorPrimary: 'white', controlOutline: 'transparent' },
            }}
          >
            <Button
              className="bg-[#009b4d] hover:bg-[#007439] w-[121px] h-[44px] text-white uppercase font-[500]"
              onClick={() => navigate(URL.THANKYOU)}
            >
              Đặt hàng
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default Payment
