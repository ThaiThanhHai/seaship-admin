import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import InputInfo from "./pages/order/orderAdd/InputInfo";
import InputAddress from "./pages/order/orderAdd/InputAddress";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="orders/*">
              <Route index element={<Order />} />
              <Route path="add/step1" element={<InputInfo />} />
              <Route path="add/step2" element={<InputAddress />} />
              <Route path=":orderId" element={<Single />} />
            </Route>
            <Route path="products">
              <Route index element={<Order />} />
              <Route path=":productId" element={<Single />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
