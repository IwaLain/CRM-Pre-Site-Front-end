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

  const [defaultEntity, setDefaultEntity] = useState([]);

  const {
    equipmentTypeList,
    customerStructure,
    editId,
    setEditId,
    selectedCustomer,
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

  const resetToggle = () => {
    reset({});
    setDefaultEntity([]);
    setEditId(undefined);
    toggle();
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

    switch (entityName) {
      case "facility":
        body["customer_id"] = data["customer_id"];
        break;
      case "sensors":
      case "motes":
      case "routers":
      case "nodes":
      case "gateways":
        body["customer_id"] = selectedCustomer.id;
        break;
      default:
        break;
    }

    if (
      locationImg &&
      locationImg.length > 0 &&
      equipmentImg &&
      equipmentImg.length > 0
    )
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
    else if (anyImg && anyImg.length > 0) {
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
      ).then((res) => {
        if (res.status === 200) resetToggle();
      });
    } else if (mode === "edit") {
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
      ).then((res) => {
        if (res.status === 200) resetToggle();
      });
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
            subID: "customer_id",
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
        name = "location";
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-ref-select",
            subID: "facility_id",
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
        name = "equipment";
        setModalFields([
          {
            title: "Location",
            fieldType: "form-ref-select",
            subID: "location_id",
          },
          {
            title: "Name",
            fieldType: "form",
            inputType: "text",
          },
          {
            title: "Type",
            fieldType: "form-type-select",
            subID: "type_id",
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
        name = "sensor";
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
            subID: "facility_id",
          },
          {
            title: "Equipment",
            fieldType: "form-customer-entity-select",
            subID: "equipment_id",
          },
          {
            title: "Node",
            fieldType: "form-customer-entity-select",
            subID: "node_id",
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
            title: "Location_info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "motes":
        setFormTitle("Mote create");
        name = "mote";
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
            subID: "facility_id",
          },
          {
            title: "Equipment",
            fieldType: "form-customer-entity-select",
            subID: "equipment_id",
          },
          {
            title: "Gateway",
            fieldType: "form-customer-entity-select",
            subID: "gateway_id",
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
            title: "Location_info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "nodes":
        setFormTitle("Node create");
        name = "node";
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
            subID: "facility_id",
          },
          {
            title: "Gateway",
            fieldType: "form-customer-entity-select",
            subID: "gateway_id",
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
            title: "Location_info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "routers":
        setFormTitle("Router create");
        name = "router";
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
            subID: "facility_id",
          },
          {
            title: "Gateway",
            fieldType: "form-customer-entity-select",
            subID: "gateway_id",
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
            title: "Location_info",
            fieldType: "form",
            inputType: "text",
          },
        ]);
        break;
      case "gateways":
        setFormTitle("Gateway create");
        name = "gateway";
        setModalFields([
          {
            title: "Facility",
            fieldType: "form-customer-entity-select",
            subID: "facility_id",
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
            title: "Location_info",
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
  }, [entity, mode]);

  useEffect(() => {
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
              reset({
                ...data[entityName],
                headname: data[entityName]["head_name"],
              });
              break;
          }
        });
    }
  }, [editId]);

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
      <Modal isOpen={modal} toggle={resetToggle}>
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
                  <Label for="select-ref">
                    {subEntity.charAt(0).toUpperCase() + subEntity.slice(1)}
                  </Label>
                  <Col sm={12}>
                    <select
                      id="select-ref"
                      className="ui-kit__select"
                      {...register(field.subID)}
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
                    attachedFiles={
                      entityName !== "gateway"
                        ? defaultEntity &&
                          Object.keys(defaultEntity).length > 0 &&
                          defaultEntity[`${entityName}Images`]
                        : defaultEntity &&
                          Object.keys(defaultEntity).length > 0 &&
                          field.fileType === "location"
                        ? defaultEntity[`${entityName}Images`].filter(
                            (img) => img["type_id"] === "1"
                          )
                        : defaultEntity[`${entityName}Images`].filter(
                            (img) => img["type_id"] === "2"
                          )
                    }
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
                    <select
                      id={`${field.title.toLowerCase()}-field`}
                      className="ui-kit__select"
                      {...register(field.subID)}
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
                <FormGroup>
                  <Label for={`${field.title}-field`}>{field.title}</Label>
                  <Col sm={12}>
                    <select
                      id={`${field.title}-field`}
                      className="ui-kit__select"
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
                <div>Bad field</div>
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
    </>
  );
};

export default ModalSketch;
