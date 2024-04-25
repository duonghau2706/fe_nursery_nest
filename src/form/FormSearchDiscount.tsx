import discountApi from '@/adapter/discount'
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

const FormSearchDiscount = ({ onSearchHandler }: any) => {
  const [form] = Form.useForm()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const { data: dataDiscount } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_DISCOUNT],
    queryFn: () =>
      discountApi.getAllDiscount().then((res) => {
        return res?.data?.data?.listDiscount
      }),
  })

  const optionsCode: any = []

  dataDiscount?.forEach((discount: any) => {
    if (discount?.code)
      optionsCode.push({
        label: discount?.code,
        value: discount?.code,
      })
  })

  const optionsSale: any = []

  dataDiscount?.forEach((discount: any) => {
    if (discount?.sale) {
      const ele = optionsSale.filter(
        (sale: any) =>
          sale?.label === (Number(discount?.sale) * 100).toFixed(0).toString()
      )

      if (ele?.length === 0)
        optionsSale.push({
          label: (Number(discount?.sale) * 100).toFixed(0).toString(),
          value: discount?.sale,
        })
    }
  })

  const searchBlogHandler = () => {
    const code = form.getFieldValue('code')
    const sale = form.getFieldValue('sale')
    const startDate =
      form.getFieldValue('dateTime')?.[0] &&
      createStartDateTimeStampFromMoment(form.getFieldValue('dateTime')?.[0])
    const endDate =
      form.getFieldValue('dateTime')?.[1] &&
      createEndDateTimeStampFromMoment(form.getFieldValue('dateTime')?.[1])

    const data = cleanObj({
      code,
      sale,
      startDate,
      endDate,
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
                  name="code"
                  label={
                    <label style={{ fontSize: '15x', width: '100px' }}>
                      Mã giảm giá
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsCode}
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
                  name="sale"
                  label="Giảm giá"
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsSale}
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
                    <label style={{ fontSize: '15x', width: '100px' }}>
                      Thời gian
                    </label>
                  }
                >
                  <RangePicker
                    className="w-[300px]"
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

export default FormSearchDiscount
