import { useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import newRequest from "../../utils/newRequest";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get("/users");
        const data = response.data;
        
        console.log(data);

        const formattedData = formatData(data); // Format data as needed
        console.log(formattedData);

        setUserStats(formattedData); // Update userStats state with the formatted data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  // Function to format data
  const formatData = (data) => {
    try {
      const monthlyCounts = data.reduce((acc, user) => {
        const month = new Date(user.createdAt).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      const dataset = [
        { name: "Jan", "Active User": monthlyCounts[0] || 0 },
        { name: "Feb", "Active User": monthlyCounts[1] || 0 },
        { name: "Mar", "Active User": monthlyCounts[2] || 0 },
        { name: "Apr", "Active User": monthlyCounts[3] || 0 },
        { name: "May", "Active User": monthlyCounts[4] || 0 },
        { name: "Jun", "Active User": monthlyCounts[5] || 0 },
        { name: "Jul", "Active User": monthlyCounts[6] || 0 },
        { name: "Aug", "Active User": monthlyCounts[7] || 0 },
        { name: "Sep", "Active User": monthlyCounts[8] || 0 },
        { name: "Oct", "Active User": monthlyCounts[9] || 0 },
        { name: "Nov", "Active User": monthlyCounts[10] || 0 },
        { name: "Dec", "Active User": monthlyCounts[11] || 0 },
      ];

      console.log('Monthly Counts:', monthlyCounts);
      console.log('Formatted Data:', dataset);

      return dataset;
    } catch (error) {
      console.error('Error formatting data:', error);
      return [];
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
