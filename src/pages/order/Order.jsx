import "../../style/order.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ButtonAdd from "../../components/button/buttonAdd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import ButtonDelete from "../../components/button/buttonDelete";
import { toast, Toaster } from "react-hot-toast";

const Order = () => {
  const [orderList, setOrderList] = useState({});
  const [selectedId, setSelectedId] = useState([]);
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
  const dataColumns = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 180,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Đơn hàng</p>
      ),
      renderCell: ({ row }: CellType) => {
        return row.cargo.name;
      },
    },
    {
      field: "sender_name",
      headerName: "Người gửi",
      width: 180,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Người gửi</p>
      ),
    },
    {
      field: "sender_phone",
      headerName: "SĐT người gửi",
      width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>SĐT người gửi</p>
      ),
    },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 110,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Trọng lượng</p>
      ),
      renderCell: ({ row }: CellType) => {
        return `${row.cargo.weight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 110,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Kích thước</p>
      ),
      renderCell: ({ row }: CellType) => {
        return `${row.cargo.dimension} cm3`;
      },
    },
    {
      field: "delivery_time",
      headerName: "Ngày giao",
      width: 120,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Ngày giao</p>
      ),
      renderCell: ({ row }: CellType) => {
        return row.delivery_time.split("-").reverse().join("-");
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Trạng thái</p>
      ),
      renderCell: ({ row }: CellType) => {
        return renderStatus(row.status);
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
              to={`/orders/${params.id}`}
              style={{ textDecoration: "none" }}
            >
              <RemoveRedEyeRounded sx={{ color: "grey" }} />
            </Link>
          </div>
        );
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
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/v1/orders");
        if (result.data) {
          setOrderList(result.data?.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, [orderList]);

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="label-page">Danh sách đơn hàng</div>
        <div className="layout-content">
          <div className="button-layout">
            <Link to="/orders/add/step1" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Thêm"} />
            </Link>
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
              hideFooterPagination
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

export default Order;
