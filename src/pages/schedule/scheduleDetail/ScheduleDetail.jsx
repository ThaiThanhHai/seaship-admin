import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonBack from "../../../components/button/buttonBack";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "../../../style/schedule.scss";

const ScheduleDetail = () => {
  const params = useParams();
  const dataColumns = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 240,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Đơn hàng</p>
      ),
    },
    {
      field: "weight",
      headerName: "Khối lượng",
      width: 110,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Khối lượng</p>
      ),
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 110,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Kích thước</p>
      ),
    },
    {
      field: "fee",
      headerName: "Phí ship",
      width: 90,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Phí ship</p>
      ),
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "center",
      width: 400,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Địa chỉ</p>
      ),
      renderCell: ({ row }: CellType) => {
        return (
          <textarea
            name=""
            id=""
            cols="53"
            rows="3"
            style={{
              border: "none",
              backgroundColor: "transparent",
              paddingTop: "15px",
            }}
          >
            {row.address}
          </textarea>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Trạng thái</p>
      ),
      renderCell: ({ row }: CellType) => {
        return renderStatus(row.status);
      },
    },
  ];
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
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/v1/deliveries/order_of_shipper/${params.id}`
        );
        if (result.data) {
          setDeliveries(result.data?.list_delivery_order);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDeliveries();
  }, [params.id, deliveries]);
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="label-page">Chi tiết lịch giao hàng</div>
        <div className="schedule-list">
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
          <Link to="/schedules" style={{ textDecoration: "none" }}>
            <div className="btn" style={{ marginRight: "20px" }}>
              <ButtonBack label={"Quay lại"} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
