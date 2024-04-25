import { userApi } from '@/adapter'
import orderApi from '@/adapter/order'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createTimeStampFromMoment } from '@/utils/helper'
import { Button, Col, ConfigProvider, Form, Input, Row } from 'antd'
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

  const { data: dataOrder = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_ORDER_BY_ID, pathname],
    queryFn: () =>
      orderApi.getOrderById({ orderId: id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

  useEffect(() => {
    if (id) {
      form.setFieldValue('name', dataOrder?.name)
      form.setFieldValue('phone', dataOrder?.phone)
      form.setFieldValue('address', dataOrder?.address)
    }
  }, [dataOrder])

  const mutationUpdateUser = useMutation({
    mutationFn: (params: any) => userApi.updateUser(params),
    onSuccess: () => {
      toast.success('Cập nhật đơn hàng thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_ORDER_LIST)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'edit') {
      mutationUpdateUser.mutate({
        id,
        ...data,
        updated_by: decode?.name,
        updated_at: createTimeStampFromMoment(moment()),
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
            ? 'Thêm đơn hàng mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin đơn hàng'
            : 'Chi tiết thông tin đơn hàng'}
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
                  // initialValue={id && dataOrder?.sale}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '100px' }}>
                      Tên khách hàng
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
                  // initialValue={id && dataOrder?.sale}
                  className="w-ful mb-3"
                  name="phone"
                  label={
                    <label style={{ fontSize: '15x', width: '50px' }}>
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
                  // initialValue={id && dataOrder?.sale}
                  className="w-ful mb-3"
                  name="address"
                  label={
                    <label style={{ fontSize: '15x', width: '100px' }}>
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
              </Col>{' '}
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

export default AdminActionOrder
