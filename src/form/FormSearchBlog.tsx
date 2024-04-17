import { URL } from '@/utils/constants'
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Row,
  Select,
} from 'antd'
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

const FormSearchBlog = ({ onSearchAdmin, dataBlog }: any) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const optionsName = dataBlog?.map((blog: any) => {
    return {
      label: blog?.title,
      value: blog?.id,
    }
  })

  const searchAdminHandler = () => {
    onSearchAdmin(form.getFieldsValue())
    form.resetFields()
    navigate(URL.MANAGE_ADMIN)
  }

  return (
    <div className="px-8 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'white',
            colorPrimary: 'white',
            colorPrimaryHover: '#d9d9d9',
            controlOutline: '#4096ff',
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
          },
        }}
      >
        <div className="w-full pb-5 pt-6">
          <Form form={form} className="flex flex-col gap-3">
            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tên tiêu đề bài viết
                    </label>
                  }
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
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full pr-6"
                  name="dateTime"
                  label="Thời gian"
                >
                  <RangePicker
                    className="w-full"
                    format={'DD/MM/YYYY'}
                    placeholder={['Từ ngày', 'Đến ngày']}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="flex justify-center pt-1 pb-5">
          <Button
            className="font-semibold w-[120px] flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
            onClick={searchAdminHandler}
          >
            Tìm kiếm
          </Button>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default FormSearchBlog
