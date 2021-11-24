import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import logo from "../../assets/img/company.png";
// import "./customer-page.scss";
import {
  deleteCustomerImageAPI,
  getCustomerAPI,
  addCustomerImageAPI,
  setMainCustomerImageAPI,
} from "../../js/api/customer";
import {
  getFacilityApi,
  deleteFacilityImageAPI,
  addFacilityImageApi,
  setMainFacilityImageAPI,
} from "../../js/api/facilities";
import { getLocationAPI } from "../../js/api/locations";
import {
  getEquipment,
  deleteImageEquipment,
  createImageEquipment,
  setMainEquipmentImageAPI,
} from "../../js/api/equipment";
import InformationComponent from "../InformationComponent/InformationComponent";
import DropdownImageEdit from "../widgets/DropdownImageEdit/DropdownImageEdit";
import InfoCard from "../InfoCard/InfoCard";
import AttachedImages from "../AttachedImages/AttachedImages";
import "../../scss/CRMEntity.scss";
const CRMEntity = ({ type }) => {
  type = type.entity;
  const { id } = useParams();

  let deleteEntityImageAPI;
  let getEntityAPI;
  let addEntityImageAPI;
  let setMainEntityImageAPI;
  let subEntityName = "";
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [entityObject, setEntityObject] = useState();
  const [attachedImages, setAttachedImages] = useState();
  const [mainImage, setMainImage] = useState();
  const [subEntity, setSubEntity] = useState();
  const [informationItems, setInformationItems] = useState([]);
  const informationFieldNames = ["address", "phone", "email"];
  const getMainImage = (images) => {
    let mainImage = images.find((x) => x.main_image === "1");
    if (!mainImage) {
      mainImage = images[0];
    }
    return mainImage;
  };
  const deleteEntityImage = (img) => {
    deleteEntityImageAPI(img[`${type}_id`], img.id).then((res) => {
      setAttachedImages(res[`${type}Images`]);
    });
  };
  const addEntityImage = (data) => {
    addEntityImageAPI(id, data).then((res) => {
      setAttachedImages(res[`${type}Images`]);
    });
  };
  const setMainEntityImage = (imageId) => {
    setMainEntityImageAPI(id, imageId).then((res) => {
      setMainImage(res["main-image"]);
    });
  };
  const setNewInformationItem = (fieldTitle, value) => {
    setInformationItems((oldArr) => {
      const newElement = { fieldTitle: fieldTitle, value: value };

      return [...oldArr, newElement];
    });
  };
  switch (type) {
    case "customer":
      getEntityAPI = getCustomerAPI;
      deleteEntityImageAPI = deleteCustomerImageAPI;
      addEntityImageAPI = addCustomerImageAPI;
      setMainEntityImageAPI = setMainCustomerImageAPI;
      subEntityName = "facilities";
      break;
    case "facility":
      getEntityAPI = getFacilityApi;
      deleteEntityImageAPI = deleteFacilityImageAPI;
      addEntityImageAPI = addFacilityImageApi;
      setMainEntityImageAPI = setMainFacilityImageAPI;
      subEntityName = "locations";
      break;
    case "location":
      subEntityName = "equipment";
      getEntityAPI = getLocationAPI;

      break;
    case "equipment":
      getEntityAPI = getEquipment;
      deleteEntityImageAPI = deleteImageEquipment;
      addEntityImageAPI = createImageEquipment;
      setMainEntityImageAPI = setMainEquipmentImageAPI;
      break;
    default:
      break;
  }

  useEffect(() => {
    getEntityAPI(id).then((data) => {
      setEntityObject(data);
      if (data[`${type}Images`]) {
        setAttachedImages(data[`${type}Images`]);
        const mainImage = getMainImage(data[`${type}Images`]);
        setMainImage(mainImage);
      }
      if (data.jsonData) {
        const customFields = data.jsonData[0];
        for (const [key, value] of Object.entries(customFields)) {
          setNewInformationItem(key, value);
        }
      }
      if (subEntityName.length !== 0) {
        setSubEntity(data[subEntityName]);
      }

      informationFieldNames.forEach((field) => {
        if (data[field]) {
          setNewInformationItem(field, data[field]);
        }
      });
    });

    window.addEventListener("resize", handleResize);
  }, []);
  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  return (
    <>
      <div className="d-flex align-items-center entity-page--header">
        {entityObject && entityObject[`${type}Images`] && (
          <div className="main-img--container">
            <img
              src={
                mainImage && mainImage.img
                  ? process.env.REACT_APP_SERVER_URL + "/" + mainImage.img
                  : logo
              }
              alt="company img"
              className="entity-page--img"
            ></img>
            <DropdownImageEdit
              images={
                attachedImages && attachedImages.length > 0
                  ? attachedImages
                  : []
              }
              setMainImage={setMainEntityImage}
            ></DropdownImageEdit>
          </div>
        )}
        <h1 className="page-title">{entityObject && entityObject.name}</h1>
      </div>

      {entityObject && informationItems.length > 0 && (
        <div className="entity-page--section">
          <InformationComponent
            items={informationItems}
            title={`Information ${type}`}
          ></InformationComponent>
        </div>
      )}
      {/* {type === "location" && (
        <FormComponent
          entity={entityObject}
          formName="Facility Locations Form"
          addFieldBtn={true}
          attachedImages={false}
        ></FormComponent>
      )} */}

      {entityObject && subEntityName.length > 0 && (
        <div className="customer-page--section">
          <h2 className="page-subtitle">{`${type} ${subEntityName}`}</h2>
          <div
            className={
              screenSize > 440
                ? "customer-card_group"
                : "customer-card_group dense"
            }
          >
            {subEntity && subEntity.length > 0 ? (
              subEntity.map((subEnt) => (
                <InfoCard data={subEnt} type={subEntityName} />
              ))
            ) : (
              <p>No {subEntityName} found.</p>
            )}
          </div>
        </div>
      )}
      {entityObject && entityObject[`${type}Images`] && (
        <div className="entity-page--section">
          <AttachedImages
            title="Attached images"
            addImage={addEntityImage}
            deleteImage={deleteEntityImage}
            attachedImages={attachedImages ? attachedImages : []}
          ></AttachedImages>
        </div>
      )}
    </>
  );
};
export default CRMEntity;
