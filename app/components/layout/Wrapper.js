'use client'
import React from 'react'
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header'
const { Content } = Layout;

const Wrapper = ({ children } ) => {
    return (
        <Layout style={{ minHeight: '100vh' }} className=''>
          <Sidebar />
          <Layout className="site-layout">
            <Header />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, marginTop:20, minHeight: '100vh' }}>
                    { children }
              </div>
            </Content>
          </Layout>
        </Layout>
    )
}

export default Wrapper
