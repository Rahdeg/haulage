'use client'
import React from 'react'
import { Layout,theme,Button,Space } from 'antd';
import Tabledata from '../table/table';
import Link from 'next/link';
const { Content } = Layout;


const InvoiceHome = () => {
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
       <p className=' text-xl font-bold text-black'> Invoice Records</p>
       <Space wrap>
       <Link href='/dashboard/Invoice/create'>
       <Button type="default" className=' bg-blue-500 text-white'>create new invoice</Button>
       </Link>
       
       </Space>
       </div>
       <div className='flex items-center justify-center gap-2 mb-6'>
          <p className=' text-blue-500'>Search Invoice</p>
          <p className='text-blue-500 border-l-2 pl-2 border-black'>Print View</p>
       </div>
       <div className='mb-14'>
       <Tabledata/>
       </div>
       
       </div>
        </Content>
  )
}

export default InvoiceHome