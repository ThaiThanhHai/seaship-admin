import "../../style/order.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ButtonAdd from "../../components/button/buttonAdd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Attachment, RemoveRedEyeRounded } from "@mui/icons-material";
import ButtonDelete from "../../components/button/buttonDelete";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { filter } from "lodash";

const Order = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("supervisor"));
    if (isAuth && isAuth !== null) {
      navigate("/orders");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [orderList, setOrderList] = useState({});
  const [selectedId, setSelectedId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [valueFilter, setValueFilter] = useState({})

  const getStorageValue = (key, defaultValue) => {
    // getting stored value
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  };
  const initialValue = getStorageValue("supervisor", "");
  const renderStatus = (status) => {
    if (status === "new") {
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
      width: 200,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Đơn hàng</p>
      ),
      renderCell: ({ row }) => {
        return row.cargo.name;
      },
    },
    {
      field: "sender_name",
      headerName: "Người gửi",
      width: 200,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Người gửi</p>
      ),
    },
    {
      field: "sender_phone",
      headerName: "SĐT người gửi",
      width: 170,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>SĐT người gửi</p>
      ),
    },
    {
      field: "weight",
      headerName: "Khối lượng thực tế",
      width: 140,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
          Khối lượng thực tế
        </p>
      ),
      renderCell: ({ row }) => {
        return `${row.cargo.weight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Khối lượng vận chuyển",
      width: 140,
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
      field: "delivery_time",
      headerName: "Ngày giao",
      width: 140,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Ngày giao</p>
      ),
      renderCell: ({ row }) => {
        return row.delivery_time.split("-").reverse().join("-");
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 160,
      renderHeader: (params) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Trạng thái</p>
      ),
      renderCell: ({ row }) => {
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
  }, [loading, valueSearch]);

  const handleChangeExcel = () => (event) => {
    const files = event.target.files;
    let reader = new FileReader();
    reader.onload = (r) => {
      const fileString = r.target.result.split(",")[1];
      const value = {
        supervisor_id: initialValue.id,
        data: fileString,
      };
      if (fileString) {
        setLoading(true);
        createDataByExcel(value);
      } else {
        toast.error("Bạn chưa tải tập tin");
      }
    };
    reader.readAsDataURL(files[0]);
  };

  const createDataByExcel = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/orders/file_excel",
        data
      );
      if (result) {
        toast.success("Tạo danh sách đơn hàng thành công");
      }
    } catch (error) {
      toast.error("Kiểm tra lại dữ liệu tập tin không đúng");
      console.error(error);
    }
    setLoading(false);
  };

  const handleChangeValueSearch = () => (event) => {
    setValueSearch(event.target.value);


    const value = filter(
      orderList,
      (row) => row.cargo.name.includes(valueSearch)
    );

    setValueFilter(value)
  };



  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="label-page">Danh sách đơn hàng</div>
        <div className="layout-content">
          <div className="button-layout">
            <Stack
              spacing={2}
              direction="row"
              sx={{
                position: "absolute",
                top: 0,
                left: 25,
                outline: "none"
              }}
            >
              <TextField
                id="standard-basic"
                label="Tìm kiếm...."
                variant="outlined"
                // error={error.weight}
                onChange={handleChangeValueSearch()}

              />
            </Stack>

            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                component="label"
                startIcon={<Attachment />}
                sx={{
                  color: "#fff",
                  backgroundColor: "#1564c0",
                  margin: "10px",
                  "&:hover": {
                    backgroundColor: "#1564c0",
                    color: "#eee",
                  },
                  width: "130px",
                }}
              >
                Tải tệp
                <input
                  hidden
                  // accept="application/*"
                  type="file"
                  onChange={handleChangeExcel()}
                />
              </Button>
            </Stack>

            <Link to="/orders/add/step1" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Thêm"} />
            </Link>
            <ButtonDelete label={"Xóa"} onClick={handleDelete} />
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={orderList ? (valueSearch ? valueFilter : orderList) : []}
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
      {loading ? <Loader /> : undefined}
    </div>
  );
};

export default Order;
