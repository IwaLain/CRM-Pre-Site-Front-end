import React from "react";
import PropTypes from "prop-types";

const InformationComponent = ({ items, title }) => {
  return (
    <>
      {/* <h2 className="page-subtitle">{title}</h2> */}

      <div className="information--list">
        {items &&
          items.map((item, i) => (
            <div key={`info-field-${i}`} className="information--item ">
              <span className="field-name">{item.fieldTitle}:</span>
              <span className="field-value">{item.value}</span>
            </div>
          ))}
      </div>
    </>
  );
};
InformationComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      fieldTitle: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};
export default InformationComponent;
