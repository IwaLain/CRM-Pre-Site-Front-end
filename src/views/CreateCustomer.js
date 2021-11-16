import React from "react";
import FormComponent from "../components/FormComponent";

const CreateCustomer = () => {
  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];
  return (
    <FormComponent
      formFields={formFields}
      formName="Create Customer"
      addFieldBtn={true}
      attachedImages={true}
    ></FormComponent>
  );
};
export default CreateCustomer;
