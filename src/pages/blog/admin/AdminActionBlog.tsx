import blogApi from '@/adapter/blog'
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
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminActionBlog = () => {
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

  const [content, setContent] = useState<string>()
  const [fileList, setFileList] = useState<UploadFile[]>()

  const { data: dataBlog = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_BLOG_BY_ID, pathname],
    queryFn: () =>
      blogApi.getById({ blogId: id }).then((res: any) => {
        return res?.data?.data
      }),
    enabled: !!id, //Phải có id
  })

  useEffect(() => {
    if (id) {
      form.setFieldValue('author', dataBlog?.author),
        form.setFieldValue('title', dataBlog?.title)

      setFileList([
        {
          uid: 'rc-upload-1713762409036-1',
          name: 'name',
          thumbUrl: dataBlog?.img,
          percent: 100,
        },
      ])
    }
  }, [dataBlog])

  const mutationCreateBlog = useMutation({
    mutationFn: (params: any) => blogApi.create(params),
    onSuccess: () => {
      toast.success('Thêm mới bài viết thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.ADMIN_BLOG_LIST)
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
        navigate(URL.ADMIN_BLOG_LIST)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateBlog.mutate({
        ...data,
        // id: create_UUID(),
        img: fileList?.[0]?.thumbUrl,
        title: data?.title,
        author: data?.author,
        content,
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateBlog.mutate({
        ...data,
        id,
        img: fileList?.[0]?.thumbUrl,
        title: data?.title,
        author: data?.author,
        content,
        updated_at: createTimeStampFromMoment(moment()),
        update_by: decode?.name,
      })
    }
  }

  const handleChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    // if (info.file.status === 'uploading') {
    //   setLoading(true)
    //   return
    // }
    if (file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(file.originFileObj as FileType, (url) => {
      //   // setLoading(false)
      //   console.log('url', url)
      //   setImageUrl(url)
      // })
    }

    setFileList([...newFileList])
    // }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  // const customRequest = ({ file, fileList }: any) => {
  //   // setFileList([file])
  //   // setFileList([...fileList])
  //   mutationUploadBlog.mutate({ file: { ...file } })
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
            // initialValues={{ id: decode?.name }}
            form={form}
            onFinish={onFinish}
            className="w-full"
          >
            <Row className="mb-1 mx-10">
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  // initialValue={id && dataBlog?.title}
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
                  // initialValue={id && dataBlog?.author}
                  className="w-ful mb-3"
                  name="author"
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
                  name="blog"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ảnh bài viết
                    </label>
                  }
                >
                  <Upload
                    name="avatar"
                    // action="http://localhost:3000/api/v1/blog/upload"
                    listType="picture-card"
                    maxCount={1}
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleChange}
                    disabled={type === 'view'}
                  >
                    {uploadButton}
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
                    data={id && dataBlog?.content}
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
