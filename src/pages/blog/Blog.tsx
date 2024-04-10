import ListMainPost from '@/components/blog/ListMainPost'
import ListPost from '@/components/blog/ListPost'

const Blog = () => {
  return (
    <div className="mx-[75px] my-5 px-4 py-3 pb-7 text-black-main border-solid border-transparent rounded-[10px] bg-white text-[16px]">
      <div className="text-green-main font-[700] text-[25px] mb-3">Tin tức</div>
      <ListMainPost />
      <ListPost />
    </div>
  )
}

export default Blog
