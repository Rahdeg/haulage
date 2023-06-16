'use client'
import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';


const Forms = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log('e',e?.fileList)
    return e?.fileList;

  };

  return (
    <Form
      layout='vertical'
      style={{ maxWidth: 1200 }}
      className='w-full'
      onFinish={onFinish}
    >
    <div className='flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Select date" name='date' className='w-full'>
    <DatePicker  className='w-full'/>
  </Form.Item>
  <Form.Item label="Client" name='client' className='w-full'>
  <Select>
  <Select.Option value="axin">axin</Select.Option>
  <Select.Option value="cway">cway</Select.Option>
  <Select.Option value="viju">viju</Select.Option>
  <Select.Option value="bigi">bigi</Select.Option>
  <Select.Option value="sharp">sharp</Select.Option>
</Select>
  </Form.Item>
  <Form.Item label="Item" name='item' className='w-full'>
    <Input placeholder="Enter items" />
  </Form.Item>
    </div>
    <div className=' flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Quantity" name='quantity' className='w-full'>
    <Input placeholder="Enter Product" />
  </Form.Item>
  <Form.Item label="Select Destination" name='destination' className='w-full'>
  <Select>
  <Select.Option value="Ogun">Ogun</Select.Option>
  <Select.Option value="Osun">Osun</Select.Option>
  <Select.Option value="Edo">Edo</Select.Option>
  <Select.Option value="Abuja">Abuja</Select.Option>
  <Select.Option value="lagos">Lagos</Select.Option>
</Select>
  </Form.Item>
  <Form.Item label="Amount" name='amount' className='w-full'>
    <Input placeholder="Enter amount" />
  </Form.Item>
    </div>

    <div className='flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Way bill" name='waybill' className='w-full'>
    <Input placeholder="Enter waybill" />
  </Form.Item>
  <Form.Item label="Receiver" name='receiver' className='w-full'>
  <Select>
  <Select.Option value="Self">Self</Select.Option>
  <Select.Option value="Others">Others</Select.Option>
</Select>
  </Form.Item>
  <Form.Item label="Receivers Phone" name='receiversPhone' className='w-full'>
    <Input placeholder="Enter receivers phone" />
  </Form.Item>
    </div>
      
    <div className='flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Operator/Vehicle" name='operator' className='w-full'>
    <Select>
    <Select.Option value="mandisle">Man diesel(Kosere)</Select.Option>
    <Select.Option value="Volvo">Mazda (oke) </Select.Option>
  </Select>
  </Form.Item>
  <Form.Item label="Driver" name='driver' className='w-full'>
  <Select>
  <Select.Option value="Raheem">Raheem</Select.Option>
  <Select.Option value="John">john</Select.Option>
</Select>
  </Form.Item>
  <Form.Item label="Depature Time" name='deopartTime' className='w-full'>
  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className='w-full'/>
  </Form.Item>
    </div>

    <div className='flex flex-col md:flex-row items-center justify-center gap-5 w-full'>
    <Form.Item label="Disiel expenses" name='disielExpenses' className='w-full'>
    <Input placeholder="Enter disiel expenses" />
  </Form.Item>
  <Form.Item label="Trip expenses" name='tripExpensis' className='w-full'>
  <Input placeholder="Enter trip expenses" />
  </Form.Item>
  <Form.Item label="Details" name='details' className='w-full'>
  <TextArea rows={4} />
  </Form.Item>
    </div>
    <Form.Item label="Snapshot" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 1 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
     
      <Form.Item className='flex items-center justify-center w-full' >
        <Button type="primary" htmlType="submit" className="login-form-button bg-blue-700 w-full  ">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;