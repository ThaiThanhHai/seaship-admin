import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonAdd from "../../components/button/buttonAdd";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/shipper.scss";

const Shipper = () => {
  const [shipperList, setShipperList] = useState([]);
  const renderStatus = (status: string) => {
    if (status === "on") {
      // return "Đang xử lý";
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "green" }}
        >
          Đang hoạt động
        </Button>
      );
    }
    if (status === "off") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "grey" }}
        >
          Không hoạt động
        </Button>
      );
    }

    if (status === "off") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "blue" }}
        >
          Đang giao hàng
        </Button>
      );
    }
  };
  const dataColumns = [
    { field: "name", headerName: "Họ tên", width: 220 },
    { field: "phone", headerName: "Số điện thoại", width: 160 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "avatar",
      headerName: "Ảnh",
      width: 100,
      renderCell: ({ row }: CellType) => {
        return <img style={{ width: 50 }} src={row.avatar} alt="avatar" />;
      },
    },
    {
      field: "age",
      headerName: "Tuổi",
      width: 100,
    },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: ({ row }: CellType) => {
        return renderStatus(row.status);
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">Xem</div>
            <div className="deleteButton">Xóa</div>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getShippers = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/v1/shippers");
        if (result.data) {
          setShipperList(result.data?.shippers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getShippers();
  }, []);

  return (
    <div className="shipper">
      <Sidebar />
      <div className="shipperContainer">
        <Navbar />
        <div className="label-page">Danh sách shipper</div>
        <div className="schedule-list">
          <div className="button-layout">
            <Link to="/shippers/add" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Tạo tài khoản"} />
            </Link>
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={shipperList}
              columns={dataColumns.concat(actionColumn)}
              pageSize={6}
              rowsPerPageOptions={[10]}
              components={{
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Danh sách đơn hàng trống
                  </Stack>
                ),
                NoResultsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Danh sách đơn hàng trống
                  </Stack>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipper;
