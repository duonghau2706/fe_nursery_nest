import { URL } from '@/utils/constants'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const OrderItem = ({
  setOrderDetail,
  id,
  orderCode,
  statusMoney,
  statusShip,
  full_address,
  totalMoney,
  createdAt,
}: any) => {
  const navigate = useNavigate()

  const onSelectOrderItem = () => {
    setOrderDetail(true)
    navigate(`${URL.ACCOUNT}/orders/${id}`)
  }

  return (
    <div
      className="cursor-pointer hover:border-[#ffcc00] hover:shadow-border flex flex-col gap-[2px] px-4 pt-[14px] pb-[10px] rounded-[10px] border border-solid border-gray-borderSecondary"
      onClick={onSelectOrderItem}
    >
      <div className="flex justify-between">
        <div className="flex">
          <div className="text-[#ffcc00] font-[600]">#{orderCode}</div>
          <div className="mx-1">-</div>
          <div
            className={statusMoney === 0 ? 'text-[#dc3545]' : 'text-green-main'}
          >
            {statusMoney === 0 ? 'Chưa thu tiền' : 'Đã thu tiền'}
          </div>
          <div className="mx-1">-</div>
          <div
            className={statusShip === 0 ? 'text-[#dc3545]' : 'text-green-main'}
          >
            {statusShip === 0 ? 'Chưa chuyển' : 'Đã chuyển'}
          </div>
        </div>

        <div>
          <div className="text-[#ff0000] font-[800]">
            {Number(totalMoney).toLocaleString()}₫
          </div>
        </div>
      </div>

      <div className="font-[800]">Địa chỉ: {full_address}</div>

      <div className="text-[14px]">
        Ngày: {moment(createdAt)?.format('DD/MM/YYYY')}
      </div>
    </div>
  )
}

export default OrderItem
