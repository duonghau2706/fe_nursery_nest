import blogApi from '@/adapter/blog'
import { QUERY_KEY } from '@/utils/constants'
import {
  cleanObj,
  createEndDateTimeStampFromMoment,
  createStartDateTimeStampFromMoment,
} from '@/utils/helper'
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Row,
  Select,
} from 'antd'
import { useQuery } from 'react-query'

const { RangePicker } = DatePicker

const FormSearchBlog = ({ onSearchBlog }: any) => {
  const [form] = Form.useForm()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { data: dataBlog } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BLOG],
    queryFn: () =>
      blogApi.getAllBlog().then((res) => {
        return res?.data?.data?.listBlog
      }),
  })

  const optionsTitle: any = []

  dataBlog?.forEach((blog: any) => {
    if (blog?.title)
      optionsTitle.push({
        label: blog?.title,
        value: blog?.title,
      })
  })

  const optionsName: any = []

  dataBlog?.forEach((blog: any) => {
    if (blog?.author) {
      const ele = optionsName.filter(
        (name: any) => name?.value === blog?.author
      )

      if (ele?.length === 0)
        optionsName.push({
          label: blog?.author,
          value: blog?.author,
        })
    }
  })

  const searchBlogHandler = () => {
    const title = form.getFieldValue('title')
    const author = form.getFieldValue('author')
    const startDate =
      form.getFieldValue('dateTime')?.[0] &&
      createStartDateTimeStampFromMoment(form.getFieldValue('dateTime')?.[0])
    const endDate =
      form.getFieldValue('dateTime')?.[1] &&
      createEndDateTimeStampFromMoment(form.getFieldValue('dateTime')?.[1])

    const data = cleanObj({
      title,
      author,
      startDate,
      endDate,
    })

    onSearchBlog(data)
    form.resetFields()
  }

  return (
    <div className="px-8 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
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
        <div className="w-full pb-5 pt-6">
          <Form form={form} className="flex flex-col gap-3">
            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="title"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tiêu đề bài viết
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsTitle}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full pr-6"
                  name="author"
                  label="Người tạo"
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsName}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full pr-6"
                  name="dateTime"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ngày tạo
                    </label>
                  }
                >
                  <RangePicker
                    className="w-[290px]"
                    format={'DD/MM/YYYY'}
                    placeholder={['Từ ngày', 'Đến ngày']}
                  />
                </Form.Item>
              </Col>

              <Col span={12}></Col>
            </Row>
          </Form>
        </div>

        <div className="flex justify-center pt-1 pb-5">
          <Button
            htmlType="submit"
            className="font-semibold w-[120px] flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
            onClick={searchBlogHandler}
          >
            Tìm kiếm
          </Button>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default FormSearchBlog
