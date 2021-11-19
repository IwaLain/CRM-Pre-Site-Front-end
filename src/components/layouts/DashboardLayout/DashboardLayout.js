import React from "react";
import "./dashboard.scss";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouteMatch, useLocation } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import Sidebar from "../../widgets/Sidebar/Sidebar";
import Breadcrumbs from "../../widgets/Breadcrumbs/Breadcrumbs";
import routes from "../../../routes";
import { PageTitleContext } from "../../../context";

const DashboardLayout = ({ children }) => {
  const MOBILE_SIZE = 1074;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth <= MOBILE_SIZE
  );
  const [sidebarNeeded, setSidebarNeeded] = useState(true);

  const match = useRouteMatch();

  const location = useLocation();

  const [pageTitle, setPageTitle] = useState();

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
    let filtered = routes.dashboard.filter((route) => {
      return route.path === match.url;
    })[0];
    filtered && setPageTitle(filtered.name);
  }, [match.url]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/customers":
      case "/dashboard/profile":
      case "/dashboard/users":
      case "/dashboard/create-customer":
      case "/dashboard/add-user":
        setSidebarNeeded(false);
        break;
      default:
        setSidebarNeeded(true);
        break;
    }
  }, [location]);

  return (
    <PageTitleContext.Provider value={{ pageTitle }}>
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
    </PageTitleContext.Provider>
  );
};

export default DashboardLayout;
