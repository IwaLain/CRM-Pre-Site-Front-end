import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../js/api/login";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const history = useHistory();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout()
      .then((res) => {
        localStorage.removeItem("token");
      })
      .then(history.push("/"));
  };

  return (
    <header style={{ zIndex: 10 }}>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle className="profile-badge">
          <i className="fas fa-star"></i>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>
            <Link to="/dashboard/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/dashboard/users">Users</Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <a onClick={handleLogout}>Logout</a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default Header;
