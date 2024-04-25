import { queryClient } from '@/App'
import blogApi from '@/adapter/blog'
import { ModalBase } from '@/components/modal'
import { DisplayRecord } from '@/components/select'
import TableListBlog from '@/components/table/TableListBlog'
import FormSearchBlog from '@/form/FormSearchBlog'
import { QUERY_KEY, URL } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, ConfigProvider, Pagination } from 'antd'
import { useCallback, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminBlog = () => {
  const { currentPage } = useParams()

  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(10)
  const [openModalDeleteBlog, setOpenModalDeleteBlog] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [dataSearch, setDataSearch]: any = useState()
  const [dataBlog, setDataBlog]: any = useState([])
  const [paginate, setPaginate]: any = useState()

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BLOG, currentPage, perPage, dataSearch],
    queryFn: () => {
      const obj = cleanObj({
        perPage,
        currentPage: currentPage || 1,
        ...dataSearch,
      })

      blogApi.getAllBlog(obj).then((res: any) => {
        setDataBlog(res?.data?.data?.listBlog)
        setPaginate(res?.data?.data?.pagination)
      })
    },
  })

  const onSearchBlogHandler = (dataBlogSearch: any) => {
    setDataSearch(dataBlogSearch)
  }
  const onSelectedChangeHandler = (value: any) => {
    setPerPage(value)
    navigate(URL.ADMIN_BLOG_LIST)
  }

  //---------- DELETE -------------//
  const mutationDelete = useMutation({
    mutationFn: (params: any) => blogApi.deleteBlog(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_ALL_BLOG])
      toast.success('Xóa bài viết thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.ADMIN_BLOG_LIST)
      }, 700)
    },
  })

  const deleteBlogHandler = () => {
    setOpenModalDeleteBlog(true)
  }

  const onSaveDeleteBlog = () => {
    if (selectedRowKeys?.length > 0) {
      mutationDelete.mutate({ listId: selectedRowKeys })

      setSelectedRowKeys([])
    } else {
      toast.error('Vui lòng chọn bài viết muốn xóa!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    }

    setOpenModalDeleteBlog(false)
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
    navigate(`${URL.ADMIN_BLOG_LIST}/${value}`)
  }, [])

  return (
    <div className="pt-[30px] px-10 pb-7 bg-[#e8e6e6] text-black-main flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[30px] font-[600]">Quản lý bài viết</h2>
        <FormSearchBlog
          // dataBlog={dataBlogOrigin}
          onSearchBlog={onSearchBlogHandler}
          // listUser={listUser}
          // onSearchAdmin={onSearchUserHandler}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
          onClick={deleteBlogHandler}
        >
          Xóa bài viết
        </Button>
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
          onClick={() => navigate(`${URL.ADMIN_BLOG}/create`)}
        >
          Thêm bài viết
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
        <div className="flex justify-between items-center">
          <DisplayRecord handleChange={onSelectedChangeHandler} />
          <label className="font-bold text-[14px]">
            Tổng số bài viết: {Number(paginate?.total).toLocaleString()}
          </label>
        </div>

        <TableListBlog
          perPage={perPage}
          currentPage={currentPage || 1}
          listBlog={dataBlog}
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
          isOpen={openModalDeleteBlog}
          setIsOpen={setOpenModalDeleteBlog}
          onSave={onSaveDeleteBlog}
          header={'Xác nhận'}
          content={'Bạn có chắc chắn muốn xóa bài viết này không?'}
          footer={true}
        />
      </div>
    </div>
  )
}

export default AdminBlog
