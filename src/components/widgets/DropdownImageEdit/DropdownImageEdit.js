import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownItem } from "reactstrap";

import "../../../scss/dropdownImageEdit.scss";
import PropTypes from "prop-types";
const DropdownImageEdit = ({ images, setMainImage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <span className="edit-img">
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <button className="edit-img__btn" onClick={toggleDropdown}>
          <i className="fas fa-pencil-alt edit-img__icon"></i>
        </button>

        <DropdownMenu className="edit-img__menu">
          {images && images.length > 0 ? (
            images.map((image) => (
              <DropdownItem
                key={image.id}
                onClick={() => setMainImage(image.id)}
              >
                <img
                  src={process.env.REACT_APP_SERVER_URL + "/" + image.img}
                  alt="..."
                />
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
DropdownImageEdit.propTypes = {
  images: PropTypes.array,
  setMainImage: PropTypes.func,
};
export default DropdownImageEdit;
