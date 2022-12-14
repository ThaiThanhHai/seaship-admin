import React, { useEffect, useState } from "react";
import "../../../style/order.scss";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ButtonAdd from "../../../components/button/buttonAdd";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MultipleSelect from "../../../components/select/MultipleSelect";
import axios from "axios";
import ButtonBack from "../../../components/button/buttonBack";
import Loader from "../../../components/loader/Loader";
import round from 'lodash'

const InputInfo = () => {
  const navigate = useNavigate();
  const getStorageValue = (key, defaultValue) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      const initial = saved !== null ? JSON.parse(saved) : defaultValue;
      return initial;
    }
  };
  const [loading, setLoading] = useState(false);
  const supervisor = getStorageValue("supervisor", "");
  const [values, setValues] = useState({
    order_name: "",
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    weight: 0,
    address: "",
    dimension: "",
    delivery_type: "",
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
    address: false,
    delivery_type: false,
    received_date: false,
    note: false,
  });
  const [deliveryType, setDeliveryType] = useState({});

  const getDeliveryTypes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/delivery-type");
      setDeliveryType(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const creatOrder = async (data) => {
    let res;
    try {
      res = await axios.post("http://localhost:3000/api/v1/orders", data);
      navigate(`/orders/${res.data.id}`);
      toast.success("T???o ????n h??ng th??nh c??ng");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDeliveryTypes();
  }, [loading]);

  const handleChangeForm = (name) => (event) => {
    setError({
      order_name: false,
      sender_name: false,
      sender_phone: false,
      receiver_name: false,
      receiver_phone: false,
      weight: false,
      dimension: false,
      delivery_type: false,
      note: false,
    });
    if (name === "weight") {
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
      toast.error("Vui l??ng nh???p t??n ????n h??ng");
      setError({ ...error, order_name: true });
      return false;
    }
    if (values.weight <= 0) {
      toast.error("Tr???ng l?????ng ph???i l?? s??? l???n h??n 0");
      setError({ ...error, weight: true });
      return false;
    }

    if (values.weight > 20) {
      toast.error("Tr???ng l?????ng h??ng h??a ph???i l?? ph???i nh??? h??n 20kg");
      setError({ ...error, weight: true });
      return false;
    }
    const valueDimensions = values.dimension.toString().split("x");

    if (!valueDimensions) {
      toast.error("Vui l??ng nh???p th??? t??ch ????n h??ng ????ng ?????nh d???ng");
      setError({ ...error, dimension: true });
      return false;
    }
    if (
      valueDimensions.length !== 3 ||
      isNaN(Number(valueDimensions[0])) ||
      isNaN(Number(valueDimensions[1])) ||
      isNaN(Number(valueDimensions[2]))
    ) {
      toast.error("Vui l??ng nh???p th??? t??ch ????n h??ng ????ng ?????nh d???ng");
      setError({ ...error, dimension: true });
      return false;
    }

    if (valueDimensions[0] * valueDimensions[1] * valueDimensions[2] > 90000) {
      toast.error("Kh???i l?????ng v???n chuy???n v?????t qu?? gi???i h???n cho ph??p l?? 15");
      setError({ ...error, dimension: true });
      return false;
    }
    if (values.delivery_type === "") {
      toast.error("Vui l??ng ch???n h??nh th???c giao h??ng");
      setError({ ...error, delivery_type: true });
      return false;
    }
    if (values.sender_name === "") {
      toast.error("Vui l??ng nh???p t??n ng?????i g???i");
      setError({ ...error, sender_name: true });
      return false;
    }
    if (values.sender_phone === "") {
      toast.error("Vui l??ng nh???p s?? ??i???n tho???i li??n h???");
      setError({ ...error, sender_phone: true });
      return false;
    }
    if (values.receiver_name === "") {
      toast.error("Vui l??ng nh???p t??n ng?????i nh???n");
      setError({ ...error, receiver_name: true });
      return false;
    }
    if (values.receiver_phone === "") {
      toast.error("Vui l??ng nh???p s?? ??i???n tho???i li??n h???");
      setError({ ...error, receiver_phone: true });
      return false;
    }
    if (values.address === "") {
      toast.error("Vui l??ng nh???p ?????a ch??? giao h??ng");
      setError({ ...error, address: true });
      return false;
    }
    if (values.sender_phone.length > 11) {
      toast.error("Vui l??ng nh???p s?? ??i???n tho???i h???p l???");
      setError({ ...error, sender_phone: true });
      return false;
    }
    if (values.receiver_phone.length > 11) {
      toast.error("Vui l??ng nh???p s?? ??i???n tho???i h???p l???");
      setError({ ...error, receiver_phone: true });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const valueDimensions = values.dimension.toString().split("x");
    if (checkValidate(values)) {
      const data = {
        sender_name: values.sender_name,
        sender_phone: values.sender_phone,
        receiver_name: values.receiver_name,
        receiver_phone: values.receiver_phone,
        note: values.note,
        delivery_type_id: values.delivery_type,
        supervisor_id: supervisor.id,
        cargo: {
          name: values.order_name,
          weight: values.weight,
          dimension:
            round((valueDimensions[0] * valueDimensions[1] * valueDimensions[2]) /
            6000, 2),
        },
        order_address: {
          address: values.address,
        },
      };
      setLoading(true);
      creatOrder(data);
    }
  };

  return (
    <>
      <div className="order">
        <Sidebar />
        <div className="orderContainer">
          <Navbar />
          <div className="form-layout">
            <div className="label-page">Nh???p th??ng tin ????n h??ng</div>
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
                    label="T??n ????n h??ng"
                    error={error.order_name}
                    variant="outlined"
                    required={true}
                    sx={{ width: "40%", margin: "5%" }}
                    value={values.order_name}
                    onChange={handleChangeForm("order_name")}
                  />
                  <TextField
                    id="standard-basic"
                    label="Tr???ng l?????ng th???c t???"
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
                    label="Th??? t??ch ????n h??ng (d??i x r???ng x cao)"
                    variant="outlined"
                    error={error.dimension}
                    required={true}
                    sx={{ width: "40%", margin: "5%" }}
                    onChange={handleChangeForm("dimension")}
                  />
                  <MultipleSelect
                    deliveryType={deliveryType}
                    values={values}
                    setValues={setValues}
                    error={error}
                    setError={setError}
                  />
                  <TextField
                    id="standard-basic"
                    label="T??n ng?????i g???i"
                    variant="outlined"
                    error={error.sender_name}
                    required={true}
                    sx={{ width: "40%", margin: "5%" }}
                    value={values.sender_name}
                    onChange={handleChangeForm("sender_name")}
                  />
                  <TextField
                    id="standard-basic"
                    label="S??? ??i???n tho???i ng?????i g???i"
                    variant="outlined"
                    error={error.sender_phone}
                    required={true}
                    sx={{ width: "40%", margin: "5%" }}
                    value={values.sender_phone}
                    onChange={handleChangeForm("sender_phone")}
                  />
                  <TextField
                    id="standard-basic"
                    label="T??n ng?????i nh???n"
                    variant="outlined"
                    error={error.receiver_name}
                    required={true}
                    sx={{ width: "40%", margin: "5%" }}
                    value={values.receiver_name}
                    onChange={handleChangeForm("receiver_name")}
                  />
                  <TextField
                    id="standard-basic"
                    label="S??? ??i???n tho???i ng?????i nh???n"
                    variant="outlined"
                    error={error.receiver_phone}
                    required={true}
                    sx={{ width: "40%", margin: "5%" }}
                    value={values.receiver_phone}
                    onChange={handleChangeForm("receiver_phone")}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="?????a ch???"
                    sx={{ width: "81%" }}
                    variant="outlined"
                    multiline
                    rows={2}
                    value={values.address}
                    onChange={handleChangeForm("address")}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Ghi ch??"
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
              <Link to="/orders" style={{ textDecoration: "none" }}>
                <ButtonBack label={"H???y"} />
              </Link>
              <ButtonAdd label={"T???o ????n"} onClick={handleSubmit} />
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
      {loading ? <Loader /> : undefined}
    </>
  );
};

export default InputInfo;
