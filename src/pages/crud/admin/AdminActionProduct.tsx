import { productApi } from '@/adapter'
import categoryApi from '@/adapter/category'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createTimeStampFromMoment } from '@/utils/helper'
import { PlusOutlined } from '@ant-design/icons'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminActionProduct = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [content, setContent] = useState<string>()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { type, id } = useParams()
  const { pathname } = useLocation()

  const [fileList, setFileList] = useState<UploadFile[]>()

  const { data: dataProduct = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, pathname],
    queryFn: () =>
      productApi.getInfoProductById({ id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

  const { data: dataCategory } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CATEGORIES],
    queryFn: () =>
      categoryApi.getAllCategories().then((res) => {
        return res?.data?.data?.listCategory
      }),
  })

  const optionsCategory = dataCategory?.map((category: any) => {
    return {
      label: category?.name,
      value: category?.id,
    }
  })

  useEffect(() => {
    if (id) {
      const cate = dataCategory?.filter(
        (cate: any) => cate?.id === dataProduct?.category_id
      )

      form.setFieldValue('name', dataProduct?.name)
      form.setFieldValue('category_id', {
        label: cate?.[0]?.name,
        value: cate?.[0]?.id,
      })
      form.setFieldValue('summarize', dataProduct?.summarize)
      form.setFieldValue('originalPrice', dataProduct?.original_price)
      setFileList([
        {
          uid: 'rc-upload-1713762409036-1',
          name: 'name',
          thumbUrl: dataProduct?.img,
          percent: 100,
        },
      ])
    }
  }, [dataProduct])

  const mutationCreateProduct = useMutation({
    mutationFn: (params: any) => productApi.createProduct(params),
    onSuccess: () => {
      toast.success('Thêm mới sản phẩm thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.ADMIN_PRODUCT_LIST)
      }, 2000)
    },

    onError: () => {
      toast.error('Vui lòng nhập đủ thông tin!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateProduct = useMutation({
    mutationFn: (params: any) => productApi.updateProduct(params),
    onSuccess: () => {
      toast.success('Cập nhật sản phẩm thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_PRODUCT_LIST)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()
    if (type === 'create') {
      mutationCreateProduct.mutate({
        ...data,
        img: fileList?.[0]?.thumbUrl,
        description: content,
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateProduct.mutate({
        id,
        ...data,
        img: fileList?.[0]?.thumbUrl,
        description: content,
        updated_by: decode?.name,
        updated_at: createTimeStampFromMoment(moment()),
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
            ? 'Thêm sản phẩm mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin sản phẩm'
            : 'Chi tiết thông tin sản phẩm'}
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
                  // initialValue={id && dataProduct?.sale}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '90px' }}>
                      Tên sản phẩm
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
                  // initialValue={id && dataProduct?.sale}
                  className="w-[405px] mb-3"
                  name="category_id"
                  label={
                    <label style={{ fontSize: '15x', width: '90px' }}>
                      Thể loại
                    </label>
                  }
                >
                  <Select
                    disabled={type === 'view' ? true : false}
                    allowClear
                    showSearch
                    options={optionsCategory}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataProduct?.sale}
                  className="w-ful mb-3"
                  name="summarize"
                  label={
                    <label style={{ fontSize: '15x', width: '90px' }}>
                      Tóm tắt
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
                  // initialValue={id && dataProduct?.sale}
                  className="w-ful mb-3"
                  name="originalPrice"
                  label={
                    <label style={{ fontSize: '15x', width: '90px' }}>
                      Giá tiền
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
                  className="w-ful mb-3"
                  name="img"
                  label={
                    <label style={{ fontSize: '15x', width: '90px' }}>
                      Ảnh sản phẩm
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

            <Row className="mb-1 mx-10">
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  className="w-[950px] mb-3 relative left-[-45px]"
                  name="description"
                  label={
                    <label style={{ fontSize: '15x', width: '50px' }}>
                      Mô tả
                    </label>
                  }
                >
                  <CKEditor
                    // config={config}
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
                    data={id && (dataProduct?.description || '')}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={12} /> */}
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

export default AdminActionProduct
