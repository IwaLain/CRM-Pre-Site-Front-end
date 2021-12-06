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
        <ul>
          <li>
            <Link to={`/dashboard`}>
              <i className="fas fa-chart-area"></i>
              {!isMobile && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/customers`}>
              <i className="fas fa-user"></i>
              {!isMobile && "Customers"}
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/facilities`}>
              <i className="fas fa-industry"></i>
              {!isMobile && "Facilities"}
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/locations`}>
              <i className="fas fa-compass"></i>
              {!isMobile && "Locations"}
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/equipment`}>
              <i className="fas fa-tools"></i>
              {!isMobile && "Equipment"}
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/network`}>
              <i className="fab fa-hubspot"></i>
              {!isMobile && "Network"}
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/purpose`}>
              <i className="fas fa-file-pdf"></i>
              {!isMobile && "Commertial Purpose"}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
