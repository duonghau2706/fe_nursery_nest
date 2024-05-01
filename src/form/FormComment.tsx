import { PlusOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Upload, UploadFile, UploadProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'

const FormComment = ({
  handleChangeComment,
  handleChangeImg,
  isReset,
}: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>()

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList([...fileList])
    handleChangeImg([...fileList])
  }

  useEffect(() => {
    setFileList(undefined)
  }, [isReset])

  const uploadButton = (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimaryHover: 'black',
          },
        },
      }}
    >
      <Button style={{ border: 0, background: 'none' }} htmlType="submit">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </Button>
    </ConfigProvider>
  )

  const handlerChangeCmt = (e: any) => {
    if (isReset) {
      e.target.value = ''
      return
    }
    handleChangeComment(e?.target?.value)
  }

  return (
    <div className="text-16[px] flex flex-col gap-[6px] w-full mt-[-6px]">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'black',
            controlOutline: '#d9d9d9',
            controlOutlineWidth: 1,
            colorPrimaryHover: '#d9d9d9',
          },
          components: {
            Upload: {
              colorPrimary: '#4096ff',
              // colorPrimary: 'red',
            },
          },
        }}
      >
        <div className="font-[500] text-[16px]">Ảnh minh họa</div>

        <Upload
          name="avatar"
          // action="http://localhost:3000/api/v1/blog/upload"
          listType="picture-card"
          maxCount={1}
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleChange}
          // disabled={type === 'view'}
        >
          {uploadButton}
        </Upload>

        <div className="font-[500] text-[16px] mt-2">
          Cảm nhận thêm về sản phẩm
        </div>

        <TextArea
          placeholder="Giờ là lúc ngôn từ lên ngôi"
          rows={5}
          autoSize={{ minRows: 5, maxRows: 5 }}
          className="placeholder:text-[#727272]"
          onChange={handlerChangeCmt}
        />
      </ConfigProvider>
    </div>
  )
}

export default FormComment
