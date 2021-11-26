import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { Link } from "react-router-dom";
import "../../../scss/breadcrumbs.scss";
import customersApi from "../../../js/api/customer";
import facilitiesApi from "../../../js/api/facilities";
import { location } from "../../../js/api/locations";
import { useState } from "react";
import equipmentApi from "../../../js/api/equipment";

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
            customersApi.getCustomer(breadcrumb.props.children).then((customer) => {
              setName(customer.name);
            });
          } else if (
            breadcrumb.key.includes("/dashboard/facilities/") &&
            parseInt(breadcrumb.props.children)
          ) {
            facilitiesApi.getFacility(breadcrumb.props.children).then((facility) => {
              setName(facility.name);
            });
          } else if (
            breadcrumb.key.includes("/dashboard/locations/") &&
            parseInt(breadcrumb.props.children)
          ) {
            location.getLocation(breadcrumb.props.children).then((location) => {
              setName(location.name);
            });
          } else if (
            breadcrumb.key.includes("/dashboard/equipment/") &&
            parseInt(breadcrumb.props.children)
          ) {
            equipmentApi.getEquipment(breadcrumb.props.children).then((equipment) => {
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
