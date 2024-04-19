import blogApi from '@/adapter/blog'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { createTimeStampFromMoment } from '@/utils/helper'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  GetProp,
  Input,
  Row,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const AdminActionBlog = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const [content, setContent] = useState<string>()
  const { type, id } = useParams()

  const { data: dataBlog = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_BLOG_BY_ID],
    queryFn: () =>
      blogApi.getById({ blogId: id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

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

  const mutationUpdateBlog = useMutation({
    mutationFn: (params: any) => blogApi.updateBlog(params),
    onSuccess: () => {
      toast.success('Cập nhật bài viết thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_BLOG)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()
    // console.log('dât', data)

    if (type === 'create') {
      mutationCreateBlog.mutate({
        ...data,
        // id: create_UUID(),
        title: data?.title,
        author: data?.name,
        content,
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateBlog.mutate({
        // ...curAdmin,
        ...data,
        id,
        content,
        updated_at: createTimeStampFromMoment(moment()),
        update_by: decode?.name,
      })
    }
  }
  // const [previewImage, setPreviewImage] = useState('')
  // const [previewOpen, setPreviewOpen] = useState(false)
  // const [loading, setLoading] = useState(false)
  // const [imageUrl, setImageUrl] = useState<string>()
  const [fileList, setFileList] = useState<UploadFile[]>()

  // const getBase64 = (img: FileType, callback: (url: string) => void) => {
  //   const reader = new FileReader()
  //   reader.addEventListener('load', () => callback(reader.result as string))
  //   reader.readAsDataURL(img)
  // }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange: UploadProps['onChange'] = ({
    // file,
    fileList: newFileList,
    // event,
  }) => {
    // if (info.file.status === 'uploading') {
    //   setLoading(true)
    //   return
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as FileType, (url) => {
    //     setLoading(false)
    //     setImageUrl(url)
    //   })

    // console.log('file', file)
    // console.log('file list', newFileList)
    // console.log('event', event)

    setFileList(newFileList)
    // }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {false ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  // const customRequest = ({ file }: any) => {
  //   setFileList([file])

  //   console.log('file', file)
  // }

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
              activeBorderColor: '#4096ff',
              hoverBorderColor: '#4096ff',
            },
            Upload: {
              colorPrimary: '#4096ff',
              // colorPrimary: 'red',
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
                  initialValue={id && dataBlog?.title}
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
                  initialValue={id && dataBlog?.author}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Người đăng
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
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ảnh bài viết
                    </label>
                  }
                >
                  <Upload
                    name="avatar"
                    action="http://localhost:3000/api/v1/blog/upload"
                    listType="picture-card"
                    maxCount={1}
                    fileList={fileList}
                    // showUploadList={false}
                    // customRequest={customRequest}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {false ? (
                      <img
                        // src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>

                  {/* {previewImage && (
                    <Image
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )} */}
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
                    data={dataBlog?.content}
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

export default AdminActionBlog
