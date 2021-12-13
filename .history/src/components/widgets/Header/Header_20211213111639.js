import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Profile from "../../../js/api/profile";
import { GlobalContext } from "../../../context";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { selectedCustomer } = useContext(GlobalContext);

  const history = useHistory();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    Profile.setlastCustomer(selectedCustomer.id)
    Profile.logoutRequest().then(() => {
      localStorage.removeItem("token");
      window.location.reload();
      history.push("/");
    });
  };

  return (
    <header style={{ zIndex: 10 }}>
      <span></span>
      <span className="selected-customer">
        {selectedCustomer &&
          Object.keys(selectedCustomer).length > 0 &&
          selectedCustomer.name}
      </span>
      <Dropdown
        className="profile-badge"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
      >
        <DropdownToggle className="profile-badge__toggle">
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
