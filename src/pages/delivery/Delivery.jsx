import React from "react";
import { useState } from "react";
import ButtonSchedule from "../../components/button/buttonSchedule";
import Mapbox from "../../components/map/mapbox";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../style/delivery.scss";
import ScheduleTruck from "./schedule/ScheduleTruck";

const Delivery = () => {
  const [openModalTruck, setOpenModalTruck] = useState(false);
  const [openModalMotor, setOpenModalMotor] = useState(false);
  return (
    <div className="delivery">
      <Sidebar />
      <div className="deliveryContainer">
        <Navbar />
        <div className="delivery">
          <div className="map">
            <Mapbox />
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
              <ScheduleTruck
                open={openModalMotor}
                setOpen={setOpenModalMotor}
              />
            )}
          </div>
          <div className="list">
            <div className="card">
              <div className="left">
                <div className="name">Luffy</div>
                <div className="item">
                  <div className="label">Tải trọng(kg)</div>
                  <div className="number">30</div>
                </div>
                <div className="item">
                  <div className="label">Khối lượng(m3)</div>
                  <div className="number">0.5</div>
                </div>
                <div className="item">
                  <div className="label">Quãng đường(km)</div>
                  <div className="number">5</div>
                </div>
              </div>
              <div className="right">
                <div className="tangle">
                  <span>1</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>2</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>3</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>4</span>
                  {/* <div className="horization"></div> */}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="left">
                <div className="name">Luffy</div>
                <div className="item">
                  <div className="label">Tải trọng(kg)</div>
                  <div className="number">30</div>
                </div>
                <div className="item">
                  <div className="label">Khối lượng(m3)</div>
                  <div className="number">0.5</div>
                </div>
                <div className="item">
                  <div className="label">Quãng đường(km)</div>
                  <div className="number">5</div>
                </div>
              </div>
              <div className="right">
                <div className="tangle">
                  <span>1</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>2</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>3</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>4</span>
                  {/* <div className="horization"></div> */}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="left">
                <div className="name">Luffy</div>
                <div className="item">
                  <div className="label">Tải trọng(kg)</div>
                  <div className="number">30</div>
                </div>
                <div className="item">
                  <div className="label">Khối lượng(m3)</div>
                  <div className="number">0.5</div>
                </div>
                <div className="item">
                  <div className="label">Quãng đường(km)</div>
                  <div className="number">5</div>
                </div>
              </div>
              <div className="right">
                <div className="tangle">
                  <span>1</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>2</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>3</span>
                  <div className="horization"></div>
                </div>
                <div className="tangle">
                  <span>4</span>
                  {/* <div className="horization"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
