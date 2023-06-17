'use client'
import React, { useState } from 'react'
import { Button, Layout,Space,theme,Modal, Form, DatePicker, Input } from 'antd';
import Tabledata from '../table/table';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import axios, { AxiosError} from 'axios';
const { Content } = Layout;


const successMsg = (message) => toast.success(message);
const errorMsg = (message) => toast.error(message);

const Expensis = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const localUser = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_user'))

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setLoading(true)
    axios({
        method: "POST",
        url: `${baseUrl}api/v1/users/${localUser._id}/expenses`,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localUser.token}`
      },
        data: values
    }).then((response) => {
        const {message,expenses } = response.data;
        setLoading(false)
        successMsg(message)
        window.localStorage.setItem('ts_expensis', JSON.stringify(expenses))
        setTimeout(() => {
          setModal2Open(false)
        }, 1000);
        router.refresh();
    }).catch((error) => {
        setLoading(false)
        if (axios.isAxiosError(error))  {
          // Access to config, request, and response error
          const { message, status_code } = error.response?.data
          if(status_code === 500){
            errorMsg("Something went wrong, please try again later")
          }else{
            errorMsg(message)
          }
        } else {
          // Just a stock error
        }
    }).finally(setModal2Open(false))

    
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
        <ToastContainer />
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
        <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700 w-full" loading={loading}>Enter expenses</Button>
      </Form.Item>
    </Form>
      </div>
      </Modal>
  
       </div>
        </Content>
  )
}

export default Expensis