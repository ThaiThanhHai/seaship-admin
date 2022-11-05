import "../../style/schedule.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import ButtonAdd from "../../components/button/buttonAdd";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import axios from "axios";

const Schedule = () => {
  const dataColumns = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 180,
      renderCell: ({ row }: CellType) => {
        return row.order.cargo.name;
      },
    },
    {
      field: "sender_name",
      headerName: "Người gửi",
      width: 180,
      renderCell: ({ row }: CellType) => {
        return row.order.sender_name;
      },
    },
    {
      field: "sender_phone",
      headerName: "SĐT người gửi",
      width: 150,
      renderCell: ({ row }: CellType) => {
        return row.order.sender_phone;
      },
    },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.order.cargo.weight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.order.cargo.dimension} cm3`;
      },
    },
    {
      field: "shipperName",
      headerName: "Shipper",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return row.shippers.name;
      },
    },
    {
      field: "orderOrderAddress",
      headerName: "Ngày giao",
      width: 140,
      renderCell: ({ row }: CellType) => {
        return row.order.order_address.address;
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
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/deliveries"
        );
        if (result.data) {
          setDeliveries(result.data?.deliveries);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDeliveries();
  }, [deliveries]);
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="label-page">Danh sách đơn hàng cần giao hàng</div>
        <div className="schedule-list">
          <div className="button-layout">
            <Link to="/schedules/add" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Lập lịch giao hàng"} />
            </Link>
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={deliveries}
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
                    Danh sách giao hàng trống
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

export default Schedule;
