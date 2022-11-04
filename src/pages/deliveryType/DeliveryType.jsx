import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import ButtonAdd from "../../components/button/buttonAdd";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/deliveryType.scss";

const DeliveryType = () => {
  const dataColumns = [
    { field: "name", headerName: "Hình thức", width: 200 },
    { field: "price_inner", headerName: "Giá nội thành", width: 180 },
    {
      field: "price_outer",
      headerName: "Giá ngoại thành",
      width: 150,
    },
    {
      field: "overpriced",
      headerName: "Phí vượt hạn mức",
      width: 180,
      renderCell: ({ row }: CellType) => {
        return `${row.weight} Kg`;
      },
    },
    {
      field: "delivery_days",
      headerName: "Số ngày giao hàng",
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
    <div className="deliveryType">
      <Sidebar />
      <div className="deliveryTypeContainer">
        <Navbar />
        <div className="label-page">Danh sách loại hình giao hàng</div>
        <div className="schedule-list">
          <div className="button-layout">
            <ButtonAdd label={"Thêm loại"} />
          </div>
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

export default DeliveryType;
