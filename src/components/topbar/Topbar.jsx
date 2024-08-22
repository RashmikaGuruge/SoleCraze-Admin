import React from "react";
import "./topbar.css";
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import Language from '@mui/icons-material/Language';
import Settings from '@mui/icons-material/Settings';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">SoleCraze-Admin</span>
        </div>
        <div className="topRight">
          
          </div>
      </div>
    </div>
  );
}