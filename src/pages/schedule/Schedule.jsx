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
      field: "name",
      headerName: "Shipper",
      width: 250,
    },
    {
      field: "weight",
      headerName: "Khối lượng vận chuyển",
      width: 220,
      renderCell: ({ row }: CellType) => {
        return `${row.totalWeight}/${row.maxWeight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Kích thước vận chuyển",
      width: 220,
      renderCell: ({ row }: CellType) => {
        return `${row.totalDimension}/${row.maxDimension} m3`;
      },
    },
    {
      field: "totalDistance",
      headerName: "Tổng quãng đường",
      width: 220,
    },
    {
      field: "count",
      headerName: "Số đơn hàng",
      width: 150,
      renderCell: ({ row }: CellType) => {
        return `${row.count}`;
      },
    },
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/schedules/${params.id}`}
              style={{ textDecoration: "none" }}
            >
              <RemoveRedEyeRounded
                sx={{
                  color: "grey",
                  "&:hover": {
                    color: "green",
                    cursor: "pointer",
                  },
                }}
              />
            </Link>
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
          setDeliveries(result.data?.schedule_of_shipper);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDeliveries();
  }, []);
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="label-page">Lịch giao hàng của shipper</div>
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
