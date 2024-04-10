const NewsItem = ({ imgNews, title, publish }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <img src={imgNews} alt="img product" className="h-[230px] mx-auto" />

      <div className="font-[700] text-[14px] text-[#252525] mt-2">{title}</div>

      <div className="font-[500] text-[12px] text-[#898989]">{publish}</div>
    </div>
  )
}

export default NewsItem
