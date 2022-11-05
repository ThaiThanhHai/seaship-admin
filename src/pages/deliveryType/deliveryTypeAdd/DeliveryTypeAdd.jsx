import React, { useState } from "react";
import "../../../style/order.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeliveryTypeAdd = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price_inner: 0,
    price_outer: 0,
    overpriced: 0,
    delivery_days: 0,
  });
  const [error, setError] = useState({
    name: false,
    price_inner: false,
    price_outer: false,
    overpriced: false,
    delivery_days: false,
  });

  const handleChangeForm = (name) => (event) => {
    setError({
      name: false,
      price_inner: false,
      price_outer: false,
      overpriced: false,
      delivery_days: false,
    });
    if (
      name === "price_inner" ||
      name === "price_outer" ||
      name === "overpriced"
    ) {
      const valueNumber = parseFloat(event.target.value);
      if (valueNumber < 0) {
        setValues({ ...values, [name]: 0 });
      } else {
        setValues({ ...values, [name]: valueNumber });
      }
    } else if (name === "delivery_days") {
      const valueNumber = parseInt(event.target.value);
      if (valueNumber < 0) {
        setValues({ ...values, [name]: 0 });
      } else {
        setValues({ ...values, [name]: valueNumber });
      }
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const checkValidate = (values) => {
    if (values.name === "") {
      toast.error("Vui lòng nhập loại giao hàng");
      setError({ ...error, name: true });
      return false;
    }
    if (!values.price_inner) {
      toast.error("Vui lòng nhập giá nội thành");
      setError({ ...error, price_inner: true });
      return false;
    }
    if (values.price_inner <= 0) {
      toast.error("Vui lòng nhập giá hợp lệ");
      setError({ ...error, price_outer: true });
      return false;
    }

    if (!values.price_outer) {
      toast.error("Vui lòng nhập giá ngoại thành");
      setError({ ...error, price_outer: true });
      return false;
    }

    if (values.price_outer <= 0) {
      toast.error("Vui lòng nhập giá hợp lệ");
      setError({ ...error, price_outer: true });
      return false;
    }

    if (!values.overpriced) {
      toast.error("Vui lòng nhập giá vượt khung");
      setError({ ...error, overpriced: true });
      return false;
    }

    if (values.overpriced <= 0) {
      toast.error("Vui lòng nhập giá hợp lệ");
      setError({ ...error, overpriced: true });
      return false;
    }

    if (!values.delivery_days) {
      toast.error("Vui lòng nhập số ngày giao hàng dự kiến");
      setError({ ...error, delivery_days: true });
      return false;
    }

    if (values.delivery_days <= 0) {
      toast.error("Vui lòng nhập số ngày hợp lệ");
      setError({ ...error, delivery_days: true });
      return false;
    }

    return true;
  };

  const creatShipper = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/delivery-type",
        data
      );
      if (result.data) {
        toast.success("Tạo loại giao hàng thành công");
        navigate("/delivery-types");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (checkValidate(values)) {
      const data = {
        name: values.name,
        price_inner: values.price_inner,
        price_outer: values.price_outer,
        overpriced: values.overpriced,
        delivery_days: values.delivery_days,
      };
      creatShipper(data);
    }
  };
  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="form-layout">
          <div className="label-page">Nhập thông tin loại hình giao hàng</div>
          <div className="form-content">
            <div className="form-input">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, flexDirection: "column" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Họ tên"
                  error={error.name}
                  variant="outlined"
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.name}
                  onChange={handleChangeForm("name")}
                />
                <TextField
                  id="standard-basic"
                  label="Giá nội thành"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.price_inner}
                  required={true}
                  onChange={handleChangeForm("price_inner")}
                />
                <TextField
                  id="standard-basic"
                  label="Giá ngoại thành"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.price_outer}
                  required={true}
                  onChange={handleChangeForm("price_outer")}
                />
                <TextField
                  id="standard-basic"
                  label="Giá vượt định mức"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.overpriced}
                  required={true}
                  onChange={handleChangeForm("overpriced")}
                />
                <TextField
                  id="standard-basic"
                  label="Số ngày vận chuyển"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.delivery_days}
                  required={true}
                  onChange={handleChangeForm("delivery_days")}
                />
              </Box>
            </div>
          </div>
          <div className="btn-continue" style={{ marginTop: "20px" }}>
            <ButtonAdd label={"Lưu"} onClick={handleSubmit} />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 1000,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTypeAdd;
