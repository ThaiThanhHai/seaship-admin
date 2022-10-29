import ButtonAdd from "../button/buttonAdd";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import {
  getProvinces,
  getDistricts,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "sub-vn";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import "./googleMapAPI.scss";
import toast, { Toaster } from "react-hot-toast";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";

const center = { lat: 10.02977, lng: 105.7704766 };

const GoogleMapAPI = (props) => {
  const { setAddress, setFee, setLongitude, setLatitude } = props;
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAPTBKueiAajnpIMYFjBYdLYUoqQU4xfxE",
    libraries: libraries,
  });
  const [values, setValues] = useState({
    ward: "",
    address: "",
    district: "",
    province: "",
  });

  const [error, setError] = useState(false);
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [tranporstFee, setTranporstFee] = useState(0);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const provinces = getProvinces();
  const districts = getDistricts();
  const listProvinces = provinces.slice(50, 63).map((item) => item.name);

  const getDistrict = (provinceCode) => {
    if (provinceCode !== "") {
      const districts = getDistrictsByProvinceCode(provinceCode).map(
        (item) => item.name
      );
      return districts;
    }
  };

  const getWard = (districtCode) => {
    if (districtCode !== "") {
      const wards = getWardsByDistrictCode(districtCode).map(
        (item) => item.name
      );
      return wards;
    }
  };

  const originRef =
    "Can Tho University, Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam";

  const handleChangeForm = (name) => (event) => {
    if (name === "province") {
      setError(false);
      const value = provinces.filter(
        (item) => item.name === event.target.value
      );
      setProvinceCode(value[0].code);
      setValues({ ...values, [name]: event.target.value });
    }
    if (name === "district") {
      setError(false);
      const value = districts.filter(
        (item) => item.name === event.target.value
      );
      setDistrictCode(value[0].code);
      setValues({ ...values, [name]: event.target.value });
    }
    if (name === "ward") {
      setError(false);
      setValues({ ...values, [name]: event.target.value });
    }
    if (name === "address") {
      setError(false);
      setValues({ ...values, [name]: event.target.value });
    }
  };

  if (!isLoaded) {
    return (
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
    );
  }

  const checkValidate = (values) => {
    if (values.province === "") {
      setError(true);
      toast.error("Vui lòng chọn tỉnh/thành phố");
      return false;
    }
    if (values.district === "") {
      setError(true);
      toast.error("Vui lòng chọn quận/huyện/thị xã");
      return false;
    }
    if (values.ward === "") {
      setError(true);
      toast.error("Vui lòng chọn xã/phường/thị trấn");
      return false;
    }
    if (values.address === "") {
      setError(true);
      toast.error("Vui lòng nhập địa chỉ");
      return false;
    }
    return true;
  };

  const calculateRoute = async () => {
    if (checkValidate(values)) {
      const destiantion = `${values.address} ${values.ward} ${values.district} ${values.province}`;

      if (destiantion === "") {
        return;
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef,
        destination: destiantion,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      const address = results.routes[0].legs[0].end_address;
      const fee = results.routes[0].legs[0].distance.value * 5;
      const longitude = results.routes[0].legs[0].end_location.lng();
      const latitude = results.routes[0].legs[0].end_location.lat();

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setTranporstFee(results.routes[0].legs[0].distance.value * 5);
      setDuration(results.routes[0].legs[0].duration.text);
      setAddress(address);
      setFee(fee);
      setLongitude(longitude);
      setLatitude(latitude);
    }
  };

  return (
    <div className="mapContainer">
      <div className="mapInput">
        <div className="input">
          <div className="textfield">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "400px" },
              }}
              noValidate
              autoComplete="off"
            >
              <InputLabel id="demo-multiple-name-label">Tỉnh/Thành</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                error={error}
                variant="outlined"
                value={values.province}
                onChange={handleChangeForm("province")}
              >
                {listProvinces &&
                  listProvinces.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
              <InputLabel id="demo-multiple-name-label">Quận/Huyện</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                variant="outlined"
                error={error}
                value={values.district}
                onChange={handleChangeForm("district")}
              >
                {getDistrict(provinceCode) &&
                  getDistrict(provinceCode).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
              <InputLabel id="demo-multiple-name-label">
                Xã/Phường/Thị Trấn
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                variant="outlined"
                error={error}
                value={values.ward}
                onChange={handleChangeForm("ward")}
              >
                {getWard(districtCode) &&
                  getWard(districtCode).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
              <InputLabel id="demo-multiple-name-label">Địa chỉ</InputLabel>
              <TextField
                id="standard-basic"
                variant="outlined"
                error={error}
                value={values.address}
                onChange={handleChangeForm("address")}
                sx={{ width: "400px !important" }}
              />
            </Box>
          </div>
          <div>
            <ButtonAdd label={"Tìm kiếm"} onClick={calculateRoute} />
          </div>
        </div>
        <div
          className="show"
          style={duration && duration ? null : { display: "none" }}
        >
          <div>
            Khoảng cách: <span style={{ fontWeight: "bold" }}>{distance} </span>
          </div>
          <div>
            Thời gian di chuyển:
            <span style={{ fontWeight: "bold" }}> {duration}</span>{" "}
          </div>
          <div>
            Phí vận chuyển:
            <span style={{ fontWeight: "bold" }}> {tranporstFee}đ</span>
          </div>
        </div>
      </div>
      <div className="mapContent">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
};

export default GoogleMapAPI;
