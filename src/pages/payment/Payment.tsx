import cartApi from '@/adapter/cart'
import discountApi from '@/adapter/discount'
import orderApi from '@/adapter/order'
import orderDetailApi from '@/adapter/orderDetail'
import logoLikado from '@/assets/image/logoLikado.png'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import {
  cleanObj,
  createTimeStampFromMoment,
  create_ORDER_CODE,
  create_UUID,
  renderFullrAdress,
  renderInputBank,
} from '@/utils/helper'
import { CreditCardOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, Radio, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PaymentListProduct from './PaymentListProduct'

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
// import axios from 'axios'

import bankHdb from '@/assets/image/bank_Hdb.jpg'
import bankMbb from '@/assets/image/bank_Mbb.png'
import bankAgrb from '@/assets/image/bank_agrb.jpg'
import bankBidv from '@/assets/image/bank_bidv.jpg'
import bankGpb from '@/assets/image/bank_gpb.png'
import bankLvpb from '@/assets/image/bank_lvpb.jpg'
import bankScb from '@/assets/image/bank_scb.jpg'
import bankShb from '@/assets/image/bank_shb.png'
import bankTcb from '@/assets/image/bank_tcb.png'
import bankTpb from '@/assets/image/bank_tpb.jpg'
import bankVcb from '@/assets/image/bank_vcb.png'
import bankVib from '@/assets/image/bank_vib.png'
import bankVpb from '@/assets/image/bank_vpb.png'
import bankVtb from '@/assets/image/bank_vtb.jpg'
import selectedBank from '@/assets/image/selected_bank.jpg'

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
  const [index, setIndex]: any = useState()
  const [continuee, setContinuee] = useState<boolean>()
  const [discountId, setDiscountId] = useState<boolean>()

  // const [isNextStep, setIsNextStep] = useState(false)
  const [selected, setSelected]: any = useState({
    idx0: false,
    idx1: false,
    idx2: false,
    idx3: false,
    idx4: false,
    idx5: false,
    idx6: false,
    idx7: false,
    idx8: false,
    idx9: false,
    idx10: false,
    idx11: false,
    idx12: false,
    idx13: false,
  })

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

  const [methodPayment, setMethodPayment]: any = useState()

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

      setDiscountId(res?.data?.data?.[0]?.id)
      setSale(SALE)
    },
  })

  const orderDetailMutation = useMutation({
    mutationFn: (params: any) => orderDetailApi.create(params),
    onSuccess: (res) => {
      // cartMutation.mutate({ userId: decode?.id })
      navigate(URL.THANKYOU, {
        state: {
          orderId: res?.data?.data?.orderId,
          paymentMethod:
            methodPayment === 0
              ? 'Thanh toán khi giao hàng (COD)'
              : 'Thanh toán qua tài khoản ngân hàng',
        },
      })
    },
  })

  const orderMutation = useMutation({
    mutationFn: (params: any) => orderApi.create(params),
    onSuccess: (res) => {
      dataCart?.carts?.map((prd: any) => {
        const dataOrderDetailMutate = {
          id: create_UUID(),
          orderId: res?.data?.data?.orderId,
          productId: prd?.product_id,
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
    const method = methodPayment
    // const discountId = dataOrder?.inputDiscount
    const province = selectedProvince?.label
    const district = selectedDistrict?.label
    const ward = selectedWard?.label
    const address = dataOrder?.inputAddress
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
      payment_method:
        method === 0
          ? 'Thanh toán khi giao hàng (COD)'
          : 'Thanh toán qua tài khoản ngân hàng',
      name,
      phone,
      totalMoney,
      statusMoney: methodPayment === 1 ? 1 : 0,
      statusShip: 0,
      discountId,
      province,
      district,
      ward,
      address,
      full_address: renderFullrAdress(address, ward, district, province),
      originalTotalMoney,
      sale: saleMutation,
      ship,
      note,
      createdAt: createTimeStampFromMoment(moment()),
      updatedAt: createTimeStampFromMoment(moment()),
    })

    orderMutation.mutate(dataOrderMutate)
  }

  const methodPaymentOptions = [
    { label: 'Thanh toán khi giao hàng (COD)', value: 0 },
    { label: 'Thanh toán qua tài khoản ngân hàng', value: 1 },
  ]

  const handleChangeMethodPayment = (e: any) => {
    setMethodPayment(e?.target?.value)
    setContinuee(false)
  }

  const handleItemClick = (index: any) => {
    setIndex(index)
    setSelected((prevSelected: any) => {
      // Tạo một bản sao mới của trạng thái trước đó
      const newSelected = { ...prevSelected }

      // Đặt giá trị mới cho chỉ mục được click, và đặt tất cả các giá trị khác thành false
      Object.keys(newSelected).forEach((key) => {
        newSelected[key] = key === `idx${index}`
      })

      return newSelected
    })
  }

  const handleContinue = () => {
    setContinuee(true)
  }

  return (
    <Form form={form} className="font-Quicksand">
      <div className="min-h-[100vh] bg-white text-black-primary text-[14px] flex justify-between pl-[60px] pr-5">
        <div className="w-2/3 pb-8">
          {methodPayment === 1 && !continuee ? (
            <div className="flex flex-col">
              <div
                style={{ borderBottom: '2px solid #e6e6e684' }}
                className="mt-5 ml-3 mr-6 flex pl-5 py-3 gap-2 bg-[#e6e6e684]"
              >
                <CreditCardOutlined />
                <div className=" font-bold">Thẻ ATM</div>
              </div>

              <div className="bg-white px-3 pt-[15px] pb-10 flex flex-wrap gap-[10px]">
                <div
                  style={{
                    border: selected.idx0
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 py-6 rounded"
                  onClick={() => handleItemClick(0)}
                >
                  <img className="w-full h-full" src={bankVcb} alt="vcb" />
                  {selected.idx0 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx1
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] py-1 rounded"
                  onClick={() => handleItemClick(1)}
                >
                  <img className="w-full h-full" src={bankTcb} alt="vcb" />
                  {selected.idx1 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx2
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-4 py-8 rounded"
                  onClick={() => handleItemClick(2)}
                >
                  <img className="w-full h-full" src={bankTpb} alt="vcb" />
                  {selected.idx2 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx3
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-4 py-8 rounded"
                  onClick={() => handleItemClick(3)}
                >
                  <img className="w-full h-full" src={bankVtb} alt="vcb" />
                  {selected.idx3 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx4
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-4 py-8 rounded"
                  onClick={() => handleItemClick(4)}
                >
                  <img className="w-full h-full" src={bankVib} alt="vcb" />
                  {selected.idx4 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx5
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 py-6 rounded"
                  onClick={() => handleItemClick(5)}
                >
                  <img className="w-full h-full" src={bankHdb} alt="vcb" />
                  {selected.idx5 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx6
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-4 py-2 rounded"
                  onClick={() => handleItemClick(6)}
                >
                  <img className="w-full h-full" src={bankAgrb} alt="vcb" />
                  {selected.idx6 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx7
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] rounded"
                  onClick={() => handleItemClick(7)}
                >
                  <img className="w-full h-full" src={bankBidv} alt="vcb" />
                  {selected.idx7 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx8
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 py-6 rounded"
                  onClick={() => handleItemClick(8)}
                >
                  <img className="w-full h-full" src={bankMbb} alt="vcb" />
                  {selected.idx8 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx9
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 rounded"
                  onClick={() => handleItemClick(9)}
                >
                  <img className="w-full h-full" src={bankScb} alt="vcb" />
                  {selected.idx9 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx10
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 py-6 rounded"
                  onClick={() => handleItemClick(10)}
                >
                  <img className="w-full h-full" src={bankShb} alt="vcb" />
                  {selected.idx10 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx11
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 pt-6 pb-8 rounded"
                  onClick={() => handleItemClick(11)}
                >
                  <img className="w-full h-full" src={bankVpb} alt="vcb" />
                  {selected.idx11 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx12
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-2 py-2 rounded"
                  onClick={() => handleItemClick(12)}
                >
                  <img className="w-full h-full" src={bankLvpb} alt="vcb" />
                  {selected.idx12 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>

                <div
                  style={{
                    border: selected.idx13
                      ? '2px solid #139E1C'
                      : '1px solid #b3b3b3ba',
                  }}
                  className="relative w-[180px] h-[100px] px-6 pt-6 pb-8 rounded"
                  onClick={() => handleItemClick(13)}
                >
                  <img className="w-full h-full" src={bankGpb} alt="vcb" />
                  {selected.idx13 && (
                    <img
                      className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                      src={selectedBank}
                      alt="selectedBank"
                    />
                  )}
                </div>
              </div>

              <div className="flex w-full justify-center gap-3 mb-2">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: 'white',
                    },
                  }}
                >
                  <Button
                    style={{ border: '2px solid #A7A9AA' }}
                    className="w-[200px] bg-white justify-center text-[#A7A9AA] border-none text-[15px] px-[30px] py-[22px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-[#f04135]"
                    onClick={() => setMethodPayment(undefined)}
                  >
                    QUAY LẠI
                  </Button>
                </ConfigProvider>

                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: 'white',
                    },
                  }}
                >
                  <Button
                    className="w-[200px] bg-[#0B783D] justify-center text-white border-none text-[15px] px-[30px] py-[22px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-[#0b8d48]"
                    onClick={handleContinue}
                  >
                    TIẾP TỤC
                  </Button>
                </ConfigProvider>
              </div>
            </div>
          ) : (
            <>
              <img
                src={logoLikado}
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
                    <div className="text-[#999] mb-[-7px] text-[13px]">
                      Email
                    </div>
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
                      <Form.Item
                        name={'inputEmail'}
                        initialValue={decode?.email}
                      >
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
                    <Form.Item name={'inputAddress'}>
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

                <div className="flex flex-col gap-[16px] w-1/2">
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
                      <div className="w-full flex justify-between">
                        <div className="w-full flex flex-col">
                          <ConfigProvider
                            theme={{ token: { colorPrimary: '#1677ff' } }}
                          >
                            <Radio.Group
                              className="w-full flex flex-col gap-[8px]"
                              // options={methodPaymentOptions}
                              value={methodPayment}
                              onChange={handleChangeMethodPayment}
                            >
                              {methodPaymentOptions.map((option) => (
                                <Radio
                                  key={option.value}
                                  value={option.value}
                                  className={
                                    continuee
                                      ? 'w-full border border-solid border-[#D9D9D9] px-[20px] py-[14px] font-[500] rounded-[5px]'
                                      : 'w-full border border-solid border-[#D9D9D9] px-[20px] py-[14px] font-[500] rounded-[5px]'
                                  }
                                >
                                  {option.label}
                                </Radio>
                              ))}
                            </Radio.Group>
                          </ConfigProvider>
                          {continuee && (
                            <div className="flex flex-col gap-2 w-full mt-2">
                              <Form.Item name="bankName">
                                <div
                                  style={{ border: '1px solid #d9d9d9' }}
                                  className="flex rounded-[5px] pl-1 pr-3 py-3 bg-gray-disable"
                                >
                                  <Input
                                    className="text-[14px] border-none placeholder:text-[14px] placeholder:font-semibold"
                                    placeholder="Ngân hàng"
                                    style={{
                                      backgroundColor: '#ebebeb',
                                      color: '#a8a7a7',
                                    }}
                                    value={renderInputBank(index)}
                                    disabled
                                  />
                                  <div className="flex items-center my-auto h-full">
                                    <AccountBalanceOutlinedIcon
                                      style={{
                                        fontSize: '26px',
                                      }}
                                    />
                                  </div>
                                </div>
                              </Form.Item>

                              <div
                                style={{ border: '1px solid #d9d9d9' }}
                                className="flex rounded-[5px] pl-1 pr-3 py-3 justify-between"
                              >
                                <Form.Item
                                  name="bankAccount"
                                  className="w-full"
                                >
                                  <Input
                                    className="text-[14px] w-full border-none placeholder:text-[14px] placeholder:font-semibold"
                                    placeholder="Số thẻ"
                                  />
                                </Form.Item>
                                <div className="flex items-center my-auto h-full">
                                  <CreditCardOutlined
                                    style={{
                                      fontSize: '26px',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Form> */}
            </>
          )}
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
