import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonBack from "../../../components/button/buttonBack";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "../../../style/order.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        {order.length === 0 ? null : (
          <div className="form-layout">
            <div className="label-page">{`Đơn hàng ${order.order_name}`}</div>
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
                    Trọng lượng
                  </p>
                  <p className="label-2">{order.weight} kg</p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Thể tích
                  </p>
                  <p className="label-2">{order.dimension} cm3</p>
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
                  <p className="label-2">
                    {order["order_address"].shipping_fee} đồng
                  </p>
                </div>
                <div className="item">
                  <p style={{ fontWeight: "bold" }} className="label-1">
                    Trạng thái
                  </p>
                  <p className="label-2">Đang xử lý</p>
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
              <ButtonBack label={"Trở lại"} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
