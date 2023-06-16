'use client'
import React, { useEffect, useState } from 'react';
import '../../globals.css'
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FolderViewOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const { Sider } = Layout

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setCollapsed(true);
      } else if (width >= 600 && width < 1200) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Set initial screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 


    return (
        <>
        <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar'>
        <div className="demo-logo-vertical" />
        <div className='flex flex-col gap-5 items-center justify-center'>
         { /*<Image src="http://esthelhaulage.com//view/signup/img/icon_img.png" width={120} height={120} alt='logo'/>*/}
    <p>COMPANY LOGO</p>  
     <h1 className={collapsed ?  "hidden" : " text-black font-semibold text-base"}>Company Haulage Services</h1>
     </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <CalendarOutlined />,
              label:<Link href={`/dashboard`}>Central Report</Link> ,
            },
            {
              key: '2',
              icon: <FolderViewOutlined />,
              label: <Link href={`/dashboard/Invoice/snap`}>View Invoice</Link>,
            },
            {
              key: '3',
              icon: <FolderOpenOutlined />,
              label: <Link href={`/dashboard/Invoice/create`}>Create Invoice</Link>,
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: <Link href={`/dashboard/expensis`}>Expenses</Link>,
            },
          ]}
        />
      </Sider>
        </>
    )
}

export default Sidebar
const menuItem = {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '30px',
    letterSpacing: '-0.4000000059604645px',
    textAlign: 'left',
    color: '#000000',
  }