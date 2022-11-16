import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputInfo from "./pages/order/orderAdd/InputInfo";
import InputAddress from "./pages/order/orderAdd/InputAddress";
import OrderDetail from "./pages/order/orderDetail/OrderDetail";
import Schedule from "./pages/schedule/Schedule";
import ScheduleAdd from "./pages/schedule/scheduleAdd/ScheduleAdd";
import Shipper from "./pages/shipper/Shipper";
import Profile from "./pages/profile/Profile";
import HistoryDelivery from "./pages/history/HistoryDelivery";
import DeliveryType from "./pages/deliveryType/DeliveryType";
import Dashboard from "./pages/dashboard/Dashboard";
import ShipperAdd from "./pages/shipper/shipperAdd/ShipperAdd";
import DeliveryTypeAdd from "./pages/deliveryType/deliveryTypeAdd/DeliveryTypeAdd";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders/*">
              <Route index element={<Order />} />
              <Route path="add/step1" element={<InputInfo />} />
              <Route path="add/step2" element={<InputAddress />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="shippers/*">
              <Route index element={<Shipper />} />
              <Route path="add" element={<ShipperAdd />} />
            </Route>
            <Route path="schedules/*">
              <Route index element={<Schedule />} />
              <Route path="add" element={<ScheduleAdd />} />
            </Route>
            <Route path="profiles">
              <Route index element={<Profile />} />
            </Route>
            <Route path="delivery-types">
              <Route index element={<DeliveryType />} />
              <Route path="add" element={<DeliveryTypeAdd />} />
            </Route>
            <Route path="history-delivery">
              <Route index element={<HistoryDelivery />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
