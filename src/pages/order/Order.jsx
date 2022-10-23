import "./order.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import ButtonAdd from "../../components/button/buttonAdd";
import { orderColumns, orderRows } from "./orderData";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="layout-content">
          <div className="button-layout">
            <Link to="/orders/add/step1" style={{ textDecoration: "none" }}>
              <ButtonAdd label={"Thêm đơn hàng"} />
            </Link>
            <ButtonAdd label={"Lập lịch giao hàng"} />
          </div>
          <Datatable dataColumns={orderColumns} dataRows={orderRows} />
        </div>
      </div>
    </div>
  );
};

export default Order;
