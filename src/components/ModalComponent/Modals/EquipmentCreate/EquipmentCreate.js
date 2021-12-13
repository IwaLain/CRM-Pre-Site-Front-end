import React, { useContext, useEffect, useState } from "react";
import "../../../../scss/customer-create-page.scss";
import star from "../../../../assets/img/star.svg";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { alert } from "../../../../js/helpers/alert";
import equipmentApi from "../../../../js/api/equipment";
import { GlobalContext } from "../../../../context";
import convertToBase64 from "../../../../js/helpers/convertImage";
import placeholder from "../../../../assets/img/company.png";
import AttachmentList from "../../../AttachmentList/AttachmentList";

const EquipmentCreate = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState();
  const [img, setImg] = useState();
  const [equipmentTypesList, setEquipmentTypesList] = useState([]);
  const [equipmentTypeID, setEquipmentTypeID] = useState();
  const [fields, setFields] = useState([]);
  const [fieldCount, setFieldCount] = useState(1);
  const [addFieldModal, setAddFieldModal] = useState(false);
  const [locationName, setLocationName] = useState();
  const [files, setFiles] = useState([]);
  const [createdFiles, setCreatedFiles] = useState([]);

  const { setShowFormModal, entityID } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getBase64Image = (img) => {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");

    return dataURL;
  };

  const addImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToBase64(file).then((res) => setImg(res));
      const url = URL.createObjectURL(file);
      setLoadedImg(url);
      setImgLoaded(true);
    }
  };

  const onSubmit = (data) => {
    const body = {};
    const jsonData = [];

    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case "locationID":
        case "name":
          break;
        default:
          jsonData.push({
            name: fields.filter((el) => el.id === key)[0].title,
            value: value,
          });
          break;
      }
    }

    body["location_id"] = entityID;
    body["type_id"] = equipmentTypeID;
    if (data.name) body["name"] = data.name;
    body["jsonData"] = jsonData;
    if (createdFiles.length > 0) {
      body["img"] = createdFiles;
    }

    equipmentApi.addEquipment(body).then((res) => {
      if (res.status === "Successfully created")
        alert("success", "Equipment created.");
      else alert("error", "Request error.");
    });
    document.querySelector("#form").reset();

    setShowFormModal(false);
  };

  const handleSelect = (e) => {
    setEquipmentTypeID(e.target.value);
  };

  const handleAddFieldFormSubmit = (e) => {
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

  const toggleAddFieldModal = () => {
    setAddFieldModal(!addFieldModal);
  };

  useEffect(() => {
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/equipment/type?access-token=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((types) => {
        setEquipmentTypesList(types.type);
        setEquipmentTypeID(types.type[0].id);
      });
  }, []);

  useEffect(() => {
    fetch(
      process.env.REACT_APP_SERVER_URL +
        "/api/location/" +
        entityID +
        "?access-token=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((data) => {
        setLocationName(data.location.name);
      });
  }, [entityID]);

  return (
    <>
      <div className="create-form">
        <img
          id="placeholder-img"
          src={placeholder}
          alt="placeholder err"
          style={{ display: "none" }}
        />
        <Modal isOpen={addFieldModal} toggle={toggleAddFieldModal}>
          <ModalHeader>Add property</ModalHeader>
          <ModalBody>
            <Form id="add-field-form" onSubmit={handleAddFieldFormSubmit}>
              <FormGroup>
                <Label for="add-field-field">Property title</Label>
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
        <Form id="form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="locationID-field">Location</Label>
            <Col sm={12}>
              <input
                className="form-control"
                id="locationID-field"
                defaultValue={locationName}
                {...register("locationID")}
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
                placeholder="Enter equipment name."
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
          <FormGroup>
            <Label for="typeID-field">Type</Label>
            <Col sm={12}>
              <Input id="select-type" onChange={handleSelect} type="select">
                {equipmentTypesList &&
                  equipmentTypesList.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
              </Input>
            </Col>
          </FormGroup>
          {fields &&
            fields.map(({ id, title }) => (
              <FormGroup key={id}>
                <Label for={`${id}-field`}>{title}</Label>
                <Col sm={12}>
                  <input
                    className={`form-control ${
                      errors[`${id}`] ? "is-invalid" : ""
                    }`}
                    id={`${id}-field`}
                    placeholder="Enter property value."
                    {...register(`${id}`, {
                      required: {
                        value: true,
                        message: "Property value is required.",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "Property value should contain at least 3 symbols.",
                      },
                    })}
                  />
                </Col>
              </FormGroup>
            ))}
          <FormGroup>
            <Col>
              <Button color="primary" onClick={toggleAddFieldModal}>
                Add property
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

export default EquipmentCreate;
