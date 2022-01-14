import { useContext } from "react";
import logo from "../../../assets/img/company.png";
import { Link } from "react-router-dom";
import logoText from "../../../assets/img/logo-text.svg";
import Profile from "../../../js/api/profile";
import { GlobalContext } from "../../../context";

const Sidebar = ({ isMobile }) => {
  const { selectedCustomer } = useContext(GlobalContext);

  const handleLogout = () => {
    Profile.setlastCustomer(selectedCustomer.id);
    Profile.logoutRequest().then(() => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  };

  return (
    <aside>
      <div className="logo sidebar">
        <Link to="/">
          <img src={logo} alt="logo" />
          {!isMobile && <img src={logoText} alt="waites" />}
        </Link>
      </div>
      <nav>
        <ul className="fa-ul">
          <li>
            <Link to="/dashboard">
              <span className="fa-li">
                <i className="fas fa-chart-bar"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link to="/customers">
              <span className="fa-li">
                <i className="fas fa-user"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Customers
              </span>
            </Link>
          </li>
          <li>
            <Link to="/facilities">
              <span className="fa-li">
                <i className="fas fa-industry"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Facilities
              </span>
            </Link>
          </li>
          <li>
            <Link to="/locations">
              <span className="fa-li">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Locations
              </span>
            </Link>
          </li>
          <li>
            <Link to="/equipment">
              <span className="fa-li">
                <i className="fas fa-tools"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Equipment
              </span>
            </Link>
          </li>
          <li>
            <Link to="/network">
              <span className="fa-li">
                <i className="fas fa-network-wired"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Network
              </span>
            </Link>
          </li>
          <li>
            <Link to="/purpose">
              <span className="fa-li">
                <i className="fas fa-file-alt"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Commercial Purpose
              </span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <span className="fa-li">
                <i className="fas fa-user"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Profile
              </span>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <span className="fa-li">
                <i className="fas fa-users"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Users
              </span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              <span className="fa-li">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Logout
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
