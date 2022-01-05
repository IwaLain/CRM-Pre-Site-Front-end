import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { reducer } from "../../reducer";
import PropTypes from "prop-types";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ModalSketch = ({ toggle, modal, entity, subEntity, mode }) => {
  const initialState = {
    formTitle: "",

    entityName: "",

    refListNames: [],

    modalFields: [],

    anyImg: [],
    equipmentImg: [],
    locationImg: [],

    customFields: [],
    customFieldsCount: 0,
    addFieldModal: false,
    deleteField: {},
    confirmModal: false,

    facilitiesNames: [],
    equipmentNames: [],
    gatewaysNames: [],
    nodesNames: [],

    defaultEntity: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    formTitle,
    entityName,
    refListNames,
    modalFields,
    customFields,
    customFieldsCount,
    addFieldModal,
    deleteField,
    confirmModal,
    facilitiesNames,
    equipmentNames,
    gatewaysNames,
    nodesNames,
    defaultEntity,
  } = state;

  const [anyImg, setAnyImg] = useState([]);
  const [equipmentImg, setEquipmentImg] = useState([]);
  const [locationImg, setLocationImg] = useState([]);

  const {
    equipmentTypeList,
    editId,
    setEditId,
    selectedCustomer,
    updateTrigger,
    setUpdateTrigger,
    entityID,
    customerStructure,
  } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    unregister,
  } = useForm();
  const toggleConfirmModal = () => {
    dispatch({ confirmModal: !confirmModal });
  };
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
          console.log("test failed");
        }
      }
    }
  };

  const resetToggle = () => {
    toggle();
    reset({});
    setEditId(null);
    setAnyImg([]);
    setLocationImg([]);
    setEquipmentImg([]);
    dispatch({ defaultEntity: [] });
    dispatch({ customFields: [] });
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
      } catch (e) {}
    }
  };

  const toggleAddFieldModal = () => {
    dispatch({ addFieldModal: !addFieldModal });
  };

  const handleAddFieldFormSubmit = (e, fields, fieldCount) => {
    e.preventDefault();

    const newFields = fields;

    newFields.push({
      id: `field${fieldCount + 1}`,
      title: e.target.elements["add-field-field"].value,
    });

    dispatch({ customFieldsCount: fieldCount + 1 });
    dispatch({ customFields: newFields });

    toggleAddFieldModal();
  };

  const handleRemoveFieldFormSubmit = (e, fields, fieldId) => {
    const newFields = fields.filter((field) => field.id !== fieldId);
    unregister(fieldId);
    dispatch({ deleteField: null });
    dispatch({ customFields: newFields });
  };
  useEffect(() => {
    let name = "";

    switch (entity) {
      case "customers":
        dispatch({ formTitle: "Customer Create" });
        name = "customer";
        break;
      case "facilities":
        dispatch({ formTitle: "Facility Create" });
        name = "facility";
        break;
      case "locations":
        dispatch({ formTitle: "Location create" });
        name = "location";
        break;
      case "equipment":
        dispatch({ formTitle: "Equipment create" });
        name = "equipment";
        break;
      case "sensors":
        dispatch({ formTitle: "Sensor create" });
        name = "sensor";
        break;
      case "motes":
        dispatch({ formTitle: "Mote create" });
        name = "mote";
        break;
      case "nodes":
        dispatch({ formTitle: "Node create" });
        name = "node";
        break;
      case "routers":
        dispatch({ formTitle: "Router create" });
        name = "router";
        break;
      case "gateways":
        dispatch({ formTitle: "Gateway create" });
        name = "gateway";
        break;
      default:
        break;
    }
    if (name) {
      dispatch({ modalFields: fields[name] });
    }
    dispatch({
      formTitle: `${name.charAt(0).toUpperCase() + name.slice(1)} ${mode}`,
    });
    dispatch({ entityName: name });
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
                dispatch({
                  refListNames: formatNames(data[subEntity], "object"),
                });
            });
        } catch (e) {}
        break;
      default:
        break;
    }

    if (customerStructure && Object.keys(customerStructure).length > 0) {
      switch (entity) {
        case "sensors":
          dispatch({
            facilitiesNames: formatNames(
              customerStructure["facilities"],
              "object"
            ),
          });

          dispatch({
            nodesNames: formatNames(customerStructure["nodes"], "object"),
          });

          dispatch({
            equipmentNames: formatNames(
              customerStructure["equipment"],
              "object"
            ),
          });

          break;
        case "motes":
          dispatch({
            facilitiesNames: formatNames(
              customerStructure["facilities"],
              "object"
            ),
          });

          dispatch({
            gatewaysNames: formatNames(customerStructure["gateways"], "object"),
          });

          dispatch({
            equipmentNames: formatNames(
              customerStructure["equipment"],
              "object"
            ),
          });
          break;
        case "nodes":
          dispatch({
            facilitiesNames: formatNames(
              customerStructure["facilities"],
              "object"
            ),
          });

          dispatch({
            gatewaysNames: formatNames(customerStructure["gateways"], "object"),
          });
          break;
        case "routers":
          dispatch({
            facilitiesNames: formatNames(
              customerStructure["facilities"],
              "object"
            ),
          });

          dispatch({
            gatewaysNames: formatNames(customerStructure["gateways"], "object"),
          });
          break;
        case "gateways":
          dispatch({
            facilitiesNames: formatNames(
              customerStructure["facilities"],
              "object"
            ),
          });
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
                  dispatch({ defaultEntity: data[entityName][editId] });
                  reset({
                    ...data[entityName][editId],
                    headname: data[entityName][editId]["head_name"],
                  });
                  break;
                default:
                  dispatch({ defaultEntity: data[entityName] });
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

                    dispatch({ customFieldsCount: newCount });
                    dispatch({ customFields: newFields });
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
      } catch (e) {}
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
                      <small className="text-danger validation-error">
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
                    className="col-3"
                  >
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col
                      sm={
                        field.title === "Lat"
                          ? 10
                          : field.title === "Lng"
                          ? 12
                          : 6
                      }
                      className={"col-11"}
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
                      <small className="text-danger validation-error">
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
                      <small className="text-danger validation-error">
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
                          <div className="custom-field__container">
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
                            <span
                              className="delete-field__btn"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                dispatch({ deleteField: { id, title } });
                                toggleConfirmModal();
                                // toggleConfirmModal(e, customFields, id);
                              }}
                            >
                              <i class="fas fa-times"></i>
                            </span>
                          </div>
                          <small className="text-danger validation-error">
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
      {deleteField && (
        <ConfirmModal
          modal={confirmModal}
          toggleModal={toggleConfirmModal}
          title="Delete form field"
          handleSubmit={(e) => {
            handleRemoveFieldFormSubmit(e, customFields, deleteField.id);
          }}
          modalText={`Are you sure you want to DELETE ${
            deleteField.title ? deleteField.title : ""
          } field`}
        />
      )}
    </>
  );
};

ModalSketch.propTypes = {
  toggle: PropTypes.func,
  modal: PropTypes.bool,
  entity: PropTypes.string,
  subEntity: PropTypes.string,
  mode: PropTypes.string,
};

export default ModalSketch;
