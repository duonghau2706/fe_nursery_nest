import Support from '@/components/support/Support'

const About = () => {
  return (
    <div className="flex flex-col gap-2 text-black-main px-[75px] pt-5 pb-8">
      <div
        className="py-1 font-[700] uppercase text-[18px] w-fit"
        style={{ borderBottom: '3px solid #ffcf21' }}
      >
        Giới thiệu
      </div>

      <div className="mt-4">
        <div className="mb-2">
          Tên cửa hàng: Cửa hàng bán lẻ đồ cho mẹ và bé Likado
        </div>
        <div className="mb-2">
          Lĩnh vực hoạt động: sản xuất, kinh doanh sản phẩm dệt
        </div>
        <div className="mb-2">Năm hoạt động: 2020</div>
        <div className="mb-2">Mã số thuế: 0106926305</div>
        <div className="mb-2">
          Địa chỉ: số 205/42 Phố Thịnh Liệt, Quận Hoàng Mai, Thành phố Hà Nội,
          Việt Nam
        </div>
        <div className="mb-2">Hotline: 0984 019 869</div>
        <div className="mb-2">Email: kd@likado.vn</div>
        <div className="leading-7">
          Likado từ ngày đầu thành lập đã luôn mong muốn có thể mang đến các sản
          phẩm chăm sóc làn da của trẻ nhỏ và mẹ bầu. Vượt qua được khởi đầu khó
          khăn, Likado đã đạt được một số thành tựu nhất định, mà tất cả những
          điều đó đều là nhờ đội ngũ nhân viên có trình độ chuyên môn, tận tâm
          làm việc và cả các khách hàng mà cửa hàng đã may mắn được tiếp đón.
          Likado thường xuyên cập nhật chất lượng các sản phẩm theo công nghệ
          mới và hiện đại, và tổ chức các chương trình khuyến mại đặc sắc, phong
          phú tới mọi đối tượng khách hàng. Doanh nghiệp luôn thể hiện tốt khả
          năng đáp ứng yêu cầu của khách hàng vì mọi thành viên đều tâm niệm:
          Khách hàng chính là người quyết định sự tồn tại, tương lai và phát
          triển của doanh nghiệp.
        </div>
        <Support />
      </div>
    </div>
  )
}

export default About
