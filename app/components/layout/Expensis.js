'use client'
import React, { useState } from 'react'
import { Button, Layout,Space,theme,Modal, Form, DatePicker, Input } from 'antd';
import Tabledata from '../table/table';
import TextArea from 'antd/es/input/TextArea';
const { Content } = Layout;


const Expensis = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setModal2Open(false)
  };

    const {
        token: { colorBgContainer },
      } = theme.useToken();


  return (
    <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className=' text-base'
        >
        <div className='flex flex-col'>
       <div className=' flex flex-col gap-2'>
       <p className=' text-xl font-bold text-black'> Expenses Records</p>
       <Space wrap>
       <Button type="default" className=' bg-blue-500 text-white' onClick={() => setModal2Open(true)}>create new Expenses</Button>
       </Space>
       </div>
       <div className='flex items-center justify-center gap-2 mb-6'>
          <p className=' text-blue-500'>Search Expensis</p>
          <p className='text-blue-500 border-l-2 pl-2 border-black'>Print View</p>
       </div>
       <div className=''>
       <Tabledata/>
       </div>
       <Modal
        title="Record expenses"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
      <div className='flex flex-col p-4'>
      <Form
      layout='vertical'
      style={{ maxWidth: 1200 }}
      className='w-full'
      onFinish={onFinish}
    >
    <div className='flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Select date" name='date' className='w-full'>
    <DatePicker  className='w-full'/>
  </Form.Item>
  <Form.Item label="Amount" name='amount' className='w-full'>
    <Input placeholder="Enter amount" />
  </Form.Item>
    </div>
    <div className=' flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Operator" name='operator' className='w-full'>
    <Input placeholder="Enter Product" />
  </Form.Item>
  <Form.Item label="Driver" name='driver' className='w-full'>
    <Input placeholder="Enter driver" />
  </Form.Item>
    </div>  
  <Form.Item label="Details" name='details' className='w-full'>
  <TextArea rows={4} placeholder="you must enter details" />
  </Form.Item>
   
   <Form.Item className='flex items-center justify-center w-full' >
        <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700 w-full  ">Enter expenses</Button>
      </Form.Item>
    </Form>
      </div>
      </Modal>
  
       </div>
        </Content>
  )
}

export default Expensis