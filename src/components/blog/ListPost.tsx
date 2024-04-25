import PostItem from './PostItem'

const ListPost = ({ lstPost }: any) => {
  return (
    <div className="grid grid-cols-4 gap-[24px] mt-4">
      {lstPost?.map((post: any) => {
        return (
          <PostItem
            key={post?.id}
            id={post?.id}
            img={post?.img}
            title={post?.title}
            content={post?.content}
            publish={post?.created_at}
          />
        )
      })}
    </div>
  )
}

export default ListPost
