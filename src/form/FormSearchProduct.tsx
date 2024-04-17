import { productApi } from '@/adapter'
import categoryApi from '@/adapter/category'
import { QUERY_KEY, URL } from '@/utils/constants'
import { Button, Col, ConfigProvider, Form, Row, Select } from 'antd'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const FormSearchProduct = ({ onSearchAdmin }: any) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { data: dataProduct = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PRODUCT],
    queryFn: async () => {
      return await productApi.getAllProduct().then((res) => {
        return res?.data?.data?.all
      })
    },
  })

  const { data: dataCategories = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CATEGORIES],
    queryFn: async () => {
      return await categoryApi.getAllCategories().then((res) => {
        return res?.data?.data
      })
    },
  })

  const optionsName = dataProduct?.map((product: any) => {
    return {
      label: product?.name,
      value: product?.id,
    }
  })

  const optionsCategories = dataCategories?.map((category: any) => {
    return {
      label: category?.name,
      value: category?.id,
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
                      Tên sản phẩm
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
                  name="category"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Thể loại
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsCategories}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  ></Select>
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

export default FormSearchProduct
