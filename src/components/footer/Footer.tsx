import PlaceIcon from '@mui/icons-material/Place'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'

const Footer = () => {
  return (
    <div className="flex justify-between px-[75px] pt-8 pb-5 font-[14px] bg-white text-black-nur border-[4px] border-solid border-x-0 border-b-0 border-green-main">
      <div>
        <div className="font-[700] pb-4">LIKE ĐỂ NHẬN KHUYẾN MÃI SỐC NHẤT</div>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61555310831191&tabs=timeline&width=340&height=150&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="260"
          height="140"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>

      <div>
        <div className="font-[700] uppercase pb-4">Hướng dẫn</div>
        <div>
          <ul className="pl-4 flex flex-col gap-[8px]">
            <li className="hover:text-green-main cursor-pointer">
              Giới thiệu về Likado
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Hướng dẫn mua hàng
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Hướng dẫn thanh toán
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Phương thức đổi/trả hàng
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Phương thức giao hàng
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Phương thức đặt hàng
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div className="font-[700] uppercase pb-4">Chính sách</div>
        <div>
          <ul className="pl-4 flex flex-col gap-[8px]">
            <li className="hover:text-green-main cursor-pointer">
              Quan điểm kinh doanh
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Điều kiện sử dụng
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Chính sách đổi trả hàng
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Chính sách bảo mật
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Danh sách đại lý
            </li>
            <li className="hover:text-green-main cursor-pointer">
              Cam kết chất lượng
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[300px]">
        <div className="font-[700] uppercase pb-4">Liên hệ với chúng tôi</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <PlaceIcon
              className="p-1 bg-green-main"
              style={{ fontSize: '30px', color: 'white' }}
            />
            <div>
              số 205/42 Phố Thịnh Liệt, Quận Hoàng Mai, Thành phố Hà Nội, Việt
              Nam
            </div>
          </div>
          <div className="flex gap-2">
            <PhoneAndroidIcon
              className="p-1  bg-green-main"
              style={{ fontSize: '30px', color: 'white' }}
            />
            <div>Tel: 0984 019 869</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
