'use client'
import React, { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  FolderOpenOutlined,
  FolderViewOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Switch } from 'antd';
import Avater from './Avater';
import Image from 'next/image';
import Link from 'next/link';

const { Header, Sider } = Layout;

const Layoutdashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  const Logout =()=>{
    window.localStorage.removeItem('auth');
    window.location.href = "/"
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className=''>
        <div className="demo-logo-vertical" />
        <div className='flex flex-col gap-5 items-center justify-center'>
     <Image src="http://esthelhaulage.com//view/signup/img/icon_img.png" width={170} height={170} alt='logo'/>
     <h1 className={collapsed ?  "hidden" : "text-white font-bold text-base"}>Esthel Haulage Services</h1>
     </div>
        <Menu
          theme="dark"
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
      
     <Layout>
     <Header className=" bg-white flex justify-between">
            <span className=" hidden md:flex" style={welcome}> 👋 Hi! Raheem, You&apos;re logged in as admin </span>
            <Switch 
                style={{
                    objectFit: "cover",
                    borderRadius: "16px",
                    cursor: "pointer",
                    float: 'right',
                    marginTop: '15px',
                    background: '#242164',
                }}
                onChange={Logout}
            />
        </Header>
     </Layout>
      
        
      
    </Layout>
  );
};

export default Layoutdashboard;

const welcome = {
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: '-0.4000000059604645px',
    textAlign: 'left',
    color: '#000000',
};