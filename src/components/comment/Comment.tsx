import iconStar from '@/assets/image/star.svg'
import moment from 'moment'

const Comment = ({ createdAt, content, name, rated, img }: any) => {
  const renderAppreciate = (value: number) => {
    if (value === 1) return 'Rất tệ'
    else if (value === 2) return 'Chưa ưng lắm'
    else if (value === 3) return 'Tạm ổn'
    else if (value === 4) return 'Đáng mua'
    else return 'Tuyệt vời'
  }

  return (
    <div className="mt-5 flex flex-col gap-[6px] border-t-0 border-x-0 border-b-[1px] border-solid pb-5 border-[#d0cece]">
      <div className="flex gap-3 items-center mb-[6px]">
        <div className="w-[36px] h-[36px] text-[#737373] bg-[#e5e5e5] rounded-[50%] flex items-center justify-center">
          {name?.[0]}
        </div>
        <div className="flex flex-col gap-0">
          <div className="text-[15px] font-[500]">{name}</div>
          <div className="text-[12px] text-[#737373] font-[500]">
            {moment(createdAt)?.format('DD/MM/YYYY')}
          </div>
        </div>
      </div>

      <div className="flex font-[800] text-[15px] items-center gap-[3px]">
        <img
          src={iconStar}
          alt="icon star"
          className="w-[20px] h-[20px] text-red-500 fill-red-500"
        />
        <div>{rated}/5</div>
        <div>·</div>
        <div>{renderAppreciate(rated)}!</div>
      </div>

      <span className="text-[15px] font-[500]">{content}</span>

      {img && (
        <div className="w-[171px] h-[128px]">
          <img className="w-full h-full" src={img} alt="img comment" />
        </div>
      )}
    </div>
  )
}

export default Comment
