import React from "react";
import FormComponent from "../../FormComponent/FormComponent";
import "./create-customer.scss";

const CreateCustomer = () => {
  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];
  return (
    <div className="create-customer--container">
      <FormComponent
        formFields={formFields}
        formName="Create Customer"
        addFieldBtn={false}
        attachedImages={true}
      ></FormComponent>
    </div>
  );
};
export default CreateCustomer;
