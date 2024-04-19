import blogApi from '@/adapter/blog'
import ListMainPost from '@/components/blog/ListMainPost'
import ListPost from '@/components/blog/ListPost'
import { QUERY_KEY } from '@/utils/constants'
import { useQuery } from 'react-query'

const Blog = () => {
  const { data: dataBlog = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BLOG],
    queryFn: async () => {
      return await blogApi.getAllBlog().then((res: any) => {
        return res?.data?.data
      })
    },
  })

  const lstMainPost = dataBlog.slice(0, 2) // lấy từ 0 tới 1
  const lstPost = dataBlog.slice(2) // lấy từ 2 tới arr.length

  return (
    <div className="mx-[75px] my-5 px-4 py-3 pb-7 text-black-main border-solid border-transparent rounded-[10px] bg-white text-[16px]">
      <div className="text-green-main font-[700] text-[25px] mb-3">Tin tức</div>
      <ListMainPost lstMainPost={lstMainPost} />
      <ListPost lstPost={lstPost} />
    </div>
  )
}

export default Blog
