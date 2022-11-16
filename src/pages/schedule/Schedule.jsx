import "../../style/schedule.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import axios from "axios";
import ButtonSchedule from "../../components/button/buttonSchedule";
import { RemoveRedEyeRounded } from "@mui/icons-material";

const Schedule = () => {
  const dataColumns = [
    {
      field: "shipperName",
      headerName: "Shipper",
      width: 240,
      renderCell: ({ row }: CellType) => {
        return row.shippers.name;
      },
    },
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 240,
      renderCell: ({ row }: CellType) => {
        return row.order.cargo.name;
      },
    },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 130,
      renderCell: ({ row }: CellType) => {
        return `${row.order.cargo.weight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 130,
      renderCell: ({ row }: CellType) => {
        return `${row.order.cargo.dimension} cm3`;
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 320,
      renderCell: ({ row }: CellType) => {
        return (
          <textarea
            cols="40"
            rows="3"
            style={{
              border: "none",
              paddingTop: "20px",
              background: "transparent",
            }}
          >
            {row.order.order_address.address}
          </textarea>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link
              to={`/orders/${params.id}`}
              style={{ textDecoration: "none" }}
            > */}
            <RemoveRedEyeRounded
              sx={{
                color: "grey",
                "&:hover": {
                  color: "green",
                  cursor: "pointer",
                },
              }}
            />
            {/* </Link> */}
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
  }, []);
  console.log(deliveries);
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="label-page">Danh sách đơn hàng cần giao hàng</div>
        <div className="schedule-list">
          <div className="button-layout">
            <Link to="/schedules/add" style={{ textDecoration: "none" }}>
              <ButtonSchedule label={"Lập lịch giao hàng"} />
            </Link>
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={deliveries}
              columns={dataColumns}
              pageSize={6}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              hideFooterSelectedRowCount
              hideFooterPagination
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
