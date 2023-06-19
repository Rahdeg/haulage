import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios, { AxiosError } from "axios";

const DataTable = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const localUser = JSON.parse(
    typeof window !== "undefined" && window.localStorage.getItem("ts_user")
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${baseUrl}api/v1/users/${localUser._id}/expenses`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localUser.token}`,
      },
      data: values,
    })
      .then((response) => {
        setGridData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          // Access to config, request, and response error
          const { message, status_code } = error.response?.data;
          if (status_code === 500) {
            errorMsg("Something went wrong, please try again later");
          } else {
            errorMsg(message);
          }
        } else {
          // Just a stock error
        }
      })
      .finally(setModal2Open(false));
  };

  const dataWithAge = gridData.map((items) => ({
    ...items,
    age: Math.floor(Math.random() * 6) + 20,
  }));

  const modifiedData = dataWithAge.map((body, ...item) => ({
    ...item,
    key: item.id,
    message: body,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
        title: 'Name',
        dataIndex: 'name',
        align: "center",
        ediTable:true
    },
  ];

  return <div>
  <Table columns={columns} dataSource={modifiedData} bordered loading={loading}/> 
   </div>;
};

export default DataTable;
