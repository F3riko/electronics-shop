import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Homepage from "./components/pages/homepage/Homepage";
import ProductPage from "./components/pages/productPage/ProductPage";
import Cart from "./components/pages/cart/Cart";
import OrderPage from "./components/pages/orderPage/OrderPage";
import UserPage from "./components/pages/userPage/UserPage";
import ResetPassword from "./components/sign-up-login/ResetPassword";
import { AuthProvider } from "./components/supportComponents/AuthProvider";
import UserAuth from "./components/supportComponents/UserAuth";
import OrderAuth from "./components/supportComponents/OrderAuth";

// Temporary components

const About = () => {
  return <h1>About</h1>;
};

const Admin = () => {
  return <h1>Admin</h1>;
};

const AdminAuth = () => {
  const isAuthenticated = true;
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    <Navigate to={"/"} />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="cart" element={<Cart />} />

            {/* Temporary route */}
            <Route path="user/passReset" element={<ResetPassword />} />

            <Route path="order" element={<OrderAuth />}>
              <Route path=":orderId" element={<OrderPage />} />
            </Route>

            <Route path="user/main" element={<UserAuth />}>
              <Route index element={<UserPage />} />
              {/* <Route path="order/:orderId" element={<OrderPage />} /> */}
            </Route>
          </Route>
          <Route path="admin/main" element={<AdminAuth />}>
            <Route index element={<Admin />} />
          </Route>
          <Route path="*" element={<h1>Page 404 - Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
