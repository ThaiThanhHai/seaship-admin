import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputInfo from "./pages/order/orderAdd/InputInfo";
import OrderDetail from "./pages/order/orderDetail/OrderDetail";
import Shipper from "./pages/shipper/Shipper";
import Profile from "./pages/profile/Profile";
import HistoryDelivery from "./pages/history/HistoryDelivery";
import DeliveryType from "./pages/deliveryType/DeliveryType";
import ShipperAdd from "./pages/shipper/shipperAdd/ShipperAdd";
import DeliveryTypeAdd from "./pages/deliveryType/deliveryTypeAdd/DeliveryTypeAdd";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Delivery from "./pages/delivery/Delivery";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="orders/*">
              <Route index element={<Order />} />
              <Route path="add/step1" element={<InputInfo />} />
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="shippers/*">
              <Route index element={<Shipper />} />
              <Route path="add" element={<ShipperAdd />} />
            </Route>
            <Route path="schedules/*">
              <Route index element={<Delivery />} />
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
