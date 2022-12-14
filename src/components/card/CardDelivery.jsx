import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CardDelivery = ({ deliveries, setAddress }) => {
  return deliveries.map((delivery, index) => {
    return (
      <div
        className="card"
        key={index}
        onClick={() => {
          setAddress(delivery.coordinates);
        }}
      >
        <div className="left">
          <div className="name">{delivery.name}</div>
          <div className="item">
            <div className="label">Khối lượng vận chuyển: </div>
            <div className="number">{delivery.totalDimension} kg</div>
          </div>
          <div className="item">
            <div className="label">Tổng phí vận chuyển: </div>
            <div className="number">{delivery.totalFee} đ</div>
          </div>
          <div className="item">
            <div className="label">Quãng đường di chuyển: </div>
            <div className="number">{delivery.totalDistance} km</div>
          </div>
        </div>
        <div className="right">
          {delivery.order_ids.map((id, index) => {
            if (id !== 0) {
              if (index === delivery.order_ids.length - 1) {
                return (
                  <Tooltip
                    title={delivery.address[index]}
                    placement="top"
                    key={index}
                  >
                    <Link
                      to={`/orders/${id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="tangle">
                        <span>{index + 1}</span>
                      </div>
                    </Link>
                  </Tooltip>
                );
              } else {
                return (
                  <Tooltip
                    title={delivery.address[index]}
                    placement="top"
                    key={index}
                  >
                    <Link
                      to={`/orders/${id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={delivery.status[index-1] === 'delivering' ? 'tangle' : (delivery.status[index-1] === 'finished') ? 'tangle-success' : 'tangle-error'}>
                        <span>{index + 1}</span>
                        <div className="horization"></div>
                      </div>
                    </Link>
                  </Tooltip>
                );
              }
            } else {
              if (index === delivery.order_ids.length - 1) {
                return (
                  <Tooltip
                    title={delivery.address[index]}
                    placement="top"
                    key={index}
                  >
                    <div className="tangle">
                      <span>{index + 1}</span>
                    </div>
                  </Tooltip>
                );
              } else {
                return (
                  <Tooltip
                    title={delivery.address[index]}
                    placement="top"
                    key={index}
                  >
                    <div className="tangle">
                      <span>{index + 1}</span>
                      <div className="horization"></div>
                    </div>
                  </Tooltip>
                );
              }
            }
          })}
        </div>
      </div>
    );
  });
};

export default CardDelivery;
