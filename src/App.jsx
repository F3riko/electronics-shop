import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/NavBar";
import Homepage from "./components/pages/homePage/Homepage";
import ProductPage from "./components/pages/productPage/ProductPage";
import Cart from "./components/pages/cartPage/Cart";
import OrderPage from "./components/pages/orderPage/OrderPage";
import UserPage from "./components/pages/userPage/UserPage";
import ResetPassword from "./components/forms/modalForms/ResetModal";
import { AuthProvider } from "./contextProviders/AuthProvider";
import UserAuth from "./components/layout/UserAuth";
import OrderAuth from "./components/layout/OrderAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Homepage />} />
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="user/passReset" element={<ResetPassword />} />
            <Route path="order" element={<OrderAuth />}>
              <Route path=":orderId" element={<OrderPage />} />
            </Route>
            <Route path="user/main" element={<UserAuth />}>
              <Route index element={<UserPage />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Page 404 - Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
