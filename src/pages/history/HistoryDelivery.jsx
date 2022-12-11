import { Button, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/order.scss";
import ButtonDelete from "../../components/button/buttonDelete";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EmptyOrder from "../../components/empty/EmptyOrder";

const HistoryDelivery = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("supervisor"));
    if (isAuth && isAuth !== null) {
      navigate("/history-delivery");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [orderList, setOrderList] = useState({});
  const [selectedId, setSelectedId] = useState([]);

  const renderStatus = (status, reason) => {
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
          sx={{
            textTransform: "capitalize",
            color: "#fff",
            backgroundColor: "#38aa3a",
            width: 100,
            "&:hover": {
              backgroundColor: "#38aa3a",
              color: "#fff",
              cursor: "initial",
            },
          }}
        >
          Đang giao hàng
        </Button>
      );
    }
    if (status === "finished") {
      return (
        <Button
          color="primary"
          sx={{
            textTransform: "capitalize",
            color: "#fff",
            backgroundColor: "#007041",
            width: 100,
            "&:hover": {
              backgroundColor: "#007041",
              color: "#fff",
              cursor: "initial",
            },
          }}
        >
          Hoàn thành
        </Button>
      );
    }
    if (status === "error") {
      return (
        <Tooltip title={reason && reason} placement="right">
          <p
            style={{
              textTransform: "capitalize",
              color: "#fff",
              backgroundColor: "#e96763",
              "&:hover": {
                backgroundColor: "#e96763",
                color: "#fff",
              },
              width: '100px',
              height: '36px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '15px'}}>Thất bại</span>
          </p>
        </Tooltip>
      );
    }
  };
  const dataColumns = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 150,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Đơn hàng</p>
      ),
      renderCell: ({ row }) => {
        return row.cargo.name;
      },
    },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 180,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
          Khối lượng thực tế
        </p>
      ),
      renderCell: ({ row }) => {
        return `${row.cargo.weight} kg`;
      },
    },
    {
      field: "dimension",
      width: 200,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
          Khối lượng vận chuyển
        </p>
      ),
      renderCell: ({ row }) => {
        return `${row.cargo.dimension} kg`;
      },
    },
    {
      field: "Shipper",
      width: 200,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
          Nhân viên giao hàng
        </p>
      ),
      renderCell: ({ row }) => {
        return `${row.delivery.shippers.name}`;
      },
    },
    {
      field: "delivery_time",
      width: 160,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Ngày giao hàng</p>
      ),
      renderCell: ({ row }) => {
        return row.delivery_time.split("-").reverse().join("-");
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Trạng thái</p>
      ),
      renderCell: ({ row }) => {
        return renderStatus(row.status, row.failure_reasons);
      },
    },
    {
      field: "Reason",
      width: 180,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
          Lý do thất bại
        </p>
      ),
      renderCell: ({ row }) => {
        return row.failure_reason !== null ? `${row.failure_reason}` : undefined;
      },
    },
  ];
  const handleDelete = async () => {
    const data = {
      ids: selectedId,
    };
    try {
      await axios.put(`http://localhost:3000/api/v1/orders`, data);
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.error(error);
    }
  };

  console.log(orderList)
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/orders?filter=error&filter=finished"
        );
        if (result.data) {
          setOrderList(result.data?.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="label-page">Lịch sử đơn hàng</div>
        <div className="layout-content">
          <div className="button-layout">
            <ButtonDelete label={"Xóa"} onClick={handleDelete} />
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={orderList ? orderList : []}
              columns={dataColumns}
              pageSize={6}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              hideFooterSelectedRowCount
              // hideFooterPagination
              checkboxSelection
              onSelectionModelChange={(item) => setSelectedId(item)}
              getRowId={(row) => row.id}
              components={{
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <EmptyOrder label={"Lịch sử đơn hàng trống"} />
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

export default HistoryDelivery;
