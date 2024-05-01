const Support = () => {
  return (
    <div
      className="grid grid-cols-4 gap-[14px] justify-center text-black-main  py-[22px] mt-5 bg-[#eef5f8]"
      style={{ borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}
    >
      <div className="flex gap-[14px]">
        <img
          src="https://bizweb.dktcdn.net/100/172/234/themes/606238/assets/policy-icon-1.png?1684463281111"
          alt="bg car"
          className="w-[39px] h-[27px] my-auto"
        />
        <div className="flex flex-col">
          <div className="uppercase font-[800] text-[14px] text-[#464646]">
            Miễn phí vận chuyển
          </div>
          <div className="font-[500] text-[12px] text-[#898989]">
            Miễn phí vận chuyển tại nội thành Hà Nội
          </div>
        </div>
      </div>

      <div className="flex gap-[14px]">
        <img
          src="https://bizweb.dktcdn.net/100/172/234/themes/606238/assets/policy-icon-2.png?1684463281111"
          alt="bg car"
          className="w-[27px] h-[29px] my-auto"
        />
        <div className="flex flex-col">
          <div className="uppercase font-[800] text-[14px] text-[#464646]">
            Đổi trả trong vòng 24h
          </div>
          <div className="font-[500] text-[12px] text-[#898989]">
            Đổi trả sản phẩm nhanh chóng trong vòng 24h đồng hồ.
          </div>
        </div>
      </div>

      <div className="flex gap-[14px]">
        <img
          src="https://bizweb.dktcdn.net/100/172/234/themes/606238/assets/policy-icon-3.png?1684463281111"
          alt="bg car"
          className="w-[25px] h-[30px] my-auto"
        />
        <div className="flex flex-col">
          <div className="uppercase font-[800] text-[14px] text-[#464646]">
            Uy tín hàng đầu
          </div>
          <div className="font-[500] text-[12px] text-[#898989]">
            Sản phẩm được ủy quyền bởi các hãng sản xuất.
          </div>
        </div>
      </div>

      <div className="flex gap-[14px]">
        <img
          src="https://bizweb.dktcdn.net/100/172/234/themes/606238/assets/policy-icon-4.png?1684463281111"
          alt="bg car"
          className="w-[43px] h-[39px] my-auto"
        />
        <div className="flex flex-col">
          <div className="uppercase font-[800] text-[14px] text-[#464646]">
            Tư vấn miễn phí 24/7
          </div>
          <div className="font-[800] text-[14px] text-[#ff5c01]">
            Hotline : 0984 019 869
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
