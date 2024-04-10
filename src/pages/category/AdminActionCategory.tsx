import { userApi } from '@/adapter'
import blogApi from '@/adapter/blog'
import useToken from '@/hook/token'
import { URL } from '@/utils/constants'
import {
  createTimeStampFromMoment,
  renderDateStringDay,
  reverseStringDay,
} from '@/utils/helper'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Button, Col, ConfigProvider, Form, Input, Row } from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
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

  const [content, setContent] = useState<string>()
  const [curAdmin, setCurAdmin]: any = useState()
  const [date, setDate]: any = useState(dayjs())
  const { type, id } = useParams()

  const mutationAdmin = useMutation({
    mutationFn: (params: any) => userApi.getProfile(params),
    onSuccess: (res) => {
      form.setFieldValue('name', res?.data?.data?.[0]?.name)
      form.setFieldValue('email', res?.data?.data?.[0]?.email)
      form.setFieldValue('password', res?.data?.data?.[0]?.password)
      form.setFieldValue('phone', res?.data?.data?.[0]?.phone)
      form.setFieldValue('address', res?.data?.data?.[0]?.address)
      form.setFieldValue('created_by', decode?.name)

      setCurAdmin(res?.data?.data?.[0])
      setDate(
        dayjs(
          `${reverseStringDay(
            renderDateStringDay(res?.data?.data?.[0]?.born, '/')
          )}T00:00:00.000Z`.replaceAll('/', '-')
        )
      )
    },
  })

  useEffect(() => {
    form.setFieldValue('created_by', decode?.name)

    if (type === 'edit' || type === 'view') {
      mutationAdmin.mutate({ userId: id })
    }
  }, [])

  useEffect(() => {
    if (curAdmin?.born?.length > 0) {
      setDate(
        dayjs(
          `${reverseStringDay(
            renderDateStringDay(curAdmin?.born, '/')
          )}T00:00:00.000Z`?.replaceAll('/', '-')
        )
      )
    }
  }, [curAdmin?.born])

  const mutationCreateBlog = useMutation({
    mutationFn: (params: any) => blogApi.create(params),
    onSuccess: () => {
      toast.success('Thêm mới bài viết thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.ADMIN_BLOG)
      }, 2000)
    },

    onError: () => {
      toast.error('Vui lòng nhập đủ thông tin!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateAdmin = useMutation({
    mutationFn: (params: any) => userApi.updateUser(params),
    onSuccess: () => {
      toast.success('Cập nhật admin thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.MANAGE_ADMIN)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateBlog.mutate({
        ...data,
        // id: create_UUID(),
        content,
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateAdmin.mutate({
        ...curAdmin,
        ...data,
        id: curAdmin?.id,
        born: date?.format('DD/MM/YYYY'),
        gender: 0,
        updated_at: createTimeStampFromMoment(moment()),
        update_by: decode?.name,
      })
    }
  }

  return (
    <div className="pt-[30px] px-10 bg-[#e8e6e6] pb-7">
      <ConfigProvider
        theme={{
          token: {
            controlOutline: 'rgba(5, 145, 255, 0.1)',
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
            colorPrimary: 'white',
            colorPrimaryHover: '#d9d9d9',
          },
          components: {
            Input: {
              activeBorderColor: '#1677ff',
              hoverBorderColor: '#4096ff',
              colorTextDisabled: 'gray',
            },
            Select: {
              colorTextDisabled: 'gray',
              controlOutline: '#4096ff',
              controlOutlineWidth: 1,
              optionSelectedBg: '#cde9ff',
              optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            },
            Button: {
              // colorPrimary: 'white',
              colorPrimaryHover: 'white',
            },
            DatePicker: {
              colorTextDisabled: 'gray',
              addonBg: 'green',
              cellRangeBorderColor: 'green',
              cellActiveWithRangeBg: 'green',
              activeBorderColor: '4096ff',
              hoverBorderColor: '#4096ff',
            },
          },
        }}
      >
        <div className="mb-3 text-[30px] text-black-main font-semibold">
          {type === 'create'
            ? 'Thêm bài viết mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin bài viết'
            : 'Chi tiết thông tin bài viết'}
        </div>

        <div className="w-full pb-5 pt-9 flex justify-center bg-white border border-solid rounded border-gray-primary text-black-primary">
          <Form
            initialValues={{ id: decode?.name }}
            form={form}
            onFinish={onFinish}
            className="w-full"
          >
            <Row className="mb-1 mx-10">
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="title"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tiêu đề bài viết
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="content"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Nội dung bài viết
                    </label>
                  }
                >
                  <CKEditor
                    onReady={(editor: any) => {
                      editor.ui
                        .getEditableElement()
                        .parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.getEditableElement()
                        )
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setContent(data)
                    }}
                    editor={DecoupledEditor}
                    data="<p>Hello from CKEditor 5s DecoupledEditor!</p>"
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

export default AdminActionCategory
