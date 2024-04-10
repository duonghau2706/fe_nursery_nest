import { Link } from 'react-router-dom'
import DateItem from './DateItem'

const PostItem = ({ img, title, content }: any) => {
  return (
    <div className="text-[#4c4c4c] flex flex-col">
      <div className="relative">
        <DateItem />
        <div className="">
          <img
            src={img}
            alt="img post item"
            className="object-contain w-full h-[145px] pl-[5px]"
          />
        </div>
      </div>

      <div className="mt-[6px] pl-[5px]">
        <div className="text-ellipsis overflow-hidden text-nowrap mb-1">
          <Link
            to={img}
            className=" font-[800] text-black-nur hover:text-green-main"
          >
            {title}
          </Link>
        </div>
        <span
          style={{
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            display: '-webkit-box',
            // textAlign: 'justify',
            textOverflow: 'ellipsis',
            lineHeight: '1.4',
            fontSize: '15px',
          }}
        >
          {content}
        </span>
      </div>
    </div>
  )
}

export default PostItem
