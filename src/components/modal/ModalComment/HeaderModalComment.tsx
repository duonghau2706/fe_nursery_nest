import { Rate } from 'antd'
import { useState } from 'react'

const HeaderModalComment = ({ isReset, handleChangeRate }: any) => {
  const [rated, setRated] = useState()

  const onChangeRateHandler = (value: any) => {
    if (isReset) {
      setRated(undefined)
      return
    }

    handleChangeRate(value)
  }

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="text-[20px]">Đánh giá sản phẩm</div>
      <Rate
        className="flex justify-center"
        value={rated}
        onChange={onChangeRateHandler}
      />
    </div>
  )
}

export default HeaderModalComment
