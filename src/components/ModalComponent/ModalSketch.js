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
  Input,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../../context";
import AttachmentList from "../AttachmentList/AttachmentList";

const ModalSketch = ({ toggle, modal, entity, subEntity, mode }) => {
  const [formTitle, setFormTitle] = useState();

  const [entityName, setEntityName] = useState();
  const [refName, setRefName] = useState();
  const [refID, setRefID] = useState();

  const [refListNames, setRefListNames] = useState([]);

  const [modalFields, setModalFields] = useState([]);

  const [anyImg, setAnyImg] = useState([]);
  const [locationImg, setLocationImg] = useState([]);
  const [equipmentImg, setEquipmentImg] = useState([]);

  const [typeID, setTypeID] = useState();

  const [customFields, setCustomFields] = useState([]);
  const [customFieldsCount, setCustomFieldsCount] = useState(0);
  const [addFieldModal, setAddFieldModal] = useState(false);

  const [facilitiesNames, setFacilitiesNames] = useState([]);
  const [facilityID, setFacilityID] = useState();
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [equipmentID, setEquipmentID] = useState();
  const [gatewaysNames, setGatewaysNames] = useState([]);
  const [gatewayID, setGatewayID] = useState();
  const [nodesNames, setNodesNames] = useState([]);
  const [nodeID, setNodeID] = useState();

  const [defaultEntity, setDefaultEntity] = useState([]);

  const {
    setShowFormModal,
    entityID,
    equipmentTypeList,
    customerStructure,
    editId,
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

  const formatNames = (list, type) => {
    const newList = [];
    switch (type) {
      case "object":
        for (const [, value] of Object.entries(list)) {
          newList.push({ id: value.id, name: value.name || value.serial });
        }
        break;
      case "array":
        console.log(list);
        break;
      default:
        break;
    }

    return newList;
  };

  const onSubmit = (data) => {
    const body = {};

    if (data["Name"]) body["name"] = data["Name"];
    if (data["Serial"]) body["serial"] = data["Serial"];
    if (data["Email"]) body["email"] = data["Email"];
    if (data["Phone"]) body["phone"] = data["Phone"];
    if (data["Address"]) body["address"] = data["Address"];
    if (data["Activity"]) body["activity"] = data["Activity"];
    if (data["Headname"]) body["head_name"] = data["Headname"];
    body["img"] = [
      {
        type_id: 1,
        img: locationImg[0].img,
      },
      {
        type_id: 2,
        img: equipmentImg[0].img,
      },
    ];

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
      .then((data) => console.log(data));

    document.querySelector("#form").reset();
  };

  const handleRefSelect = (e) => {
    setRefID(e.target.value);
  };

  const handleTypeSelect = (e) => {
    setTypeID(e.target.value);
  };

  const handleFacilitySelect = (e) => {
    setFacilityID(e.target.value);
  };

  const handleEquipmentSelect = (e) => {
    setEquipmentID(e.target.value);
  };

  const handleGatewaySelect = (e) => {
    setGatewayID(e.target.value);
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
    console.log(1);
    if (editId && entityName) {
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
          console.log(data);
          setDefaultEntity(data[entityName][editId]);
          reset({
            ...data[entityName][editId],
            headname: data[entityName][editId]["head_name"],
          });
        });
    }
  }, [entity]);

  useEffect(() => {
    let name = "";

    switch (entity) {
      case "customers":
        setFormTitle("Customer Create");
        name = "customer";
        setModalFields([
          {
            title: "Name",
            inputType: "text",
            fieldType: "form",
          },
          {
            title: "Email",
            inputType: "email",
            fieldType: "form",
          },
          {
            title: "Phone",
            inputType: "phone",
            fieldType: "form",
          },
          {
            title: "Address",
            inputType: "text",
            fieldType: "form",
          },
          {
            title: "Activity",
            inputType: "text",
            fieldType: "form",
          },
          {
            title: "Headname",
            inputType: "text",
            fieldType: "form",
          },
          {
            fieldType: "images",
            types: [{ typeID: "1" }, { typeID: "2" }, { typeID: "3" }],
            titleNeeded: true,
          },
        ]);
        break;
      case "facilities":
        setFormTitle("Facility Create");
        name = "facility";
        setModalFields([
          {
            title: "Customer",
            fieldType: "form-ref-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Lat",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Lng",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Address",
            fieldType: "form",
            inputType: "text",
          },
          {
            fieldType: "images",
            types: [{ typeID: "1" }, { typeID: "2" }, { typeID: "3" }],
            titleNeeded: true,
          },
        ]);
        break;
      case "locations":
        setFormTitle("Location create");
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-ref-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            fieldType: "custom-fields",
          },
          {
            fieldType: "images",
            types: [{ typeID: "1" }, { typeID: "2" }, { typeID: "3" }],
            titleNeeded: true,
          },
        ]);
        break;
      case "equipment":
        setFormTitle("Equipment create");
        setModalFields([
          {
            title: "Location",
            fieldType: "form-ref-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Type",
            fieldType: "form-type-select",
          },
          {
            fieldType: "custom-fields",
          },
          {
            fieldType: "images",
            types: [{ typeID: "1" }, { typeID: "2" }, { typeID: "3" }],
            titleNeeded: true,
          },
        ]);
        break;
      case "sensors":
        setFormTitle("Sensor create");
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Equipment",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Node",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Serial",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Location info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "motes":
        setFormTitle("Mote create");
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Equipment",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Gateway",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Serial",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Location info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "nodes":
        setFormTitle("Node create");
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Gateway",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Serial",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Location info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "routers":
        setFormTitle("Router create");
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Gateway",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Serial",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Location info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "gateways":
        setFormTitle("Gateway create");
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Serial",
            fieldType: "form",
            inputType: "number",
          },
          {
            title: "Location info",
            fieldType: "form",
            inputType: "text",
          },
          {
            fieldType: "images",
            fileType: "equipment",
            mode: "single",
            types: [{ typeID: "1" }],
            titleNeeded: false,
          },
          {
            fieldType: "images",
            fileType: "location",
            mode: "single",
            types: [{ typeID: "1" }],
            titleNeeded: false,
          },
        ]);
        break;
      default:
        break;
    }
    setFormTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} ${mode}`);
    setEntityName(name);
  }, [entity]);

  useEffect(() => {
    if (customerStructure) {
      switch (subEntity) {
        case "customers":
        case "facilities":
        case "locations":
        case "equipment":
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
              setRefListNames(formatNames(data[subEntity], "object"));
            });
          break;
        default:
          break;
      }

      switch (entity) {
        case "sensors":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );
          setFacilityID(Object.keys(customerStructure["facilities"])[0]);

          setNodesNames(formatNames(customerStructure["nodes"], "object"));
          setNodeID(Object.keys(customerStructure["nodes"])[0]);

          setEquipmentNames(
            formatNames(customerStructure["equipment"], "object")
          );
          setEquipmentID(Object.keys(customerStructure["equipment"])[0]);
        case "motes":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );
          setFacilityID(Object.keys(customerStructure["facilities"])[0]);

          setGatewaysNames(
            formatNames(customerStructure["gateways"], "object")
          );
          setGatewayID(Object.keys(customerStructure["gateways"])[0]);

          setEquipmentNames(
            formatNames(customerStructure["equipment"], "object")
          );
          setEquipmentID(Object.keys(customerStructure["equipment"])[0]);
        case "nodes":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );
          setFacilityID(Object.keys(customerStructure["facilities"])[0]);

          setGatewaysNames(
            formatNames(customerStructure["gateways"], "object")
          );
          setGatewayID(Object.keys(customerStructure["gateways"])[0]);
        case "routers":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );
          setFacilityID(Object.keys(customerStructure["facilities"])[0]);

          setGatewaysNames(
            formatNames(customerStructure["gateways"], "object")
          );
          setGatewayID(Object.keys(customerStructure["gateways"])[0]);
        case "gateways":
          setFacilitiesNames(
            formatNames(customerStructure["facilities"], "object")
          );
          setFacilityID(Object.keys(customerStructure["facilities"])[0]);
          break;
        default:
          break;
      }
    }
  }, [customerStructure, subEntity, entity]);

  useEffect(() => {
    if (equipmentTypeList && equipmentTypeList.length > 0) {
      setTypeID(equipmentTypeList[0].id);
    }
  }, [equipmentTypeList]);

  return (
    <>
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{formTitle}</ModalHeader>
        <ModalBody>
          <Form id="form" onSubmit={handleSubmit(onSubmit)}>
            {modalFields.map((field) =>
              field.fieldType === "form" ? (
                field.inputType === "email" ? (
                  <FormGroup>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={12}>
                      <input
                        className={`form-control ${
                          errors[field.title] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
                        placeholder={`Enter ${field.title.toLowerCase()}.`}
                        {...register(field.title.toLowerCase(), {
                          required: {
                            value: true,
                            message: `${field.title.toLowerCase()} is required.`,
                          },
                          pattern: {
                            value: /^[\w-.]+@([\w-]+.)+[\w-]{1,10}$/,
                            message: `${field.title.toLowerCase()} is not valid. Example: alex@gmail.com`,
                          },
                        })}
                      />
                    </Col>
                  </FormGroup>
                ) : field.inputType === "phone" ? (
                  <FormGroup>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={12}>
                      <input
                        className={`form-control ${
                          errors[field.title] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
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
                    </Col>
                  </FormGroup>
                ) : field.inputType === "number" ? (
                  <FormGroup>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={12}>
                      <input
                        className={`form-control ${
                          errors[field.title] ? "is-invalid" : ""
                        }`}
                        id={`${field.title}-field`}
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
                    </Col>
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <Label for={`${field.title}-field`}>{field.title}</Label>
                    <Col sm={12}>
                      <input
                        className={`form-control ${
                          errors[field.title] ? "is-invalid" : ""
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
                    </Col>
                  </FormGroup>
                )
              ) : field.fieldType === "form-ref-select" ? (
                <FormGroup>
                  <Label for="ref-field">
                    {subEntity.charAt(0).toUpperCase() + subEntity.slice(1)}
                  </Label>
                  <Col sm={12}>
                    <Input
                      id="select-ref"
                      onChange={handleRefSelect}
                      type="select"
                    >
                      {refListNames &&
                        refListNames.map((ref) => (
                          <option
                            key={ref.id}
                            value={ref.id}
                            selected={
                              ref.id ===
                              defaultEntity[formattedRouteName + "_id"]
                            }
                          >
                            {ref.name}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </FormGroup>
              ) : field.fieldType === "custom-fields" ? (
                <>
                  {customFields &&
                    customFields.map(({ id, title }) => (
                      <FormGroup key={id}>
                        <Label for={`${id}-field`}>{title}</Label>
                        <Col sm={12}>
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
                <div>
                  {!field.titleNeeded && <span>{field.fileType} image</span>}
                  <AttachmentList
                    style={{}}
                    attachedFiles={[]}
                    titleNeeded={field.titleNeeded}
                    multiple={field.mode !== "single"}
                    maxFiles={field.mode === "single" ? 1 : 0}
                    types={field.types}
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
                <FormGroup>
                  <Label for={`${field.title.toLowerCase()}-field`}>
                    {field.title}
                  </Label>
                  <Col sm={12}>
                    <Input
                      id={`${field.title.toLowerCase()}-field`}
                      onChange={handleTypeSelect}
                      type="select"
                    >
                      {equipmentTypeList &&
                        equipmentTypeList.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                    </Input>
                  </Col>
                </FormGroup>
              ) : field.fieldType === "form-customer-entity-select" ? (
                <FormGroup>
                  <Label for={`${field.title}-field`}>{field.title}</Label>
                  <Col sm={12}>
                    <Input
                      id={`${field.title}-field`}
                      onChange={
                        field.title === "Facility"
                          ? handleFacilitySelect
                          : field.title === "Equipment"
                          ? handleEquipmentSelect
                          : handleGatewaySelect
                      }
                      type="select"
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
                    </Input>
                  </Col>
                </FormGroup>
              ) : (
                <div>Bad field</div>
              )
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            Cancel
          </Button>
          <Button color="primary" form="form">
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalSketch;
