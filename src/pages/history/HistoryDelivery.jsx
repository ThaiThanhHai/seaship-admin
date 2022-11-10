import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/history.scss";

const HistoryDelivery = () => {
  const [orderList, setOrderList] = useState({});
  const renderStatus = (status: string) => {
    if (status === "new") {
      // return "Đang xử lý";
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "grey" }}
        >
          Đang xử lý
        </Button>
      );
    }
    if (status === "delivering") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "blue" }}
        >
          Đang giao hàng
        </Button>
      );
    }
    if (status === "finished") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "green" }}
        >
          Hoàn thành
        </Button>
      );
    }
    if (status === "error") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "red" }}
        >
          Thất bại
        </Button>
      );
    }
  };
  const dataColumns = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 180,
      renderCell: ({ row }: CellType) => {
        return row.cargo.name;
      },
    },
    { field: "sender_name", headerName: "Người gửi", width: 180 },
    {
      field: "sender_phone",
      headerName: "SĐT người gửi",
      width: 150,
    },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.cargo.weight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.cargo.dimension} cm3`;
      },
    },
    {
      field: "delivery_time",
      headerName: "Ngày giao",
      width: 140,
      renderCell: ({ row }: CellType) => {
        return row.delivery_time.split("-").reverse().join("-");
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderCell: ({ row }: CellType) => {
        return renderStatus(row.status);
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/orders/${params.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Xem</div>
            </Link>
            <div className="deleteButton">Xóa</div>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get(
          "http://127.0.0.1:3000/api/v1/orders?filter=finished&filter=error"
        );
        if (result.data) {
          setOrderList(result.data?.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);
  return (
    <div className="history">
      <Sidebar />
      <div className="historyContainer">
        <Navbar />
        <div className="label-page">Lịch sử giao hàng</div>
        <div className="schedule-list">
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={orderList}
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
                    Lịch sử đơn hàng trống
                  </Stack>
                ),
                NoResultsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Lịch sử đơn hàng trống
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

export default HistoryDelivery;
