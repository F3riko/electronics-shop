import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useParams,
  Navigate,
} from "react-router-dom";
import ProductPreviewCard from "./components/pages/homepage/ProductPreviewCard";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import ProductPreviewGallery from "./components/pages/homepage/Product Preview Gallery/ProductPreviewGallery";

// Temporary components
const testData = Array(100).fill(1);

const Navbar = () => {
  return (
    <>
      <nav>
        <h1>Navigaiton bar</h1>
      </nav>
      <Outlet />
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <h1>Main page</h1>
      <ProductPreviewGallery productsData={testData} />
    </>
  );
};

const About = () => {
  return <h1>About</h1>;
};

const Admin = () => {
  return <h1>Admin</h1>;
};

const User = () => {
  return <h1>User</h1>;
};

const Product = () => {
  const { productId } = useParams();
  return <h1>Product Details - ID: {productId}</h1>;
};
const UserAuth = () => {
  const isAuthenticated = true;
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    <Navigate to={"/"} />;
  }
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
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<About />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="cart" />
          <Route path="user/main" element={<UserAuth />}>
            <Route index element={<User />} />
            <Route path="order/:orderId" />
          </Route>
        </Route>
        <Route path="admin/main" element={<AdminAuth />}>
          <Route index element={<Admin />} />
        </Route>
        <Route path="*" element={<h1>Page 404 - Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
