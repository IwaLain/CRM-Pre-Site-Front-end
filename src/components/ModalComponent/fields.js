export default {
  customer: [
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
      title: "Head_name",
      inputType: "text",
      fieldType: "form",
    },
    {
      fieldType: "images",
      types: [{ typeID: "1" }, { typeID: "2" }, { typeID: "3" }],
      titleNeeded: true,
    },
  ],
  facility: [
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
  ],
  location: [
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
  ],
  equipment: [
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
  ],
  sensor: [
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
      title: "Location_info",
      fieldType: "form",
      inputType: "text",
    },
  ],
  mote: [
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
  ],
  node: [
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
  ],
  router: [
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
  ],
  gateway: [
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
      title: "location image",
      fieldType: "images",
      fileType: "location",
      mode: "single",
      types: [{ typeID: "1" }],
      titleNeeded: false,
    },
    {
      title: "equipment image",
      fieldType: "images",
      fileType: "equipment",
      mode: "single",
      types: [{ typeID: "1" }],
      titleNeeded: false,
    },
  ],
};
