import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./layout.css";

function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="min">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;