import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";

const ScheduleAdd = () => {
  const columnOrders = [
    { field: "order_name", headerName: "Đơn hàng", width: 160 },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 110,
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 110,
    },
    {
      field: "delivery_date",
      headerName: "Ngày giao",
      width: 140,
    },
    {
      field: "shipping_fee",
      headerName: "Phí ship",
      width: 90,
    },
  ];

  const rowOrders = [
    {
      id: 1,
      order_name: "Đơn hàng 1",
      weight: "0,5kg",
      dimension: "20cm3",
      delivery_date: "2022-11-01",
      shipping_fee: 25000,
    },
    {
      id: 2,
      order_name: "Đơn hàng 2",
      weight: "0,5kg",
      dimension: "20cm3",
      delivery_date: "2022-11-01",
      shipping_fee: 25000,
    },
    {
      id: 3,
      order_name: "Đơn hàng 3",
      weight: "0,5kg",
      dimension: "20cm3",
      delivery_date: "2022-11-01",
      shipping_fee: 25000,
    },
    {
      id: 5,
      order_name: "Đơn hàng 4",
      weight: "0,5kg",
      dimension: "20cm3",
      delivery_date: "2022-11-01",
      shipping_fee: 25000,
    },
    {
      id: 6,
      order_name: "Đơn hàng 5",
      weight: "0,5kg",
      dimension: "20cm3",
      delivery_date: "2022-11-01",
      shipping_fee: 25000,
    },
  ];

  const columnShippers = [
    { field: "name", headerName: "Họ tên", width: 220 },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 160,
    },
  ];

  const rowShippers = [
    { id: 1, name: "Nguyễn Văn A", phone: "0332395109" },
    { id: 2, name: "Nguyễn Văn A", phone: "0332395109" },
    { id: 3, name: "Nguyễn Văn A", phone: "0332395109" },
    { id: 4, name: "Nguyễn Văn A", phone: "0332395109" },
    { id: 5, name: "Nguyễn Văn A", phone: "0332395109" },
  ];
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="label-page">Lập lịch giao hàng</div>
        <div className="box-list">
          <div className="list-order">
            <div className="label-add">Chọn đơn hàng</div>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={rowOrders}
                columns={columnOrders}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                hideFooterSelectedRowCount
                hideFooterPagination
                getRowId={(row) => row.id}
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
          <div className="list-shipper">
            <div className="label-add">Chọn shipper</div>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={rowShippers}
                columns={columnShippers}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                hideFooterSelectedRowCount
                hideFooterPagination
                getRowId={(row) => row.id}
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Danh sách shipper trống
                    </Stack>
                  ),
                  NoResultsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Danh sách shipper trống
                    </Stack>
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className="btn-schedule">
          <ButtonAdd label={"Sắp xếp"}></ButtonAdd>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAdd;
