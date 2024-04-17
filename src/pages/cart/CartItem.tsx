import { queryClient } from '@/App'
import cartApi from '@/adapter/cart'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { ConfigProvider, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const CartItem = ({
  prd,
  amount,
  name,
  img,
  productId,
  price,
  quantity,
}: // totalMoney,
any) => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const navigate = useNavigate()

  const [form] = useForm()

  const [inputQuantity, setInputQuantity] = useState(quantity)

  // const onAddProductHandler = () => {
  //   const quantity = Number(form.getFieldValue('inputQuantity'))

  //   dispatch(
  //     addProductToCart({ id: prd.id, price: prd.originalPrice, quantity })
  //   )
  // }

  const cartMutation = useMutation({
    mutationFn: (params: any) => cartApi.updateCart(params),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_ALL_CART)
    },
  })

  const handleChangeQuantity = (type: string) => {
    const curQuantity = inputQuantity
    let newQuantity

    if (type === 'decrease') {
      newQuantity = curQuantity > 1 ? curQuantity - 1 : 1
    } else {
      newQuantity = curQuantity + 1
    }

    cartMutation.mutate({
      type: 'update',
      userId: decode?.id,
      productId,
      quantity: newQuantity,
    })

    setInputQuantity(newQuantity)

    // form.setFieldValue('inputQuantity', newQuantity)
  }

  const handleDeleteProduct = () => {
    cartMutation.mutate({
      type: 'remove',
      userId: decode?.id,
      productId,
    })
  }

  const handleViewProductDetail = () => {
    navigate(`${URL.PRODUCT}/${productId}`, { state: { prd } })
  }

  return (
    <div className="cursor-pointer gap-4 flex w-[720px] pl-3 pr-5 py-[22px] border border-solid border-gray-border hover:border-green-main hover:text-green-main rounded-[10px] text-black-primary bg-[#ffffff]">
      <img src={img} alt="img prd" className="w-[58px] h-[58px]" />

      <div className="flex flex-col w-full">
        <div className="flex justify-between tetx-[16px] font-[700]">
          <div onClick={handleViewProductDetail}>{name}</div>
          <div className="text-[#ff1a00]">
            {Number(amount).toLocaleString()} ₫
          </div>
        </div>

        <div className="text-[14px] font-[400] text-[#ff1a00] mb-2">
          Giá: {Number(price).toLocaleString()} ₫
        </div>

        <div className="flex justify-between">
          <div className="flex">
            <div className="cursor-pointer w-[35px] h-[35px] border-[#dee2e6] border-[1px] border-solid rounded-[10px] rounded-r-none flex justify-center items-center text-green-main">
              <MinusOutlined
                style={{ fontSize: '13px', color: '#828282' }}
                onClick={() => handleChangeQuantity('decrease')}
              />
            </div>

            <ConfigProvider theme={{ token: { colorPrimary: '#dee2e6' } }}>
              <Form form={form}>
                <Input
                  className="w-[80px] h-[35px] border-[#dee2e6] border-[1px] border-solid rounded-[10px] rounded-l-none rounded-r-none flex items-center justify-center text-center"
                  value={inputQuantity}
                  onKeyDown={(event) => {
                    const key = event.key
                    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight'] // Các phím cho phép

                    if (!allowedKeys.includes(key) && !/[0-9]/.test(key)) {
                      event.preventDefault()
                    }
                  }}
                />
              </Form>
            </ConfigProvider>

            <div className="cursor-pointer w-[35px] h-[35px] border-[#dee2e6] border-[1px] border-solid rounded-[10px] rounded-l-none flex justify-center items-center text-green-main">
              <PlusOutlined
                style={{ fontSize: '13px', color: '#828282' }}
                onClick={() => handleChangeQuantity('increase')}
              />
            </div>
          </div>
          <div
            className="text-[12px] font-[400] text-[#dc3545] px-[14px] py-[8px] border border-solid border-[#dc3545] rounded-[5px] hover:text-white hover:bg-[#dc3545] cursor-pointer"
            onClick={handleDeleteProduct}
          >
            Xóa
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
