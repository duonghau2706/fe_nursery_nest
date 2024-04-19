import moment from 'moment'
import MainPostItem from './MainPostItem'

const ListMainPost = ({ lstMainPost }: any) => {
  return (
    <div>
      {lstMainPost?.map((post: any, index: number) => {
        return (
          <MainPostItem
            id={post?.id}
            index={index}
            url={post?.img}
            title={post?.title}
            author={post?.author}
            publish={moment(post?.created_at).format('DD/MM/YYYY')}
            content={post?.content}
          />
        )
      })}
    </div>
  )
}

export default ListMainPost
