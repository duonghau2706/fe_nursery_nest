import categoryApi from '@/adapter/category'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createTimeStampFromMoment } from '@/utils/helper'
import { Button, Col, ConfigProvider, Form, Input, Row } from 'antd'
import moment from 'moment'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminActionCategory = () => {
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

  const { data: dataCategory = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_CATEGORY_BY_ID, pathname],
    queryFn: () =>
      categoryApi.getCategoryById({ categoryId: id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

  useEffect(() => {
    if (id) {
      form.setFieldValue('name', dataCategory?.name)
    }
  }, [dataCategory])

  const mutationCreateCategory = useMutation({
    mutationFn: (params: any) => categoryApi.createCategory(params),
    onSuccess: () => {
      toast.success('Thêm mới thể loại thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.ADMIN_CATEGORY_LIST)
      }, 2000)
    },

    onError: () => {
      toast.error('Vui lòng nhập đủ thông tin!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateCategory = useMutation({
    mutationFn: (params: any) => categoryApi.updateCategory(params),
    onSuccess: () => {
      toast.success('Cập nhật thể loại thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_CATEGORY_LIST)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateCategory.mutate({
        ...data,
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateCategory.mutate({
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
            ? 'Thêm thể loại mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin thể loại'
            : 'Chi tiết thông tin thể loại'}
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
                  // initialValue={id && dataCategory?.sale}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '75px' }}>
                      Tên thể loại
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

export default AdminActionCategory
