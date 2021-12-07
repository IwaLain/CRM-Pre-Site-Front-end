import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
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
import ModalComponent from "../ModalComponent/ModalComponent";
import { GlobalContext } from "../../context";
import AttachedFiles from "../AttachedFiles/AttachedFiles";
import convertToBase64 from "../../js/helpers/convertImage";

const CRMEntity = ({ type }) => {
  type = type.entity;
  const { id } = useParams();
  const [showFormModal2, setShowFormModal2] = useState(false);
  const [typeName, setTypeName] = useState();
  const { showFormModal, setShowFormModal, setEntityID } =
    useContext(GlobalContext);

  let deleteEntityImageAPI;
  let getEntityAPI;
  let addEntityImageAPI;
  let setMainEntityImageAPI;
  let deleteAllEntityImagesAPI;
  let subEntityNames = [];

  const informationFieldNames = ["address", "phone", "email"];

  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [entityObject, setEntityObject] = useState();
  const [mainImage, setMainImage] = useState();
  const [subEntity, setSubEntity] = useState([]);
  const [informationItems, setInformationItems] = useState([]);
  const [mode, setMode] = useState("edit");
  const [fileTypes, setFileTypes] = useState([
    {
      type_id: "1",
      setFunc(files) {
        this.attachedFiles = [...files];
      },
      attachedFiles: [],
      type_name: "image",
      fileExtensions: ".jpg, .jpeg, .png",
    },
    {
      type_id: "2",
      setFunc(files) {
        this.attachedFiles = [...files];
      },
      attachedFiles: [],
      type_name: "schema",
      fileExtensions:
        ".jpg, .jpeg, .png, .csv,.doc,.docx, application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    },
    {
      type_id: "3",
      setFunc(files) {
        this.attachedFiles = [...files];
      },
      attachedFiles: [],
      type_name: "doc",
      fileExtensions:
        ".jpg, .jpeg, .png, .csv,.doc,.docx, application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    },
  ]);

  const getMainImage = (images) => {
    let mainImage = images.find((x) => x.main_image === "1");
    if (!mainImage) {
      mainImage = images[0];
    }
    return mainImage;
  };

  async function deleteAllEntityImages(type_id) {
    const fileTypeIndex = fileTypes.findIndex(
      (fileType) => fileType.type_id === type_id
    );

    if (fileTypeIndex > -1) {
      const response = await deleteAllEntityImagesAPI(id, type_id);

      if (response.success) {
        setFileTypes((oldArr) => {
          const newFileTypes = [...oldArr];
          newFileTypes[fileTypeIndex].setFunc([]);

          return newFileTypes;
        });

        alert("success", `files deleted`);
      } else alert("error", response.message);
    } else {
      alert("warning", "wrong type of file");
    }
  }

  async function deleteEntityImage(file, type_id) {
    const fileTypeIndex = fileTypes.findIndex(
      (fileType) => fileType.type_id === type_id
    );

    if (fileTypeIndex > -1) {
      const response = await deleteEntityImageAPI(id, file.id);

      if (response.success) {
        const images = await response[`${type}Images`];
        setFileTypes((oldArr) => {
          const newFileTypes = [...oldArr];

          setFiles(images, newFileTypes[fileTypeIndex]);

          return newFileTypes;
        });
        alert("success", `file deleted`);
      } else alert("error", response.message);
    } else {
      alert("warning", "wrong type of file");
    }
  }

  async function addEntityImage(files, type_id) {
    const newFiles = [...files];

    const fileTypeIndex = fileTypes.findIndex(
      (fileType) => fileType.type_id === type_id
    );

    if (fileTypeIndex > -1) {
      for (let i = 0; i < newFiles.length; i++) {
        let base64Format = await convertToBase64(newFiles[i]);
        if (base64Format.length > 5) {
          let data = { type_id: type_id, img: base64Format };

          const response = await addEntityImageAPI(id, data);

          if (response.success) {
            const images = await response[`${type}Images`];
            setFileTypes((oldArr) => {
              const newFileTypes = [...oldArr];

              setFiles(images, newFileTypes[fileTypeIndex]);

              return newFileTypes;
            });
          } else alert("error", response.message);
        } else {
          alert("warning", "file is empty");
        }
      }
    } else {
      alert("warning", "wrong type of file");
    }
  }

  const setFiles = (files, fileType) => {
    const newFiles = files.filter((el) => el.type_id == fileType.type_id);

    fileType.setFunc(newFiles);
    return fileType;
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
      getEntityAPI = customersApi.getCustomer;
      deleteEntityImageAPI = customersApi.deleteCustomerImage;
      addEntityImageAPI = customersApi.addCustomerImage;
      setMainEntityImageAPI = customersApi.setMainCustomerImage;
      deleteAllEntityImagesAPI = customersApi.deleteAllCustomerImages;
      subEntityNames = ["facilities"];
      break;
    case "facility":
      getEntityAPI = facilitiesApi.getFacility;
      deleteEntityImageAPI = facilitiesApi.deleteFacilityImage;
      addEntityImageAPI = facilitiesApi.addFacilityImage;
      setMainEntityImageAPI = facilitiesApi.setMainFacilityImage;
      subEntityNames = ["locations"];
      break;
    case "location":
      getEntityAPI = locationApi.getLocation;
      deleteEntityImageAPI = locationApi.deleteLocationImage;
      addEntityImageAPI = locationApi.addLocationImage;
      setMainEntityImageAPI = locationApi.setMainLocationImage;
      subEntityNames = ["equipment"];
      break;
    case "equipment":
      getEntityAPI = equipmentApi.getEquipment;
      deleteEntityImageAPI = equipmentApi.deleteImageEquipment;
      addEntityImageAPI = equipmentApi.createImageEquipment;
      setMainEntityImageAPI = equipmentApi.setMainEquipmentImage;
      subEntityNames = ["sensors", "motes"];
      break;
    default:
      break;
  }

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };

  const toggleModal = () => {
    setShowFormModal(!showFormModal);
  };

  const toggleModal2 = () => {
    setShowFormModal2(!showFormModal2);
  };

  useEffect(() => {
    getEntityAPI(id).then((data) => {
      if (type === "customer" || type === "facility") {
        data = data[type][id];
      } else {
        data = data[type];
      }
      setEntityObject(data);
      if (data[`${type}Images`]) {
        fileTypes.forEach((fileType) => {
          setFiles(data[`${type}Images`], fileType);
        });

        const mainImage = getMainImage(data[`${type}Images`]);
        setMainImage(mainImage);
      }

      if (data["type_id"]) {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/equipment/type?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((types) => {
            setTypeName(
              types["type"].filter((el) => el.id === data["type_id"])[0].name
            );
          });
      }

      if (data.jsonData) {
        const customFields = data.jsonData;

        customFields.forEach((el) => {
          if (el.value) {
            setNewInformationItem(el.name, el.value);
          }
        });
      }
      if (subEntityNames && subEntityNames.length > 0) {
        const names = subEntityNames;

        Promise.all(
          names.map(async (name) => {
            let res = await fetch(
              `${
                process.env.REACT_APP_SERVER_URL
              }/api/${type}/${id}/${name}?access-token=${localStorage.getItem(
                "token"
              )}`
            );
            let data = await res.json();
            return await data;
          })
        ).then((res) => setSubEntity(res));
      }

      informationFieldNames.forEach((field) => {
        if (data[field]) {
          setNewInformationItem(field, data[field]);
        }
      });
    });

    setEntityID(id);

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ModalComponent
        modal={showFormModal}
        toggle={toggleModal}
        type={{ entity: subEntityNames[0] }}
        mode={mode}
      />
      {subEntityNames && subEntityNames.length > 0 && (
        <ModalComponent
          modal={showFormModal2}
          toggle={toggleModal2}
          type={{ entity: subEntityNames[1] }}
          mode={mode}
        />
      )}
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
                fileTypes[0] && fileTypes[0].attachedFiles.length > 0
                  ? fileTypes[0].attachedFiles
                  : []
              }
              setMainImage={setMainEntityImage}
            ></DropdownImageEdit>
          </div>
        )}
        <h1 className="page-title">{entityObject && entityObject.name}</h1>
      </div>

      {typeName && (
        <h4 className="d-flex align-items-center">
          <span className="me-1">Type:</span>
          <div className="information--item">{typeName}</div>
        </h4>
      )}

      {entityObject && informationItems.length > 0 && (
        <div className="entity-page--section">
          <InformationComponent
            items={informationItems}
            title={`Information ${type}`}
          ></InformationComponent>
        </div>
      )}

      {subEntity &&
        subEntity.length > 0 &&
        subEntity.map((el, index) => (
          <div key={index} className="info-page--section mb-2">
            <h2 className="page-subtitle">{`${Object.keys(el)[0]}`}</h2>
            <div
              className={
                screenSize > 440 ? "info-card_group" : "info-card_group dense"
              }
            >
              {el[Object.keys(el)[0]].length > 0 ? (
                el[Object.keys(el)[0]].map((subEnt, index) => (
                  <InfoCard
                    key={index}
                    data={subEnt}
                    type={Object.keys(el)[0]}
                    toggleModal={toggleModal}
                    setMode={setMode}
                    showView={type === "equipment" && false}
                  />
                ))
              ) : (
                <p>No {Object.keys(el)[0]} found.</p>
              )}
            </div>
          </div>
        ))}

      {entityObject && entityObject[`${type}Images`] && (
        <div className="entity-page--section">
          <h2 className="page-subtitle">{`Attachments`}</h2>
          <div className="row">
            {fileTypes &&
              fileTypes.map((fileType, i) => (
                <div key={i} className="col ">
                  <AttachedFiles
                    type={fileType.type_id}
                    name={fileType.type_name}
                    onAddFile={addEntityImage}
                    accepted={fileType.fileExtensions}
                    onRemoveFile={deleteEntityImage}
                    onDeleteAllFiles={deleteAllEntityImages}
                    attachedFiles={
                      fileType.attachedFiles ? fileType.attachedFiles : []
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default CRMEntity;
