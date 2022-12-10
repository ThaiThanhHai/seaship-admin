import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ButtonSchedule from "../../components/button/buttonSchedule";
import CardDelivery from "../../components/card/CardDelivery";
import Empty from "../../components/empty/Empty";
import Mapbox from "../../components/map/mapbox";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/delivery.scss";
import ScheduleMotor from "./schedule/ScheduleMotor";
import ScheduleTruck from "./schedule/ScheduleTruck";

const Delivery = () => {
  const [openModalTruck, setOpenModalTruck] = useState(false);
  const [openModalMotor, setOpenModalMotor] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const getDeliveries = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/deliveries"
        );
        if (result.data) {
          setDeliveries(result.data?.schedule_of_shipper);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDeliveries();
  }, [deliveries]);

  return (
    <div className="delivery">
      <Sidebar />
      <div className="deliveryContainer">
        <Navbar />
        <div className="delivery">
          <div className="map">
            <Mapbox address={address && address} />
            <div className="button-layout">
              <ButtonSchedule
                label={"Xếp lịch xe máy"}
                type={"motor"}
                onClick={() => setOpenModalMotor(true)}
              />
              <ButtonSchedule
                label={"Xếp lịch xe tải"}
                type={"truck"}
                onClick={() => setOpenModalTruck(true)}
              />
            </div>
            {openModalTruck && (
              <ScheduleTruck
                open={openModalTruck}
                setOpen={setOpenModalTruck}
              />
            )}
            {openModalMotor && (
              <ScheduleMotor
                open={openModalMotor}
                setOpen={setOpenModalMotor}
              />
            )}
          </div>
          <div className="list">
            {!deliveries.length ? (
              <Empty />
            ) : (
              <CardDelivery
                deliveries={deliveries && deliveries}
                setAddress={setAddress}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
