import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import {
  DeliveryDining,
  EventAvailable,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useState } from "react";
import ModalLogout from "../modal/modal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  if (isLogout) {
    navigate("/");
    localStorage.setItem("supervisor", JSON.stringify(""));
  }

  return (
    <div className="sidebar">
      <hr />
      <div className="center">
        <ul>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Tooltip title={"Thống kê trạng thái"} placement="right">
              <li>
                <DashboardIcon className="icon" />
              </li>
            </Tooltip>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <Tooltip title={"Quản lý đơn hàng"} placement="right">
              <li>
                <ShoppingCartCheckout className="icon" />
              </li>
            </Tooltip>
          </Link>
          <Link to="/schedules" style={{ textDecoration: "none" }}>
            <Tooltip title={"Lập lịch giao hàng"} placement="right">
              <li>
                <EventAvailable className="icon" />
              </li>
            </Tooltip>
          </Link>
          <Link to="/delivery-types" style={{ textDecoration: "none" }}>
            <Tooltip title={"Hình thức giao hàng"} placement="right">
              <li>
                <DoubleArrowIcon className="icon" />
              </li>
            </Tooltip>
          </Link>
          <Link to="/shippers" style={{ textDecoration: "none" }}>
            <Tooltip title={"Quản lý shipper"} placement="right">
              <li>
                <DeliveryDining className="icon" />
              </li>
            </Tooltip>
          </Link>
          <Link to="/history-delivery" style={{ textDecoration: "none" }}>
            <Tooltip title={"Lịch sử đơn hàng"} placement="right">
              <li>
                <CreditCardIcon className="icon" />
              </li>
            </Tooltip>
          </Link>
          <Tooltip title={"Đăng xuất"} placement="right">
            <li className="logout" onClick={handleClick}>
              <ExitToAppIcon className="icon" />
            </li>
          </Tooltip>
        </ul>
      </div>
      {open && (
        <ModalLogout open={open} setOpen={setOpen} setIsLogout={setIsLogout} />
      )}
    </div>
  );
};

export default Sidebar;
