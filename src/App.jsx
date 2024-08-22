import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReviewList from "./pages/reviewList/reviewList";
import TransactionList from "./pages/transactionList/transactionList";
import SalesList from "./pages/salesList/salesList";
import Login from "./pages/login/login";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Outlet />
        </div>
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <UserList />,
        },
        {
          path: "/user/:userId",
          element: <User />,
        },
        {
          path: "/newUser",
          element: <NewUser />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/reviews",
          element: <ReviewList />,
        },
        {
          path: "/sales",
          element: <SalesList />,
        },
        {
          path: "/transactions",
          element: <TransactionList />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/newproduct",
          element: <NewProduct />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <Login />,
    },
    
  ]);

  return <RouterProvider router={router} />;

}

export default App;
