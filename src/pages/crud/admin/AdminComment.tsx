import { queryClient } from '@/App'
import commentApi from '@/adapter/comment'
import { ModalBase } from '@/components/modal'
import { DisplayRecord } from '@/components/select'
import TableListComment from '@/components/table/TableListComment'
import FormSearchComment from '@/form/FormSearchComment'
import { QUERY_KEY, URL } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, ConfigProvider, Pagination } from 'antd'
import { useCallback, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminComment = () => {
  const { currentPage } = useParams()

  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(10)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataSearch, setDataSearch]: any = useState()
  const [dataComment, setDataComment]: any = useState([])
  const [paginate, setPaginate]: any = useState()

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COMMENT, currentPage, perPage, dataSearch],
    queryFn: () => {
      const obj = cleanObj({
        perPage,
        currentPage: currentPage || 1,
        ...dataSearch,
      })

      commentApi.getAllComment(obj).then((res: any) => {
        setDataComment(res?.data?.data?.listComment)
        setPaginate(res?.data?.data?.pagination)
      })
    },
  })

  const onSearchHandler = (dataSearch: any) => {
    setDataSearch(dataSearch)
  }
  const onSelectedChangeHandler = (value: any) => {
    setPerPage(value)
    navigate(URL.ADMIN_COMMENT_LIST)
  }

  //---------- DELETE -------------//
  const mutationDelete = useMutation({
    mutationFn: (params: any) => commentApi.deleteComment(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_ALL_COMMENT])
      toast.success('Xóa bình luận thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_COMMENT_LIST)
      }, 700)
    },
  })

  const deleteHandler = () => {
    setOpenModalDelete(true)
  }

  const onSaveDelete = () => {
    if (selectedRowKeys?.length > 0) {
      mutationDelete.mutate({ listId: selectedRowKeys })

      setSelectedRowKeys([])
    } else {
      toast.error('Vui lòng chọn bình luận muốn xóa!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    }

    setOpenModalDelete(false)
  }

  const showTotal = (total: any, range: any) => {
    return (
      <label className="text-[14px]">
        {`Hiển thị ${range[0]} ~ ${
          range[1]
        } trên ${total.toLocaleString()} bản ghi `}
      </label>
    )
  }

  const setCurrentPageBlog = useCallback((value: number) => {
    navigate(`${URL.ADMIN_COMMENT_LIST}/${value}`)
  }, [])

  return (
    <div className="pt-[30px] px-10 pb-7 bg-[#e8e6e6] text-black-main flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[30px] font-[600]">Quản lý bình luận</h2>
        <FormSearchComment onSearchHandler={onSearchHandler} />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
          onClick={deleteHandler}
        >
          Xóa bình luận
        </Button>
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
          onClick={() => navigate(`${URL.ADMIN_COMMENT}/create`)}
        >
          Thêm bình luận
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
        <div className="flex justify-between items-center">
          <DisplayRecord handleChange={onSelectedChangeHandler} />
          <label className="font-bold text-[14px]">
            Tổng số bình luận: {Number(paginate?.total).toLocaleString()}
          </label>
        </div>

        <TableListComment
          perPage={perPage}
          currentPage={currentPage || 1}
          dataTable={dataComment}
          loading={isLoading}
          setSelectedRowKeys={setSelectedRowKeys}
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
            total={paginate?.total}
            current={+(currentPage as string) || 1}
            pageSize={perPage || 10}
            onChange={setCurrentPageBlog}
            showTotal={showTotal}
          />
        </ConfigProvider>

        <ModalBase
          isOpen={openModalDelete}
          setIsOpen={setOpenModalDelete}
          onSave={onSaveDelete}
          header={'Xác nhận'}
          content={'Bạn có chắc chắn muốn xóa bình luận này không?'}
          footer={true}
        />
      </div>
    </div>
  )
}

export default AdminComment
