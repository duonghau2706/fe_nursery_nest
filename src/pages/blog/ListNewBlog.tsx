import NewBlogItem from './NewBlogItem'

const ListNewBlog = ({ isListNew }: any) => {
  return (
    <div className="flex flex-col gap-[9px] py-2">
      <div className="w-fit font-[800] text-[#4c4c4c] pb-[6px] border-[2px] border-solid border-green-main border-t-0 border-x-0 cursor-pointer hover:text-green-main">
        {isListNew ? 'BÀI VIẾT MỚI NHẤT' : 'CÓ THỂ BẠN QUAN TÂM'}
      </div>

      <div className="flex flex-col gap-1">
        <NewBlogItem />
        <NewBlogItem />
        <NewBlogItem />
      </div>
    </div>
  )
}

export default ListNewBlog
