import { memo } from 'react'
// import { Button, Space, Table } from 'antd'
import style from '@/common.module.scss'
import { ConfigProvider, Table } from 'antd'

const TableListRevenueByTime = ({ dataTable, loading }: any) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      width: 60,
      fixed: true,
      render: (_: any, record: any, index: number) => {
        return <div>{index + 1}</div>
      },
    },

    {
      title: 'Thời gian',
      dataIndex: 'mo',
      align: 'center',
      width: '80px',
      render: (_: any, record: any) => {
        return (
          <div>
            Tháng {record?.mo} Năm {record?.ye}
          </div>
        )
      },
    },

    {
      title: 'SL đơn hàng',
      dataIndex: 'quantity_order',
      align: 'center',
      width: '70px',
    },

    {
      title: 'Tiền hàng',
      dataIndex: 'original_revenue',
      align: 'center',
      width: '130px',
      render: (row: any, record: any) => (
        <div>{Number(record?.original_revenue).toLocaleString()}</div>
      ),
    },

    {
      title: 'Chiết khấu',
      dataIndex: 'total_discount',
      align: 'center',
      width: '120px',
      render: (row: any, record: any) => (
        <div>{Number(record?.total_discount).toLocaleString()}</div>
      ),
    },

    {
      title: 'Phí giao hàng',
      dataIndex: 'total_ship',
      align: 'center',
      width: '120px',
      render: (row: any, record: any) => (
        <div>{Number(record?.total_ship).toLocaleString()}</div>
      ),
    },

    {
      title: 'Doanh số',
      dataIndex: 'total_revenue',
      align: 'center',
      width: '130px',
      render: (row: any, record: any) => (
        <div>{Number(record?.total_revenue).toLocaleString()}</div>
      ),
    },
  ]

  return (
    <div className={style.disableRrowTableCheckbox}>
      <ConfigProvider
        theme={{
          token: {
            // controlOutline: 'rgba(5, 145, 255, 0.1)',
            colorPrimary: '#1677ff',
          },

          components: {
            Table: {
              rowSelectedBg: '#e6f4ff',
              rowSelectedHoverBg: '#bae0ff',
              rowHoverBg: '#e6e6e6',
            },
          },
        }}
      >
        <Table
          className={style.disableRrowTableCheckbox}
          // rowSelection={rowSelection}
          columns={columns as any}
          dataSource={dataTable}
          scroll={{ x: 1200, y: 430 }}
          pagination={false}
          rowKey="id"
          rowClassName={style.removeRowSelected}
          bordered
          loading={loading}
          // refetch={refetch}
        />
      </ConfigProvider>
    </div>
  )
}

export default memo(TableListRevenueByTime)
