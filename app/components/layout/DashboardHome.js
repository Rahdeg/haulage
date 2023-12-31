'use client'
import React from 'react'
import { Layout,theme } from 'antd';
const { Content } = Layout;

function DashboardHome() {
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
        Report not available
        </Content>
  )
}

export default DashboardHome