import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { Link } from "react-router-dom";
import "../../../scss/breadcrumbs.scss";
import { getCustomerAPI } from "../../../js/api/customer";
import { getFacilityApi } from "../../../js/api/facilities";
import { getLocationAPI } from "../../../js/api/locations";
import { getEquipment } from "../../../js/api/equipment";
import { useState } from "react";

const Breadcrumbs = ({ breadcrumbs }) => {
  const [name, setName] = useState();

  return (
    <nav className="breadcrumbs">
      {breadcrumbs &&
        breadcrumbs.map(({ breadcrumb, match }, index) => {
          if (
            breadcrumb.key.includes("/dashboard/customers/") &&
            parseInt(breadcrumb.props.children)
          ) {
            getCustomerAPI(breadcrumb.props.children).then((customer) => {
              setName(customer.name);
            });
          } else if (
            breadcrumb.key.includes("/dashboard/facilities/") &&
            parseInt(breadcrumb.props.children)
          ) {
            getFacilityApi(breadcrumb.props.children).then((facility) => {
              setName(facility.name);
            });
          } else if (
            breadcrumb.key.includes("/dashboard/locations/") &&
            parseInt(breadcrumb.props.children)
          ) {
            getLocationAPI(breadcrumb.props.children).then((location) => {
              setName(location.name);
            });
          } else if (
            breadcrumb.key.includes("/dashboard/equipment/") &&
            parseInt(breadcrumb.props.children)
          ) {
            getEquipment(breadcrumb.props.children).then((equipment) => {
              setName(equipment.name);
            });
          }

          return (
            <div key={match.url} className="breadcrumbs__breadcrumb-item">
              <Link to={match.url || ""}>
                {parseInt(breadcrumb.props.children) ? name : breadcrumb}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="breadcrumbs__divider">-</span>
              )}
            </div>
          );
        })}
    </nav>
  );
};

export default withBreadcrumbs()(Breadcrumbs);
