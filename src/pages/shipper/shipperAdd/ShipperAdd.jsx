import React, { useState } from "react";
import "../../../style/order.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import validator from "validator";
import axios from "axios";

const ShipperAdd = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    avatar: "",
    capacity: 0,
    dimension: 0,
  });
  const [error, setError] = useState({
    name: false,
    age: false,
    phone: false,
    email: false,
    avatar: false,
    vehicle: {
      capacity: false,
      dimension: false,
    },
  });

  const handleChangeAvatar = (name) => (event) => {
    setError({
      name: false,
      age: false,
      phone: false,
      email: false,
      avatar: false,
      capacity: false,
      dimension: false,
    });

    const files = event.target.files;
    let reader = new FileReader();
    reader.onload = (r) => {
      const fileString = r.target.result.split(",")[1];
      setValues({ ...values, [name]: fileString });
    };
    reader.readAsDataURL(files[0]);
  };

  const handleChangeForm = (name) => (event) => {
    setError({
      name: false,
      age: false,
      phone: false,
      email: false,
      avatar: false,
      capacity: false,
      dimension: false,
    });
    if (name === "dimension" || name === "capacity") {
      const valueNumber = parseFloat(event.target.value);
      if (valueNumber < 0) {
        setValues({ ...values, [name]: 0 });
      } else {
        setValues({ ...values, [name]: valueNumber });
      }
    } else if (name === "age") {
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
      toast.error("Vui lòng nhập họ tên");
      setError({ ...error, name: true });
      return false;
    }
    if (!values.age || values.age <= 0) {
      toast.error("Vui lòng nhập tuổi hợp lệ");
      setError({ ...error, age: true });
      return false;
    }
    if (values.phone === "") {
      toast.error("Vui lòng nhập sô điện thoại liên hệ");
      setError({ ...error, phone: true });
      return false;
    }
    if (
      !values.phone.match("[0-9]{10}") ||
      values.phone.length !== 10 ||
      !values.phone.startsWith("0")
    ) {
      toast.error("Vui lòng nhập sô điện thoại hợp lệ");
      setError({ ...error, phone: true });
      return false;
    }
    if (values.email === "") {
      toast.error("Vui lòng nhập email");
      setError({ ...error, email: true });
      return false;
    }
    if (!validator.isEmail(values.email)) {
      toast.error("Vui lòng nhập email hợp lệ");
      setError({ ...error, email: true });
      return false;
    }
    if (values.capacity <= 0) {
      toast.error("Trọng lượng phải là số lớn hơn 0");
      setError({ ...error, capacity: true });
      return false;
    }
    if (values.dimension <= 0) {
      toast.error("Kích thước phải là số lớn hơn 0");
      setError({ ...error, dimension: true });
      return false;
    }
    if (values.avatar === "") {
      toast.error("Vui lòng chọn ảnh đại diện");
      setError({ ...error, avatar: true });
      return false;
    }

    return true;
  };

  const creatShipper = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/shippers",
        data
      );
      if (result.data) {
        toast.success("Tạo đơn hàng thành công");
        navigate("/shippers");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    if (checkValidate(values)) {
      const data = {
        name: values.name,
        age: values.age,
        avatar: values.avatar,
        email: values.email,
        phone: values.phone,
        vehicle: {
          capacity: values.capacity,
          dimension: values.dimension,
        },
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
          <div className="label-page">Nhập thông tin tài khoản shipper</div>
          <div className="form-content">
            <div className="form-input">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
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
                  label="Tuổi"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.age}
                  required={true}
                  onChange={handleChangeForm("age")}
                />
                <TextField
                  id="standard-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  error={error.phone}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.phone}
                  onChange={handleChangeForm("phone")}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="outlined"
                  error={error.mail}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.email}
                  onChange={handleChangeForm("email")}
                />
                <TextField
                  id="standard-basic"
                  label="Trọng lượng tối đa xe"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.capacity}
                  required={true}
                  onChange={handleChangeForm("capacity")}
                />
                <TextField
                  id="standard-basic"
                  label="Thể tích tối đa xe"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.dimension}
                  required={true}
                  onChange={handleChangeForm("dimension")}
                />
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  width="50%"
                  justifyContent="flex-end"
                  marginLeft="5%"
                >
                  <Button variant="contained" component="label">
                    Tải ảnh đại diện
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleChangeAvatar("avatar")}
                    />
                  </Button>
                </Stack>
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

export default ShipperAdd;
