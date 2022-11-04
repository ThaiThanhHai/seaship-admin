import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/history.scss";

const HistoryDelivery = () => {
  const dataColumns = [
    { field: "order_name", headerName: "Đơn hàng", width: 200 },
    { field: "delivery_time", headerName: "Ngày giao", width: 180 },
    {
      field: "address",
      headerName: "Địa chỉ nhận",
      width: 200,
    },
    {
      field: "shipping_fee",
      headerName: "Phí vận chuyển",
      width: 180,
      renderCell: ({ row }: CellType) => {
        return `${row.weight} Kg`;
      },
    },
    {
      field: "name",
      headerName: "Người giao hàng",
      width: 180,
      renderCell: ({ row }: CellType) => {
        return `${row.dimension} cm3`;
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 140,
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
  const dataRows = [];
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
              rows={dataRows}
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

export default HistoryDelivery;
