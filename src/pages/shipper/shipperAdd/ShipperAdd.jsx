import React, { useState } from "react";
import "../../../style/shipper-add.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import validator from "validator";
import axios from "axios";
import ButtonSave from "../../../components/button/buttonSave";

const ShipperAdd = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "motorcycle",
  });
  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false,
  });

  // const handleChangeAvatar = (name) => (event) => {
  //   setError({
  //     name: false,
  //     age: false,
  //     phone: false,
  //     email: false,
  //     avatar: false,
  //     capacity: false,
  //     dimension: false,
  //   });

  //   const files = event.target.files;
  //   let reader = new FileReader();
  //   reader.onload = (r) => {
  //     const fileString = r.target.result.split(",")[1];
  //     setValues({ ...values, [name]: fileString });
  //   };
  //   reader.readAsDataURL(files[0]);
  // };

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

    setValues({ ...values, [name]: event.target.value });
  };

  const checkValidate = (values) => {
    if (values.name === "") {
      toast.error("Vui lòng nhập họ tên");
      setError({ ...error, name: true });
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
        email: values.email,
        phone: values.phone,
        vehicle: values.vehicle,
      };
      console.log(data);
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
                  sx={{ width: "60%", margin: "10%" }}
                  value={values.name}
                  onChange={handleChangeForm("name")}
                />
                <TextField
                  id="standard-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  error={error.phone}
                  required={true}
                  sx={{ width: "60%", margin: "10%" }}
                  value={values.phone}
                  onChange={handleChangeForm("phone")}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="outlined"
                  error={error.mail}
                  required={true}
                  sx={{ width: "60%", margin: "10%" }}
                  value={values.email}
                  onChange={handleChangeForm("email")}
                />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="radio"
                  sx={{
                    width: "60%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "140px !important",
                  }}
                  value={values.vehicle}
                  onChange={handleChangeForm("vehicle")}
                >
                  <FormControlLabel
                    value="motorcycle"
                    control={<Radio />}
                    label="Xe máy"
                  />
                  <FormControlLabel
                    value="truck"
                    control={<Radio />}
                    label="Xe tải"
                  />
                </RadioGroup>
                {/* <Stack
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
                </Stack> */}
              </Box>
            </div>
          </div>
          <div className="btn-continue" style={{ marginTop: "20px" }}>
            <ButtonSave label={"Lưu"} onClick={handleSubmit} />
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
