import React from "react";

import "./information-component.scss";
const InformationComponent = ({ items }) => {
  return (
    <>
      {" "}
      <div className="page--information">
        <h2 className="page-subtitle">Information Customer</h2>

        <div className="d-flex flex-wrap">
          {items &&
            items.map((item, i) => (
              <div key={i} className="information--item">
                {item.name}
              </div>
            ))}
        </div>
      </div>{" "}
    </>
  );
};
export default InformationComponent;
