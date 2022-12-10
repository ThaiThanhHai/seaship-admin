import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonAdd from "../../components/button/buttonAdd";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/shipper.scss";
import ButtonDelete from "../../components/button/buttonDelete";
import { toast, Toaster } from "react-hot-toast";

const Shipper = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("supervisor"));
    if (isAuth && isAuth !== null) {
      navigate("/shippers");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [shipperList, setShipperList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const handleDelete = async () => {
    if (selectedId.length > 0) {
      const data = {
        ids: selectedId,
      };
      try {
        await axios.put(`http://localhost:3000/api/v1/shippers`, data);
        toast.success("Xoá thành công");
      } catch (error) {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
        console.error(error);
      }
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };
  const renderStatus = (status: string) => {
    if (status === "on") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "green" }}
        >
          Đang hoạt động
        </Button>
      );
    }
    if (status === "off") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "capitalize", color: "grey" }}
        >
          Không hoạt động
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
  };
  const dataColumns = [
    {
      field: "name",
      headerName: "Họ tên",
      width: 220,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Họ tên</p>
      ),
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Số điện thoại</p>
      ),
    },
    {
      field: "vehice",
      headerName: "Phương tiện",
      width: 170,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Phương tiện</p>
      ),
      renderCell: ({ row }: CellType) => {
        return row.vehicle.name === "truck" ? "Xe tải" : "Xe máy";
      },
    },
    {
      field: "capacity",
      headerName: "Tải trọng",
      width: 160,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Tải trọng</p>
      ),
      renderCell: ({ row }: CellType) => {
        return row.vehicle.capacity;
      },
    },
    {
      field: "dimension",
      headerName: "Thể tích",
      width: 160,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Thể tích</p>
      ),
      renderCell: ({ row }: CellType) => {
        return row.vehicle.dimension;
      },
    },
    {
      field: "avatar",
      headerName: "Ảnh",
      width: 100,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Ảnh</p>
      ),
      renderCell: ({ row }: CellType) => {
        return <img style={{ width: 50 }} src={row.avatar} alt="avatar" />;
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderHeader: (params: GridColumnHeaderParams) => (
        <p style={{ fontWeight: "bold", fontSize: "16px" }}>Trạng thái</p>
      ),
      renderCell: ({ row }: CellType) => {
        return renderStatus(row.status);
      },
    },
  ];
  useEffect(() => {
    const getShippers = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/v1/shippers");
        if (result.data) {
          setShipperList(result.data?.shippers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getShippers();
  }, [shipperList]);

  return (
    <div className="shipper">
      <Sidebar />
      <div className="shipperContainer">
        <Navbar />
        <div className="label-page">Danh sách shipper</div>
        <div className="schedule-list">
          <div className="button-layout">
            <Link to="/shippers/add" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Thêm"} />
            </Link>
            <ButtonDelete label={"Xóa"} onClick={handleDelete} />
          </div>
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={shipperList}
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

export default Shipper;
