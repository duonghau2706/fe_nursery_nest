import iconClose from '@/assets/image/iconClose.svg'
import { Button, ConfigProvider, Modal } from 'antd'
import styles from '@/common.module.scss'
import { useState } from 'react'

const ModalComment = ({
  isOpen,
  setIsOpen,
  content,
  header,
  onSave,
  footer,
  disabledOnSave = true,
}: {
  isOpen: boolean
  setIsOpen: any
  content?: any
  header?: any
  footer?: any
  onSave?: any
  disabledOnSave?: any
  loading?: any
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleCancel = () => {
    setIsOpen(false)
  }

  const onFinish = () => {
    // onSave()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSave()
    }, 2000)
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={footer ? 500 : 800}
      title={
        <div className="flex pt-6 pb-0 px-4 text-black">
          <h3 className="w-full flex justify-center">{header}</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        footer ? (
          disabledOnSave ? (
            <div className="flex justify-center gap-10 pb-4">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#0958d9',
                  },
                }}
              >
                <Button
                  className="text-black bg-white w-[100px] h-10 text-[14px] border-black font-medium"
                  onClick={handleCancel}
                >
                  Hủy bỏ
                </Button>
              </ConfigProvider>
              <div className={`${styles.removeHoverBtnAntd}`}>
                <Button
                  className="text-white bg-yellow-primary w-[100px] h-10 text-[14px] font-medium"
                  onClick={onFinish}
                  loading={loading}
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-10 pb-4">
              <Button
                className="text-black bg-white w-[100px] h-10 text-sm border-black font-medium"
                onClick={handleCancel}
              >
                Hủy bỏ
              </Button>
            </div>
          )
        ) : (
          false
        )
      }
    >
      <div className="p-6 flex justify-center text-[14px]">{content}</div>
    </Modal>
  )
}

export default ModalComment
