import { Button, TextField } from "@mui/material";
import "../../style/login.scss";

const Login = () => {
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
          />
          <TextField
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            sx={{
              margin: "10px",
              width: "100%",
            }}
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
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
