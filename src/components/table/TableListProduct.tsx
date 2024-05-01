import { memo } from 'react'
// import { Button, Space, Table } from 'antd'
import IconEdit from '@/assets/image/icon_edit.svg'
import IconView from '@/assets/image/icon_view.svg'
import style from '@/common.module.scss'
import { URL } from '@/utils/constants'
import { renderDateStringYear } from '@/utils/helper'
import { Button, ConfigProvider, Space, Table } from 'antd'
import { Link } from 'react-router-dom'

const TableListProduct = ({
  dataTable,
  dataCategory,
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
      width: 60,
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
      title: 'Ảnh',
      dataIndex: 'img',
      align: 'center',
      width: '80px',
      render: (_: any, record: any) => {
        return <img className="w-[60px] h-[60px]" src={record?.img} alt="img" />
      },
    },

    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      align: 'center',
      width: '230px',
    },

    {
      title: 'Thể loại',
      dataIndex: 'category',
      align: 'center',
      width: '130px',
      render: (_: any, record: any) => {
        const cate = dataCategory?.filter(
          (cate: any) => cate?.id === record?.category_id
        )

        return <div>{cate?.[0]?.name}</div>
      },
    },

    {
      title: 'Giá tiền',
      dataIndex: 'original_price',
      align: 'center',
      width: '130px',
      render: (row: any, record: any) => (
        <div>{Number(record?.original_price).toLocaleString()}</div>
      ),
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      align: 'center',
      width: '120px',
      render: (row: any, record: any) => (
        <div>{renderDateStringYear(record?.created_at, '-')}</div>
      ),
    },

    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_at',
      align: 'center',
      width: '120px',
      render: (row: any, record: any) => (
        <div>{renderDateStringYear(record?.updated_at, '-')}</div>
      ),
    },

    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space className="flex justify-center items-center">
          <Link to={`${URL.ADMIN_PRODUCT}/view/${record.id}`}>
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconView} width={30} height={17} />}
            ></Button>
          </Link>
          <Link to={`${URL.ADMIN_PRODUCT}/edit/${record.id}`}>
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

export default memo(TableListProduct)
