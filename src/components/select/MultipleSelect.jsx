import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const services = ["Giao hàng nhanh", "Giao hàng tiết kiệm"];

export default function MultipleSelect(props) {
  const { values, setValues, error, setError } = props;

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
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: "40%" }}>
        <InputLabel id="demo-multiple-name-label">Chọn loại dịch vụ</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          error={error.delivery_type}
          value={values.delivery_type}
          required={true}
          onChange={handleChangeForm("delivery_type")}
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
