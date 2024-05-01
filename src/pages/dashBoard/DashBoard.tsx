import orderIcon from '@/assets/image/pending_order.svg'
import incomeIcon from '@/assets/image/total_income.svg'
import saleIcon from '@/assets/image/total_sale.svg'

import dashBoardApi from '@/adapter/dashboard'
import reportApi from '@/adapter/report'
import BarChartt from '@/components/charts/BarChartt'
import Pie from '@/components/charts/Pie'
import TableListRevenueByCategory from '@/components/table/TableListRevenueByCategory'
import TableListRevenueByTime from '@/components/table/TableListRevenueByTime'
import useToken from '@/hook/token'
import { QUERY_KEY } from '@/utils/constants'
import {
  cleanObj,
  createEndDateTimeStampFromMoment,
  createStartDateTimeStampFromMoment,
} from '@/utils/helper'
import { Button, ConfigProvider, DatePicker, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import axios from 'axios'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'

const { RangePicker } = DatePicker

const DashBoard = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const [form] = useForm()

  const [startRevenue, setStartRevenue]: any = useState()
  const [endRevenue, setEndRevenue]: any = useState()
  const [startCate, setStartCate]: any = useState()
  const [endCate, setEndCate]: any = useState()

  const { data: dataDB } = useQuery({
    queryKey: [
      QUERY_KEY.GET_ALL_DB,
      startRevenue,
      endRevenue,
      startCate,
      endCate,
    ],
    queryFn: () =>
      dashBoardApi
        .getAll(
          cleanObj({
            startRevenue: startRevenue
              ? createStartDateTimeStampFromMoment(
                  moment(startRevenue?.toDate())
                )
              : undefined,
            endRevenue: endRevenue
              ? createEndDateTimeStampFromMoment(moment(endRevenue?.toDate()))
              : undefined,
            startCate: startCate
              ? createStartDateTimeStampFromMoment(moment(startCate?.toDate()))
              : undefined,
            endCate: endCate
              ? createEndDateTimeStampFromMoment(moment(endCate?.toDate()))
              : undefined,
          })
        )
        .then((res) => {
          return res?.data?.data
        }),
  })

  const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const dataChart: any = []
  MONTH.map((month: number) => {
    let monthExist = false
    let value: any
    dataDB?.dataRevenue?.forEach((ele: any) => {
      if (ele?.month === month.toString()) {
        monthExist = true
        value = ele?.revenue
        return
      }
    })

    if (monthExist) {
      dataChart.push({ month, revenue: Number(value) })
    } else {
      dataChart.push({ month, revenue: 0 })
    }
  })

  const mutationGetPdfRevenue = useMutation({
    // mutationFn: (params: any) => reportApi.get(params),
    mutationFn: (params: any) =>
      axios.post(`http://localhost:3000/api/v1/report/pdf`, params, {
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf',
          // 'Content-Type': 'text/html',
        },
      }),
    onSuccess: (res) => {
      const blobData = new Blob([res?.data], { type: 'application/pdf' })

      const fileURL = window.URL.createObjectURL(blobData)
      const alink = document.createElement('a')
      alink.href = fileURL
      alink.download =
        startRevenue && endRevenue
          ? `Báo cáo doanh thu theo thời gian_${startRevenue?.date()}/${
              startRevenue?.month() + 1
            }/${startRevenue?.year()}_${endRevenue?.date()}/${
              endRevenue?.month() + 1
            }/${endRevenue?.year()}`
          : 'Báo cáo doanh thu theo thời gian'
      alink.click()
    },
  })

  const mutationGetPdfRevenueCategory = useMutation({
    // mutationFn: (params: any) => reportApi.get(params),
    mutationFn: (params: any) =>
      axios.post(`http://localhost:3000/api/v1/report/pdf`, params, {
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf',
          // 'Content-Type': 'text/html',
        },
      }),
    onSuccess: (res) => {
      const blobData = new Blob([res?.data], { type: 'application/pdf' })

      const fileURL = window.URL.createObjectURL(blobData)
      const alink = document.createElement('a')
      alink.href = fileURL
      alink.download =
        startCate && endCate
          ? `Báo cáo doanh thu theo loại sản phẩm_${startCate?.date()}/${
              startCate?.month() + 1
            }/${startCate?.year()}_${endCate?.date()}/${
              endCate?.month() + 1
            }/${endCate?.year()}`
          : 'Báo cáo doanh thu theo loại sản phẩm'
      alink.click()
    },
  })

  const mutationRpRevenueByCate = useMutation({
    mutationFn: (params: any) => reportApi.renderEjsRevenueCategory(params),
    onSuccess: (res) => {
      // --html string
      mutationGetPdfRevenueCategory.mutate({ contentHtml: res })
    },
  })

  const mutationRpRevenue = useMutation({
    mutationFn: (params: any) => reportApi.renderEjsRevenue(params),
    onSuccess: (res) => {
      // --html string
      mutationGetPdfRevenue.mutate({ contentHtml: res })
    },
  })

  const printPdfRevenueHandler = () => {
    const value = form.getFieldsValue()

    setStartRevenue(value?.dateTime?.[0])
    setEndRevenue(value?.dateTime?.[1])

    mutationRpRevenue.mutate({
      listRevenue: dataDB?.dataTableRevenue,
      startRevenue: value?.dateTime?.[0]?.format('DD/MM/YYYY'),
      endRevenue: value?.dateTime?.[1]?.format('DD/MM/YYYY'),
      curDay: moment().date(),
      curMonth: moment().month() + 1,
      curYear: moment().year(),
      name: decode?.name,
    })
  }

  const printPdfRevenueByCateHandler = () => {
    const value = form.getFieldsValue()

    setStartCate(value?.dateTimeCategory?.[0])
    setEndCate(value?.dateTimeCategory?.[1])

    mutationRpRevenueByCate.mutate({
      listRevenueCate: dataDB?.dataTableRevenueCategory,
      startCate: value?.dateTimeCategory?.[0]?.format('DD/MM/YYYY'),
      endCate: value?.dateTimeCategory?.[1]?.format('DD/MM/YYYY'),
      curDay: moment().date(),
      curMonth: moment().month() + 1,
      curYear: moment().year(),
      name: decode?.name,
    })
  }

  const dateTimeChangeHandler: any = (_: any) => {
    setStartRevenue(_?.[0])
    setEndRevenue(_?.[1])
  }

  const dateTimeCategoryChangeHandler: any = (_: any) => {
    setStartCate(_?.[0])
    setEndCate(_?.[1])
  }

  const renderTotal = (arr: any) => {
    const total = arr?.reduce((accumulator: any, currentValue: any) => {
      return accumulator + parseFloat(currentValue?.total_revenue)
    }, 0)

    return Number(total)?.toLocaleString()
  }

  return (
    <div className="bg-[#F5F5F5] px-10 py-5 flex flex-col gap-10">
      <div className="flex gap-5">
        <div
          className="px-5 py-5 flex bg-white rounded-[10px] text-black-main w-1/3"
          style={{
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
          }}
        >
          <div className="flex flex-col gap-0 justify-center w-full">
            <div
              className={`text-green-main p-[10px] bg-[#dbeafa] rounded-[50%] w-fit flex mx-auto`}
            >
              <img src={incomeIcon} alt="icon" />
            </div>
            <div className="font-[800] text-[24px] mt-2 text-center">
              {Number(dataDB?.dataCard?.[0]?.total_income).toLocaleString()} ₫
            </div>
            <div className="text-[#727272] font-[600] text-center text-[18px]">
              Tổng thu nhập
            </div>
          </div>
        </div>

        <div
          className="px-5 py-5 flex bg-white rounded-[10px] text-black-main w-1/3"
          style={{
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
          }}
        >
          <div className="flex flex-col gap-0 justify-center w-full">
            <div
              className={`text-green-main p-[10px] bg-[#f0f9ff] rounded-[50%] w-fit flex mx-auto`}
            >
              <img src={saleIcon} alt="icon" />
            </div>
            <div className="font-[800] text-[24px] mt-2 text-center">
              {Number(dataDB?.dataCard?.[0]?.total_sale).toLocaleString()}
            </div>
            <div className="text-[#727272] font-[600] text-center text-[18px]">
              Tổng lượng bán
            </div>
          </div>
        </div>

        <div
          className="px-5 py-5 flex bg-white rounded-[10px] text-black-main w-1/3"
          style={{
            boxShadow:
              '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
          }}
        >
          <div className="flex flex-col gap-0 justify-center w-full">
            <div
              className={`text-green-main p-[10px] bg-[#f3e8ff] rounded-[50%] w-fit flex mx-auto`}
            >
              <img src={orderIcon} alt="icon" />
            </div>
            <div className="font-[800] text-[24px] mt-2 text-center">
              {Number(dataDB?.dataCard?.[0]?.unship).toLocaleString()}
            </div>
            <div className="text-[#727272] font-[600] text-center text-[18px]">
              Đơn hàng đang xử lý
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <BarChartt listRevenue={dataChart} />
        <Pie listRevenueByCategory={dataDB?.dataRevenueByCategory} />
      </div>

      <div>
        <Form form={form}>
          <div className="font-[600] font-inherit text-black-main text-[24px] mb-3">
            Báo cáo doanh thu theo thời gian
          </div>

          <div className="flex justify-between">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'white',
                },
              }}
            >
              <Button
                // htmlType="submit"
                onClick={printPdfRevenueHandler}
                className="relative w-[130px] bg-green-ok justify-center text-white border-none text-[15px] px-[5px] py-[17px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-green-okHover mb-2"
              >
                In thống kê
              </Button>
            </ConfigProvider>

            <div className="flex justify-between gap-[15px]   ">
              <div className="flex gap-4 item-center">
                <label className="text-black-main mt-[3px] text-base semi-bold">
                  Thời gian
                </label>
                <ConfigProvider
                  theme={{
                    token: {
                      controlOutline: 'rgba(5, 145, 255, 0.1)',
                      colorPrimary: 'red',
                    },
                  }}
                >
                  <Form.Item name="dateTime">
                    <RangePicker
                      format={'DD/MM/YYYY'}
                      onChange={dateTimeChangeHandler}
                      placeholder={['Từ ngày', 'Đến ngày']}
                    />
                  </Form.Item>
                </ConfigProvider>
              </div>
            </div>
          </div>

          <TableListRevenueByTime dataTable={dataDB?.dataTableRevenue} />

          <div className="w-full text-right font-[600] text-[16px] mt-2 pr-[40px]">
            Tổng doanh số: {renderTotal(dataDB?.dataTableRevenue)}
          </div>
        </Form>
      </div>

      <div>
        <Form form={form} onFinish={printPdfRevenueByCateHandler}>
          <div className="font-[600] font-inherit text-black-main text-[24px] mb-3">
            Báo cáo doanh thu theo loại sản phẩm
          </div>

          <div className="flex justify-between">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'white',
                },
              }}
            >
              <Button
                // htmlType="submit"
                onClick={printPdfRevenueByCateHandler}
                className="relative w-[130px] bg-green-ok justify-center text-white border-none text-[15px] px-[5px] py-[17px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-green-okHover mb-2"
              >
                In thống kê
              </Button>
            </ConfigProvider>

            <div className="flex justify-between gap-[15px]   ">
              <div className="flex gap-4 item-center">
                <label className="text-black-main mt-[3px] text-base semi-bold">
                  Thời gian
                </label>
                <ConfigProvider
                  theme={{
                    token: {
                      controlOutline: 'rgba(5, 145, 255, 0.1)',
                      colorPrimary: 'red',
                    },
                  }}
                >
                  <Form.Item name="dateTimeCategory">
                    <RangePicker
                      format={'DD/MM/YYYY'}
                      onChange={dateTimeCategoryChangeHandler}
                      placeholder={['Từ ngày', 'Đến ngày']}
                    />
                  </Form.Item>
                </ConfigProvider>
              </div>
            </div>
          </div>

          <TableListRevenueByCategory
            dataTable={dataDB?.dataTableRevenueCategory}
          />

          <div className="w-full text-right font-[600] text-[16px] mt-2 pr-[40px] mb-3">
            Tổng doanh số: {renderTotal(dataDB?.dataTableRevenueCategory)}
          </div>
        </Form>
      </div>
    </div>
  )
}

export default DashBoard
