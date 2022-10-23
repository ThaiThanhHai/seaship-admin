import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const services = ["Giao hàng nhanh", "Giao hàng tiết kiệm"];

export default function MultipleSelect() {
  const [service, setService] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: "40%" }}>
        <InputLabel id="demo-multiple-name-label">Chọn loại dịch vụ</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={service}
          required={true}
          onChange={handleChange}
          input={<OutlinedInput label="Chọn loại dịch vụ" />}
          sx={{ textAlign: "left" }}
        >
          {services.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
