import { productApi } from '@/adapter'
import ListNews from '@/components/listNews/ListNews'
import ListProducts from '@/components/product/ListProducts'
import Support from '@/components/support/Support'
import { QUERY_KEY } from '@/utils/constants'
import { Carousel } from 'antd'
import { useQuery } from 'react-query'
import bannerLikado from '@/assets/image/bannerLikado.webp'
import categoryApi from '@/adapter/category'

const Home = () => {
  const { data: dataProduct = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PRODUCT],
    queryFn: () =>
      productApi.getAll().then((res) => {
        return res?.data?.data?.listProduct
      }),
  })

  const { data: dataCategory = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CATEGORIES],
    queryFn: () =>
      categoryApi.getAllCategories().then((res) => {
        return res?.data?.data?.listCategory
      }),
  })
  // const arr = []

  // dataCategory?.map((cate: any, idx: number) => {
  //   dataProduct?.map((prd: any) => {
  //     if (cate?.id === prd?.category_id) {
  //       arr.push(prd)
  //     }
  //   })
  // })

  return (
    <div className="px-[75px] py-5">
      <Carousel autoplay autoplaySpeed={3000} waitForAnimate={true}>
        <div className="bg-auto relative">
          <img
            src={bannerLikado}
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
      </Carousel>
      {/* <div className=" bg-red-500 top-16"></div> */}

      <div>
        {/* <ListProducts
          lstPrd={products?.mhs}
          title="Máy hút sữa"
          iconSale="https://bizweb.dktcdn.net/100/480/125/themes/900039/assets/flash.gif?1704944126628"
        /> */}

        {dataCategory?.map((cate: any) => {
          const lstPrd: any = []
          dataProduct?.forEach((prd: any) => {
            if (prd?.category_id === cate?.id) {
              return lstPrd.push({ ...prd, title: cate?.name })
            }
          })

          return <ListProducts lstPrd={lstPrd} title={lstPrd?.[0]?.title} />
        })}

        {/* <ListProducts lstPrd={products?.klm} title="Khăn lau mặt" />
        <ListProducts lstPrd={products?.kkdn} title="Khăn khô đa năng" />
        <ListProducts lstPrd={products?.btc} title="Bông tẩy trang" /> */}
      </div>

      <ListNews />

      <Support />
    </div>
  )
}

export default Home
