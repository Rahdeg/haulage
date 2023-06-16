'use client'
import '../../globals.css'
import React,{ useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import axios, { AxiosError} from 'axios';



const successMsg = (message) => toast.success(message);
const errorMsg = (message) => toast.error(message);


const LoginInput = ({setauth}) => {
  const [modal2Open, setModal2Open] = useState(false);
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const localStorageAuth = typeof window !== 'undefined' && window.localStorage.getItem('auth');

  useEffect(() => {
    if (localStorageAuth === "true") {
      router.push("/dashboard", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish =async (values) => {
     setLoading(true)
        axios({
            method: "POST",
            url: `${baseUrl}api/v1/users/signIn`,
            data: values
        }).then((response) => {
            const {message,user } = response.data;
            setLoading(false)
            successMsg(message)
            window.localStorage.setItem('auth', 'true')
            window.localStorage.setItem('ts_user', JSON.stringify(user))
            setTimeout(() => {
                router.push('/dashboard')
            }, 2000);
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
        })
  };

  const onRegister = (values) => {
    setLoading(true)
        axios({
            method: "POST",
            url: `${baseUrl}api/v1/users/signUp`,
            data: values
        }).then((response) => {
            const {message,user } = response.data;
            setLoading(false)
            successMsg(message)
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

  return (
    <div className='flex items-center justify-center w-full'>
    <ToastContainer />
    <Form
    name="normal_login"
    className="login-form  w-full py-4"
    initialValues={{ remember: true }}
    onFinish={onFinish}
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
      className=''
    >
      <Input className='' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      
        <Checkbox>Remember me</Checkbox>
      

      <a className="login-form-forgot" href="">
        Forgot password
      </a>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700" loading={loading}>
        Log in
      </Button>
    <p onClick={() => setModal2Open(true)} className='cursor-pointer'>register now!</p>
    </Form.Item>
  </Form>
  <Modal
  title="Register"
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
onFinish={onRegister}
>
<div className='flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
<Form.Item label="Name" name='name' className='w-full'>
<Input placeholder="input name" />
</Form.Item>
<Form.Item label="Email" name='email' className='w-full'>
<Input placeholder="input email" />
</Form.Item>
</div>
<div className=' flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
<Form.Item label="Password" name='password' className='w-full'>
<Input placeholder="input password" />
</Form.Item>
<Form.Item label="Confirm Password" name='confirmPassword' className='w-full'>
<Input placeholder="confirm password" />
</Form.Item>
</div>
<div className=' flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
<Form.Item label="Phone Number" name='phoneNumber' className='w-full'>
<Input placeholder="input number" />
</Form.Item>
<Form.Item label="Location" name='location' className='w-full'>
<Input placeholder="input location" />
</Form.Item>
</div>

<Form.Item className='flex items-center justify-center w-full' >
  <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700 w-full  " loading={loading}>Enter expenses</Button>
</Form.Item>
</Form>
</div>
</Modal>

    </div>
   
  );
};

export default LoginInput;