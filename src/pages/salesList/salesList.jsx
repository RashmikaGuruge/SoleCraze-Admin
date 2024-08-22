import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { formatDistanceToNow } from 'date-fns';
import "./salesList.css";

export default function ReviewList() {
    const [orders, setOrders] = useState([]);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });
  
  console.log(data)

  const fetchProducts = async (productId) => {
    try {
      const response = await newRequest.get(`/products/${productId}`);
      return response.data;
      
    } catch (err) {
      console.log(err);
      return 'Unknown Product';
    }
  }

  const renderCart = async () => {
    const rows = [];
  
    if (!data) {
      // Handle the case where data is undefined
      console.log("Orders are empty");
      return rows;
    }
  
    console.log(data);
  
    for (const order of data) {
      const products = order.products;
  
      if (!products || products.length === 0) {
        // Handle the case where products in the order are undefined or empty
        console.log("Products in the order are empty");
        continue; // Skip to the next iteration
      }
  
      for (const product of products) {
        const productData = await fetchProducts(product.productId);
  
        rows.push({
          id: productData._id,
          img: productData.cover,
          title: productData.title,
          brand: productData.brand,
          price: productData.price,
          quantity: product.quantity,
          createdAt: formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })
        });
      }
    }
  
    return rows;
  };

  useEffect(() => {
    renderCart().then((orders) => setOrders(orders));
  }, [data]);

  const columns = [
    {
        field: "title",
        headerName: "Product",
        width: 280,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              <img className="productListImg" src={params.row.img} alt="" />
              {params.row.title}
            </div>
          );
        },
      },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "price", headerName: "Unit Price", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 200 },
    { field: "createdAt", headerName: "Date", width: 350 },
  ];

  return (
    <div className="salesList">
      <div className="salesTitleContainer">
        <h1>Sales</h1>
      </div>

      {orders && Array.isArray(orders) && (
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={(row) => row.id}
          checkboxSelection
        />
      )}
    </div>
  );
}
