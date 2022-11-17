import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "../../../style/schedule.scss";

const ScheduleDetail = () => {
  const params = useParams();
  const dataColumns = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 250,
    },
    {
      field: "weight",
      headerName: "Khối lượng",
      width: 120,
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 120,
    },
    {
      field: "fee",
      headerName: "Phí ship",
      width: 100,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 520,
    },
  ];
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
  }, [params.id]);
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
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
