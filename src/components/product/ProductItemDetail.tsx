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
import { Interweave } from 'interweave'
import commentApi from '@/adapter/comment'

const ProductItemDetail = () => {
  const navigate = useNavigate()

  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const { state } = useLocation()
  const { prd } = state

  const [form] = useForm()

  const [img, setImg]: any = useState()
  const [cmt, setCmt]: any = useState()
  const [rated, setRated]: any = useState()
  const [isReset, setIsReset] = useState<boolean>(false)

  const { data: dataCart = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CART],
    queryFn: () =>
      cartApi.getAllCart({ userId: decode?.id }).then((res: any) => {
        return res?.data?.data
      }),
  })

  const { data: dataComment = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_COMMENT_BY_PRODUCT_ID, prd],
    queryFn: () =>
      productApi
        .getCommentByProductId({ id: prd?.product_id || prd?.id })
        .then((res) => {
          return res?.data?.data
        }),
  })

  const { data: dataProduct = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, prd],
    queryFn: () =>
      productApi
        .getInfoProductById({ id: prd?.product_id || prd?.id })
        .then((res) => {
          return res?.data?.data
        }),
  })

  // const totalRated = dataComment?.reduce(
  //   (accumulator: any, currentValue: any) => {
  //     // Chuyển đổi rated thành số và cộng vào tổng (accumulator)
  //     return accumulator + Number(currentValue?.rated)
  //   },
  //   0
  // ) // Giá trị khởi tạo của tổng là 0
  const avgRated = dataComment?.avgRated?.[0]?.avg || 0
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

    const idx = dataCart?.carts?.findIndex((item: any) =>
      prd?.product_id
        ? item?.product_id === prd?.product_id
        : item?.product_id === prd?.id
    )

    if (idx === -1) {
      //Chưa có sp trong giỏ hàng -> insert into table value
      cartMutation.mutate({
        type: 'insert',
        id: create_UUID(),
        userId: decode?.id,
        productId: prd?.product_id || prd?.id,
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
        productId: prd?.product_id || prd?.id,
        quantity: dataCart?.carts[idx].quantity + quantity,
      })
    }

    // dispatch(
    //   addProductToCart({ id: prd.id, price: prd.original_price, quantity })
    // )
  }

  const onPaymentHandler = () => {
    const quantity = Number(form.getFieldValue('inputQuantity'))

    const idx = dataCart?.carts?.findIndex((item: any) =>
      prd?.product_id
        ? item?.product_id === prd?.product_id
        : item?.product_id === prd?.id
    )

    if (idx === -1) {
      //Chưa có sp trong giỏ hàng -> insert into table value
      cartMutation.mutate({
        type: 'insert',
        id: create_UUID(),
        userId: decode?.id,
        productId: prd?.product_id || prd?.id,
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
        productId: prd?.product_id || prd?.id,
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

  const mutationComment = useMutation({
    mutationFn: (params: any) => commentApi.createComment(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_COMMENT_BY_PRODUCT_ID])
      toast.success('Thêm bình luận thành công.', {
        autoClose: 1500,
        style: { marginTop: '50px' },
      })
      setImg(undefined)
      setCmt(undefined)
      setRated(undefined)
      setOpenModalFormComment(false)
    },
  })

  const onSave = () => {
    if (!rated) {
      toast.error('Vui lòng chọn sao cho sản phẩm!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      return
    }

    setIsReset(true)
    mutationComment.mutate({
      product_id: prd?.product_id || prd?.id,
      user_id: decode?.id,
      rated,
      content: cmt,
      img: img?.[0]?.thumbUrl,
    })
  }

  const handleChangeComment = (cmt: any) => {
    setCmt(cmt)
  }

  const handleChangeImg = (img: any) => {
    setImg(img)
  }

  const handleChangeRate = (rated: any) => {
    setRated(rated)
  }

  const handlePostComment = () => {
    setOpenModalFormComment(true)
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
            {Number(prd?.original_price).toLocaleString()}₫
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
            <strong>Mô tả: </strong> {dataProduct?.summarize}
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
        <Interweave
          content={dataProduct?.description}
          className="ck-editor w-full"
        />
      </div>

      <div className="bg-white pl-9 pr-[40px] py-5 rounded-[10px] font-[900] text-[22px]">
        <div className="flex justify-between">
          <div className="text-[24px] text-black-primary">Đánh giá</div>
          <div
            className="flex gap-2 bg-blue-secondary px-[10px] py-1 border-[1px] border-solid cursor-pointer"
            onClick={handlePostComment}
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
            {avgRated > 0 ? (
              <div className="text-[#525252] flex pb-1 items-baseline">
                <div className="text-[36px]">{Number(avgRated).toFixed(1)}</div>
                <div className="flex text-[14px] font-[400] gap-[3px]">
                  <div>/5</div>
                  <div>·</div>
                  <div>{lstCommnet?.length || 0} đánh giá</div>
                </div>
              </div>
            ) : (
              <div className=" text-[#525252] flex pb-0 items-center text-[18px]">
                Chưa có đánh giá nào
              </div>
            )}
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
                isReset={isReset}
              />
            }
            header={
              <HeaderModalComment
                handleChangeRate={handleChangeRate}
                isReset={isReset}
              />
            }
            footer={true}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductItemDetail
