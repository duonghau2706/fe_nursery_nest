import { ConfigProvider } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const FormComment = () => {
  return (
    <div className="text-16[px] flex flex-col gap-[6px] w-full mt-[-6px]">
      <div className="font-[500] text-[16px]">Cảm nhận thêm về sản phẩm</div>
      <ConfigProvider
        theme={{
          token: {
            controlOutline: '#d9d9d9',
            controlOutlineWidth: 1,
            colorPrimaryHover: '#d9d9d9',
          },
        }}
      >
        <TextArea
          placeholder="Giờ là lúc ngôn từ lên ngôi"
          rows={5}
          autoSize={{ minRows: 5, maxRows: 5 }}
          className="placeholder:text-[#727272]"
        />
      </ConfigProvider>
    </div>
  )
}

export default FormComment
