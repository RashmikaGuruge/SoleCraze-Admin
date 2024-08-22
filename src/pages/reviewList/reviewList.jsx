import "./reviewList.css";
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export default function ReviewList() {
  const queryClient = useQueryClient();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest
        .get(
          `/reviews`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  
  const columns = [
    { field: "productId", headerName: "Product ID", width: 250 },
    {
      field: "userId",
      headerName: "User ID",
      width: 250
    },
    { field: "star", headerName: "Star", width: 120 },
    {
      field: "desc",
      headerName: "Review",
      width: 350,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="reviewListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="reviewList">
      <div className="reviewTitleContainer">
          <h1>Reviews</h1>
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