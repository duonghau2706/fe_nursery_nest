import { productApi } from '@/adapter'
import categoryApi from '@/adapter/category'
import ListProducts from '@/components/product/ListProducts'
import { QUERY_KEY, URL } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { ConfigProvider, Radio } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
  const { type } = useParams()

  const [lstPrdByType, setLstPrdByType]: any = useState()
  const [range, setRange]: any = useState()
  const [prop, setProp]: any = useState()

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

  // const ctg = CATEGORIES.filter(
  //   (category) => category.type === type?.toUpperCase()
  // )

  const ctg = dataCategory.filter(
    (category: any) => category?.url_name === type?.toLowerCase()
  )

  const prds = dataProduct.filter(
    (prd: any) => prd?.category_id === ctg?.[0]?.id
  )

  //nme of category
  const title = ctg?.[0]?.name

  //categoryId
  const categoryId = ctg?.[0]?.id
  // const cstLstPrdByType = handleFilterCategoryFromDataRes(
  //   categoryId,
  //   products
  // )

  useEffect(() => {
    // console.log('typeofcate', categoryId)
    // console.log('product eff', products)
    setRange({ ...range, value: undefined })
    setProp({ ...prop, value: undefined })
    setLstPrdByType(prds)
    // setLstPrdByType(handleFilterCategoryFromDataRes(categoryId, products))
  }, [type])
  // const lstPrdByType = handleFilterCategoryFromDataRes(categoryId, products)

  // useEffect(() => {
  //   setLstPrdByType(handleFilterCategoryFromDataRes(categoryId, products))
  // }, [type])

  const priceOptions = [
    { label: 'Giá dưới 30.000đ', value: 0 },
    { label: '30.000đ - 100.000đ', value: 1 },
    { label: '100.000đ - 200.000đ', value: 2 },
    { label: 'Giá trên 200.000đ', value: 3 },
  ]

  const sortOptions = [
    { label: 'A → Z', value: 0 },
    { label: 'Z → A', value: 1 },
    { label: 'Giá tăng dần', value: 2 },
    { label: 'Giá giảm dần', value: 3 },
    { label: 'Hàng mới nhất', value: 4 },
  ]

  // const renderProductsByCondition = (
  //   arr: any,
  //   condition: string,
  //   value: number
  // ) => {
  //   console.log('arrr hea', arr)

  //   if (condition == 'range') {
  //     const newArr = [...arr]
  //     switch (value) {
  //       case 0:
  //         return newArr?.filter((item: any) => item?.originalPrice < 30000)
  //       case 1:
  //         return newArr?.filter(
  //           (item: any) =>
  //             item?.originalPrice >= 30000 && item?.originalPrice < 40000
  //         )
  //       case 2:
  //         return newArr?.filter(
  //           (item: any) =>
  //             item?.originalPrice >= 40000 && item?.originalPrice < 50000
  //         )
  //       case 3:
  //         return newArr?.filter((item: any) => item?.originalPrice >= 50000)

  //       default:
  //         return []
  //     }
  //   } else {
  //     return []
  //   }
  // }
  const productMutation = useMutation({
    mutationFn: (params: any) => productApi.sortByCondition(params),
    onSuccess: (res) => {
      // console.log('res', res)

      // queryClient.invalidateQueries([QUERY_KEY.GET_ALL_PRODUCT])
      setLstPrdByType(res?.data?.data)
      // setAvgRated(res?.data?.data[0].avg_rated)
    },
    // onError: (err) => {
    //   console.log('err', err)
    // },
  })

  // const renderPrdMutation = (value: number)

  const renderRange = (value: number) => {
    switch (value) {
      case 0:
        return { value: 0, maxRange: 30000 }
      case 1:
        return { value: 1, minRange: 30000, maxRange: 100000 }
      case 2:
        return { value: 2, minRange: 100000, maxRange: 200000 }
      case 3:
        return { value: 3, minRange: 200000 }
      default:
        return
    }
  }

  const renderProp = (value: number) => {
    switch (value) {
      case 0:
        return { value: 0, cmpType: 'name', orderType: 'asc' }
      case 2:
        return { value: 2, cmpType: 'original_price', orderType: 'asc' }
      case 1:
        return { value: 1, cmpType: 'name', orderType: 'desc' }
      case 3:
        return { value: 3, cmpType: 'original_price', orderType: 'desc' }
      case 4:
        return { value: 4, cmpType: 'created_at', orderType: 'desc' }
      default:
        return
    }
  }

  const handleChangePriceRange = (e: any) => {
    setRange(renderRange(e?.target?.value))
    // console.log('lstPrdByType', lstPrdByType)
    // console.log(
    //   'e',
    //   e?.target?.value,
    //   renderProductsByCondition(cstLstPrdByType, 'range', e?.target?.value)
    // )
    // setLstPrdByType(
    //   renderProductsByCondition(cstLstPrdByType, 'range', e?.target?.value)
    // )
    const dataMutate = cleanObj({
      categoryId,
      minRange: renderRange(e?.target?.value)?.minRange,
      maxRange: renderRange(e?.target?.value)?.maxRange,
      cmpType: prop?.cmpType,
      type: prop?.orderType,
    })

    productMutation.mutate(dataMutate)
  }

  const handlePropChange = (e: any) => {
    setProp(renderProp(e?.target?.value))

    const dataMutate = cleanObj({
      categoryId,
      minRange: range?.minRange,
      maxRange: range?.maxRange,
      cmpType: renderProp(e?.target?.value)?.cmpType,
      type: renderProp(e?.target?.value)?.orderType,
    })

    productMutation.mutate(dataMutate)
  }

  const createUrlName = (text: string) => {
    return text
      .toLowerCase() // Chuyển đổi tất cả ký tự thành chữ thường
      .normalize('NFD') // Chuẩn hóa chuỗi về dạng NFC để giữ lại ký tự đặc biệt như đ, ê, ă, ô
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ tất cả các ký tự diacritic (dấu thanh)
      .replace(/đ/g, 'd') // Thay thế ký tự "đ" thành "d"
      .replace(/[^\w\s]/g, '') // Loại bỏ các ký tự đặc biệt
      .replace(/\s+/g, '_') // Thay thế khoảng trắng bằng dấu gạch dưới
  }

  const handleResetFilter = () => {
    setRange(undefined)
    setProp(undefined)
    setLstPrdByType(prds)
  }

  return (
    <div className="flex gap-8 mx-[75px] my-5 px-4 py-3 pb-7 text-black-main border-solid border-transparent rounded-[10px] bg-white text-[16px]">
      <div className="flex flex-col gap-2 max-w-[25%]">
        <div>
          <div className="text-green-main font-[700] text-[25px] mb-1">
            Bộ lọc sản phẩm
          </div>
          <i>Giúp lọc nhanh sản phẩm bạn tìm kiếm</i>
          {(range || prop) && (
            <div
              className="text-red-inactive mt-2 cursor-pointer"
              onClick={handleResetFilter}
            >
              Xóa bộ lọc
            </div>
          )}
        </div>

        <div>
          <div className="font-[700] text-[18px] mb-1">Lọc giá</div>
          <div>
            <div className="flex gap-1">
              <ConfigProvider theme={{ token: { colorPrimary: '#01921d' } }}>
                <Radio.Group
                  className="flex flex-col gap-[4px]"
                  options={priceOptions}
                  value={range?.value}
                  onChange={handleChangePriceRange}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[6px] mt-5">
          <div className="font-[700] text-[18px] mb-1 uppercase">Danh mục</div>
          <div className="flex flex-col gap-2">
            {dataCategory?.map((cate: any) => {
              const urlName = createUrlName(cate?.name)

              return (
                <Link
                  to={`${URL.CATEGORY}/${urlName}`}
                  className={
                    type === `${urlName}`
                      ? 'text-green-main hover:text-green-main'
                      : 'text-black-nur hover:text-green-main'
                  }
                >
                  {cate?.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="text-black-nur w-full">
        <div className="text-[18px] uppercase font-[800] py-2 border border-solid border-gray-borderSecondary border-x-0 border-t-0 w-full">
          {title}
        </div>

        <div className=" flex gap-1 py-4 border border-solid border-gray-borderSecondary border-x-0 border-t-0 ">
          <div className="w-[10%] text-[16px] font-[800]">Sắp xếp:</div>

          <ConfigProvider theme={{ token: { colorPrimary: '#01921d' } }}>
            <Radio.Group
              options={sortOptions}
              value={prop?.value}
              onChange={handlePropChange}
              className="flex w-full"
            />
          </ConfigProvider>
        </div>

        <ListProducts isProductByCategoryPage lstPrd={lstPrdByType} />
      </div>
    </div>
  )
}

export default Category
