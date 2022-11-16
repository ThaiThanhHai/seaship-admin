import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../style/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    password: "",
  });
  const handleChangeForm = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };

  const login = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/supervisor/login",
        data
      );
      if (res) {
        localStorage.setItem("supervisor", JSON.stringify(res.data));
        navigate(`/dashboard`);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      console.error(error);
    }
  };

  const handleSubmit = () => {
    console.log(value);
    login(value);
  };
  return (
    <div className="login">
      <div className="left-box">
        <img
          className="image"
          src="https://img.freepik.com/free-vector/free-shipping-concept-illustration_114360-2461.jpg?w=740&t=st=1667313724~exp=1667314324~hmac=53c3db7336b72e735056cecfa3ba6dd556b7da318d8e6518db93bf39d01dd133"
          alt="shipping"
        />
      </div>
      <div className="right-box">
        <div className="label-form">Đăng nhập</div>
        <div className="form-input">
          <TextField
            id="outlined-basic"
            label="Tên đăng nhập"
            variant="outlined"
            sx={{
              margin: "10px",
              width: "100%",
            }}
            value={value.name}
            onChange={handleChangeForm("name")}
          />
          <TextField
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            type={"password"}
            sx={{
              margin: "10px",
              width: "100%",
            }}
            value={value.password}
            onChange={handleChangeForm("password")}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "#fff",
              backgroundColor: "#007041",
              margin: "10px",
              "&:hover": {
                backgroundColor: "#007041",
                color: "#eee",
              },
            }}
            onClick={handleSubmit}
          >
            Đăng nhập
          </Button>
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default Login;
