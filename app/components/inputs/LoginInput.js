'use client'
import '../../globals.css'
import React,{ useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';

const LoginInput = ({setauth}) => {
  const [modal2Open, setModal2Open] = useState(false);
  const router = useRouter();
  const localStorageAuth = typeof window !== 'undefined' && window.localStorage.getItem('auth');

  useEffect(() => {
    if (localStorageAuth === "true") {
      router.push("/dashboard", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form2: ', values);
    setauth(true);
    window.localStorage.setItem("auth", "true");
    router.push('/dashboard')
  };

  const onRegister = (values) => {
    console.log('Received values of form: ', values);
    setModal2Open(false)
  };

  return (
    <div className='flex items-center justify-center w-full'>
    <Form
    name="normal_login"
    className="login-form  w-full py-4"
    initialValues={{ remember: true }}
    onFinish={onFinish}
  >
    <Form.Item
      name="username"
      rules={[{ required: true, message: 'Please input your Username!' }]}
      className=''
    >
      <Input className='' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <a className="login-form-forgot" href="">
        Forgot password
      </a>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700">
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

<Form.Item className='flex items-center justify-center w-full' >
  <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700 w-full  ">Enter expenses</Button>
</Form.Item>
</Form>
</div>
</Modal>

    </div>
   
  );
};

export default LoginInput;