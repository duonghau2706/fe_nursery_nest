import IconEdit from '@/assets/image/icon_edit.svg'
import IconView from '@/assets/image/icon_view.svg'
import style from '@/common.module.scss'
import { URL } from '@/utils/constants'
import { Button, ConfigProvider, Space, Table } from 'antd'
import moment from 'moment'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const TableListDiscount = ({
  dataTable,
  loading,
  currentPage,
  perPage,
  setSelectedRowKeys,
}: any) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      width: 40,
      fixed: true,
      render: (_: any, record: any, row: any) => {
        return (
          <div>
            {(perPage * (currentPage - 1) + (row + 1))?.toLocaleString()}
          </div>
        )
      },
    },
    {
      title: 'Mã giảm giá',
      dataIndex: 'code',
      align: 'center',
      width: '100px',
    },

    {
      title: 'Giảm giá',
      dataIndex: 'sale',
      align: 'center',
      width: '40px',
      render: (row: any, record: any) => (
        <div>{(Number(record?.sale) * 100).toFixed(0)}%</div>
      ),
    },

    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      align: 'center',
      width: '80px',
      render: (row: any, record: any) => (
        <div>{moment(record?.start_date).format('DD/MM/YYYY')}</div>
      ),
    },

    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      align: 'center',
      width: '80px',
      render: (row: any, record: any) => (
        <div>{moment(record?.end_date).format('DD/MM/YYYY')}</div>
      ),
    },

    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 80,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space className="flex justify-center items-center">
          <Link to={`${URL.ADMIN_DISCOUNT}/view/${record.id}`}>
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconView} width={30} height={17} />}
            ></Button>
          </Link>
          <Link to={`${URL.ADMIN_DISCOUNT}/edit/${record.id}`}>
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconEdit} width={22} height={20} />}
            ></Button>
          </Link>
        </Space>
      ),
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

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
          rowSelection={rowSelection}
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

export default memo(TableListDiscount)
