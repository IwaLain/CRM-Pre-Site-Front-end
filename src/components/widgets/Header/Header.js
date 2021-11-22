import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import star from "../../../assets/img/star.svg";
import logo from "../../../assets/img/company.png";
import { logout } from "../../../js/api/login";

const Header = ({ sidebarNeeded, isMobile, toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const history = useHistory();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout(8).then((res) => {
      console.log(res);
      history.push("/");
    });
  };

  return (
    <header style={{ zIndex: 10 }}>
      {!sidebarNeeded && (
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <svg
              width="104"
              height="21"
              viewBox="0 0 104 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.9947 1.14108H29.4289L24.4675 20.1513H16.8662L15.3399 13.1552H14.9807L13.48 20.1513H5.88213L0.932373 1.14108H7.36659L9.84263 11.761H10.0228L12.8278 1.14108H17.5195L20.2687 11.761H20.4489L22.9947 1.14108Z"
                fill="white"
              />
              <path
                d="M47.3772 20.1513V1.14108H53.5301V20.1513H47.3772Z"
                fill="white"
              />
              <path
                d="M69.4814 6.00741H65.8359V20.1513H59.683V6.00741H55.2227V1.14108H70.2963L69.4814 6.00741Z"
                fill="white"
              />
              <path
                d="M84.2936 12.9782H78.1407V15.2792H86.6313L85.6769 20.1513H71.9878V1.14108H85.5235L84.7551 6.01775H78.1407V8.567H84.2936V12.9782Z"
                fill="white"
              />
              <path
                d="M94.364 6.01776V7.50386L96.5691 7.70614C97.9188 7.84177 99.0464 8.06474 99.9531 8.37736C100.859 8.68998 101.59 9.09915 102.144 9.60716C102.699 10.114 103.093 10.714 103.324 11.407C103.554 12.1001 103.669 12.8943 103.669 13.7896C103.669 15.0734 103.499 16.155 103.157 17.0342C102.815 17.9135 102.404 18.5801 101.927 19.0364C101.533 19.4076 101.046 19.6996 100.466 19.9099C99.8845 20.1214 99.2695 20.2777 98.6209 20.3788C97.9711 20.48 97.3178 20.5432 96.6598 20.5685C96.0007 20.5938 95.4067 20.6064 94.8778 20.6064C93.5444 20.6064 92.2634 20.5386 91.0324 20.403C89.8025 20.2673 88.6133 20.0731 87.4683 19.8202L88.3215 15.278H97.0562V13.7885L94.2872 13.5609C93.0399 13.4425 91.996 13.2402 91.1602 12.9529C90.3221 12.6656 89.6514 12.2736 89.148 11.7748C88.6435 11.276 88.2855 10.6772 88.0716 9.97495C87.8577 9.27385 87.7519 8.44977 87.7519 7.50386C87.7519 6.2028 87.8891 5.11667 88.1622 4.24661C88.4354 3.37656 88.8713 2.67546 89.47 2.14331C90.0675 1.61117 90.8417 1.23533 91.7903 1.01581C92.7388 0.796281 93.8967 0.685944 95.2637 0.685944C97.9815 0.685944 100.442 0.938799 102.646 1.44566L101.62 6.01776H94.364Z"
                fill="white"
              />
              <path
                d="M41.0953 1.14108H31.5841L26.6111 20.1513H33.0976L33.7904 17.1354H38.8657L39.5841 20.1513H46.0695L41.0953 1.14108ZM34.918 12.2932L36.1746 6.97056H36.5083L37.7381 12.2932H34.918Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      )}
      <button
        className={
          isMobile && sidebarNeeded ? "burger-btn" : "burger-btn hidden"
        }
        onClick={toggleSidebar}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="4" fill="black" />
          <path d="M7 11H25" stroke="white" />
          <path d="M7 16L25 16" stroke="white" />
          <path d="M7 21L25 21" stroke="white" />
        </svg>
      </button>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle className="profile-badge">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" fill="black" />
          </svg>
          <img src={star} alt="star" />
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
