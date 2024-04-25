import { Link, useNavigate } from 'react-router-dom'
import DateItem from './DateItem'
import { URL } from '@/utils/constants'
import { Interweave } from 'interweave'
import moment from 'moment'

const PostItem = ({ id, img, title, content, publish }: any) => {
  const navigate = useNavigate()

  const dateTime = moment(publish)
  const day = dateTime.format('DD') // Lấy ngày ở dạng 2 chữ số
  const month = dateTime.format('MM') // Lấy tháng ở dạng 2 chữ số
  const year = dateTime.format('YYYY')

  return (
    <div className="text-[#4c4c4c] flex flex-col">
      <div className="relative">
        <DateItem day={day} month={month} year={year} />
        <div
          className="cursor-pointer"
          onClick={() => navigate(`${URL.BLOG}/${id}`)}
        >
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
            to={`${URL.BLOG}/${id}`}
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
          <Interweave content={content} className="ck-editor w-full" />
        </span>
      </div>
    </div>
  )
}

export default PostItem
