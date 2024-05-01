import { ConfigProvider, Empty } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const BarChartt = ({ listRevenue }: any) => {
  const data = listRevenue?.map((ele: any) => {
    return {
      month: `T${ele?.month}`,
      revenue: ele?.revenue,
    }
  })

  const formatRevenue = (value: number) => {
    if (value >= 1e9) {
      // Nếu giá trị lớn hơn hoặc bằng 1 tỷ, chia cho 1 tỷ và thêm "B" (tỷ)
      return `${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      // Nếu giá trị lớn hơn hoặc bằng 1 triệu, chia cho 1 triệu và thêm "M" (triệu)
      return `${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
      // Nếu giá trị lớn hơn hoặc bằng 1 nghìn, chia cho 1 nghìn và thêm "K" (nghìn)
      return `${(value / 1e3).toFixed(2)}K`
    } else {
      // Nếu giá trị nhỏ hơn 1 nghìn, không làm gì cả
      return value.toString()
    }
  }

  return (
    <div
      style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
      className="w-fit pl-0 pr-2 pb-2 pt-3 bg-white border-0 border-solid rounded-[18px]"
    >
      <div className="flex pl-5 font-[800] text-black-main text-[20px] mt-2 mb-[20px]">
        Tổng doanh thu
      </div>
      {!listRevenue ? (
        <ConfigProvider
          theme={{
            token: {
              colorText: 'white',
            },
          }}
        >
          <Empty className="w-[320px] h-[255px] flex flex-col justify-center " />
        </ConfigProvider>
      ) : (
        <BarChart
          width={550}
          height={200}
          data={data}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          // barGap={0} //gap 2 bar canh nhau
          // barCategoryGap={2} //gap 2 nhom bar
        >
          <CartesianGrid vertical={false} strokeDasharray="1 6" />
          <XAxis
            width={500}
            dataKey="month"
            stroke="#e50914"
            tickLine={false} //moc tren truc
            axisLine={false} //truc
            padding={{ left: 0, right: 0 }}
            fontWeight={600}
            fontSize={13}
          />
          <YAxis
            stroke="#e50914"
            //   dataKey="revenue"
            fontWeight={600}
            fontSize={13}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatRevenue}
          />
          <Tooltip
            contentStyle={{ color: 'white', background: 'rgba(0, 0, 0, 0.8)' }}
            labelStyle={{ color: '#d33035' }}
            itemStyle={{ color: 'white' }}
          />
          <Bar dataKey="revenue" fill="#e50914" barSize={25} />
        </BarChart>
      )}
    </div>
  )
}

export default BarChartt
