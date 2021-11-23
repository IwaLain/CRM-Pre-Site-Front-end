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
import InformationComponent from "../InformationComponent/InformationComponent";
import DropdownImageEdit from "../widgets/DropdownImageEdit/DropdownImageEdit";
import InfoCard from "../InfoCard/InfoCard";
import AttachedImages from "../AttachedImages/AttachedImages";
import FormComponent from "../FormComponent/FormComponent";
const CRMEntity = ({ type }) => {
  type = type.entity;
  const { id } = useParams();

  let deleteEntityImageAPI;
  let getEntityAPI;
  let addEntityImageAPI;
  let setMainEntityImageAPI;
  let subEntityName = "";
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [entity, setEntity] = useState();
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
      subEntityName = "equipments";
      getEntityAPI = getLocationAPI;

      break;
    case "equipment":
      break;
    default:
      break;
  }

  useEffect(() => {
    getEntityAPI(id)
      .then((data) => {
        setEntity(data);
        if (data[`${type}Images`]) {
          setAttachedImages(data[`${type}Images`]);
          const mainImage = getMainImage(data[`${type}Images`]);
          setMainImage(mainImage);
        }

        if (subEntityName.length !== 0) {
          setSubEntity(data[subEntityName]);
        }

        informationFieldNames.forEach((field) => {
          if (data[field]) {
            setInformationItems((oldArr) => {
              const newElement = { fieldTitle: field, value: data[field] };

              return [...oldArr, newElement];
            });
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });

    window.addEventListener("resize", handleResize);
  }, []);
  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  return (
    <>
      <div className="d-flex align-items-center customer-page--header">
        {entity && entity[`${type}Images`] && (
          <div className="main-img--container">
            <img
              src={
                mainImage && mainImage.img
                  ? process.env.REACT_APP_SERVER_URL + "/" + mainImage.img
                  : logo
              }
              alt="company img"
              className="customer-page--img"
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
        <h1 className="page-title">{entity && entity.name}</h1>
      </div>
      {entity && informationItems.length > 0 && (
        <InformationComponent
          items={informationItems}
          title={`Information ${type}`}
        ></InformationComponent>
      )}
      {type === "location" && (
        <FormComponent
          entity={entity}
          formName="Facility Locations Form"
          addFieldBtn={true}
          attachedImages={false}
        ></FormComponent>
      )}

      {entity && subEntityName.length > 0 && (
        <div className="customer-page--factories">
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
      {entity && entity[`${type}Images`] && (
        <AttachedImages
          title="Attached images"
          addImage={addEntityImage}
          deleteImage={deleteEntityImage}
          attachedImages={attachedImages ? attachedImages : []}
        ></AttachedImages>
      )}
    </>
  );
};
export default CRMEntity;
