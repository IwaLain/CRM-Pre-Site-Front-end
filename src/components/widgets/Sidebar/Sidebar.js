import { useContext, useEffect, useReducer } from "react";
import logo from "../../../assets/img/company.png";
import { Link, useHistory } from "react-router-dom";
import logoText from "../../../assets/img/logo-text.svg";
import Profile from "../../../js/api/profile";
import { GlobalContext } from "../../../context";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import { reducer } from "../../../reducer";

const Sidebar = ({ isMobile }) => {
  const { selectedCustomer, setSubmitPreventer } = useContext(GlobalContext);

  const initialState = {
    modal: false,
    activeTab: null,
  };

  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { modal } = state;

  const handleLogout = () => {
    setSubmitPreventer(true);
    Profile.setlastCustomer(selectedCustomer.id);
    Profile.logoutRequest().then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("selectedCustomer");
      window.location.reload();
      setSubmitPreventer(false);
    });
  };

  const toggleModal = () => {
    dispatch({ modal: !modal });
  };

  const changeActiveTab = (e) => {};

  window.addEventListener("urlChange", () => {
    console.log(window.location);
  });

  return (
    <>
      <ConfirmModal
        modal={modal}
        toggleModal={toggleModal}
        handleSubmit={handleLogout}
        title="Logout"
        modalText="Are you sure you want logout?"
      />
      <aside>
        <div className="logo sidebar">
          <Link to="/">
            <img src={logo} alt="logo" />
            {!isMobile && <img src={logoText} alt="waites" />}
          </Link>
        </div>
        <nav className="sidebar-nav">
          <ul className="fa-ul">
            <li>
              <Link to="/dashboard" onClick={changeActiveTab}>
                <span className="fa-li">
                  <i className="fas fa-chart-bar"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link to="/customers" onClick={changeActiveTab}>
                <span className="fa-li">
                  <i className="fas fa-user"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>
                  Customers
                </span>
              </Link>
            </li>
            <li>
              <Link to="/facilities">
                <span className="fa-li">
                  <i className="fas fa-industry"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>
                  Facilities
                </span>
              </Link>
            </li>
            <li>
              <Link to="/locations">
                <span className="fa-li">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>
                  Locations
                </span>
              </Link>
            </li>
            <li>
              <Link to="/equipment">
                <span className="fa-li">
                  <i className="fas fa-tools"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>
                  Equipment
                </span>
              </Link>
            </li>
            <li>
              <Link to="/network">
                <span className="fa-li">
                  <i className="fas fa-network-wired"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>Network</span>
              </Link>
            </li>
            <li>
              <Link to="/purpose">
                <span className="fa-li">
                  <i className="fas fa-file-alt"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>
                  Commercial Purpose
                </span>
              </Link>
            </li>
          </ul>
          <ul className="fa-ul sidebar-bottom-nav">
            <li>
              <Link to="/profile">
                <span className="fa-li">
                  <i className="fas fa-user"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <span className="fa-li">
                  <i className="fas fa-users"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>Users</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={toggleModal}>
                <span className="fa-li">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span style={isMobile ? { display: "none" } : {}}>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
