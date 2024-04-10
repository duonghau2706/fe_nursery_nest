const PaymentProductItem = ({ img, name, quantity, amount }: any) => {
  return (
    <div className="flex justify-between gap-[14px] font-[500]">
      <div className="w-[50px] h-[50px] border border-solid border-gray-borderSecondary rounded-[5px] p-1 relative">
        <div className="absolute top-[-10px] right-[-10px] rounded-[50%] bg-[#2a9dcc] w-[20px] h-[20px] text-center leading-[20px] text-white text-[12px]">
          {quantity}
        </div>
        <img src={img} alt="img item payment" className="h-full object-cover" />
      </div>
      <div className="flex justify-between gap-[12px]">
        <div>{name}</div>
        <div className="flex items-center text-gray-account">
          {Number(amount).toLocaleString()}₫
        </div>
      </div>
    </div>
  )
}

export default PaymentProductItem
