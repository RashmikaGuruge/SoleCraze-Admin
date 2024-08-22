import { useState } from 'react';
import "./sidebar.css";
import LineStyle from '@mui/icons-material/LineStyle';
import Timeline from '@mui/icons-material/Timeline';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { Link, useNavigate } from "react-router-dom";
import PermIdentity from '@mui/icons-material/PermIdentity';
import Storefront from '@mui/icons-material/Storefront';
import AttachMoney from '@mui/icons-material/AttachMoney';
import BarChart from '@mui/icons-material/BarChart';
import MailOutline from '@mui/icons-material/MailOutline';
import DynamicFeed from '@mui/icons-material/DynamicFeed';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ReviewsIcon from '@mui/icons-material/Reviews';
import WorkOutline from '@mui/icons-material/WorkOutline';
import Report from '@mui/icons-material/Report';
import newRequest from "../../utils/newRequest";

export default function Sidebar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState(null);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/admin/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const renderListItem = (itemName, icon, label, linkTo) => (
    <Link to={linkTo} className="link" onClick={() => handleItemClick(itemName)}>
      <li className={`sidebarListItem ${activeItem === itemName ? 'active' : ''}`}>
        {icon}
        {label}
      </li>
    </Link>
  );

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {renderListItem('home', <LineStyle className="sidebarIcon" />, 'Home', '/')}
            {renderListItem('analytics', <Timeline className="sidebarIcon" />, 'Analytics', '/')}
            {renderListItem('sales', <TrendingUp className="sidebarIcon" />, 'Sales', '/sales')}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            {renderListItem('users', <PermIdentity className="sidebarIcon" />, 'Users', '/users')}
            {renderListItem('products', <Storefront className="sidebarIcon" />, 'Products', '/products')}
            {renderListItem('reviews', <ReviewsIcon className="sidebarIcon" />, 'Reviews', '/reviews')}
            {renderListItem('transactions', <AttachMoney className="sidebarIcon" />, 'Transactions', '/transactions')}
            {renderListItem('reports', <BarChart className="sidebarIcon" />, 'Reports', '/')}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <Link className="link" onClick={handleLogout}>
            <li className="sidebarListItem">
              <LogoutIcon className="sidebarIcon" />
              Logout
            </li>
          </Link>
        </div>
      </div>
    </div>
  );
}
