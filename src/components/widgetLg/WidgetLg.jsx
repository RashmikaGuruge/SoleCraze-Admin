import { useQuery } from "@tanstack/react-query";
import "./widgetLg.css";
import newRequest from "../../utils/newRequest";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [transactions, setTransactions] = useState([]);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest
        .get(
          `/orders/?new=true`
        )
        .then((res) => res.data),
  });

  const fetchUser = async (userId) => {
    try {
      const response = await newRequest.get(`/users/${userId}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return 'Unknown Product';
    }
  }

  const renderCart = async () => {
    if (!data) {
      console.log("Orders are empty");
      return [];
    }
  
    const rows = await Promise.all(
      data.map(async (order) => {
        try {
          const userData = await fetchUser(order.userId);
  
          return {
            id: order._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            amount: order.amount,
            isCompleted: order.isCompleted ? "Approved" : "Pending",
            createdAt: formatDistanceToNow(new Date(order.createdAt), {
              addSuffix: true,
            }),
          };
        } catch (err) {
          console.log(err);
          return null; // or handle error in a way that makes sense for your application
        }
      })
    );
  
    return rows.filter(Boolean); // Remove any potential null values from failed fetches
  };

  useEffect(() => {
    renderCart().then((transactions) => setTransactions(transactions));
  }, [data]);


  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
      <tbody> 
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {isLoading ? (
      <tr>
        <td colSpan="4">Loading...</td>
      </tr>
      ) : error ? (
      <tr>
        <td colSpan="4">Something went wrong!</td>
      </tr>
      ) : (transactions && 
        transactions.map(t => (
          <tr className="widgetLgTr" key={t.id}>
          <td className="widgetLgUser">
            <img
              src="/img/noavatar.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{t.firstName} {t.lastName}</span>
          </td>
          <td className="widgetLgDate">{t.createdAt}</td>
          <td className="widgetLgAmount">${t.amount}</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        )))}
        </tbody>
      </table>
    </div>
  );
}