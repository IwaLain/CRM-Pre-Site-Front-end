import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  FormGroup,
  Col,
  Form,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../context";
import AttachmentList from "../AttachmentList/AttachmentList";
import { alert } from "../../js/helpers/alert";
import fields from "./fields";
import formatNames from "./formatNames";

const ModalSketch = ({ toggle, modal, entity, subEntity, mode }) => {
  const [formTitle, setFormTitle] = useState();

  const [entityName, setEntityName] = useState();

  const [refListNames, setRefListNames] = useState([]);

  const [modalFields, setModalFields] = useState([]);

  const [anyImg, setAnyImg] = useState([]);
  const [equipmentImg, setEquipmentImg] = useState([]);
  const [locationImg, setLocationImg] = useState([]);

  const [customFields, setCustomFields] = useState([]);
  const [customFieldsCount, setCustomFieldsCount] = useState(0);
  const [addFieldModal, setAddFieldModal] = useState(false);

  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [gatewaysNames, setGatewaysNames] = useState([]);
  const [nodesNames, setNodesNames] = useState([]);

  const [defaultEntity, setDefaultEntity] = useState({});

  const {
    equipmentTypeList,
    customerStructure,
    editId,
    setEditId,
    selectedCustomer,
    updateTrigger,
    setUpdateTrigger,
    entityID,
  } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let formattedRouteName;

  switch (subEntity) {
    case "customers":
      formattedRouteName = "customer";
      break;
    case "facilities":
      formattedRouteName = "facilities";
      break;
    case "locations":
      formattedRouteName = "location/list";
      break;
    case "equipment":
      formattedRouteName = "equipment";
      break;
    case "sensors":
      formattedRouteName = "sensor/list";
      break;
    case "motes":
      formattedRouteName = "mote/list";
      break;
    case "nodes":
      formattedRouteName = "node/list";
      break;
    case "routers":
      formattedRouteName = "router/list";
      break;
    case "gateways":
      formattedRouteName = "gateway/list";
      break;
    default:
      break;
  }

  const checkPhoneField = (e) => {
    if (e) {
      if (e.target.value) {
        const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

        if (!re.test(e.target.value)) {
          console.log("jopa");
        }
      }
    }
  };

  const resetToggle = () => {
    toggle();
    reset({});
    setDefaultEntity([]);
    setEditId(undefined);
    setAnyImg([]);
    setLocationImg([]);
    setEquipmentImg([]);
    setCustomFields([]);
  };

  const onSubmit = (data) => {
    const body = {};

    if (data["name"]) body["name"] = data["name"];
    if (data["serial"]) body["serial"] = data["serial"];
    if (data["email"]) body["email"] = data["email"];
    if (data["phone"]) body["phone"] = data["phone"];
    if (data["address"]) body["address"] = data["address"];
    if (data["activity"]) body["activity"] = data["activity"];
    if (data["headname"]) body["head_name"] = data["headname"];
    if (data["location_info"]) body["location_info"] = data["location_info"];
    if (data["lat"]) body["lat"] = data["lat"];
    if (data["lng"]) body["lng"] = data["lng"];

    if (data["facility_id"]) body["facility_id"] = data["facility_id"];
    if (data["location_id"]) body["location_id"] = data["location_id"];
    if (data["equipment_id"]) body["equipment_id"] = data["equipment_id"];
    if (data["type_id"]) body["type_id"] = data["type_id"];
    if (data["node_id"]) body["node_id"] = data["node_id"];
    if (data["gateway_id"]) body["gateway_id"] = data["gateway_id"];

    const jsonData = [];

    for (const [key, value] of Object.entries(data)) {
      if (key.includes("field")) {
        jsonData.push({
          name: customFields.filter((el) => el.id === key)[0].title,
          value: value,
        });
      }
    }

    body["jsonData"] = jsonData;

    switch (entityName) {
      case "facility":
        body["customer_id"] = data["customer_id"];
        break;
      case "sensor":
      case "mote":
      case "router":
      case "node":
      case "gateway":
        body["customer_id"] = selectedCustomer.id;
        break;
      default:
        break;
    }

    body["img"] = [];

    if (locationImg && locationImg.length > 0)
      body["img"] = locationImg.map((image) => {
        return { ...image, type_id: "1" };
      });
    if (equipmentImg && equipmentImg.length > 0) {
      body["img"] = [
        ...body["img"],
        ...equipmentImg.map((image) => {
          return { ...image, type_id: "2" };
        }),
      ];
    } else if (anyImg && anyImg.length > 0) {
      body["img"] = anyImg;
    }

    if (mode === "create") {
      fetch(
        process.env.REACT_APP_SERVER_URL +
          "/api/" +
          entityName +
          "/create?access-token=" +
          localStorage.getItem("token"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (data["success"]) {
              resetToggle();
              alert(
                "success",
                `${
                  entityName.charAt(0).toUpperCase() + entityName.slice(1)
                } created.`
              );
              setUpdateTrigger(!updateTrigger);
            } else if (data.errors && data.errors.includes("ID is invalid")) {
              alert("error", `Invalid ref object.`);
            } else alert("error", `Request error.`);
          }
        });
    } else if (mode === "edit") {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/" +
            entityName +
            "/update/" +
            editId +
            "?access-token=" +
            localStorage.getItem("token"),
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data["success"]) {
                resetToggle();
                alert(
                  "success",
                  `${
                    entityName.charAt(0).toUpperCase() + entityName.slice(1)
                  } changed.`
                );
                setUpdateTrigger(!updateTrigger);
              } else {
                if (data["errors"]) {
                  data["errors"].split(", ").forEach((err) => {
                    alert("error", err);
                  });
                }
              }
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toggleAddFieldModal = () => {
    setAddFieldModal(!addFieldModal);
  };

  const handleAddFieldFormSubmit = (e, fields, fieldCount) => {
    e.preventDefault();

    const newFields = fields;

    newFields.push({
      id: `field${fieldCount + 1}`,
      title: e.target.elements["add-field-field"].value,
    });

    setCustomFieldsCount(fieldCount + 1);
    setCustomFields(newFields);

    toggleAddFieldModal();
  };

  useEffect(() => {
    let name = "";

    switch (entity) {
      case "customers":
        setFormTitle("Customer Create");
        name = "customer";
        setModalFields(fields["customer"]);
        break;
      case "facilities":
        setFormTitle("Facility Create");
        name = "facility";
        setModalFields(fields["facility"]);
        break;
      case "locations":
        setFormTitle("Location create");
        name = "location";
        setModalFields(fields["location"]);
        break;
      case "equipment":
        setFormTitle("Equipment create");
        name = "equipment";
        setModalFields(fields["equipment"]);
        break;
      case "sensors":
        setFormTitle("Sensor create");
        name = "sensor";
        setModalFields(fields["sensor"]);
        break;
      case "motes":
        setFormTitle("Mote create");
        name = "mote";
        setModalFields(fields["mote"]);
        break;
      case "nodes":
        setFormTitle("Node create");
        name = "node";
        setModalFields(fields["node"]);
        break;
      case "routers":
        setFormTitle("Router create");
        name = "router";
        setModalFields(fields["router"]);
        break;
      case "gateways":
        setFormTitle("Gateway create");
        name = "gateway";
        setModalFields(fields["gateway"]);
        break;
      default:
        break;
    }
    setFormTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} ${mode}`);
    setEntityName(name);
  }, [entity, mode]);

  useEffect(() => {
    if (entity && mode === "create") {
      switch (entity) {
        case "customers":
          break;
        case "facilities":
          reset({
            customer_id: entityID,
          });
          break;
        case "locations":
          reset({
            facility_id: entityID,
          });
          break;
        case "equipment":
          reset({
            location_id: entityID,
          });
          break;
        default:
          break;
      }
    }
  }, [entity, mode, entityID]);

  useEffect(() => {
    switch (subEntity) {
      case "customers":
      case "facilities":
      case "locations":
      case "equipment":
        try {
          fetch(
            process.env.REACT_APP_SERVER_URL +
              "/api/" +
              formattedRouteName +
              "?access-token=" +
              localStorage.getItem("token") +
              "&limit=-1"
          )
            .then((res) => res.json())
            .then((data) => {
              if (Object.keys(data[subEntity]).length > 0)
                setRefListNames(formatNames(data[subEntity], "object"));
            });
        } catch (e) {
          console.log(e);
        }
        break;
      default:
        break;
    }

    if (customerStructure) {
      switch (entity) {
        case "sensors":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );

          setNodesNames(formatNames(customerStructure["nodes"], "object"));

          setEquipmentNames(
            formatNames(customerStructure["equipment"], "object")
          );

          break;
        case "motes":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );

          setGatewaysNames(
            formatNames(customerStructure["gateways"], "object")
          );

          setEquipmentNames(
            formatNames(customerStructure["equipment"], "object")
          );
          break;
        case "nodes":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );

          setGatewaysNames(
            formatNames(customerStructure["gateways"], "object")
          );
          break;
        case "routers":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );

          setGatewaysNames(
            formatNames(customerStructure["gateways"], "object")
          );
          break;
        case "gateways":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );

          break;
        default:
          break;
      }
    }
  }, [customerStructure, subEntity, entity]);

  useEffect(() => {
    if (editId && entityName && mode === "edit") {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/" +
            entityName +
            "/" +
            editId +
            "?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((data) => {
            if (data[entityName]) {
              switch (entityName) {
                case "customer":
                case "facility":
                  setDefaultEntity(data[entityName][editId]);
                  reset({
                    ...data[entityName][editId],
                    headname: data[entityName][editId]["head_name"],
                  });
                  break;
                default:
                  setDefaultEntity(data[entityName]);
                  let newFields = [];

                  if (
                    data[entityName]["jsonData"] &&
                    data[entityName]["jsonData"].length > 0 &&
                    data[entityName]["jsonData"] !== "null"
                  ) {
                    let newCount = 0;

                    const jsonData = data[entityName]["jsonData"];

                    jsonData.forEach((el) => {
                      newFields.push({
                        id: `field${newCount + 1}`,
                        title: el.name,
                        value: el.value,
                      });
                      newCount += 1;
                    });

                    setCustomFieldsCount(newCount);
                    setCustomFields(newFields);
                  }

                  let fieldsToReset = {};

                  newFields.forEach((field) => {
                    fieldsToReset[field.id] = field.value;
                    fieldsToReset[field.name] = field.name;
                  });

                  if (fieldsToReset && Object.keys(fieldsToReset).length > 0) {
                    reset({
                      ...data[entityName],
                      ...fieldsToReset,
                    });
                  } else {
                    reset({
                      ...data[entityName],
                    });
                  }
                  break;
              }
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [editId]);

  return (
    <>
      <Modal isOpen={modal} toggle={resetToggle} size="lg">
        <ModalHeader>
          <button className="modal-close" onClick={resetToggle}>
            <i className="fas fa-times"></i>
          </button>
          {formTitle}
        </ModalHeader>
        <ModalBody>
          <Form id="form" onSubmit={handleSubmit(onSubmit)}>
            {modalFields.map((field, index) =>
              field.fieldType === "form" ? (
                field.inputType === "email" ? (
                  <FormGroup key={index}>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={6}>
                      <input
                        className={`form-control ${
                          errors[field.title.toLowerCase()] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
                        placeholder={`Enter ${field.title.toLowerCase()}.`}
                        {...register(field.title.toLowerCase(), {
                          required: {
                            value: true,
                            message: `${field.title} is required.`,
                          },
                          pattern: {
                            value: /^[\w-.]+@([\w-]+.)+[\w-]{1,10}$/,
                            message: `${field.title} is not valid. Example: alex@gmail.com`,
                          },
                        })}
                      />
                      <small
                        className={
                          errors[field.title.toLowerCase()]
                            ? "text-danger"
                            : "text-danger hidden"
                        }
                      >
                        {errors &&
                          errors[field.title.toLowerCase()] &&
                          errors[field.title.toLowerCase()].message}
                      </small>
                    </Col>
                  </FormGroup>
                ) : field.inputType === "phone" ? (
                  <FormGroup key={index}>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={6}>
                      <input
                        className={`form-control ${
                          errors[field.title.toLowerCase()] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
                        onInput={checkPhoneField}
                        placeholder={`Enter ${field.title.toLowerCase()}.`}
                        {...register(field.title.toLowerCase(), {
                          required: {
                            value: true,
                            message: `${field.title} is required.`,
                          },
                          pattern: {
                            value:
                              /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                            message: `${field.title} is not valid. Example: +123456789098`,
                          },
                        })}
                      />
                      <small className="text-danger">
                        {errors &&
                          errors[field.title.toLowerCase()] &&
                          errors[field.title.toLowerCase()].message}
                      </small>
                    </Col>
                  </FormGroup>
                ) : field.inputType === "number" ? (
                  <FormGroup
                    key={index}
                    style={
                      field.title === "Lat" || field.title === "Lng"
                        ? { display: "inline-block" }
                        : {}
                    }
                  >
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col
                      sm={
                        field.title === "Lat" || field.title === "Lng" ? 10 : 6
                      }
                    >
                      <input
                        className={`form-control ${
                          errors[field.title.toLowerCase()] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
                        type="number"
                        placeholder={`Enter ${field.title.toLowerCase()}.`}
                        {...register(field.title.toLowerCase(), {
                          required: {
                            value: true,
                            message: `${field.title} is required.`,
                          },
                          pattern: {
                            value: /^-?[0-9]\d*\.?\d*$/,
                            message: `${field.title} is number only.`,
                          },
                        })}
                      />
                      <small className="text-danger">
                        {errors &&
                          errors[field.title.toLowerCase()] &&
                          errors[field.title.toLowerCase()].message}
                      </small>
                    </Col>
                  </FormGroup>
                ) : (
                  <FormGroup key={index}>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={6}>
                      <input
                        className={`form-control ${
                          errors[field.title.toLowerCase()] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
                        placeholder={`Enter ${field.title.toLowerCase()}.`}
                        {...register(field.title.toLowerCase(), {
                          required: {
                            value: true,
                            message: `${field.title} is required.`,
                          },
                          minLength: {
                            value: 3,
                            message: `${field.title} should contain at least 3 symbols.`,
                          },
                        })}
                      />
                      <small className="text-danger">
                        {errors &&
                          errors[field.title.toLowerCase()] &&
                          errors[field.title.toLowerCase()].message}
                      </small>
                    </Col>
                  </FormGroup>
                )
              ) : field.fieldType === "form-ref-select" ? (
                <FormGroup key={index}>
                  <Label for="select-ref">
                    {subEntity.charAt(0).toUpperCase() + subEntity.slice(1)}
                  </Label>
                  <Col sm={6}>
                    <select
                      id="select-ref"
                      className="ui-kit__select"
                      {...register(field.subID)}
                      disabled={refListNames.length < 1}
                    >
                      {refListNames &&
                        refListNames.map((ref) => (
                          <option key={ref.id} value={ref.id}>
                            {ref.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                </FormGroup>
              ) : field.fieldType === "custom-fields" ? (
                <>
                  {customFields &&
                    customFields.map(({ id, title }) => (
                      <FormGroup key={id}>
                        <Label for={`${id}-field`}>{title}</Label>
                        <Col sm={6}>
                          <input
                            className={`form-control ${
                              errors[`${id}`] ? "is-invalid" : ""
                            }`}
                            id={`${id}-field`}
                            placeholder="Enter value."
                            {...register(`${id}`, {
                              required: {
                                value: true,
                                message: "Value is required.",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Value should contain at least 3 symbols.",
                              },
                            })}
                          />
                          <small className="text-danger">
                            {errors &&
                              errors[`${id}`] &&
                              errors[`${id}`].message}
                          </small>
                        </Col>
                      </FormGroup>
                    ))}
                  <FormGroup>
                    <Col>
                      <Button color="primary" onClick={toggleAddFieldModal}>
                        Add field
                      </Button>
                    </Col>
                  </FormGroup>
                </>
              ) : field.fieldType === "images" ? (
                <div key={index}>
                  {!field.titleNeeded && <span>{field.fileType} image</span>}
                  <AttachmentList
                    key={index}
                    style={{}}
                    attachedFiles={
                      defaultEntity &&
                      Object.keys(defaultEntity).length > 0 &&
                      defaultEntity[`${entityName}Images`]
                    }
                    titleNeeded={field.titleNeeded}
                    multiple={field.mode !== "single"}
                    maxFiles={field.mode === "single" ? 1 : 0}
                    types={field.types}
                    fileType={field.fileType && field.fileType}
                    setCreatedFiles={
                      field.fileType === "location"
                        ? setLocationImg
                        : field.fileType === "equipment"
                        ? setEquipmentImg
                        : setAnyImg
                    }
                  />
                </div>
              ) : field.fieldType === "form-type-select" ? (
                <FormGroup key={index}>
                  <Label for={`${field.title.toLowerCase()}-field`}>
                    {field.title}
                  </Label>
                  <Col sm={6}>
                    <select
                      key={index}
                      id={`${field.title.toLowerCase()}-field`}
                      className="ui-kit__select"
                      {...register(field.subID)}
                      disabled={equipmentTypeList.length < 1}
                    >
                      {equipmentTypeList &&
                        equipmentTypeList.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                </FormGroup>
              ) : field.fieldType === "form-customer-entity-select" ? (
                <FormGroup key={index}>
                  <Label for={`${field.title}-field`}>{field.title}</Label>
                  <Col sm={6}>
                    <select
                      key={index}
                      id={`${field.title}-field`}
                      className="ui-kit__select"
                      disabled={
                        field.title === "Facility"
                          ? facilitiesNames.length < 1
                          : field.title === "Equipment"
                          ? equipmentNames.length < 1
                          : field.title === "Node"
                          ? nodesNames.length < 1
                          : gatewaysNames.length < 1
                      }
                      {...register(field.subID)}
                    >
                      {field.title === "Facility"
                        ? facilitiesNames &&
                          facilitiesNames.map((facility) => (
                            <option key={facility.id} value={facility.id}>
                              {facility.name}
                            </option>
                          ))
                        : field.title === "Equipment"
                        ? equipmentNames &&
                          equipmentNames.map((equipment) => (
                            <option key={equipment.id} value={equipment.id}>
                              {equipment.name}
                            </option>
                          ))
                        : field.title === "Node"
                        ? nodesNames &&
                          nodesNames.map((node) => (
                            <option key={node.id} value={node.id}>
                              {node.name}
                            </option>
                          ))
                        : gatewaysNames &&
                          gatewaysNames.map((gateway) => (
                            <option key={gateway.id} value={gateway.id}>
                              {gateway.name}
                            </option>
                          ))}
                    </select>
                  </Col>
                </FormGroup>
              ) : (
                <div key={index}>Bad field</div>
              )
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              resetToggle();
              setEditId(undefined);
            }}
          >
            Cancel
          </Button>
          <Button color="primary" form="form">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={addFieldModal} toggle={toggleAddFieldModal}>
        <ModalHeader>Add Field</ModalHeader>
        <ModalBody>
          <Form
            id="add-field-form"
            onSubmit={(e) =>
              handleAddFieldFormSubmit(e, customFields, customFieldsCount)
            }
          >
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
    </>
  );
};

export default ModalSketch;
