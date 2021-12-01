import React from "react";

import "./information-component.scss";
const InformationComponent = ({ items, title }) => {
  return (
    <>
      <h2 className="page-subtitle">{title}</h2>

      <div className="information--list">
        {items &&
          items.map((item, i) => (
            <div key={i} className="information--item">
              {item.fieldTitle} : {item.value}
            </div>
          ))}
      </div>
    </>
  );
};
export default InformationComponent;
