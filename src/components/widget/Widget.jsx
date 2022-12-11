import "./widget.scss";
import {
  DirectionsBike,
  LocalGroceryStore,
  MonetizationOnOutlined,
  MonitorWeight,
} from "@mui/icons-material";

const Widget = ({ type, number }) => {
  let data;

  switch (type) {
    case "order":
      data = {
        title: "Tổng số đơn hàng",
        icon: (
          <LocalGroceryStore
            className="icon"
            style={{
              color: "#007041",
              backgroundColor: "#eee",
              fontSize: "28px",
            }}
          />
        ),
      };
      break;
    case "distance":
      data = {
        title: "Tổng quãng đường giao hàng",
        icon: (
          <DirectionsBike
            className="icon"
            style={{
              color: "#007041",
              backgroundColor: "#eee",
              fontSize: "28px",
            }}
          />
        ),
      };
      break;
    case "dimension":
      data = {
        title: "Tổng khối lượng vận chuyển",
        icon: (
          <MonitorWeight
            className="icon"
            style={{
              color: "#007041",
              backgroundColor: "#eee",
              fontSize: "28px",
            }}
          />
        ),
      };
      break;
    case "fee":
      data = {
        title: "Tổng phí vận chuyển",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{
              color: "#007041",
              backgroundColor: "#eee",
              fontSize: "28px",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <span className="top">{data.title}</span>
      <div className="bottom">
        <span className="counter">{number}</span>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
