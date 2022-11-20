import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import ButtonSchedule from "../../../components/button/buttonSchedule";
import ButtonBack from "../../../components/button/buttonBack";

const ScheduleAddNotAtCanTho = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [shipperList, setShipperList] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [shipperSelected, setShipperSelected] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/orders/not_cantho?filter=new"
        );
        if (result.data) {
          setOrderList(result.data?.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getShippers = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/shippers?filter=on&search=truck"
        );
        if (result.data) {
          setShipperList(result.data?.shippers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
    getShippers();
  }, []);

  const columnOrders = [
    {
      field: "name",
      headerName: "Đơn hàng",
      width: 160,
      renderCell: ({ row }: CellType) => {
        return row.cargo.name;
      },
    },
    {
      field: "weight",
      headerName: "Trọng lượng",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.cargo.weight} Kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Kích thước",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.cargo.dimension} m3`;
      },
    },
    {
      field: "delivery_time",
      headerName: "Ngày giao",
      width: 120,
      renderCell: ({ row }: CellType) => {
        return row.delivery_time.split("-").reverse().join("-");
      },
    },
    {
      field: "shipping_fee",
      headerName: "Phí ship",
      width: 90,
    },
  ];

  const columnShippers = [
    { field: "name", headerName: "Họ tên", width: 140 },
    {
      field: "capacity",
      headerName: "Trọng lượng tối đa",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.vehicle.capacity} kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Khối lượng tối đa",
      width: 110,
      renderCell: ({ row }: CellType) => {
        return `${row.vehicle.dimension} m3`;
      },
    },
  ];

  const creatSchedule = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/deliveries/truck",
        data
      );
      if (res.data) {
        toast.success("Tạo lịch giao hàng thành công");
        navigate(`/schedules`);
      }
    } catch (error) {
      toast.success("Không thể lập lịch, vui lòng kiểm tra lại");
      console.error(error);
    }
  };

  const handleSubmit = () => {
    const data = {
      list_order: orderSelected,
      list_shipper: shipperSelected,
    };
    creatSchedule(data);
  };
  return (
    <div className="schedule">
      <Sidebar />
      <div className="scheduleContainer">
        <Navbar />
        <div className="label-page">Lập lịch giao hàng cho xe tải</div>
        <div className="box-list">
          <div className="list-order">
            <div className="label-add">Chọn đơn hàng</div>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={orderList}
                columns={columnOrders}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                hideFooterSelectedRowCount
                hideFooterPagination
                onSelectionModelChange={(item) => setOrderSelected(item)}
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
          <div className="list-shipper">
            <div className="label-add">Chọn shipper</div>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={shipperList}
                columns={columnShippers}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                hideFooterSelectedRowCount
                hideFooterPagination
                onSelectionModelChange={(item) => setShipperSelected(item)}
                getRowId={(row) => row.id}
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Danh sách shipper trống
                    </Stack>
                  ),
                  NoResultsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      Danh sách shipper trống
                    </Stack>
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className="btn-schedule">
          <Link to="/schedules" style={{ textDecoration: "none" }}>
            <ButtonBack label={"Quay lại"} />
          </Link>
          <ButtonSchedule
            label={"Sắp xếp"}
            onClick={handleSubmit}
          ></ButtonSchedule>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAddNotAtCanTho;
