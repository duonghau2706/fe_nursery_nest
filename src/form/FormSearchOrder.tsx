import orderApi from '@/adapter/order'
import { QUERY_KEY } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, Col, ConfigProvider, Form, Input, Row, Select } from 'antd'
import { useQuery } from 'react-query'

const FormSearchOrder = ({ onSearchHandler }: any) => {
  const [form] = Form.useForm()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { data: dataOrder } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_ORDER],
    queryFn: () =>
      orderApi.getAllOrder().then((res) => {
        return res?.data?.data?.listOrder
      }),
  })

  const optionsStatusMoney: any = []

  dataOrder?.forEach((order: any) => {
    if (order?.status_money) {
      const ele = optionsStatusMoney.filter(
        (status_money: any) => status_money?.value === order?.status_money
      )

      if (ele?.length === 0)
        optionsStatusMoney.push({
          label:
            order?.status_money === 0 ? 'Chưa thanh toán' : 'Đã thanh toán',
          value: order?.status_money,
        })
    }
  })

  const optionsStatusShip: any = []

  dataOrder?.forEach((order: any) => {
    if (order?.status_ship) {
      const ele = optionsStatusShip.filter(
        (status_ship: any) => status_ship?.value === order?.status_ship
      )

      if (ele?.length === 0)
        optionsStatusShip.push({
          label: order?.status_ship === 0 ? 'Chưa vận chuyển' : 'Đã vận chuyển',
          value: order?.status_ship,
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
                  name="order_code"
                  label={
                    <label style={{ fontSize: '15x', width: '140px' }}>
                      Mã đơn hàng
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="user_name"
                  label={
                    <label style={{ fontSize: '15x', width: '140px' }}>
                      Tên khách hàng
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="phone"
                  label={
                    <label style={{ fontSize: '15x', width: '140px' }}>
                      Số điện thoại
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="discount_id"
                  label={
                    <label style={{ fontSize: '15x', width: '140px' }}>
                      Mã giảm giá
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="status_money"
                  label={
                    <label style={{ fontSize: '15x', width: '140px' }}>
                      Trạng thái thanh toán
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsStatusMoney}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="status_ship"
                  label={
                    <label style={{ fontSize: '15x', width: '140px' }}>
                      Trạng thái vận chuyển
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsStatusShip}
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

export default FormSearchOrder
