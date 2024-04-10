import NewsItem from './NewsItem'

const ListNews = () => {
  return (
    <div className="text-black-main font-QuicksandBold py-[14px] mt-5 bg-[#fff] rounded-[10px]">
      <div
        className="text-[20px] mb-6 px-5 pb-3 uppercase"
        style={{ borderBottom: '1px solid #bdbdbd' }}
      >
        Tin tức
      </div>
      <div className="grid grid-cols-3 gap-10 pl-5">
        <NewsItem
          imgNews="https://bizweb.dktcdn.net/thumb/large/100/172/234/articles/khan-kho-300g-moi.png?v=1675518999930"
          title="CÔNG BỐ THAY ĐỔI MÀU SẮC SẢN PHẨM KHĂN KHÔ ĐA NĂNG LIKADO 300G"
          publish="Saturday, 04/02/2023 20:56"
        />
        <NewsItem
          imgNews="https://bizweb.dktcdn.net/thumb/large/100/172/234/articles/ghe-rung.jpg?v=1540889562427"
          title="TOP 5 SẢN PHẨM GHẾ RUNG TỐT NHẤT HIỆN NAY"
          publish="Tuesday, 30/10/2018 15:52"
        />
        <NewsItem
          imgNews="https://bizweb.dktcdn.net/thumb/large/100/172/234/articles/dau-tram-hue-dau-tram-cung-dinh-vy-da.jpg?v=1540128720473"
          title="ĐÁNH GIÁ TOP 5 SẢN PHẨM DẦU TRÀM TỐT NHẤT HIỆN NAY"
          publish="Sunday, 21/10/2018 20:31"
        />
      </div>
    </div>
  )
}

export default ListNews
