import React, { useContext, useReducer } from "react";
import "../../../scss/dashboard.scss";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../widgets/Header/Header";
import Sidebar from "../../widgets/Sidebar/Sidebar";
import Breadcrumbs from "../../widgets/Breadcrumbs/Breadcrumbs";
import { GlobalContext } from "../../../context";
import { reducer } from "../../../reducer";

const DashboardLayout = ({ children }) => {
  const MOBILE_SIZE = 750;

  const initialState = {
    isMobile: window.innerWidth <= MOBILE_SIZE,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isMobile } = state;

  const { setEquipmentTypeList, userProfile } = useContext(GlobalContext);

  const handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      dispatch({ isMobile: true });
    } else {
      dispatch({ isMobile: false });
    }
  };

  useEffect(() => {
    if (userProfile && Object.keys(userProfile).length > 0) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/equipment/type?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((list) => setEquipmentTypeList(list["type"]));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard container-fluid">
      <Sidebar isMobile={isMobile} />
      <section>
        <Header isMobile={isMobile} />
        <main>
          <Breadcrumbs />
          {children}
        </main>
        <ToastContainer position="bottom-right" />
      </section>
    </div>
  );
};

export default DashboardLayout;
