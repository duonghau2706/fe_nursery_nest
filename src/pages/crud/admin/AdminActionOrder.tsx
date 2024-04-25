import { userApi } from '@/adapter'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createDayjsFromDMY, createTimeStampFromMoment } from '@/utils/helper'
import { Button, Col, ConfigProvider, DatePicker, Form, Input, Row } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminActionOrder = () => {
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

  const { data: dataUser = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_BY_ID, pathname],
    queryFn: () =>
      userApi.getUserById({ userId: id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

  useEffect(() => {
    if (id) {
      form.setFieldValue('name', dataUser?.name)
      form.setFieldValue('email', dataUser?.email)
      form.setFieldValue('password', dataUser?.password)
      form.setFieldValue('phone', dataUser?.phone)
      form.setFieldValue('address', dataUser?.address)
      form.setFieldValue('born', createDayjsFromDMY(dataUser?.born || ''))
    }
  }, [dataUser])

  const mutationCreateUser = useMutation({
    mutationFn: (params: any) => userApi.createUser(params),
    onSuccess: () => {
      toast.success('Thêm mới người dùng thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.ADMIN_USER_LIST)
      }, 2000)
    },

    onError: () => {
      toast.error('Vui lòng nhập đủ thông tin!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateUser = useMutation({
    mutationFn: (params: any) => userApi.updateUser(params),
    onSuccess: () => {
      toast.success('Cập nhật người dùng thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_USER_LIST)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateUser.mutate({
        ...data,
        born: dayjs(data?.born).format('DD/MM/YYYY'),
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateUser.mutate({
        id,
        ...data,
        born: dayjs(data?.born).format('DD/MM/YYYY'),
        updated_at: createTimeStampFromMoment(moment()),
        updated_by: decode?.name,
      })
    }
  }

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
            ? 'Thêm người dùng mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin người dùng'
            : 'Chi tiết thông tin người dùng'}
        </div>

        <div className="w-full pb-5 pt-9 flex justify-center bg-white border border-solid rounded border-gray-primary text-black-primary">
          <Form
            // initialValues={{ id: decode?.name }}
            form={form}
            onFinish={onFinish}
            className="w-full"
          >
            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataUser?.sale}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      Tên
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

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataUser?.sale}
                  className="w-ful mb-3"
                  name="email"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      Email
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
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataUser?.sale}
                  className="w-ful mb-3"
                  name="password"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      Mật khẩu
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

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataUser?.sale}
                  className="w-ful mb-3"
                  name="phone"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      SĐT
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
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataUser?.sale}
                  className="w-ful mb-3"
                  name="born"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      Ngày sinh
                    </label>
                  }
                >
                  <DatePicker
                    className="w-[300px]"
                    disabled={type === 'view'}
                    format={'DD/MM/YYYY'}
                    placeholder={'Chọn ngày'}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataUser?.sale}
                  className="w-ful mb-3"
                  name="address"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      Địa chỉ
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

export default AdminActionOrder
