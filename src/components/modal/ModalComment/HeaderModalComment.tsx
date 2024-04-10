import { Rate } from 'antd'

const HeaderModalComment = () => {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="text-[20px]">Đánh giá sản phẩm</div>
      <Rate className="flex justify-center" />
    </div>
  )
}

export default HeaderModalComment
