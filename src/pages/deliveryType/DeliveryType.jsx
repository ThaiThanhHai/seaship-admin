import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonAdd from "../../components/button/buttonAdd";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/deliveryType.scss";

const DeliveryType = () => {
  const dataColumns = [
    { field: "name", headerName: "Hình thức", width: 260 },
    { field: "price_inner", headerName: "Giá nội thành", width: 180 },
    {
      field: "price_outer",
      headerName: "Giá ngoại thành",
      width: 180,
    },
    {
      field: "overpriced",
      headerName: "Phí vượt hạn mức",
      width: 180,
    },
    {
      field: "delivery_days",
      headerName: "Số ngày giao hàng",
      width: 150,
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

  const [deliveryType, setDeliveryType] = useState([]);
  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/delivery-type"
        );
        if (result.data) {
          setDeliveryType(result.data?.delivery_types);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDeliveries();
  }, []);
  return (
    <div className="deliveryType">
      <Sidebar />
      <div className="deliveryTypeContainer">
        <Navbar />
        <div className="label-page">Danh sách loại hình giao hàng</div>
        <div className="schedule-list">
          <div className="button-layout">
            <Link to="/delivery-types/add" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Thêm loại"} />
            </Link>
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={deliveryType}
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
