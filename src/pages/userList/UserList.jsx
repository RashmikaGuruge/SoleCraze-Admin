import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export default function UserList() {
  const queryClient = useQueryClient();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest
        .get(
          `/users`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data)

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150
    },
    { field: "lastName", headerName: "Last Name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
    <div className="userTitleContainer">
          <h1 className="userTitle">Users</h1>
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