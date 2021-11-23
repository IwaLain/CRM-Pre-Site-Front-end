import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import logo from "../../../assets/img/company.png";
import "./customer-page.scss";
import {
  deleteCustomerImageAPI,
  getCustomerAPI,
  addCustomerImageAPI,
  setMainCustomerImageAPI,
} from "../../../js/api/customer";
import InformationComponent from "../../InformationComponent/InformationComponent";
import DropdownImageEdit from "../../widgets/DropdownImageEdit/DropdownImageEdit";
import InfoCard from "../../InfoCard/InfoCard";
import AttachedImages from "../../AttachedImages/AttachedImages";
import { useContext } from "react";
import { PageContext } from "../../../context";

const Customer = () => {
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const { setPageType, setId } = useContext(PageContext);
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [attachedImages, setAttachedImages] = useState();
  const [mainImage, setMainImage] = useState();
  const deleteCustomerImage = (img) => {
    deleteCustomerImageAPI(img.customer_id, img.id).then((res) => {
      setAttachedImages(res.customerImages);
    });
  };
  const addCustomerImage = (data) => {
    addCustomerImageAPI(id, data).then((res) => {
      setAttachedImages(res.customerImages);
    });
  };
  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  const getMainImage = (images) => {
    let mainImage = images.find((x) => x.main_image === "1");
    if (!mainImage) {
      mainImage = images[0];
    }
    return mainImage;
  };
  const setMainCustomerImage = (imageId) => {
    setMainCustomerImageAPI(id, imageId).then((res) => {
      setMainImage(res["main-image"]);
    });
  };
  useEffect(() => {
    getCustomerAPI(id).then((data) => {
      setCustomer(data[id]);
      setAttachedImages(data[id].customerImages);
      const mainImage = getMainImage(data[id].customerImages);
      setMainImage(mainImage);
    });

    setId(id);
    setPageType({ ref: "customers" });

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="d-flex align-items-center customer-page--header">
        <div className="main-img--container">
          <img
            src={
              mainImage && mainImage.img
                ? process.env.REACT_APP_SERVER_URL + "/" + mainImage.img
                : logo
            }
            alt="company img "
            className="customer-page--img"
          ></img>
          <DropdownImageEdit
            images={
              attachedImages && attachedImages.length > 0 ? attachedImages : []
            }
            setMainImage={setMainCustomerImage}
          ></DropdownImageEdit>
        </div>
        <h1 className="page-title">{customer && customer.name}</h1>
      </div>
      {customer && (
        <InformationComponent
          items={[
            { fieldTitle: "address", value: customer.address },
            { fieldTitle: "email", value: customer.email },
            { fieldTitle: "phone", value: customer.phone },
          ]}
          title="Information Customer"
        ></InformationComponent>
      )}

      <div className="customer-page--factories">
        <h2 className="page-subtitle">Factories Customer</h2>
        <div
          className={
            screenSize > 440 ? "info-card_group" : "info-card_group dense"
          }
        >
          {customer && customer.facilities.length > 0 ? (
            customer.facilities.map((facility) => (
              <InfoCard data={facility} type="facilities" />
            ))
          ) : (
            <p>No factories found.</p>
          )}
        </div>
      </div>
      <div>
        <AttachedImages
          title="Attached images"
          addImage={addCustomerImage}
          deleteImage={deleteCustomerImage}
          attachedImages={attachedImages ? attachedImages : []}
        ></AttachedImages>
      </div>
    </>
  );
};

export default Customer;
