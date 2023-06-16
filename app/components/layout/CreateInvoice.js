'use client'
import React from 'react'
import { Layout,theme } from 'antd';
import Forms from '../form/Form';
const { Content } = Layout;

const CreateInvoice = () => {
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
        <p className=' text-xl font-bold text-black mb-4'> Create Invoice</p>
        <Forms/>
        </div>
       
        </Content>
  )
}

export default CreateInvoice