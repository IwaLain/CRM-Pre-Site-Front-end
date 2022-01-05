import React, { useContext, useReducer } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../widgets/Header/Header";
import Sidebar from "../../widgets/Sidebar/Sidebar";
import Breadcrumbs from "../../widgets/Breadcrumbs/Breadcrumbs";
import { GlobalContext } from "../../../context";
import { reducer } from "../../../reducer";
import PropTypes from "prop-types";
import debounce from "../../../js/helpers/debounce";

const DashboardLayout = ({ children }) => {
  const MOBILE_SIZE = 750;

  const initialState = {
    isMobile: window.innerWidth <= MOBILE_SIZE,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isMobile } = state;

  const { setEquipmentTypeList, userProfile } = useContext(GlobalContext);

  const debouncedResizeHandler = debounce(() => handleResize());

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
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", debouncedResizeHandler);
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

DashboardLayout.propTypes = {
  children: PropTypes.element,
};

export default DashboardLayout;
