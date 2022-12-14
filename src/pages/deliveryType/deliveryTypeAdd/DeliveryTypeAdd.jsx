import React, { useState } from "react";
import "../../../style/order.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonBack from "../../../components/button/buttonBack";

const DeliveryTypeAdd = (props) => {
  const navigate = useNavigate();
  const getStorageValue = (key, defaultValue) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  };
  const supervisor = getStorageValue("supervisor", "");
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
      toast.error("Vui l??ng nh???p lo???i giao h??ng");
      setError({ ...error, name: true });
      return false;
    }
    if (!values.price_inner) {
      toast.error("Vui l??ng nh???p gi?? n???i th??nh");
      setError({ ...error, price_inner: true });
      return false;
    }
    if (values.price_inner <= 0) {
      toast.error("Vui l??ng nh???p gi?? h???p l???");
      setError({ ...error, price_outer: true });
      return false;
    }

    if (!values.price_outer) {
      toast.error("Vui l??ng nh???p gi?? ngo???i th??nh");
      setError({ ...error, price_outer: true });
      return false;
    }

    if (values.price_outer <= 0) {
      toast.error("Vui l??ng nh???p gi?? h???p l???");
      setError({ ...error, price_outer: true });
      return false;
    }

    if (!values.overpriced) {
      toast.error("Vui l??ng nh???p gi?? v?????t khung");
      setError({ ...error, overpriced: true });
      return false;
    }

    if (values.overpriced <= 0) {
      toast.error("Vui l??ng nh???p gi?? h???p l???");
      setError({ ...error, overpriced: true });
      return false;
    }

    if (!values.delivery_days) {
      toast.error("Vui l??ng nh???p s??? ng??y giao h??ng d??? ki???n");
      setError({ ...error, delivery_days: true });
      return false;
    }

    if (values.delivery_days <= 0) {
      toast.error("Vui l??ng nh???p s??? ng??y h???p l???");
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
        toast.success("T???o lo???i giao h??ng th??nh c??ng");
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
        supervisor_id: supervisor.id,
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
          <div className="label-page">Nh???p th??ng tin lo???i h??nh giao h??ng</div>
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
                  label="T??n"
                  error={error.name}
                  variant="outlined"
                  required={true}
                  sx={{ width: "40%", margin: "5%" }}
                  value={values.name}
                  onChange={handleChangeForm("name")}
                />
                <TextField
                  id="standard-basic"
                  label="Gi?? n???i th??nh"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.price_inner}
                  required={true}
                  onChange={handleChangeForm("price_inner")}
                />
                <TextField
                  id="standard-basic"
                  label="Gi?? ngo???i th??nh"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.price_outer}
                  required={true}
                  onChange={handleChangeForm("price_outer")}
                />
                <TextField
                  id="standard-basic"
                  label="Gi?? v?????t ?????nh m???c"
                  sx={{ width: "40%", margin: "5%" }}
                  variant="outlined"
                  type="number"
                  error={error.overpriced}
                  required={true}
                  onChange={handleChangeForm("overpriced")}
                />
                <TextField
                  id="standard-basic"
                  label="S??? ng??y v???n chuy???n"
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
            <Link to="/delivery-types" style={{ textDecoration: "none" }}>
              <ButtonBack label={"Quay l???i"} />
            </Link>
            <ButtonAdd label={"L??u"} onClick={handleSubmit} />
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
