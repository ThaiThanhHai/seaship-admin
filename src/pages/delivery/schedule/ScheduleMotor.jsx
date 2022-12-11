import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./schedule.scss";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import axios from "axios";
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
  width: 1300,
  height: 620,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 4,
};

export default function ScheduleMotor({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const [orderList, setOrderList] = useState([]);
  const [shipperList, setShipperList] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [shipperSelected, setShipperSelected] = useState([]);
  const [totalOrder, setTotalOrder] = React.useState(0);
  const [totalShipper, setTotalShipper] = React.useState(0);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/orders/motorbike?filter=new"
        );
        if (result.data) {
          setOrderList(result.data?.orders);
          setTotalOrder(result.data?.orders.length);
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
          setTotalShipper(result.data?.shippers.length)
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
      renderCell: ({ row }) => {
        return row.cargo.name;
      },
    },
    {
      field: "weight",
      headerName: "Trọng lượng thực tế",
      width: 110,
      renderCell: ({ row }) => {
        return `${row.cargo.weight}`;
      },
    },
    {
      field: "dimension",
      headerName: "Trọng lượng vận chuyển",
      width: 110,
      renderCell: ({ row }) => {
        return `${row.cargo.dimension}`;
      },
    },
    {
      field: "distance",
      headerName: "Khoảng cách",
      width: 120,
      renderCell: ({ row }) => {
        return `${row.order_address.distance} km`;
      },
    },
    {
      field: "delivery_time",
      headerName: "Ngày giao",
      width: 120,
      renderCell: ({ row }) => {
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
    { field: "name", headerName: "Họ tên", width: 150 },
    {
      field: "capacity",
      headerName: "Trọng lượng tối đa",
      width: 130,
      renderCell: ({ row }) => {
        return `${row.vehicle.capacity} kg`;
      },
    },
    {
      field: "dimension",
      headerName: "Khối lượng tối đa",
      width: 130,
      renderCell: ({ row }) => {
        return `${row.vehicle.dimension} m3`;
      },
    },
  ];

  const creatSchedule = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/deliveries/motorbike",
        data
      );
      if (res.data) {
        toast.success("Lập lịch thành công");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Không thể lập lịch, vui lòng kiểm tra lại");
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
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box sx={style}>
            <div className="label">
              Sắp xếp lịch giao hàng cho phương tiện xe máy
            </div>
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
                  <span style={{padding: '10px', fontWeight: 300}}>Tổng đơn hàng: {totalOrder}</span>
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
                  <span style={{padding: '10px', fontWeight: 300}}>Tổng shipper: {totalShipper}</span>
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
    </>
  );
}
