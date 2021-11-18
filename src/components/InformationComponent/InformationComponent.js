import React from "react";

import "./information-component.scss";
const InformationComponent = ({ items, title }) => {
  return (
    <>
      {" "}
      <div className="page--information">
        <h2 className="page-subtitle">{title}</h2>

        <div className="d-flex flex-wrap">
          {items &&
            items.map((item, i) => (
              <div key={i} className="information--item">
                {item.fieldTitle} : {item.value}
              </div>
            ))}
        </div>
      </div>{" "}
    </>
  );
};
export default InformationComponent;
