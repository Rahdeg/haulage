import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import React from 'react';

const Avater= () => (
  <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar shape="square" size={50} icon={<UserOutlined />} />
    </Space>
  </Space>
);

export default Avater;