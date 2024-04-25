import { URL } from '@/utils/constants'
import { Interweave } from 'interweave'
import { useNavigate } from 'react-router-dom'

const MainPostItem = ({
  id,
  title,
  url,
  author,
  publish,
  content,
  index,
}: any) => {
  const navigate = useNavigate()

  const handleViewBlogDetail = () => {
    navigate(`${URL.BLOG}/${id}`)
  }

  return (
    <div
      style={{ borderBottom: '1px solid #dee2e6' }}
      className="flex text-[#4c4c4c] gap-5 justify-between text-[16px] py-4"
    >
      {index % 2 === 0 ? (
        <>
          <div className="max-w-[33%]" onClick={handleViewBlogDetail}>
            <img
              src={url}
              alt="img main post"
              className="h-[248px] bg-cover cursor-pointer mx-auto flex"
            />
          </div>
          <div className="min-w-[67%]">
            <div
              className="font-[700] text-[28px] leading-[1.3] cursor-pointer hover:text-green-main"
              onClick={handleViewBlogDetail}
            >
              {title}
            </div>
            <div className="mt-[10px] mb-3">
              Đăng bởi:{' '}
              <strong>
                {' '}
                {author} - {publish}
              </strong>
            </div>
            <div
              style={{
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                display: '-webkit-box',
                textOverflow: 'ellipsis',
                textAlign: 'justify',
              }}
            >
              <Interweave content={content} className="ck-editor w-full" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[67%]">
            <div
              className="font-[700] text-[28px]  leading-[1.3] cursor-pointer hover:text-green-main"
              onClick={handleViewBlogDetail}
            >
              {title}
            </div>
            <div className="mt-[10px] mb-3">
              Đăng bởi:{' '}
              <strong>
                {' '}
                {author} - {publish}
              </strong>
            </div>
            <div
              style={{
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                display: '-webkit-box',
                textAlign: 'justify',
                textOverflow: 'ellipsis',
              }}
            >
              <Interweave content={content} className="ck-editor" />
            </div>
          </div>
          <div className="min-w-[33%] w-full h-[240px]">
            <img
              src={url}
              alt="img main post"
              className="h-full bg-cover cursor-pointer flex mx-auto"
              onClick={handleViewBlogDetail}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MainPostItem
