import ProductItem from './ProductItem'

const ListProducts = ({
  iconSale,
  lstPrd,
  title,
  isProductByCategoryPage,
}: any) => {
  return (
    <div className="text-black-main font-QuicksandBold py-[14px] mt-5 bg-[#fff] rounded-[10px]">
      {!isProductByCategoryPage && (
        <div
          className="flex gap-[6px] text-[20px] mb-5 px-5 pb-3"
          style={{ borderBottom: '1px solid #bdbdbd' }}
        >
          {iconSale && (
            <img
              src={iconSale}
              alt="icon flash sale"
              className="w-[18px] h-[23px] flex items-center my-auto"
            />
          )}

          <div className="uppercase">{title} LIKADO</div>
        </div>
      )}

      {!isProductByCategoryPage ? (
        <div className="grid grid-cols-4 grid-flow-row gap-5  px-5 ">
          {/* <ProductItem originalPrice="50.000₫" secondaryPrice="37.000₫" />
          <ProductItem secondaryPrice="37.000₫" />
          <ProductItem name={prd.name} />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem /> */}

          {lstPrd?.map((prd: any) => (
            <ProductItem prd={prd} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 grid-flow-row gap-x-5 gap-y-5 px-5 ">
          {lstPrd?.map((prd: any) => (
            <ProductItem prd={prd} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ListProducts
