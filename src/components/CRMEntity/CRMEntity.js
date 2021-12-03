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
  const { showFormModal, setShowFormModal, setEntityID } =
    useContext(GlobalContext);

  let deleteEntityImageAPI;
  let getEntityAPI;
  let addEntityImageAPI;
  let setMainEntityImageAPI;
  let deleteAllEntityImagesAPI;
  let subEntityName = "";
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const [entityObject, setEntityObject] = useState();

  const [mainImage, setMainImage] = useState();
  const [subEntity, setSubEntity] = useState();
  const [informationItems, setInformationItems] = useState([]);
  const informationFieldNames = ["address", "phone", "email"];
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
      console.log(deleteAllEntityImagesAPI);
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
    // const fileBaseFormat = await convertToBase64(file);
    const newFiles = [...files];

    const fileTypeIndex = fileTypes.findIndex(
      (fileType) => fileType.type_id === type_id
    );

    // function setDelay(i, data) {
    //   setTimeout(async function () {
    //     const response = await addEntityImageAPI(id, data);
    //     if (response.success) {
    //       setFileTypes((oldArr) => {
    //         const newFileTypes = [...oldArr];
    //         newFileTypes[fileTypeIndex].setFunc([...response[`${type}Images`]]);
    //         return newFileTypes;
    //       });
    //     }
    //   }, 1000 * i);
    // }
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
      subEntityName = "facilities";
      break;
    case "facility":
      getEntityAPI = facilitiesApi.getFacility;
      deleteEntityImageAPI = facilitiesApi.deleteFacilityImage;
      addEntityImageAPI = facilitiesApi.addFacilityImage;
      setMainEntityImageAPI = facilitiesApi.setMainFacilityImage;
      subEntityName = "locations";
      break;
    case "location":
      subEntityName = "equipment";
      getEntityAPI = locationApi.getLocation;

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
        // setAttachedImages([...data[`${type}Images`]]);

        const mainImage = getMainImage(data[`${type}Images`]);
        setMainImage(mainImage);
      }
      if (data.jsonData) {
        const customFields = data.jsonData;

        customFields.forEach((el) => {
          if (el.value) {
            setNewInformationItem(el.name, el.value);
          }
        });
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

    setEntityID(id);

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
      <ModalComponent
        modal={showFormModal}
        toggle={toggleModal}
        type={{ entity: subEntityName }}
        mode={mode}
      />
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

      {entityObject && informationItems.length > 0 && (
        <div className="entity-page--section">
          <InformationComponent
            items={informationItems}
            title={`Information ${type}`}
          ></InformationComponent>
        </div>
      )}

      {entityObject && subEntityName.length > 0 && (
        <div className="info-page--section">
          <h2 className="page-subtitle">{`${type} ${subEntityName}`}</h2>
          <div
            className={
              screenSize > 440 ? "info-card_group" : "info-card_group dense"
            }
          >
            {subEntity && subEntity.length > 0 ? (
              subEntity.map((subEnt) => (
                <InfoCard
                  data={subEnt}
                  type={subEntityName}
                  toggleModal={toggleModal}
                  setMode={setMode}
                />
              ))
            ) : (
              <p>No {subEntityName} found.</p>
            )}
          </div>
        </div>
      )}

      {entityObject && entityObject[`${type}Images`] && (
        <div className="entity-page--section">
          <h2 className="page-subtitle">{`Attachment`}</h2>
          <div className="attached-files--list">
            {fileTypes &&
              fileTypes.map((fileType) => (
                <div className="attached-files--item">
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
