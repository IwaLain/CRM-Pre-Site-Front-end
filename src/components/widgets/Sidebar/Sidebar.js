import logo from "../../../assets/img/company.png";
import { Link } from "react-router-dom";
import logoText from "../../../assets/img/logo-text.svg";

const Sidebar = ({ isMobile }) => {
  return (
    <aside>
      <div className="logo sidebar">
        <Link to="/">
          <img src={logo} alt="logo" />
          {!isMobile && <img src={logoText} alt="waites" />}
        </Link>
      </div>
      <nav>
        <ul class="fa-ul">
          <li>
            <Link to={`/dashboard`}>
              <span class="fa-li">
                <i className="fas fa-chart-bar"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/customers`}>
              <span class="fa-li">
                <i className="fas fa-user"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Customers
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/facilities`}>
              <span class="fa-li">
                <i className="fas fa-industry"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Facilities
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/locations`}>
              <span class="fa-li">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Locations
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/equipment`}>
              <span class="fa-li">
                <i className="fas fa-tools"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Equipment
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/network`}>
              <span class="fa-li">
                <i className="fas fa-network-wired"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Network
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/purpose`}>
              <span class="fa-li">
                <i className="fas fa-file-alt"></i>
              </span>
              <span style={isMobile ? { visibility: "hidden" } : {}}>
                Commercial Purpose
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
