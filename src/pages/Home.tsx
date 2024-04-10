import { productApi } from '@/adapter'
import ListNews from '@/components/listNews/ListNews'
import ListProducts from '@/components/product/ListProducts'
import Support from '@/components/support/Support'
import { QUERY_KEY } from '@/utils/constants'
import { Carousel } from 'antd'
import { useQuery } from 'react-query'

const Home = () => {
  const { data: products = {} } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PRODUCT],
    queryFn: () =>
      productApi.getAllProduct().then((res) => {
        return res?.data?.data
      }),
  })

  return (
    <div className="px-[75px] py-5">
      <Carousel autoplay autoplaySpeed={3000} waitForAnimate={true}>
        <div className="bg-auto relative">
          <img
            src="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/slide-img5.png?1704944126628"
            alt="banner home"
            className="w-full bg-auto rounded-[5px] border-solid border-[1px] border-transparent"
          />
          {/* <div
          className="absolute bottom-0 left-0 top-0 right-[50%]"
          style={{
            background: 'linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)',
          }}
        ></div> */}
        </div>

        <div className="bg-auto relative">
          <img
            src="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/slide-img4.png?1704944126628"
            alt="banner home"
            className="w-full bg-auto rounded-[5px] border-solid border-[1px] border-transparent"
          />
        </div>

        <div className="bg-auto relative">
          <img
            src="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/slide-img1.png?1704944126628"
            alt="banner home"
            className="w-full bg-auto rounded-[5px] border-solid border-[1px] border-transparent"
          />
        </div>

        <div className="bg-auto relative">
          <img
            src="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/slide-img5.png?1704944126628"
            alt="banner home"
            className="w-full bg-auto rounded-[5px] border-solid border-[1px] border-transparent"
          />
        </div>
      </Carousel>
      {/* <div className=" bg-red-500 top-16"></div> */}

      <div>
        <ListProducts
          lstPrd={products?.mhs}
          title="Máy hút sữa"
          iconSale="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/flash.gif?1704944126628"
        />

        <ListProducts lstPrd={products?.klm} title="Khăn lau mặt" />
        <ListProducts lstPrd={products?.kkdn} title="Khăn khô đa năng" />
        <ListProducts lstPrd={products?.btc} title="Bông tẩy trang" />
      </div>

      <ListNews />

      <Support />
    </div>
  )
}

export default Home
