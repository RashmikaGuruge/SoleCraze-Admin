import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { formatDistanceToNow } from 'date-fns';
import "./transactionList.css";

// const RelativeTime = ({ dateTimeString }) => {
//   const date = new Date(dateTimeString);
//   const relativeTime = formatDistanceToNow(date, { addSuffix: true });

//   return <span>{relativeTime}</span>;
// };

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest
        .get(
          `/orders`
        )
        .then((res) => res.data),
  });

  const fetchUser = async (userId) => {
    try {
      const response = await newRequest.get(`/users/${userId}`);
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err);
      return 'Unknown Product';
    }
  }

  const renderCart = async () => {
    const rows = [];

    if (!data) {
      console.log("Orders are empty");
      return rows;
    }

    for (const order of data) {
      const userData = await fetchUser(order.userId);
      rows.push({
        id: order._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        amount: order.amount,
        isCompleted: order.isCompleted ? "Approved" : "Pending",
        createdAt:  formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })
      });
    }

    return rows;
  }

  useEffect(() => {
    renderCart().then((transactions) => setTransactions(transactions));
  }, [data]);

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "isCompleted", headerName: "Status", width: 200 },
    { field: "createdAt", headerName: "Date", width: 350 },
  ];

  return (
    <div className="transactionList">
      <div className="transactionTitleContainer">
        <h1>Transactions</h1>
      </div>

      {transactions && Array.isArray(transactions) && (
        <DataGrid
          rows={transactions}
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
