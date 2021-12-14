import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import logo from "../../assets/img/company.png";
import customersApi from "../../js/api/customer";
import facilitiesApi from "../../js/api/facilities";
import locationApi from "../../js/api/locations";
import equipmentApi from "../../js/api/equipment";
import InformationComponent from "../InformationComponent/InformationComponent";
import DropdownImageEdit from "../widgets/DropdownImageEdit/DropdownImageEdit";
import InfoCard from "../InfoCard/InfoCard";
import { alert } from "../../js/helpers/alert";
import "../../scss/CRMEntity.scss";
import { GlobalContext } from "../../context";
import AttachmentList from "../AttachmentList/AttachmentList";
import { Spinner } from "reactstrap";
import ModalSketch from "../ModalComponent/ModalSketch";

const CRMEntity = ({ type }) => {
  type = type.entity;
  const { id } = useParams();
  const { showFormModal, setShowFormModal, setEntityID } =
    useContext(GlobalContext);

  let deleteEntityImageAPI;
  let getEntityAPI;
  let addEntityImageAPI;
  let setMainEntityImageAPI;

  const history = useHistory();

  let subEntityName = "";
  const [isLoading, setIsLoading] = useState(false);

  let informationFieldNames = [];
  const [currentSubEntityName, setCurrentSubEntityName] = useState();
  const [screenSize, SetScreenSize] = useState(window.innerWidth);

  const [entityObject, setEntityObject] = useState();

  const [mainImage, setMainImage] = useState();

  const [subEntity, setSubEntity] = useState([]);

  const [informationItems, setInformationItems] = useState([]);

  const [mode, setMode] = useState("edit");

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

  switch (type) {
    case "customer":
      getEntityAPI = customersApi.getCustomer;
      deleteEntityImageAPI = customersApi.deleteCustomerImage;
      addEntityImageAPI = customersApi.addCustomerImage;
      setMainEntityImageAPI = customersApi.setMainCustomerImage;

      subEntityName = "facilities";

      informationFieldNames = ["address", "phone", "email"];

      break;
    case "facility":
      getEntityAPI = facilitiesApi.getFacility;
      deleteEntityImageAPI = facilitiesApi.deleteFacilityImage;
      addEntityImageAPI = facilitiesApi.addFacilityImage;
      setMainEntityImageAPI = facilitiesApi.setMainFacilityImage;

      subEntityName = "locations";

      informationFieldNames = ["address"];

      break;
    case "location":
      getEntityAPI = locationApi.getLocation;
      deleteEntityImageAPI = locationApi.deleteLocationImage;
      addEntityImageAPI = locationApi.addLocationImage;
      setMainEntityImageAPI = locationApi.setMainLocationImage;

      subEntityName = "equipment";

      break;
    case "equipment":
      getEntityAPI = equipmentApi.getEquipment;
      deleteEntityImageAPI = equipmentApi.deleteImageEquipment;
      addEntityImageAPI = equipmentApi.createImageEquipment;
      setMainEntityImageAPI = equipmentApi.setMainEquipmentImage;

      break;
    default:
      break;
  }

  let entityPluralAlias = "";

  switch (type) {
    case "customer":
      entityPluralAlias = "customers";
      break;
    case "facility":
      entityPluralAlias = "facilities";
      break;
    case "location":
      entityPluralAlias = "locations";
      break;
    case "equipment":
      entityPluralAlias = "equipment";
      break;
    default:
      break;
  }

  useEffect(() => {
    setCurrentSubEntityName(subEntityName);
    setInformationItems([]);
    setIsLoading(true);
    try {
      getEntityAPI(id).then((data) => {
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
            if (data[el]) {
              return { fieldTitle: el, value: data[el] };
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
                  { subEntityName: "motes", subEntityData: equipment["mote"] },
                ]);
              }
            });
        }
        setIsLoading(false);
      });

      setEntityID(id);
    } catch {
      history.push("/404");
    }

    window.addEventListener("resize", handleResize);
  }, []);
  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  const toggleModal = () => {
    setShowFormModal(!showFormModal);
  };
  return (
    <>
      {currentSubEntityName && (
        <ModalSketch
          entity={currentSubEntityName}
          subEntity={entityPluralAlias}
          modal={showFormModal}
          toggle={toggleModal}
          mode={mode}
        />
      )}
      {!isLoading ? (
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
                    entityImages && entityImages.length > 0 ? entityImages : []
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

          {entityObject &&
            subEntity.length > 0 &&
            subEntity.map((subEnt) => (
              <div className="info-page--section entity-page--section">
                <h2 className="page-subtitle">{`${subEnt.subEntityName}`}</h2>
                <div
                  className={
                    screenSize > 440
                      ? "info-card_group"
                      : "info-card_group dense"
                  }
                >
                  {subEnt.subEntityData && subEnt.subEntityData.length > 0 ? (
                    subEnt.subEntityData.map((subEntityElement, index) => (
                      <InfoCard
                        key={index}
                        data={subEntityElement}
                        type={subEnt.subEntityName}
                        toggleModal={toggleModal}
                        setMode={setMode}
                        setSubEntityName={setCurrentSubEntityName}
                      />
                    ))
                  ) : (
                    <p>No {subEntityName} found.</p>
                  )}
                </div>
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
        <Spinner />
      )}
    </>
  );
};
export default CRMEntity;
