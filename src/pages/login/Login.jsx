import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../style/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
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
        navigate(`/home`);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      console.error(error);
    }
  };

  const handleSubmit = () => {
    login(value);
  };
  return (
    <div className="login">
      <div className="left-box">
        <img
          className="image"
          src="https://i.imgur.com/ngzON4L.gif"
          alt="shipping"
        />
      </div>
      <div className="right-box">
        <div className="label-form">Đăng nhập</div>
        <div className="form-input">
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            sx={{
              margin: "10px",
              width: "100%",
            }}
            value={value.email}
            onChange={handleChangeForm("email")}
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
