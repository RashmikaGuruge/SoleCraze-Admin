import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export default function ProductList() {
  const queryClient = useQueryClient();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      newRequest
        .get(
          `/products`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 240 },
    {
      field: "title",
      headerName: "Product",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.cover} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
    },
    {
      field: "cat",
      headerName: "Category",
      width: 120,
    },
    { field: "stock", headerName: "Stock", width: 80 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },

    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
          <h1 className="productTitle">Products</h1>
          <Link to="/newProduct">
            <button className="productAddButton">Create</button>
          </Link>
    </div>

{data && Array.isArray(data) && (
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
)}
    </div>
  );
}