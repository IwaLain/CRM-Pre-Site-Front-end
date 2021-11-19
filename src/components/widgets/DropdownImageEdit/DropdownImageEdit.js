import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import star from "../../../assets/img/star.svg";
import "./dropdownImageEdit.scss";
const DropdownImageEdit = ({ images, setMainImage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <span className="edit-img">
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle className="edit-img__btn">
          <img src={star} alt="star" />
        </DropdownToggle>
        <DropdownMenu className="edit-img__menu">
          {images && images.length > 0 ? (
            images.map((image) => (
              <DropdownItem
                key={image.id}
                onClick={() => setMainImage(image.id)}
              >
                <img src={`http://crm.loc/${image.img}`} />
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>
              <p>No images.</p>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </span>
  );
};
export default DropdownImageEdit;
