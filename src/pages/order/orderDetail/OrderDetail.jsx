import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonBack from "../../../components/button/buttonBack";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "../../../style/order.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const OrderDetail = () => {
  const params = useParams();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/orders/${params.id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const convertOrderCode = (id) => {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return id;
    }
  };

  const renderStatus = (status) => {
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
          sx={{ textTransform: "lowercase", color: "#fff", backgroundColor: "#39a4c0",width: 120, "&:hover": {
            backgroundColor: "#39a4c0",
            color: "#fff",
            cursor: "initial"
          }, }}
        >
          Đang giao hàng
        </Button>
      );
    }
    if (status === "finished") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "lowercase", color: "#fff", backgroundColor: "#5eba7d", width: 120, "&:hover": {
            backgroundColor: "#5eba7d",
            color: "#fff",
            cursor: "initial"
          }, }}
        >
          Hoàn thành
        </Button>
      );
    }
    if (status === "error") {
      return (
        <Button
          color="primary"
          sx={{ textTransform: "lowercase", color: "#fff", backgroundColor: "#e96763", width: 120,  "&:hover": {
            backgroundColor: "#e96763",
            color: "#fff",
            cursor: "initial"
          }, }}
        >
          Thất bại
        </Button>
      );
    }
  };

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        {order.length === 0 ? null : (
          <div className="form-layout">
            <div className="label-page">{`Đơn hàng ${order["cargo"].name}`}</div>
            <div className="detail-content">
              <div className="left-content">
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Mã đơn hàng
                  </p>
                  <p className="label-2">{`DH${convertOrderCode(order.id)}`}</p>
                </div>

                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Người gửi
                  </p>
                  <p className="label-2">{order.sender_name}</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    SĐT người gửi
                  </p>
                  <p className="label-2">{order.sender_phone}</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Người nhận
                  </p>
                  <p className="label-2">{order.receiver_name}</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    SĐT người nhận
                  </p>
                  <p className="label-2">{order.receiver_phone}</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Địa chỉ
                  </p>
                  <p className="label-2">{order["order_address"].address}</p>
                </div>
              </div>
              <div className="right-content">
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Trọng lượng thực tế
                  </p>
                  <p className="label-2">{order["cargo"].weight} kg</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Trọng lượng vận chuyển
                  </p>
                  <p className="label-2">{order["cargo"].dimension} kg</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Ngày nhận
                  </p>
                  <p className="label-2">{order.delivery_time}</p>
                </div>

                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Phí giao hàng
                  </p>
                  <p className="label-2">{order.shipping_fee} đồng</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Trạng thái
                  </p>
                  <p className="label-2">{renderStatus(order.status)}</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Ghi chú
                  </p>
                  <p className="label-2">
                    {order.notes === null ? `Không` : order.notes}
                  </p>
                </div>
              </div>
            </div>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <ButtonBack label={"Quay lại"} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
