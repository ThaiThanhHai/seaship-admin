import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import ButtonAdd from "../../components/button/buttonAdd";
import ButtonDelete from "../../components/button/buttonDelete";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/deliveryType.scss";

const DeliveryType = () => {
  const [deliveryType, setDeliveryType] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const handleDelete = async () => {
    const data = {
      ids: selectedId,
    };
    try {
      await axios.put(`http://localhost:3000/api/v1/delivery-type`, data);
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.error(error);
    }
  };
  const dataColumns = [
    {
      field: "name",
      headerName: "Hình thức",
      width: 300,
    },
    { field: "price_inner", headerName: "Giá nội thành", width: 200 },
    {
      field: "price_outer",
      headerName: "Giá ngoại thành",
      width: 200,
    },
    {
      field: "overpriced",
      headerName: "Phí vượt hạn mức",
      width: 200,
    },
    {
      field: "delivery_days",
      headerName: "Số ngày giao hàng",
      width: 160,
    },
  ];
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
  }, [deliveryType]);
  return (
    <div className="deliveryType">
      <Sidebar />
      <div className="deliveryTypeContainer">
        <Navbar />
        <div className="label-page">Danh sách loại hình giao hàng</div>
        <div className="schedule-list">
          <div className="button-layout">
            <Link to="/delivery-types/add" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Thêm"} />
            </Link>
            <ButtonDelete label={"Xóa"} onClick={handleDelete} />
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={deliveryType}
              columns={dataColumns}
              pageSize={6}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              hideFooterSelectedRowCount
              hideFooterPagination
              onSelectionModelChange={(item) => setSelectedId(item)}
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
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default DeliveryType;
