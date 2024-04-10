const OrderDetailItem = () => {
  return (
    <div className="flex gap-2 hover:border-[#ffcc00] hover:shadow-border pl-[26px] pr-[15px] pt-[14px] pb-[10px] rounded-[10px] border border-solid border-gray-borderSecondary">
      <div className="text-[#ffc107] font-[800] flex items-center w-[10%]">
        2 x{' '}
      </div>
      <div className="flex justify-between w-full">
        <div className="flex gap-5">
          <img
            src="https://bizweb.dktcdn.net/thumb/medium/100/172/234/products/17.jpg?v=1645500661240"
            alt="img"
            className="w-[70px] h-[70px]"
          />
          <div className="flex flex-col justify-center">
            <div className="font-[800]">Dầu tràm Cung Đình - Silver (15ml)</div>
            <div className="text-[14px]">37.000₫</div>
          </div>
        </div>

        <div className="flex items-center text-[#ff0000] font-[800]">
          74.000₫
        </div>
      </div>
    </div>
  )
}

export default OrderDetailItem
