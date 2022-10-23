import ButtonAdd from "../button/buttonAdd";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import "./googleMapAPI.scss";
import { Box } from "@mui/material";

const center = { lat: 10.02977, lng: 105.7704766 };

const GoogleMapAPI = (props) => {
  const { setAddress, setFee } = props;
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAPTBKueiAajnpIMYFjBYdLYUoqQU4xfxE",
    libraries: libraries,
  });

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [tranporstFee, setTranporstFee] = useState(0);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef =
    "Can Tho University, Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam";
  /** @type React.MutableRefObject<HTMLInputElement> */

  const [values, setValues] = useState({
    ward: "",
    commune: "",
    district: "",
    province: "",
  });
  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (!isLoaded) {
    return (
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
    );
  }

  const calculateRoute = async () => {
    const destiantion = `${values.ward} ${values.commune} ${values.district} ${values.province}`;
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
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setTranporstFee(results.routes[0].legs[0].distance.value * 5);
    setDuration(results.routes[0].legs[0].duration.text);
    setAddress(address);
    setFee(fee);
  };

  return (
    <div className="mapContainer">
      <div className="mapInput">
        <div className="input">
          <div className="textfield">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Ấp/Khóm/Khu phố/Đường"
                variant="standard"
                value={values.ward}
                onChange={handleChangeForm("ward")}
              />
              <TextField
                id="standard-basic"
                label="Xã/Phường/Thị trấn"
                variant="standard"
                value={values.commune}
                onChange={handleChangeForm("commune")}
              />
              <TextField
                id="standard-basic"
                label="Quận/huyện"
                variant="standard"
                value={values.district}
                onChange={handleChangeForm("district")}
              />
              <TextField
                id="standard-basic"
                label="Tỉnh/thành phố"
                variant="standard"
                value={values.province}
                onChange={handleChangeForm("province")}
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
    </div>
  );
};

export default GoogleMapAPI;
