"use client";
import React, { useEffect, useState } from "react";
import "antd/dist/antd";
import { Button, Popconfirm, Table, Space, Form, Input } from "antd";
import axios, { AxiosError } from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import {isEmpty} from 'lodash'

// const localExpenses = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('ts_expensis'))

const Tabledata = () => {
  const localUser = JSON.parse(
    typeof window !== "undefined" && window.localStorage.getItem("ts_user")
  );
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [editRowKey, setEditRowKey] = useState("");
  const [sortedinfo, setSortedinfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchColText, setSearchColText] = useState("");
  const [searchCol, setSearchCol] = useState("");
  const [form] = Form.useForm();
  const [expenses, setExpenses] = useState(
    [
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage.getItem("ts_expensis")
      ),
    ] || []
  );
  let [filteredData] = useState();

  const api = axios.create({
    baseURL: `${baseUrl}api/v1/users/${localUser._id}/expenses`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localUser.token}`,
    },
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/");
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      const { message, status_code } = error;
      if (status_code === 500) {
        errorMsg("Something went wrong, please try again later");
      } else {
        errorMsg(message);
      }
    }
  };

  const getColoumSearchProps = (dataIndex) => ({
    filterDropDowm: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 0 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 0, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{width: 90}}
          >
          Search
          </Button>

          <Button
            type="primary"
            onClick={() => handleResetCol(clearFilters)}
            size="small"
            style={{width: 90}}
          >
          Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon:(filtered)=>(
      <SearchOutlined style={{color: filtered ? "#ff1818" : undefined}}/>
    ),
    onFilter:(value, record) =>
    record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()): "",
    render: (text) => 
    searchCol === dataIndex ? (
      <Highlighter
      highlightStyle={{ backgroundColor:"#ffc069", padding:0}}
      searchWords={[searchColText]}
      autoEscape
      textToHighlight={text ? text.toString() : ""}
      />
    ):(text),

  });

  const cancel = () => {
    setEditRowKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataWithId];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setExpenses(newData);
        setEditRowKey("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const edit = (record) => {
    form.setFieldValue({
      details: "",
      ...record,
    });
    setEditRowKey(record.id);
  };

  const handleChange = (...sorter) => {
    const { order, field } = sorter[2];
    setSortedinfo({ colunmKey: field, order });
  };

  const handleSearchCol =(selectedKeys,confirm,dataIndex)=>{
    confirm();
    setSearchColText(selectedKeys[0]);
    setSearchCol(dataIndex);
  }

  const handleResetCol = ( clearFilters)=>{
    clearFilters();
    setSearchColText("");
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
      sorter: (a, b) => a.date.length - b.date.length,
      sortOrder: sortedinfo.colunmKey === "date" && sortedinfo.order,
      ...getColoumSearchProps("date"),
      align: "center",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "1",
      editable: true,
      align: "center",
      ...getColoumSearchProps("details")
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "2",
      align: "center",
    },
    {
      title: "Operator",
      dataIndex: "operator",
      key: "3",
      align: "center",
      ...getColoumSearchProps("operator")
    },
    {
      title: "Driver",
      dataIndex: "driver",
      key: "4",
      align: "center",
      ...getColoumSearchProps("driver")
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 100,
      render: (_, record) => {
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
            {editable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={() => save(record.id)}
                    type="primary"
                    style={{ marginRight: 8 }}
                    className=" bg-blue-600"
                  >
                    save
                  </Button>
                  <Popconfirm
                    title="are you sure to cancel ?"
                    onConfirm={cancel}
                    color="blue"
                  >
                    <Button>cancel</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button
                onClick={() => edit(record)}
                type="primary"
                className=" bg-blue-600"
              >
                Edit
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const dataWithId = expenses.map((items, idx) => ({
    ...items,
    id: idx + 1,
  }));

  const isEditing = (record) => {
    return record.id === editRowKey;
  };

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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `please input some values in the ${title} field`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const reset = () => {
    setSortedinfo({});
    setSearchText("");
    loadData();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      loadData();
    }
  };

  const globalSearch = () => {
    filteredData = dataWithId.filter((value) => {
      return (
        value.details.toLowerCase().includes(searchText.toLowerCase()) ||
        value.operator.toLowerCase().includes(searchText.toLowerCase()) ||
        value.driver.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setExpenses(filteredData);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Enter Search Text"
          onChange={handleSearch}
          type="text"
          allowClear
          value={searchText}
        />
        <Button onClick={globalSearch} className=" bg-blue-500">
          {" "}
          Search
        </Button>
        <Button onClick={reset}> Reset</Button>
      </Space>
      <Form form={form} component={false}>
        <Table
          style={{ maxWidth: 1200 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={
            filteredData && filteredData.length ? filteredData : dataWithId
          }
          scroll={{ x: true }}
          loading={loading}
          onChange={handleChange}
          bordered
        />
      </Form>
    </div>
  );
};
export default Tabledata;
