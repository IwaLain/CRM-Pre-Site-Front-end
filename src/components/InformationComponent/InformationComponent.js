import React from "react";

import "../../scss/information-component.scss";
const InformationComponent = ({ items, title }) => {
  return (
    <>
      <h2 className="page-subtitle">{title}</h2>

      <div className="information--list">
        {items &&
          items.map((item, i) => (
            <div key={i} className="information--item ">
              <div className="ui-kit__badge field-name">{item.fieldTitle}:</div>
              <div className="ui-kit__badge field-value">{item.value}</div>
            </div>
          ))}
      </div>
    </>
  );
};
export default InformationComponent;
