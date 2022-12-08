import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./schedule.scss";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import ButtonBack from "../../../components/button/buttonBack";
import ButtonSchedule from "../../../components/button/buttonSchedule";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 4,
};

export default function ScheduleMotor({ open, setOpen }) {
  const handleClose = () => setOpen(false);

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
          "http://localhost:3000/api/v1/shippers?filter=on&search=motorbike"
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
      field: "distance",
      headerName: "Khoảng cách",
      width: 120,
      renderCell: ({ row }: CellType) => {
        return row.delivery_time.split("-").reverse().join("-");
      },
    },
    {
      field: "delivery_time",
      headerName: "Ngày giao",
      width: 120,
      renderCell: ({ row }: CellType) => {
        return `${row.distance} km`;
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
            <ButtonBack label={"Quay lại"} onClick={handleClose} />
            <ButtonSchedule label={"Sắp xếp"} onClick={handleSubmit} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
