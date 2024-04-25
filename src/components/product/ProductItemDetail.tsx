import iconCart from '@/assets/image/cart.svg'
import iconSend from '@/assets/image/icon-send.png'
import iconStar from '@/assets/image/star.svg'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
// import { Comment } from '@material-ui/icons'
import { queryClient } from '@/App'
import { productApi } from '@/adapter'
import cartApi from '@/adapter/cart'
import FormComment from '@/form/FormComment'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createTimeStampFromMoment, create_UUID } from '@/utils/helper'
import { Button, ConfigProvider, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Comment from '../comment/Comment'
import HeaderModalComment from '../modal/ModalComment/HeaderModalComment'
import ModalComment from '../modal/ModalComment/ModalComment'

const ProductItemDetail = () => {
  const navigate = useNavigate()

  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const { state } = useLocation()
  const { prd } = state

  const [form] = useForm()

  // const [img, setImg]: any = useState()
  // const [cmt, setCmt]: any = useState()

  const { data: dataCart = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CART],
    queryFn: () =>
      cartApi.getAllCart({ userId: decode?.id }).then((res: any) => {
        return res?.data?.data
      }),
  })

  const { data: dataComment = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_COMMENT_BY_PRODUCT_ID],
    queryFn: () =>
      productApi.getCommentByProductId({ id: prd?.id }).then((res) => {
        return res?.data?.data
      }),
  })

  const avgRated = dataComment?.avgRated?.[0]?.avg | 0
  const lstCommnet = dataComment?.lstCmt

  const [openModalFormComment, setOpenModalFormComment] = useState(false)

  const cartMutation = useMutation({
    mutationFn: (params: any) => cartApi.updateCart(params),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_ALL_CART)
      toast.success('Thêm sản phẩm vào giỏ hàng thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const onAddProductHandler = () => {
    const quantity = Number(form.getFieldValue('inputQuantity'))

    const idx = dataCart?.carts?.findIndex(
      (item: any) => item?.productId === prd?.id
    )

    if (idx === -1) {
      //Chưa có sp trong giỏ hàng -> insert into table value
      cartMutation.mutate({
        type: 'insert',
        id: create_UUID(),
        userId: decode?.id,
        productId: prd.id,
        quantity,
        createdBy: decode?.name,
        createAt: createTimeStampFromMoment(moment()),
        updatedAt: createTimeStampFromMoment(moment()),
      })
    } else {
      //Đã có sp trong giỏ hàng -> update column set value
      cartMutation.mutate({
        type: 'update',
        userId: decode?.id,
        productId: prd.id,
        quantity: dataCart?.carts[idx].quantity + quantity,
      })
    }

    // dispatch(
    //   addProductToCart({ id: prd.id, price: prd.originalPrice, quantity })
    // )
  }

  const onPaymentHandler = () => {
    const quantity = Number(form.getFieldValue('inputQuantity'))

    const idx = dataCart?.carts?.findIndex(
      (item: any) => item?.productId === prd?.id
    )

    if (idx === -1) {
      //Chưa có sp trong giỏ hàng -> insert into table value
      cartMutation.mutate({
        type: 'insert',
        id: create_UUID(),
        userId: decode?.id,
        productId: prd.id,
        quantity,
        createdBy: decode?.name,
        createAt: createTimeStampFromMoment(moment()),
        updatedAt: createTimeStampFromMoment(moment()),
      })
    } else {
      //Đã có sp trong giỏ hàng -> update column set value
      cartMutation.mutate({
        type: 'update',
        userId: decode?.id,
        productId: prd.id,
        quantity: dataCart?.carts[idx].quantity + quantity,
      })
    }

    setTimeout(() => {
      navigate(URL.PAYMENT)
    }, 2000)
  }

  const handleChangeQuantity = (type: string) => {
    const curQuantity = Number(form.getFieldValue('inputQuantity'))
    let newQuantity

    if (type === 'decrease') {
      newQuantity = curQuantity > 1 ? curQuantity - 1 : 1
    } else {
      newQuantity = curQuantity + 1
    }

    form.setFieldValue('inputQuantity', newQuantity)
  }

  const onSave = () => {
    // console.log('cmt', cmt)
    // console.log('img', img)
  }

  // const handleChangeComment = (cmt: any) => {
  //   setCmt(cmt)
  // }

  // const handleChangeImg = (img: any) => {
  //   setImg(img)
  // }

  const handleChangeComment = () => {
    return
  }

  const handleChangeImg = () => {
    return
  }

  return (
    <div className="text-black-nur flex flex-col gap-5 px-[75px] py-5">
      <div className="flex bg-white pr-3 py-5 rounded-[10px] gap-5">
        <img
          src={prd.img}
          alt="img product"
          className="w-[452px] h-[452px] object-cover"
        />
        <div>
          <div className="font-[800] text-[22px]">{prd.name}</div>
          <div className="text-[30px] font-[700] text-green-main my-3">
            {Number(prd.originalPrice).toLocaleString()}₫
          </div>
          <div
            style={{
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              textAlign: 'justify',
            }}
          >
            <strong>Mô tả: </strong> KHĂN LAU MẶT DÙNG 1 LẦN LIKADO DÙNG CHO SPA
            DẠNG TÚI RÚT - Khăn lau mặt dùng 1 lần likado cotton mềm mịn chuyên
            dùng cho các spa, thẩm mỹ viện làm đẹp, sử dụng 1 lần là giải pháp
            tối ưu khi không còn cảm giác thô ráp, ẩmmmm aiaaaai ajsnanj mm
          </div>
          <div className="flex mt-5 mb-10 gap-2">
            <strong className="mr-7">Số lượng:</strong>
            <div
              className="cursor-pointer w-[38px] h-[38px] border-[#dee2e6] border-[1px] border-solid rounded-[10px] flex justify-center items-center text-green-main hover:border-green-main"
              onClick={() => handleChangeQuantity('decrease')}
            >
              <MinusOutlined />
            </div>

            <ConfigProvider theme={{ token: { colorPrimary: '#dee2e6' } }}>
              <Form form={form}>
                <Form.Item name="inputQuantity" initialValue={'1'}>
                  <Input
                    className="justify-center text-center w-[80px] h-[38px] border-[#dee2e6] border-[1px] border-solid rounded-[10px] flex items-center"
                    // onChange={onChangeQuantityHandler}
                    onKeyDown={(event) => {
                      const key = event.key
                      const allowedKeys = [
                        'Backspace',
                        'ArrowLeft',
                        'ArrowRight',
                      ] // Các phím cho phép

                      if (!allowedKeys.includes(key) && !/[0-9]/.test(key)) {
                        event.preventDefault()
                      }
                    }}
                  />
                </Form.Item>
              </Form>
            </ConfigProvider>

            <div
              className="cursor-pointer w-[38px] h-[38px] border-[#dee2e6] border-[1px] border-solid rounded-[10px] flex justify-center items-center text-green-main hover:border-green-main"
              onClick={() => handleChangeQuantity('increase')}
            >
              <PlusOutlined />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              className="text-white bg-green-main font-[800] flex gap-2  font-Quicksand pl-[14px] pr-[18px] py-[23px] items-center rounded-[8px] text-[16px] hover:bg-green-primary"
              onClick={onAddProductHandler}
            >
              <img
                src={iconCart}
                alt="icon"
                className="h-[25px] object-cover"
              />
              <div>THÊM VÀO GIỎ</div>
            </Button>

            <Button
              className="w-[200px] justify-center text-white bg-[#ed3d7f] font-[800] flex gap-2  font-Quicksand pl-[14px] pr-[18px] py-[23px] items-center rounded-[8px] text-[16px] hover:bg-[#f54787]"
              onClick={onPaymentHandler}
            >
              MUA NGAY
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white pl-9 pr-[40px] py-5 rounded-[10px] text-[15px]">
        <div className="mb-2">
          KHĂN LAU MẶT DÙNG 1 LẦN LIKADO DÙNG CHO SPA DẠNG TÚI RÚT
        </div>
        - Khăn lau mặt dùng 1 lần likado cotton mềm mịn chuyên dùng cho các spa,
        thẩm mỹ viện làm đẹp, sử dụng 1 lần là giải pháp tối ưu khi không còn
        cảm giác thô ráp, ẩm mốc và mùi khó chịu.
        <br /> - Khăn lau mặt dùng 1 lần likado có chất liệu vải không dệt thành
        phần 100% xơ Viscose từ thiên nhiên nên thấm nước tuyệt đối và mềm mịn.
        <br /> - Khăn lau mặt dùng 1 lần likado đã được kiểm định an toàn ở cấp
        độ cao nhất, có thể dùng cho trẻ nhỏ dưới 36 tháng tuổi.
        <div>
          <img src={prd.img} alt="icon cart" className="mt-4 w-full" />
        </div>
        THÔNG TIN KHĂN LAU MẶT DÙNG 1 LẦN LIKADO
        <br /> - Kích thước khăn: 20x20 cm
        <br /> - Thành phần: vải không dệt thành phần 100% xơ Viscose từ thiên
        nhiên
        <br /> - Quy cách đóng gói: Khăn lau mặt dùng 1 lần likado được thiết kế
        dạng túi rút tiện lợi
        <br /> - Số lượng: 1túi.
        <br /> - Công dụng: Khăn lau mặt dùng 1 lần likado dùng làm khăn lau
        mặt, vệ sinh cá nhân tẩy trang, vệ sinh cho bé, vệ sinh dụng cụ thiết bị
        trong gia đình,...
        <br /> - Khăn lau mặt dùng 1 lần likado có thể dùng khô hoặc dùng ướt.
        SHOP KHÔNG ĐỌC TIN NHẮN HAY GHI CHÚ KHI ĐÓNG HÀNG NÊN NHỮNG LỖI SAI NÀY
        SHOP KHÔNG CHỊU TRÁCH NHIỆM LIKADO CAM KẾT VỚI KHÁCH HÀNG
        <br /> ☛ Về sản phẩm: Khăn lau mặt dùng 1 lần likado là hàng chính hãng,
        đảm bảo uy tín và chất lượng
        <br /> ☛ Về dịch vụ: Shop sẽ trả lời mọi thắc mắc của khách hàng liên
        quan đến khăn lau mặt dùng 1 lần likado. Nếu các mẹ băn khoăn về khăn
        lau mặt dùng 1 lần likado nên chat tư vấn trước khi đặt hàng tránh đặt
        nhầm phân loại .
        <br /> ☛ Thời gian chuẩn bị hàng: Shop luôn sẵn hàng nên thời gian chuẩn
        bị hàng nhanh nhất . QUYỀN LỢI CỦA KHÁCH HÀNG
        <br /> ✔ Chính sách đổi trả hàng miễn phí khi có lỗi do nhà sản xuất
        <br /> #khanmatkho #khanmatkhodanang #khanlaumatkho #khanmatkhodung1lan
        #khanlaumat1lan #khanlaumat1lannhatban
        #khanlaumat1lanspa#khanlaumat1lanchobe #khanlaumat1lanlikado
        #khanlaumat1lancuon #khanlaumat1landangrut
        #khanlaumat1lancoboc#khanlaumatkhodung1lan #khanlaumatdung1lanlikado
        #khanlaumatkho #khanlaumatmotlan #khangiaylaumatspa
        #khanlaumatdung1lantrongspa #khanlaumatdung1lan
        #khanlaumatdung1landangnen #khanmatdung1lan #khandung1lan
        #khandung1lanlaumat
      </div>

      <div className="bg-white pl-9 pr-[40px] py-5 rounded-[10px] font-[900] text-[22px]">
        <div className="flex justify-between">
          <div className="text-[24px] text-black-primary">Đánh giá</div>
          <div
            className="flex gap-2 bg-blue-secondary px-[10px] py-1 border-[1px] border-solid cursor-pointer"
            onClick={() => setOpenModalFormComment(true)}
          >
            <img
              src={iconSend}
              alt="icon send"
              className="w-[25px] h-[25px] flex items-center text-white"
              color="white"
              style={{ color: 'white', fill: 'white', filter: 'white' }}
            />
            <div className="flex items-center  text-white font-[500] text-[14px]">
              Viết đánh giá
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-[6px] mb-[-4px]">
            <div className="flex items-center">
              <img
                src={iconStar}
                alt="icon star"
                className="w-[36px] h-[36px] text-red-500 fill-red-500"
              />
            </div>
            <div className="text-[#525252] flex pb-0 items-baseline">
              <div className="text-[36px]">{avgRated}</div>
              <div className="flex text-[14px] font-[400] gap-[3px]">
                <div>/5</div>
                <div>·</div>
                <div>{lstCommnet?.length || 0} đánh giá</div>
              </div>
            </div>
          </div>

          {lstCommnet?.map((cmt: any) => (
            <Comment
              createdAt={cmt?.created_at}
              content={cmt?.content}
              name={cmt?.name}
              rated={cmt?.rated}
              img={cmt?.img}
            />
          ))}

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'white',
              },
              components: {
                Pagination: {
                  itemSize: 43,
                  itemActiveBg: 'red',
                },
              },
            }}
          >
            {/* <Pagination
              className="w-full flex justify-center mt-5"
              total={10}
              current={1}
              pageSize={6}
              style={{ fontSize: '18px' }}
              // onChange={setCurrentPageListUser}
              // showTotal={showTotal}
            /> */}
          </ConfigProvider>

          <ModalComment
            isOpen={openModalFormComment}
            setIsOpen={setOpenModalFormComment}
            onSave={onSave}
            content={
              <FormComment
                handleChangeComment={handleChangeComment}
                handleChangeImg={handleChangeImg}
              />
            }
            header={<HeaderModalComment />}
            footer={true}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductItemDetail
