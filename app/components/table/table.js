'use client'
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd'
import { Table } from 'antd';
import axios, { AxiosError} from 'axios';



// const localExpenses = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_expensis'))

const Tabledata = () => {

  const localUser = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_user'))
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const [expenses, setExpenses] = useState([JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_expensis'))] || [])

  useEffect(() => {
    
        axios({
            method: 'GET',
            url: `${baseUrl}api/v1/users/${localUser._id}/expenses`,
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${localUser.token}`
            },
          }).then((response) => {
            setExpenses(response.data);
            
          }).catch((error) => {
           
            const { message, status_code } = error.response.data
            if(status_code === 500){
              errorMsg("Something went wrong, please try again later")
            }else{
              errorMsg(message)
            }
        })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  
  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
    },
    {
      title: 'Date',
      width: 100,
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      sorter: true,
    },
    { title: 'Details', dataIndex: 'details', key: '1' ,editable: true},
    { title: 'Amount', dataIndex: 'amount', key: '2' },
    { title: 'Operator', dataIndex: 'operator', key: '3' },
    { title: 'Driver', dataIndex: 'driver', key: '4' },
  ];
  
  
  const dataWithId = expenses.map((items,idx) => ({
    ...items,
    id: idx+1,
  }));


  return (
    <Table style={{maxWidth:1200}} columns={columns} dataSource={dataWithId} scroll={{ x: true }} />
  )
}

export default Tabledata;