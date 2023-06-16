'use client'
import React from 'react'
import { Layout, Switch, notification } from 'antd';
const { Header } = Layout;


const AdminHeader = () => {

    const Logout =()=>{
        window.localStorage.removeItem('auth');
        window.location.href = "/"
      }

    return (
        <Header className=" bg-white">
            <span className=" hidden md:inline-block" style={welcome}> 👋 Hi! Raheem You&apos;re logged in as User </span>
           <p className=' md:hidden inline-block font-bold'>👋  Raheem</p>
            <Switch 
                style={{
                    objectFit: "cover",
                    borderRadius: "16px",
                    cursor: "pointer",
                    float: 'right',
                    marginTop: '22px',
                    background: '#242164',
                }}
                className=' '
                onChange={Logout}
            />
        </Header>
    )
}

export default AdminHeader

const welcome = {
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: '-0.4000000059604645px',
    textAlign: 'left',
    color: '#000000',
};
