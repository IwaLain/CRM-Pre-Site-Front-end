import React from "react";
import "../../../scss/dashboard.scss";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../widgets/Header/Header";
import Sidebar from "../../widgets/Sidebar/Sidebar";
import Breadcrumbs from "../../widgets/Breadcrumbs/Breadcrumbs";
import routes from "../../../routes";
import { PageContext } from "../../../context";

const DashboardLayout = ({ children }) => {
  const MOBILE_SIZE = 750;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_SIZE);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    window.innerWidth <= MOBILE_SIZE
  );

  const [pageTitle, setPageTitle] = useState();
  const [pageType, setPageType] = useState();
  const [pagePath, setPagePath] = useState();
  const [id, setId] = useState();
  const [editId, setEditId] = useState();

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
      return route.path === pagePath;
    })[0];
    filtered && setPageTitle(filtered.name);
  }, [pagePath]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <PageContext.Provider
      value={{
        pageTitle,
        pageType,
        setPageType,
        id,
        setId,
        setPagePath,
        editId,
        setEditId,
      }}
    >
      <div className="dashboard container-fluid">
        <Sidebar
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          type={pageType && pageType.ref}
          id={id}
        />
        <section>
          <Header isMobile={isMobile} toggleSidebar={toggleSidebar} />
          <main>
            <Breadcrumbs />
            {children}
          </main>
          <ToastContainer position="bottom-right" />
        </section>
      </div>
    </PageContext.Provider>
  );
};

export default DashboardLayout;
