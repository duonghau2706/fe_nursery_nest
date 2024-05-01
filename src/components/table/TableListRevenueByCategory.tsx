import { memo } from 'react'
import style from '@/common.module.scss'
import { ConfigProvider, Table } from 'antd'

const TableListRevenueByCategory = ({ dataTable, loading }: any) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      width: 40,
      fixed: true,
      render: (_: any, record: any, index: number) => {
        return <div>{index + 1}</div>
      },
    },

    {
      title: 'Loại sản phẩm',
      dataIndex: 'name',
      align: 'center',
      width: '120px',
    },

    {
      title: 'SL đơn hàng',
      dataIndex: 'quantity_order',
      align: 'center',
      width: '70px',
    },

    {
      title: 'Thay đổi so với tháng trước',
      dataIndex: 'revenue_change_percentage',
      align: 'center',
      width: '130px',
      render: (row: any, record: any) => (
        <div
          className={
            Number(record?.revenue_change_percentage) > 0
              ? 'text-green-main'
              : Number(record?.revenue_change_percentage) < 0
              ? 'text-red-inactive'
              : 'text-orange-primary'
          }
        >
          {Number(record?.revenue_change_percentage) > 0
            ? `tăng ${record?.revenue_change_percentage}%`
            : Number(record?.revenue_change_percentage) < 0
            ? `giảm ${-record?.revenue_change_percentage}%`
            : `sản phẩm mới`}
        </div>
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
          scroll={{ x: 800, y: 430 }}
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

export default memo(TableListRevenueByCategory)
