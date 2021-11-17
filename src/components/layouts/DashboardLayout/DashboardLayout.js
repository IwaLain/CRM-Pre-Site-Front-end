import React from "react";
import "./dashboard.scss";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
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
    setPageTitle(
      routes.dashboard.filter((route) => {
        return route.path === location.pathname;
      })[0].name
    );

    switch (location.pathname) {
      case "/dashboard/customers":
        setSidebarNeeded(false);
        break;
      default:
        setSidebarNeeded(true);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // fetch("http://crm.loc/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: "Kendall.Pfannerstill55",
    //     password: "qwez123!",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

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
