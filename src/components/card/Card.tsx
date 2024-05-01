const Card = ({ icon, bg, title, value }: any) => {
  return (
    <div className="px-5 py-5 flex bg-white rounded-[10px] text-black-main w-1/3">
      <div className="flex flex-col gap-0 justify-center w-full">
        <div
          className={`text-green-main p-[10px] bg-[${bg}] rounded-[50%] w-fit flex mx-auto`}
        >
          <img src={icon} alt="icon" />
        </div>
        <div className="font-[800] text-[24px] mt-2 text-center">
          {Number(value).toLocaleString()} ₫
        </div>
        <div className="text-[#727272] font-[600] text-center text-[18px]">
          {title}
        </div>
      </div>
    </div>
  )
}

export default Card
