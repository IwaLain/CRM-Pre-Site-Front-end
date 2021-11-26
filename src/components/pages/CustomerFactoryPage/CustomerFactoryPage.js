import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import star from "../../../assets/img/star.svg";
import logo from "../../../assets/img/company.png";
import "react-toastify/dist/ReactToastify.css";
import "./factory-page.scss";
import InformationComponent from "../../InformationComponent/InformationComponent";
import FormComponent from "../../FormComponent/FormComponent";
import AttachedImages from "../../AttachedImages/AttachedImages";
import { facilities } from "../../../js/api/facilities";
import DropdownImageEdit from "../../widgets/DropdownImageEdit/DropdownImageEdit";
const CustomerFactoryPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState();
  const [attachedImages, setAttachedImages] = useState();
  const [mainImage, setMainImage] = useState();
  const getMainImage = (images) => {
    let mainImage = images.find((x) => x.main_image === "1");
    if (!mainImage) {
      mainImage = images[0];
    }
    return mainImage;
  };
  useEffect(() => {
    facilities.getFacility(id).then((data) => {
      setFacility(data);
      setAttachedImages(data.facilityImages);
      const mainImage = getMainImage(data.facilityImages);
      setMainImage(mainImage);
    });
  }, []);

  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];

  // const setMainFacilityImage = (imageId) => {
  //   setMainImage(id, imageId);
  // };
  // const editImage = (img) => {
  //   setFactoryImage(`http://crm.loc/${img}`);
  // };
  const addFacilityImage = (data) => {
    facilities.addFacilityImage(id, data).then((res) => {
      setAttachedImages(res.facilityImages);
    });
  };
  const deleteFacilityImage = (img) => {
    facilities.deleteFacilityImage(img.facility_id, img.id).then((res) => {
      setAttachedImages(res.facilityImages);
    });
  };
  const setMainFacilityImage = (imageId) => {
    facilities.setMainFacilityImage(id, imageId).then((res) => {
      setMainImage(res["main-image"]);
    });
  };
  return (
    <>
      <div className="d-flex align-items-center factory-page--header">
        <div className="img-container">
          <img
            src={
              mainImage && mainImage.img
                ? process.env.REACT_APP_SERVER_URL + "/" + mainImage.img
                : logo
            }
            alt="company img "
            className="factory-img"
          ></img>
          <DropdownImageEdit
            images={
              attachedImages && attachedImages.length > 0 ? attachedImages : []
            }
            setMainImage={setMainFacilityImage}
          ></DropdownImageEdit>
          {/* <span className="edit-img">
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
          </span> */}
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
        attachedImages={attachedImages ? attachedImages : []}
        addImage={addFacilityImage}
        deleteImage={deleteFacilityImage}
        title="Attached images"
      ></AttachedImages>
    </>
  );
};

export default CustomerFactoryPage;
