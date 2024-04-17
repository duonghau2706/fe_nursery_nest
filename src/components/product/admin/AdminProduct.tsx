import { ModalBase } from '@/components/modal'
import { DisplayRecord } from '@/components/select'
import TableListAdmin from '@/components/table/TableListAdmin'
import FormSearchProduct from '@/form/FormSearchProduct'
import { URL } from '@/utils/constants'
import { Button, ConfigProvider, Pagination } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AdminProduct = () => {
  const { currentPage } = useParams()

  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(10)
  // const [totalRecord, setTotalRecord] = useState(0)
  // const [dataSearch, setDataSearch]: any = useState()
  const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false)
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectedChangeHandler = (value: any) => {
    setPerPage(value)
    //  navigate(URL.MANAGE_ADMIN)
  }

  // const setCurrentPageListUser = useCallback((value: number) => {
  //   // navigate(`${URL.MANAGE_ADMIN}/${value}`)
  // }, [])

  return (
    <div className="pt-[30px] px-10 pb-7 bg-[#e8e6e6] text-black-main flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[30px] font-[600]">Quản lý sản phẩm</h2>
        <FormSearchProduct
        // listUser={listUser}
        // onSearchAdmin={onSearchUserHandler}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
          // onClick={deleteMovieHandler}
        >
          Xóa sản phẩm
        </Button>
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
          onClick={() => navigate(`${URL.ADMIN_PRODUCT}/create`)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
        <div className="flex justify-between items-center">
          <DisplayRecord handleChange={onSelectedChangeHandler} />
          <label className="font-bold text-[14px]">
            Tổng số admin: {(0).toLocaleString()}
          </label>
        </div>

        <TableListAdmin
          perPage={perPage}
          currentPage={currentPage || 1}
          listUser={[]}
          // loading={isLoading}
          // setSelectedRowKeys={setSelectedRowKeys}
          // refetch={refetch}
        />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'white',
            },
            components: {
              Pagination: {
                itemActiveBg: 'red',
              },
            },
          }}
        >
          <Pagination
            className="w-full flex"
            // total={totalRecord}
            current={+(currentPage as string) || 1}
            pageSize={perPage || 10}
            // onChange={setCurrentPageListUser}
            // showTotal={showTotal}
          />
        </ConfigProvider>

        <ModalBase
          isOpen={openModalDeleteUser}
          setIsOpen={setOpenModalDeleteUser}
          // onSave={onSaveDeleteMovie}
          header={'Xác nhận'}
          content={'Bạn có chắc chắn muốn xóa admin này không?'}
          footer={true}
        />
      </div>
    </div>
  )
}

export default AdminProduct
