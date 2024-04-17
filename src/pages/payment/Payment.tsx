import { LeftOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Radio, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import PaymentListProduct from './PaymentListProduct'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUERY_KEY, URL } from '@/utils/constants'
import { useMutation, useQuery } from 'react-query'
import cartApi from '@/adapter/cart'
import useToken from '@/hook/token'
import { useForm } from 'antd/es/form/Form'
import axios from 'axios'
import {
  cleanObj,
  createTimeStampFromMoment,
  create_ORDER_CODE,
  create_UUID,
} from '@/utils/helper'
import discountApi from '@/adapter/discount'
import { toast } from 'react-toastify'
import moment from 'moment'
import orderApi from '@/adapter/order'
import orderDetailApi from '@/adapter/orderDetail'
// import axios from 'axios'

const Payment = () => {
  const navigate = useNavigate()

  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const [form] = useForm()

  const [dataCountry, setDataCountry]: any = useState()
  const [districts, setDistricts] = useState<any>()
  const [wards, setWards] = useState<any>()
  const [sale, setSale] = useState(0)
  const [ship, setShip] = useState(0)
  const [msgSale, setMsgSale] = useState<string>()

  const fetchData = async () => {
    const res = await axios.get(
      'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
    )

    setDataCountry(res?.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const provinces = dataCountry?.map((province: any) => {
    return { label: province.Name, value: province.Id }
  })

  const selectProvinceHandler = (value: any, province: any) => {
    if (value === '01') {
      setShip(20000)
    } else {
      setShip(30000)
    }
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
    setSelectedWard(undefined)

    const curProvince: any = dataCountry?.filter(
      (p: any) => p.Id === selectedProvince?.value
    )

    setDistricts(
      curProvince?.[0]?.Districts?.map((d: any) => {
        return { label: d.Name, value: d.Id }
      })
    )
  }, [selectedProvince])

  useEffect(() => {
    setSelectedWard(undefined)

    const curP: any = dataCountry?.filter(
      (p: any) => p?.Id === selectedProvince?.value
    )
    const curD: any = curP?.[0]?.Districts?.filter(
      (d: any) => d?.Id === selectedDistrict?.value
    )

    setWards(
      curD?.[0]?.Wards?.map((w: any) => {
        return { label: w.Name, value: w.Id }
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

  const handleLogInOut = () => {
    if (decode?.id) {
      localStorage.removeItem('token')
    } else {
      navigate(URL.LOGIN)
    }
  }

  const discountMutation = useMutation({
    mutationFn: (params: any) => discountApi.getDiscountByCode(params),
    onSuccess: (res) => {
      const SALE = Number(res?.data?.data?.[0]?.sale) * 100 || 0
      if (res?.data?.data?.length > 0) {
        setMsgSale(`Áp dụng mã giảm giá thành công!`)
      } else {
        setMsgSale(`Mã giảm giá không tồn tại!`)
      }

      setSale(SALE)
    },
  })

  const orderDetailMutation = useMutation({
    mutationFn: (params: any) => orderDetailApi.create(params),
    onSuccess: (res) => {
      navigate(URL.THANKYOU, { state: { orderId: res?.data?.data?.orderId } })
    },
  })

  const orderMutation = useMutation({
    mutationFn: (params: any) => orderApi.create(params),
    onSuccess: (res) => {
      // setOrderId(res?.data?.data?.orderId)

      dataCart?.carts?.map((prd: any) => {
        const dataOrderDetailMutate = {
          id: create_UUID(),
          orderId: res?.data?.data?.orderId,
          productId: prd?.productId,
          quantity: prd?.quantity,
          createdAt: res?.data?.data?.createdAt,
          updatedAt: res?.data?.data?.updatedAt,
        }

        orderDetailMutation.mutate(dataOrderDetailMutate)
      })
    },
  })

  const handleAddCodeDiscount = () => {
    discountMutation.mutate({ code: form.getFieldValue('inputDiscount') })
  }

  const handleOrder = () => {
    const dataOrder = form.getFieldsValue()
    const discountId = dataOrder?.inputDiscount
    const province = selectedProvince?.label
    const district = selectedDistrict?.label
    const ward = selectedWard?.label
    const adress = dataOrder?.inputAdress
    const name = dataOrder?.inputName
    const phone = dataOrder?.inputPhone
    const ship = selectedProvince?.value === '01' ? 20000 : 30000
    const note = dataOrder?.inputNote
    const saleMutation = sale / 100
    const originalTotalMoney = Number(total)
    const totalMoney = (originalTotalMoney * (100 - sale)) / 100 + ship

    if (!name || !phone || !province) {
      toast.error('Bạn phải điền đầy đủ thông tin giao hàng.', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      return
    }

    const dataOrderMutate = cleanObj({
      id: create_UUID(),
      orderCode: create_ORDER_CODE(),
      userId: decode?.id,
      name,
      phone,
      totalMoney,
      statusMoney: 0,
      statusShip: 0,
      discountId,
      province,
      district,
      ward,
      adress,
      originalTotalMoney,
      sale: saleMutation,
      ship,
      note,
      createdAt: createTimeStampFromMoment(moment()),
      updatedAt: createTimeStampFromMoment(moment()),
    })

    orderMutation.mutate(dataOrderMutate)
  }

  return (
    <Form form={form} className="font-Quicksand">
      <div className="bg-white text-black-primary text-[14px] flex justify-between pl-[60px] pr-5">
        <div className="w-2/3 pb-8">
          <img
            src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/353672737_257697366846138_1682770389796949429_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHhE33SEkIz5FwM78Y1chwummrbAKoz-jSaatsAqjP6NLEObJZPuzaLXa7OTr31Xvtd7hWcF_TB4STaGjl0H5Qf&_nc_ohc=21lkytWOeowAb6_iSkY&_nc_ht=scontent.fhan19-1.fna&oh=00_AfBtQtBVa6IpNFofj6vsMaETP-VOQ1H0mASTlsYUY8c1Zw&oe=66146F34"
            alt="img"
            className="h-[150px] block mx-auto mb-[-13px]"
          />
          {/* <Form form={form} className="font-Quicksand"> */}
          <div className="flex justify-between gap-7 pr-9">
            <div className="w-1/2">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[18px] font-[800]">
                  Thông tin nhận hàng
                </div>
                <div
                  className="flex gap-[2px] cursor-pointer"
                  onClick={handleLogInOut}
                >
                  {decode?.id ? (
                    <i
                      className="fa fa-sign-out text-[#2a9dcc] "
                      style={{ fontSize: '20px' }}
                    />
                  ) : (
                    <i
                      className="fa fa-user-circle text-[#2a9dcc] "
                      style={{ fontSize: '20px' }}
                    />
                  )}
                  <div className="text-[#2a9dcc] font-[600] ">
                    {decode?.id ? 'Đăng xuất' : 'Đăng nhập'}
                  </div>
                </div>
              </div>

              <div className="bg-gray-inputDisable border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">Email</div>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        colorPrimary: 'transparent',
                        colorBgContainerDisabled: '#000000a',
                      },
                    },
                  }}
                >
                  <Form.Item name={'inputEmail'} initialValue={decode?.email}>
                    <Input
                      disabled
                      className="hover:bg-transparent bg-transparent border-none p-0 font-Quicksand font-[500]"
                    />
                  </Form.Item>
                </ConfigProvider>
              </div>

              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <div className="text-[#999] mb-[-7px] text-[13px]">
                  Họ và tên
                </div>
                <Form.Item name={'inputName'} initialValue={decode?.name}>
                  <Input className="border-none p-0 font-Quicksand font-[500]" />
                </Form.Item>
              </div>

              <div className="border border-solid border-gray-borderSecondary rounded-[5px] px-3 py-[6px] mb-3">
                <Form.Item name={'inputPhone'} initialValue={decode?.phone}>
                  <Input
                    placeholder={'Số điện thoại (tùy chọn)'}
                    className="border-none p-0 placeholder:text-[#999] font-Quicksand font-[500]"
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
                <Form.Item name={'inputAdress'}>
                  <Input
                    placeholder={'Địa chỉ (tùy chọn)'}
                    className="border-none p-0 placeholder:text-[#999]"
                  />
                </Form.Item>
              </div>

              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#d9d9d9',
                  },
                }}
              >
                <Form.Item name={'inputNote'}>
                  <TextArea
                    placeholder="Ghi chú (tùy chọn)"
                    rows={2}
                    className="placeholder:text-[#999]"
                  />
                </Form.Item>
              </ConfigProvider>
            </div>

            <div className="flex flex-col gap-[36px] w-1/2">
              <div className="flex flex-col gap-2">
                <div className="text-[18px] font-[800]">Vận chuyển</div>
                {selectedProvince ? (
                  <div className="flex flex-col gap-2">
                    <div
                      className={
                        selectedProvince?.value === '01'
                          ? 'flex justify-between'
                          : 'flex justify-between bg-[#0000000a]'
                      }
                    >
                      <div className="w-full flex justify-between border border-solid border-[#D9D9D9] px-[20px] py-[12px] font-[500] rounded-[5px]">
                        <div className="flex">
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary: '#1677ff',
                              },
                            }}
                          >
                            <Radio
                              checked={selectedProvince?.value === '01'}
                              disabled={selectedProvince?.value !== '01'}
                            />
                          </ConfigProvider>
                          <div>Nội thành Hà Nội</div>
                        </div>
                        <div>20.000 ₫</div>
                      </div>
                    </div>

                    <div
                      className={
                        selectedProvince?.value === '01'
                          ? 'flex justify-between bg-gray-inputDisable'
                          : 'flex justify-between'
                      }
                    >
                      <div className="w-full flex justify-between border border-solid border-[#D9D9D9] px-[20px] py-[12px] font-[500] rounded-[5px]">
                        <div className="flex">
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary: '#1677ff',
                              },
                              components: {
                                Radio: {
                                  colorBgContainerDisabled:
                                    selectedProvince?.value === '01'
                                      ? '#0000000a'
                                      : 'transparent',
                                },
                              },
                            }}
                          >
                            <Radio
                              checked={selectedProvince?.value !== '01'}
                              disabled={selectedProvince?.value === '01'}
                            />
                          </ConfigProvider>
                          <div>Các tỉnh thành khác</div>
                        </div>
                        <div>30.000 ₫</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#d1ecf1] px-[20px] py-[12px] font-[500] rounded-[5px]">
                    Vui lòng nhập thông tin giao hàng
                  </div>
                )}
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
          {/* </Form> */}
        </div>

        <div className=" h-full pl-[27px] pr-[10px] w-1/3 flex flex-col justify-center border-[1px] border-solid border-gray-borderSecondary border-y-0 border-r-0">
          <div className="ml-[-27px] pl-[27px] py-4 flex justify-start items-center text-[18px] font-[900] border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            Đơn hàng ({Number(dataCart?.carts?.length).toLocaleString()} sản
            phẩm)
          </div>
          <div className="pt-[24px] pb-4 pr-1 h-[100px] overflow-y-scroll border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            <PaymentListProduct lstPrd={dataCart?.carts} />
          </div>
          <div className="flex flex-col gap-1 pt-4 pb-0 border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            <div className="flex justify-between">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#01921d',
                    controlOutline: 'transparent',
                  },
                }}
              >
                {/* <Form form={form}> */}
                <Form.Item name={'inputDiscount'}>
                  <Input
                    className="w-[250px] h-[44px] border-[#dee2e6] border-[1px] border-solid rounded-[5px] flex items-center placeholder:text-gray-account placeholder:font-Quicksand"
                    placeholder="Nhập mã giảm giá"
                  />
                </Form.Item>
                {/* </Form> */}
              </ConfigProvider>

              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: 'white',
                    controlOutline: 'transparent',
                  },
                }}
              >
                <Button
                  className="opacity-[.6] bg-[#009b4d] hover:bg-[#007439] w-[100px] h-[44px] text-white"
                  onClick={handleAddCodeDiscount}
                >
                  Áp dụng
                </Button>
              </ConfigProvider>
            </div>

            <div
              className={
                Number(sale) > 0
                  ? 'text-green-main py-1 pb-2 my-0 min-h-[8px] font-[600]'
                  : 'text-red-delete py-1 pb-2 my-0 min-h-[8px] font-[600]'
              }
            >
              {msgSale}
            </div>
          </div>

          <div className="text-[#717171] font-[500] flex flex-col gap-[10px] pt-5 pb-3 border-[1px] border-solid border-gray-borderSecondary border-x-0 border-t-0">
            <div className="flex justify-between">
              <div>Tạm tính</div>
              <div>{Number(total).toLocaleString()} ₫</div>
            </div>
            <div className="flex justify-between">
              <div className=" flex gap-1">
                <div>Giảm giá</div>
                <div className="text-green-main">
                  {Number(sale) > 0 && `(-${sale}%)`}
                </div>
              </div>
              <div>
                -{' '}
                {Number((Number(sale) * Number(total)) / 100).toLocaleString()}{' '}
                ₫
              </div>
            </div>
            <div className="flex justify-between">
              <div>Phí vận chuyển </div>
              <div>{Number(ship).toLocaleString()} ₫</div>
            </div>
          </div>

          <div className="py-3 font-[500] text-[#717171]">
            <div className="flex justify-between">
              <div className="text-[16px] font-[500]">Tổng cộng</div>
              <div className="text-[21px] text-[#2a9dcc] font-[600]">
                {Number((total * (100 - sale)) / 100 + ship).toLocaleString()} ₫
              </div>
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
                onClick={handleOrder}
              >
                Đặt hàng
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default Payment
