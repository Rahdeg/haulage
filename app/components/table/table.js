"use client";
import React, { useEffect, useState } from "react";
import "antd/dist/antd";
import { Button, Popconfirm, Table, Space, Form,Input } from "antd";
import axios, { AxiosError } from "axios";
// import {isEmpty} from 'lodash'

// const localExpenses = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_expensis'))

const Tabledata = () => {
  const localUser = JSON.parse(
    typeof window !== "undefined" && window.localStorage.getItem("ts_user")
  );
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [editRowKey, setEditRowKey] = useState('')
  const [form] = Form.useForm();
  const [expenses, setExpenses] = useState(
    [
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage.getItem("ts_expensis")
      ),
    ] || []
  );

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${baseUrl}api/v1/users/${localUser._id}/expenses`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localUser.token}`,
      },
    })
      .then((response) => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const { message, status_code } = error.response.data;
        if (status_code === 500) {
          errorMsg("Something went wrong, please try again later");
        } else {
          errorMsg(message);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const cancel =()=>{
    setEditRowKey("");
  }

  const save = async(key)=>{
    try {
      const row = await form.validateFields();
      const newData =[...dataWithId];
      const index = newData.findIndex((item)=> key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index,1,{...item,...row});
        setExpenses(newData);
        setEditRowKey("");
      }
    } catch (error) {
      console.log('error',error)
    }
  }

  const edit =(record)=>{
    form.setFieldValue({
     details:"",
     ...record
    });
    setEditRowKey(record.id);
  }

  const columns = [
    {
      title: "ID",
      width: 100,
      dataIndex: "id",
      key: "id",
      fixed: "left",
      align: "center",
    },
    {
      title: "Date",
      width: 100,
      dataIndex: "date",
      key: "date",
      fixed: "left",
      sorter: true,
      align: "center",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "1",
      editable: true,
      align: "center",
    },
    { title: "Amount", dataIndex: "amount", key: "2", align: "center" },
    { title: "Operator", dataIndex: "operator", key: "3", align: "center" },
    { title: "Driver", dataIndex: "driver", key: "4", align: "center" },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (_, record) =>{
 const editable = isEditing(record);
        return localUser.role ? (
          <Space>
          <Popconfirm
          title="are you sure you want to delete"
          color="blue"
          onConfirm={() => handleDelete(record)}
        >
          <Button danger type="primary" disabled={editable}>
            Delete
          </Button>
        </Popconfirm>
        {
          editable ? (
           <span>
              <Space size='middle'>
              <Button onClick={()=> save(record.id)} type="primary" style={{marginRight: 8}} className=" bg-blue-600">save</Button>
              <Popconfirm title='are you sure to cancel ?' onConfirm={cancel} color="blue">
              <Button >cancel</Button>
              </Popconfirm>
              
              </Space>
           </span>
          ):
          (
            <Button onClick={()=> edit(record)} type="primary" className=" bg-blue-600">
         Edit
        </Button>
          )
        }
        
          </Space>
          
        ) : null;
      }
        
    },
  ];

  const dataWithId = expenses.map((items, idx) => ({
    ...items,
    id: idx + 1,
  }));

  const isEditing = (record)=>{
    return record.id === editRowKey;
  }

  // const modifiedData = expenses.map(({body,...items})=>({
  //   ...items,
  //   key:items.id,
  //   message: isEmpty(body)? items.message : body,
  // }));

  const handleDelete = (value) => {
    if (localUser.role === "admin") {
      const dataSource = [...dataWithId];
      const filteredata = dataSource.filter((item) => item.id !== value.id);
      setExpenses(filteredata);
    }
  };

  const mergedColumns = columns.map((col)=>{
    if(!col.editable){
      return col;
    }
    return {
      ...col,
      onCell:(record)=>({
        record,
        dataIndex:col.dataIndex,
        title:col.title,
        editing: isEditing(record),
      })
    }
  })

  const EditableCell = ({editing,dataIndex,title,record,children,...restProps})=>{
      const input = <input/>;
      return (
        <td {...restProps}>
        {
          editing ? (
            <Form.Item name={dataIndex} style={{margin: 0}} rules={[{
              required: true,
              message:`please input some values in the ${title} field`
            }]}>
            {input}
            </Form.Item>
          ):(children)
        }
        </td>
      )
  }

  return (
    <Form form={form} component={false}>
    <Table
    style={{ maxWidth: 1200 }}
    components={{
      body:{
        cell: EditableCell,
      }
    }}
    columns={mergedColumns}
    dataSource={dataWithId}
    scroll={{ x: true }}
    loading={loading}
    bordered
  /> 
    </Form>
    
  );
};
export default Tabledata;
