import MainPostItem from './MainPostItem'

const ListMainPost = () => {
  return (
    <div>
      <MainPostItem
        index={0}
        url="https://bizweb.dktcdn.net/100/480/125/articles/a-thi-n.jpg?v=1690445177090"
        title="Cung Đình 10 năm một chặng đường và bước tiến mới"
        author="Ozo Nguyễn"
        publish="27/07/2023"
        content="Gần đây thương hiệu Dầu tràm Cung Đình vừa ra mắt sản phẩm Yến sào
          Cung Đình và Nước mắm Cung Đình là sự kiện rất đáng được chú ý. Điều
          này là kết quả của sự nghiên cứu, khảo sát thị trường để hiểu rõ mong
          muốn của khách hàng hiện tạiiiiiiiiiiiiiiii"
      />
      <MainPostItem
        index={1}
        url="https://bizweb.dktcdn.net/100/480/125/articles/showroom003-jpg-20170417151908hr4cqtuhtt-thum.jpg?v=1681456208040"
        title="HÀNH TRÌNH TÌM LẠI GIÁ TRỊ TRUYỀN THỐNG"
        author="Ozo Nguyễn"
        publish="14/04/2023"
        content="Mùi hương quyến rũ, lan tỏa cùng cảm giác sảng khoái, thư giãn... đó là những cảm nhận có thể đong đếm được khi bạn xức chút dầu Tràm - một mùi hương đặc trưng rất Huế. Quyết tâm bảo vệ tinh hoa nghề sản xuất dầu tràm - con đường hình thành hiihiiiiiiimâmmmmm"
      />
    </div>
  )
}

export default ListMainPost
