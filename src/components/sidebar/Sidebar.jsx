import "./sidebar.scss";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleSubmit = () => {
    localStorage.setItem("supervisor", JSON.stringify(""));
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          {/* <span className="logo">SeaShip</span> */}
          <img src="https://i.imgur.com/niVMDiv.png" alt="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Thống kê</span>
            </li>
          </Link> */}
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Quản lý đơn hàng</span>
            </li>
          </Link>
          <Link to="/schedules" style={{ textDecoration: "none" }}>
            <li>
              <ScheduleIcon className="icon" />
              <span>Lập lịch giao hàng</span>
            </li>
          </Link>
          <Link to="/delivery-types" style={{ textDecoration: "none" }}>
            <li>
              <DoubleArrowIcon className="icon" />
              <span>Hình thức giao hàng</span>
            </li>
          </Link>
          <Link to="/shippers" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Quản lý shipper</span>
            </li>
          </Link>
          <Link to="/history-delivery" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Lịch sử đơn hàng</span>
            </li>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleSubmit}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
