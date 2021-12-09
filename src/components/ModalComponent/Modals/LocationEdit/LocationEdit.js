import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import locationApi from "../../../../js/api/locations";
import { GlobalContext } from "../../../../context";
import "../../../../scss/location-edit.scss";
import ConfirmModal from "../../../ConfirmModal/ConfirmModal";

import AttachmentList from "../../../AttachmentList/AttachmentList";
const LocationEdit = () => {
  const { setShowFormModal, editId, entityID } = useContext(GlobalContext);
  const [fields, setFields] = useState([]);
  const [fieldCount, setFieldCount] = useState(1);
  const [addFieldModal, setAddFieldModal] = useState(false);
  const [removeFieldModal, setRemoveFieldModal] = useState(false);
  const [removeField, setRemoveField] = useState();
  const [files, setFiles] = useState();
  const [createdFiles, setCreatedFiles] = useState([]);
  // const deleteEntityImageAPI = locationApi.deleteLocationImage;
  // const addEntityImageAPI = locationApi.addLocationImage;

  async function addLocationImageServer(files) {
    let newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const response = await locationApi.addLocationImage(editId, files[i]);

      if (response.success) {
        const respImage = await response[`image`];
        newFiles.push(respImage);
      } else alert("error", response.message);
    }

    return newFiles;
  }
  async function deleteLocationImageServer(fileId) {
    const response = await locationApi.deleteLocationImage(editId, fileId);
    if (response.success) {
      alert("success", `file deleted`);
      return true;
    } else alert("error", response.message);
    return false;
  }

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    locationApi.getLocation(editId).then((data) => {
      const jsonData = data.location["jsonData"];
      const locationFiles = data.location["locationImages"];
      reset({ name: data.location["name"] });
      if (jsonData) {
        let newFields = [];
        let newCount = 1;
        jsonData.forEach((el) => {
          newFields.push({
            id: `field${newCount}`,
            title: el.name,
            value: el.value,
          });
          newCount += 1;
        });
        setFieldCount(newCount);

        setFields(newFields);
      }
      if (locationFiles) {
        setFiles(locationFiles);
      }
    });
  }, []);
  const onSubmit = (data) => {
    const body = {};
    const jsonData = [];
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case "facilityID":
          body["facility_id"] = value;
          break;
        case "name":
          body["name"] = value;
          break;
        default:
          jsonData.push({
            name: fields.filter((el) => el.id === key)[0].title,
            value: value,
          });
          break;
      }
    }
    body["jsonData"] = jsonData;
    if (createdFiles && createdFiles.length > 0) {
      body["img"] = createdFiles;
    }
    locationApi.editLocation(editId, body).then((res) => {
      if (res.status === "Successfully updated")
        alert("success", "Location updated.");
      else alert("error", "Request error.");
    });

    document.querySelector("#form").reset();
    setShowFormModal(false);
  };
  // const addFilesHandler = (files, type) => {
  //   setFiles((oldArr) => {
  //     let id = Number.parseInt(oldArr[oldArr.length - 1].id);
  //     id = id + 1 + "";

  //     const newFiles = files.map((file) => {
  //       return { type_id: type, preview: file.preview, img: file.path, id };
  //     });
  //     const newArr = [...oldArr, ...newFiles];
  //     return newArr;
  //   });
  // };
  const toggleAddFieldModal = () => {
    setAddFieldModal(!addFieldModal);
  };
  const toggleRemoveFieldModal = () => {
    setRemoveFieldModal(!removeFieldModal);
  };
  const handleRemoveFieldFormSubmit = () => {
    unregister(removeField.id);
    setFields(fields.filter((field) => field.id !== removeField.id));
    setRemoveField("");
  };
  const handleAddFieldFormSubmit = async (e) => {
    e.preventDefault();

    const newFields = fields;
    newFields.push({
      id: `field${fieldCount}`,
      title: e.target.elements["add-field-field"].value,
    });

    setFieldCount(fieldCount + 1);
    setFields(newFields);

    toggleAddFieldModal();
  };

  return (
    <>
      <Modal isOpen={addFieldModal} toggle={toggleAddFieldModal}>
        <ModalHeader>Add Field</ModalHeader>
        <ModalBody>
          <Form id="add-field-form" onSubmit={handleAddFieldFormSubmit}>
            <FormGroup>
              <Label for="add-field-field">Field title</Label>
              <Col sm={12}>
                <input className="form-control" id="add-field-field" />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleAddFieldModal}>Cancel</Button>
          <Button form="add-field-form" color="primary">
            Add
          </Button>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        modal={removeFieldModal}
        toggleModal={toggleRemoveFieldModal}
        title="Delete Field"
        handleSubmit={() => {
          handleRemoveFieldFormSubmit();
        }}
        modalText={`Are you sure you want to DELETE ${
          removeField && removeField.title
        }`}
      />

      <div className="create-form">
        <Form id="form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="facilityID-field">Facility ID</Label>
            <Col sm={12}>
              <input
                className="form-control"
                id="facilityID-field"
                value={entityID}
                {...register("facilityID")}
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="name-field">Name</Label>
            <Col sm={12}>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name-field"
                placeholder="Enter location name."
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required.",
                  },
                  minLength: {
                    value: 3,
                    message: "Name should contain at least 3 symbols.",
                  },
                })}
              />
            </Col>
          </FormGroup>
          {fields &&
            fields.map(({ id, title, value }) => (
              <FormGroup key={id}>
                <Label for={`${id}-field`}>{title}</Label>
                <Col sm={12} className="delete-field">
                  <input
                    className={`form-control ${
                      errors[`${id}`] ? "is-invalid" : ""
                    }`}
                    id={`${id}-field`}
                    placeholder="Enter address."
                    {...register(`${id}`)}
                    defaultValue={value}
                  />
                  <button
                    className="btn delete-field--container"
                    onClick={(e) => {
                      e.preventDefault();
                      setRemoveField({ id, title });
                      toggleRemoveFieldModal();
                    }}
                  >
                    <span className="delete-field--cross"></span>
                  </button>
                </Col>
              </FormGroup>
            ))}
          <FormGroup>
            <Col sm={12}>
              <Button color="primary" onClick={toggleAddFieldModal}>
                Add Field
              </Button>
            </Col>
          </FormGroup>

          {files && (
            <AttachmentList
              attachedFiles={files}
              setCreatedFiles={setCreatedFiles}
            />
          )}
        </Form>
      </div>
    </>
  );
};

export default LocationEdit;
