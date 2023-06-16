'use client'
import React, { useEffect } from 'react'
import { Layout, Switch, notification } from 'antd';
const { Header } = Layout;


const AdminHeader = () => {
    const localUser = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_user'))
    

    const Logout =()=>{
        window.localStorage.removeItem('auth');
        window.localStorage.removeItem('ts_user')
        window.location.href = "/"
      }

      

    return (
        <Header className=" bg-white">
            <span className=" hidden md:inline-block" style={welcome}> 👋 Hi! {localUser.name} You&apos;re logged in as {localUser.role} </span>
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
