import commentApi from '@/adapter/comment'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createDayjsFromDMY, createTimeStampFromMoment } from '@/utils/helper'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminActionComment = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { type, id } = useParams()
  const { pathname } = useLocation()

  const [fileList, setFileList] = useState<UploadFile[]>()

  // const { data: dataAllComment = {} } =
  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COMMENT, pathname],
    queryFn: () =>
      commentApi.getAllComment().then((res: any) => {
        return res?.data?.data
      }),
  })

  const { data: dataComment = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_COMMENT_BY_ID, pathname],
    queryFn: () =>
      commentApi.getCommentById({ commentId: id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

  useEffect(() => {
    if (id) {
      setFileList([
        {
          uid: 'rc-upload-1713762409036-1',
          name: 'name',
          thumbUrl: dataComment?.img,
          percent: 100,
        },
      ])
    }
  }, [dataComment])

  useEffect(() => {
    if (id) {
      form.setFieldValue('name', dataComment?.name)
      form.setFieldValue('email', dataComment?.email)
      form.setFieldValue('password', dataComment?.password)
      form.setFieldValue('phone', dataComment?.phone)
      form.setFieldValue('address', dataComment?.address)
      form.setFieldValue('born', createDayjsFromDMY(dataComment?.born || ''))
    }
  }, [dataComment])

  const mutationCreateUser = useMutation({
    mutationFn: (params: any) => commentApi.createComment(params),
    onSuccess: () => {
      toast.success('Thêm mới bình luận thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.ADMIN_COMMENT_LIST)
      }, 2000)
    },

    onError: () => {
      toast.error('Vui lòng nhập đủ thông tin!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateComment = useMutation({
    mutationFn: (params: any) => commentApi.updateComment(params),
    onSuccess: () => {
      toast.success('Cập nhật bình luận thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_COMMENT_LIST)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateUser.mutate({
        ...data,
        created_by: decode?.name,
        // img,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateComment.mutate({
        ...data,
        id,
        // img,
        updated_at: createTimeStampFromMoment(moment()),
        updated_by: decode?.name,
      })
    }
  }

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList([...fileList])
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  // const optionsProductName: any = []

  //   dataAllComment?.forEach((comment: any) => {
  //     if (comment?.product_name) {
  //       const ele = optionsProductName.filter(
  //         (product_name: any) => product_name?.label === comment?.product_name
  //       )

  //       if (ele?.length === 0)
  //         optionsProductName.push({
  //           label: comment?.product_name,
  //           value: comment?.product_name,
  //         })
  //     }
  //   })

  // const optionsUserName: any = []

  // dataAllComment?.forEach((comment: any) => {
  //   if (comment?.user_name) {
  //     const ele = optionsUserName.filter(
  //       (user_name: any) => user_name?.label === comment?.user_name
  //     )

  //     if (ele?.length === 0)
  //       optionsUserName.push({
  //         label: comment?.user_name,
  //         value: comment?.user_name,
  //       })
  //   }
  // })

  return (
    <div className="pt-[30px] px-10 bg-[#e8e6e6] pb-7 h-full">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'white',
            colorPrimary: '#1677ff',
            colorPrimaryHover: '#1677ff',
            // controlOutline: '#4096ff',
            controlOutlineWidth: 1,
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          },
          components: {
            Input: {
              addonBg: 'red',
              hoverBorderColor: '#4096ff',
              colorTextDisabled: 'black',
            },
            Select: {
              optionSelectedBg: '#cde9ff',
              optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            },
            Button: {
              colorPrimaryHover: 'white',
            },
            DatePicker: {
              activeBorderColor: '#1677ff',
              colorTextDisabled: 'gray',
              addonBg: 'red',
              cellRangeBorderColor: '#7cb3ff',
              cellActiveWithRangeBg: '#e6f4ff',
              cellHoverWithRangeBg: '#c8dfff',
              hoverBorderColor: '#4096ff',
            },
          },
        }}
      >
        <div className="mb-3 text-[30px] text-black-main font-semibold">
          {type === 'create'
            ? 'Thêm bình luận mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin bình luận'
            : 'Chi tiết thông tin bình luận'}
        </div>

        <div className="w-full pb-5 pt-9 flex justify-center bg-white border border-solid rounded border-gray-primary text-black-primary">
          <Form
            // initialValues={{ id: decode?.name }}
            form={form}
            onFinish={onFinish}
            className="w-full"
          >
            <Row className="mb-1 mx-[100px]">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataComment?.sale}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '130px' }}>
                      Tên sản phẩm
                    </label>
                  }
                >
                  {/* <Select
                    allowClear
                    showSearch
                    options={optionsProductName}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  /> */}
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[300px]"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Row className="mb-1 mx-[100px]">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataComment?.sale}
                  className="w-full mb-3"
                  name="email"
                  label={
                    <label style={{ fontSize: '15x', width: '130px' }}>
                      Tên người bình luận
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[300px]"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Row className="mb-1 mx-[100px]">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataComment?.sale}
                  className="w-full mb-3"
                  name="password"
                  label={
                    <label style={{ fontSize: '15x', width: '130px' }}>
                      Ảnh
                    </label>
                  }
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    maxCount={1}
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleChange}
                    disabled={type === 'view'}
                  >
                    {uploadButton}
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={12}></Col>
            </Row>

            <Row className="mb-1 mx-[100px]">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataComment?.sale}
                  className="w-ful mb-3"
                  name="born"
                  label={
                    <label style={{ fontSize: '15x', width: '130px' }}>
                      Bình luận
                    </label>
                  }
                >
                  <TextArea
                    allowClear
                    className="w-[200%]"
                    rows={5}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    disabled={type === 'view'}
                  />
                </Form.Item>
              </Col>

              <Col span={12}></Col>
            </Row>

            <div className="flex gap-2 justify-center mt-5">
              <Button
                className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>

              {(type === 'edit' || type === 'create') && (
                <Button
                  htmlType="submit"
                  className="min-w-[83px] font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
                >
                  {type === 'edit' ? 'Lưu' : 'Thêm mới'}
                </Button>
              )}
            </div>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default AdminActionComment
