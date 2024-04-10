import { URL } from '@/utils/constants'
import { Link } from 'react-router-dom'

const ProductItem = ({ prd }: any) => {
  return (
    <div className="text-black-nur p-2">
      <Link to={`${URL.PRODUCT}/${prd.id}`} state={{ prd }}>
        <img
          src={prd.img}
          alt="img"
          className="w-[240px] h-[240px] flex justify-center items-center"
        />
        <div className="font-QuicksandBold overflow-hidden text-ellipsis whitespace-nowrap text-black-nur">
          {prd.name}
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {/* {originalPrice && (
          <div>
            <div className="text-brown-primary font-QuicksandBold text-[15px] line-through">
              {originalPrice}
            </div>
          </div>
        )} */}

        <div className="text-[#ff1a00] font-QuicksandBold">
          {Number(prd?.originalPrice).toLocaleString()}₫
        </div>
      </div>
    </div>
  )
}

export default ProductItem
