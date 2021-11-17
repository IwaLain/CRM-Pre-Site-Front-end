import React from "react";
import "./dashboard.scss";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";

const DashboardLayout = ({ children }) => {
  const MOBILE_SIZE = 1074;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth <= MOBILE_SIZE
  );
  const [sidebarNeeded, setSidebarNeeded] = useState(true);

  const location = useLocation();

  const handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      setIsMobile(true);
      setSidebarCollapsed(true);
    } else {
      setIsMobile(false);
      setSidebarCollapsed(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/customers") {
      setSidebarNeeded(false);
    } else {
      setSidebarNeeded(true);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard container-fluid">
      <div className="row">
        {!sidebarCollapsed && sidebarNeeded && (
          <Sidebar
            isMobile={isMobile}
            sidebarNeeded={sidebarNeeded}
            toggleSidebar={toggleSidebar}
          />
        )}
        <section className={isMobile || !sidebarNeeded ? "col-12" : "col-10"}>
          <Header
            sidebarNeeded={sidebarNeeded}
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
          />
          <main>
            <Breadcrumbs />
            {children}
          </main>
          <ToastContainer position="bottom-right" />
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
