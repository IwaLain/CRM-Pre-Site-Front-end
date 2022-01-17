import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import logo from "../../assets/img/company.png";
import customersApi from "../../js/api/customer";
import facilitiesApi from "../../js/api/facilities";
import locationApi from "../../js/api/locations";
import equipmentApi from "../../js/api/equipment";
import InformationComponent from "../InformationComponent/InformationComponent";
import DropdownImageEdit from "../widgets/DropdownImageEdit/DropdownImageEdit";

import { alert } from "../../js/helpers/alert";
import "../../scss/CRMEntity.scss";
import { GlobalContext } from "../../context";
import AttachmentList from "../AttachmentList/AttachmentList";
import Loader from "../widgets/Loader/Loader";
import PropTypes from "prop-types";
import List from "../List/List";
import NotFound from "../../pages/NotFound/NotFound";
const CRMEntity = ({ type }) => {
  type = type.entity;
  const { id } = useParams();
  const { setEntityID } = useContext(GlobalContext);

  let deleteEntityImageAPI;
  let getEntityAPI;
  let addEntityImageAPI;
  let setMainEntityImageAPI;

  let subEntityName = "";
  const [isLoading, setIsLoading] = useState(false);

  let informationFieldNames = [];

  const [entityObject, setEntityObject] = useState();

  const [mainImage, setMainImage] = useState();

  const [subEntity, setSubEntity] = useState([]);

  const [informationItems, setInformationItems] = useState([]);

  const [attachedFiles, setAttachedFiles] = useState();

  const [entityImages, setEntityImages] = useState();

  const getMainImage = (images) => {
    let mainImage = images.find((x) => x.main_image === "1");
    if (!mainImage) {
      mainImage = images[0];
    }
    return mainImage;
  };

  async function deleteEntityImageServer(fileId, type_id) {
    const response = await deleteEntityImageAPI(id, fileId);
    if (response.success) {
      if (type_id === "1") {
        setEntityImages((state) => state.filter((el) => el.id !== fileId));
      }
      return true;
    } else {
      alert("error", response.message);
      return false;
    }
  }

  async function addEntityImageServer(files, type_id) {
    let newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const response = await addEntityImageAPI(id, files[i]);

      if (response.success) {
        const respImage = await response[`image`];
        newFiles.push(respImage);
      } else alert("error", response.message);
    }
    if (type_id === "1") {
      setEntityImages((state) => [...state, ...newFiles]);
    }
    return newFiles;
  }

  const setMainEntityImage = (imageId) => {
    setMainEntityImageAPI(id, imageId).then((res) => {
      setMainImage(res["main-image"]);
    });
  };
  let entityPluralAlias = "";
  switch (type) {
    case "customer":
      getEntityAPI = customersApi.getCustomer;
      deleteEntityImageAPI = customersApi.deleteCustomerImage;
      addEntityImageAPI = customersApi.addCustomerImage;
      setMainEntityImageAPI = customersApi.setMainCustomerImage;
      entityPluralAlias = "customers";
      subEntityName = "facilities";

      informationFieldNames = [
        { title: "address", name: "address" },
        { title: "phone", name: "phone" },
        { title: "email", name: "email" },
      ];

      break;
    case "facility":
      getEntityAPI = facilitiesApi.getFacility;
      deleteEntityImageAPI = facilitiesApi.deleteFacilityImage;
      addEntityImageAPI = facilitiesApi.addFacilityImage;
      setMainEntityImageAPI = facilitiesApi.setMainFacilityImage;
      entityPluralAlias = "facilities";
      subEntityName = "locations";

      informationFieldNames = [
        { title: "address", name: "address" },
        { title: "lat", name: "lat" },
        { title: "lng", name: "lng" },
      ];

      break;
    case "location":
      getEntityAPI = locationApi.getLocation;
      deleteEntityImageAPI = locationApi.deleteLocationImage;
      addEntityImageAPI = locationApi.addLocationImage;
      setMainEntityImageAPI = locationApi.setMainLocationImage;
      entityPluralAlias = "locations";
      subEntityName = "equipment";

      break;
    case "equipment":
      getEntityAPI = equipmentApi.getEquipment;
      deleteEntityImageAPI = equipmentApi.deleteImageEquipment;
      addEntityImageAPI = equipmentApi.createImageEquipment;
      setMainEntityImageAPI = equipmentApi.setMainEquipmentImage;
      entityPluralAlias = "equipment";
      break;
    default:
      break;
  }

  useEffect(() => {
    setInformationItems([]);
    setIsLoading(true);

    try {
      getEntityAPI(id).then((data) => {
        if (data[type]) {
          setEntityID(id);
          if (type === "customer" || type === "facility") {
            data = data[type][id];
          } else {
            data = data[type];
          }
          setEntityObject(data);

          if (data[`${type}Images`]) {
            setAttachedFiles(data[`${type}Images`]);

            setEntityImages(
              data[`${type}Images`].filter((el) => el.type_id === "1")
            );

            const mainImage = getMainImage(
              data[`${type}Images`].filter((el) => el.type_id === "1")
            );

            setMainImage(mainImage);
          }
          if (informationFieldNames.length > 0) {
            let infoFields = informationFieldNames.map((el) => {
              if (data[el.name]) {
                return { fieldTitle: el.title, value: data[el.name] };
              }
              return false;
            });

            setInformationItems((state) => {
              return [...state, ...infoFields];
            });
          }
          if (data.jsonData) {
            const customFields = data.jsonData.map((el) => {
              return { fieldTitle: el.name, value: el.value };
            });

            setInformationItems((state) => {
              return [...state, ...customFields];
            });
          }
          if (subEntityName.length !== 0) {
            if (subEntityName === "equipment") {
              fetch(
                process.env.REACT_APP_SERVER_URL +
                  "/api/location/" +
                  id +
                  "/equipment?access-token=" +
                  localStorage.getItem("token")
              )
                .then((res) => res.json())
                .then((data) => {
                  setSubEntity([
                    {
                      subEntityName: subEntityName,
                      subEntityData: data[subEntityName],
                    },
                  ]);
                });
            } else {
              setSubEntity([
                {
                  subEntityName: subEntityName,
                  subEntityData: data[subEntityName],
                },
              ]);
            }
          }
          if (type === "equipment") {
            fetch(
              process.env.REACT_APP_SERVER_URL +
                "/api/equipment/type?access-token=" +
                localStorage.getItem("token")
            )
              .then((res) => res.json())
              .then((resData) => {
                if (resData && resData.type) {
                  let equipmentTypes = resData.type;

                  const equipmentType = equipmentTypes.find(
                    (el) => el.id === data["type_id"]
                  );

                  if (equipmentType && equipmentType.name) {
                    setInformationItems((state) => {
                      return [
                        { fieldTitle: "type", value: equipmentType.name },
                        ...state,
                      ];
                    });
                  }
                }
              });

            fetch(
              process.env.REACT_APP_SERVER_URL +
                "/api/location/" +
                data["location_id"] +
                "/equipment?access-token=" +
                localStorage.getItem("token")
            )
              .then((res) => res.json())
              .then((data) => {
                let equipment = data["equipment"].find((el) => el.id === id);
                if (equipment) {
                  setSubEntity([
                    {
                      subEntityName: "sensors",
                      subEntityData: equipment["sensors"],
                    },
                    {
                      subEntityName: "motes",
                      subEntityData: equipment["mote"],
                    },
                  ]);
                }
              });
          }
        } else {
          setEntityObject(null);
        }
        setIsLoading(false);
      });
    } catch {
      setEntityObject(null);
      setIsLoading(false);
      alert("error", "Request error");
    }
  }, []);

  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1500);
  //   }
  // }, [isLoading]);
  return (
    <>
      {!isLoading && entityObject !== undefined ? (
        <div className="entity-page">
          {entityObject && entityObject !== null ? (
            <>
              <div className="entity-page--header">
                <div className="entity-information">
                  {entityObject && entityObject[`${type}Images`] && (
                    <div className="main-img--container">
                      <img
                        src={
                          mainImage && mainImage.img
                            ? process.env.REACT_APP_SERVER_URL +
                              "/" +
                              mainImage.img
                            : logo
                        }
                        alt="company img"
                        className="entity-page--img"
                      ></img>
                      <DropdownImageEdit
                        images={
                          entityImages && entityImages.length > 0
                            ? entityImages
                            : []
                        }
                        setMainImage={setMainEntityImage}
                      ></DropdownImageEdit>
                    </div>
                  )}
                  {entityObject && (
                    <div className="entity-name__container">
                      <h3 className="page-title ">{entityObject.name}</h3>
                    </div>
                  )}

                  {entityObject && informationItems.length > 0 && (
                    <div className="information__container">
                      <InformationComponent
                        items={informationItems}
                        title={`${type} Information`}
                      ></InformationComponent>
                    </div>
                  )}
                </div>
              </div>
              {entityObject &&
                subEntity.length > 0 &&
                subEntity.map((subEnt) => (
                  <div
                    key={subEnt.subEntityName}
                    className="entity-page--section table-section"
                  >
                    {/* <h2 className="page-subtitle">{`${subEnt.subEntityName}`}</h2> */}
                    <List
                      type={{
                        entity: subEnt.subEntityName,
                        ref: entityPluralAlias,
                      }}
                      title={
                        subEnt.subEntityName.charAt(0).toUpperCase() +
                        subEnt.subEntityName.slice(1)
                      }
                      hideSelect
                      hideChangeView
                      initTableView={
                        subEnt.subEntityName === "sensors" ||
                        subEnt.subEntityName === "motes"
                      }
                      hideRecordView={
                        subEnt.subEntityName === "sensors" ||
                        subEnt.subEntityName === "motes"
                      }
                    />
                  </div>
                ))}

              {entityObject && entityObject[`${type}Images`] && (
                <div className="entity-page--section">
                  <h2 className="page-subtitle">{`Attachments`}</h2>
                  {attachedFiles && (
                    <AttachmentList
                      attachedFiles={attachedFiles}
                      onAddFileServer={addEntityImageServer}
                      onRemoveFileServer={deleteEntityImageServer}
                    />
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ position: "relative", height: "85vh" }}>
              <NotFound />
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
    </>
  );
};
CRMEntity.propTypes = {
  type: PropTypes.shape({
    entity: PropTypes.string,
  }),
};
export default CRMEntity;
