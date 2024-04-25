import { Button, ConfigProvider, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const Contact = () => {
  return (
    <div className="mx-[75px] my-5 px-4 py-3 pb-7 text-black-main border-solid border-transparent rounded-[10px] bg-white text-[16px]">
      <div className="text-green-main font-[700] text-[25px] mb-3">Liên hệ</div>

      <div className="flex gap-5">
        <div className="flex flex-col gap-[6px]">
          <div>
            <strong>Trụ sở chính: </strong>Số 205/42 Phố Thịnh Liệt, Quận Hoàng
            Mai, Thành phố Hà Nội, Việt Nam
          </div>
          <div>
            <strong>Email:</strong> kd@likado.vn
          </div>
          <div>
            <strong>Hotline: </strong> 0984 019 869
          </div>

          <ConfigProvider
            theme={{
              token: {
                controlOutline: 'rgba(5, 145, 255, 0.1)',
                controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
                colorPrimaryHover: '#d9d9d9',
              },
              components: {
                Input: {
                  activeBorderColor: '#1677ff',
                  hoverBorderColor: '#4096ff',
                },
              },
            }}
          >
            <Form className="flex flex-col gap-4 mt-3">
              <Form.Item name="name">
                <Input
                  placeholder="Họ tên *"
                  className="placeholder:text-[#495057cf]"
                  style={{ fontSize: '16px' }}
                />
              </Form.Item>
              <Form.Item name="email">
                <Input
                  placeholder="Email *"
                  className="placeholder:text-[#495057cf]"
                  style={{ fontSize: '16px' }}
                />
              </Form.Item>
              <Form.Item name="message">
                <TextArea
                  rows={3}
                  placeholder="Lời nhắn *"
                  style={{ fontSize: '16px' }}
                  className="placeholder:text-[#495057cf]"
                />
              </Form.Item>
            </Form>
          </ConfigProvider>

          <div className="my-[10px]">* Thông tin bắt buộc</div>
          {/* <ConfigProvider
            theme={{
              token: {
                controlOutline: 'rgba(5, 145, 255, 0.1)',
                controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
                colorPrimary: 'white',
                colorPrimaryHover: '#d9d9d9',
              },
              components: {
                Button: {
                  // colorPrimary: 'white',
                  colorPrimaryHover: 'white',
                },
              },
            }}
          > */}
          <Button className="w-fit cursor-pointer bg-green-main text-white font-[700] px-[12px] py-[20px] flex items-center font-Quicksand text-[16px] hover:bg-[#01921ee3]">
            Gửi liên hệ
          </Button>
          {/* </ConfigProvider> */}
        </div>

        <div className="w-[534px] h-[456px]">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.335011834538!2d106.63100571400804!3d10.785632992315257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea916b3a601%3A0x1d3ee2071a3f2835!2zNzIvMTIgTMOqIFbEg24gUGhhbiwgUGjDuiBUaOG7jSBIb8OgLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1679405538965!5m2!1svi!2s"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact
