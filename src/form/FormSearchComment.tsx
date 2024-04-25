import commentApi from '@/adapter/comment'
import { QUERY_KEY } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, Col, ConfigProvider, Form, Row, Select } from 'antd'
import { useQuery } from 'react-query'

const FormSearchComment = ({ onSearchHandler }: any) => {
  const [form] = Form.useForm()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { data: dataComment } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COMMENT],
    queryFn: () =>
      commentApi.getAllComment().then((res) => {
        return res?.data?.data?.listComment
      }),
  })

  const optionsProductName: any = []

  dataComment?.forEach((comment: any) => {
    if (comment?.product_name) {
      const ele = optionsProductName.filter(
        (product_name: any) => product_name?.label === comment?.product_name
      )

      if (ele?.length === 0)
        optionsProductName.push({
          label: comment?.product_name,
          value: comment?.product_name,
        })
    }
  })

  const optionsUserName: any = []

  dataComment?.forEach((comment: any) => {
    if (comment?.user_name) {
      const ele = optionsUserName.filter(
        (user_name: any) => user_name?.label === comment?.user_name
      )

      if (ele?.length === 0)
        optionsUserName.push({
          label: comment?.user_name,
          value: comment?.user_name,
        })
    }
  })

  const searchBlogHandler = () => {
    const dataForm = form.getFieldsValue()
    const data = cleanObj({
      ...dataForm,
    })

    onSearchHandler(data)
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
                  name="product_name"
                  label={
                    <label style={{ fontSize: '15x', width: '120px' }}>
                      Tên sản phẩm
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsProductName}
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
                  name="user_name"
                  label={
                    <label style={{ fontSize: '15x', width: '120px' }}>
                      Tên người bình luận
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsUserName}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
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

export default FormSearchComment
