import React, { useState } from "react";
import "../order.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { addOrder } from "../../../context/orders/orderSlice";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MultipleSelect from "../../../components/select/MultipleSelect";

const InputInfo = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [focus, setFocused] = useState(false);
  // const [hasValue, setHasValue] = useState(false);
  const [values, setValues] = useState({
    order_name: "",
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    weight: 0,
    dimension: 0,
    received_date: "",
    note: "",
  });
  const [error, setError] = useState({
    order_name: false,
    sender_name: false,
    sender_phone: false,
    receiver_name: false,
    receiver_phone: false,
    weight: false,
    dimension: false,
    received_date: false,
    note: false,
  });
  // const onFocus = () => setFocused(true);
  // const onBlur = () => setFocused(false);
  const steps = ["Nhập thông tin đơn hàng", "Nhập địa chỉ giao hàng"];

  const handleChangeForm = (name) => (event) => {
    setError({
      order_name: false,
      sender_name: false,
      sender_phone: false,
      receiver_name: false,
      receiver_phone: false,
      weight: false,
      dimension: false,
      received_date: false,
      note: false,
    });
    // if (name === "received_date") {
    //   event.target.value && setHasValue(true);
    // }
    if (name === "dimension" || name === "weight") {
      const valueNumber = parseFloat(event.target.value);
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
    if (values.order_name === "") {
      toast.error("Vui lòng nhập tên đơn hàng");
      setError({ ...error, order_name: true });
      return false;
    }
    if (values.weight <= 0) {
      toast.error("Trọng lượng phải là số lớn hơn 0");
      setError({ ...error, weight: true });
      return false;
    }
    if (values.dimension <= 0) {
      toast.error("Kích thước phải là số lớn hơn 0");
      setError({ ...error, dimension: true });
      return false;
    }
    if (values.received_date === "") {
      toast.error("Vui lòng chọn ngày giao hàng");
      setError({ ...error, received_date: true });
      return false;
    }
    if (values.sender_name === "") {
      toast.error("Vui lòng nhập tên người gửi");
      setError({ ...error, sender_name: true });
      return false;
    }
    if (values.sender_phone === "") {
      toast.error("Vui lòng nhập sô điện thoại liên hệ");
      setError({ ...error, sender_phone: true });
      return false;
    }
    if (values.receiver_name === "") {
      toast.error("Vui lòng nhập tên người nhận");
      setError({ ...error, receiver_name: true });
      return false;
    }
    if (values.receiver_phone === "") {
      toast.error("Vui lòng nhập sô điện thoại liên hệ");
      setError({ ...error, receiver_phone: true });
      return false;
    }
    if (
      !values.sender_phone.match("[0-9]{10}") ||
      values.sender_phone.length !== 10 ||
      !values.sender_phone.startsWith("0")
    ) {
      toast.error("Vui lòng nhập sô điện thoại hợp lệ");
      setError({ ...error, sender_phone: true });
      return false;
    }
    if (
      !values.receiver_phone.match("[0-9]{10}") ||
      values.receiver_phone.length !== 10 ||
      !values.receiver_phone.startsWith("0")
    ) {
      toast.error("Vui lòng nhập sô điện thoại hợp lệ");
      setError({ ...error, receiver_phone: true });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (checkValidate(values)) {
      dispatch(addOrder(values));
      navigate("/orders/add/step2");
    }
  };
  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <Stepper alternativeLabel sx={{ marginTop: "20px" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="form-layout">
          <div className="label-page">Nhập thông tin đơn hàng</div>
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
                  label="Tên đơn hàng"
                  error={error.order_name}
                  variant="outlined"
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.order_name}
                  onChange={handleChangeForm("order_name")}
                />
                <TextField
                  id="standard-basic"
                  label="Trọng lượng đơn hàng"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  placeholder="kg"
                  type="number"
                  error={error.weight}
                  required={true}
                  onChange={handleChangeForm("weight")}
                />
                <TextField
                  id="outlined"
                  label="Kích thước 3 chiều"
                  variant="outlined"
                  type="number"
                  placeholder="cm3"
                  error={error.dimension}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  onChange={handleChangeForm("dimension")}
                />
                <MultipleSelect />
                {/* <TextField
                  id="outlined-name"
                  label="Ngày nhận hàng"
                  error={error.received_date}
                  required={true}
                  variant="outlined"
                  sx={{ width: "40%", margin: "5%" }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  type={hasValue || focus ? "date" : "text"}
                  value={values.received_date}
                  onChange={handleChangeForm("received_date")}
                /> */}
                <TextField
                  id="standard-basic"
                  label="Tên người gửi"
                  variant="outlined"
                  error={error.sender_name}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.sender_name}
                  onChange={handleChangeForm("sender_name")}
                />
                <TextField
                  id="standard-basic"
                  label="Số điện thoại người gửi"
                  variant="outlined"
                  error={error.sender_phone}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.sender_phone}
                  onChange={handleChangeForm("sender_phone")}
                />

                <TextField
                  id="standard-basic"
                  label="Tên người nhận"
                  variant="outlined"
                  error={error.receiver_name}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.receiver_name}
                  onChange={handleChangeForm("receiver_name")}
                />
                <TextField
                  id="standard-basic"
                  label="Số điện thoại người nhận"
                  variant="outlined"
                  error={error.receiver_phone}
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.receiver_phone}
                  onChange={handleChangeForm("receiver_phone")}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Ghi chú"
                  sx={{ width: "81%" }}
                  variant="outlined"
                  multiline
                  rows={2}
                  value={values.note}
                  onChange={handleChangeForm("note")}
                />
              </Box>
            </div>
          </div>
          <div className="btn-continue">
            <ButtonAdd label={"Tiếp theo"} onClick={handleSubmit} />
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

export default InputInfo;
