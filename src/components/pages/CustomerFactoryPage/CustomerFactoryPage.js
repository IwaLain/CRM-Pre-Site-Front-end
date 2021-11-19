import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import star from "../../../assets/img/star.svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "./factory-page.scss";
import InformationComponent from "../../InformationComponent/InformationComponent";
import FormComponent from "../../FormComponent/FormComponent";
import AttachedImages from "../../AttachedImages/AttachedImages";
import { getFacilityApi } from "../../../js/api/facilities";

const CustomerFactoryPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getFacilityApi(id).then((data) => {
      setFacility(data);
      setFactoryImage(`http://crm.loc/${data.img}`);
    });
  }, []);

  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];

  const [factoryImage, setFactoryImage] = useState();

  const editImage = (img) => {
    setFactoryImage(`http://crm.loc/${img}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="d-flex align-items-center factory-page--header">
        <div className="img-container">
          <img
            src={factoryImage}
            alt="company img "
            className="factory-img"
          ></img>
          <div className="image-upload">
            <label htmlFor="factoryImg">
              <span className="edit-img">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle className="edit-img__btn">
                    <img src={star} alt="star" />
                  </DropdownToggle>
                  <DropdownMenu className="edit-img__menu">
                    {facility && facility.facilityImages.length > 0 ? (
                      facility.facilityImages.map(({ img }) => (
                        <DropdownItem key={img} onClick={() => editImage(img)}>
                          <img src={`http://crm.loc/${img}`} />
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
            </label>
          </div>
        </div>
        <h1 className="page-title">{facility && facility.name}</h1>
      </div>
      {facility && (
        <InformationComponent
          items={[{ fieldTitle: "address", value: facility.address }]}
          title="Information Facility"
        ></InformationComponent>
      )}

      <FormComponent
        formFields={formFields}
        formName="Facility Locations Form"
        addFieldBtn={true}
        attachedImages={false}
      ></FormComponent>
      <AttachedImages
        images={
          facility && facility.facilityImages.length > 0
            ? facility.facilityImages
            : []
        }
        title="Attached images"
      ></AttachedImages>
    </>
  );
};

export default CustomerFactoryPage;
