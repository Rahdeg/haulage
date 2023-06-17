import React from 'react';
import 'antd/dist/antd'
import { Table } from 'antd';


const localExpenses = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_expensis'))
const localUser = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_user'))

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
  { title: 'Details', dataIndex: 'details', key: '1' },
  { title: 'Amount', dataIndex: 'amount', key: '2' },
  { title: 'Operator', dataIndex: 'operator', key: '3' },
  { title: 'Driver', dataIndex: 'driver', key: '4' },
  { title: 'Entered By', dataIndex: 'entered', key: '5' },
  {
    title: 'Last editted',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const data = [
  {
    key: '1',
    id: '1',
    date: localExpenses.date,
    details: localExpenses.details,
    amount: localExpenses.amount,
    operator: localExpenses.operator,
    driver: localExpenses.driver,
    entered: localUser.name,
  },
];

const Tabledata = () => <Table style={{maxWidth:1200}} columns={columns} dataSource={data} scroll={{ x: true }} />;

export default Tabledata;