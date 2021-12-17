import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../context";
import "../../../scss/dashboard-page.scss";
import { alert } from "../../../js/helpers/alert";
import DataTable from "react-data-table-component";
import PurposeTable from "../../PurposeTable/PurposeTable";

const Dashboard = () => {
  const { selectedCustomer, customerNetwork } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0)) {
      history.push("/dashboard/customers");
      alert("error", "You need to select customer first.");
    }
  }, [history, selectedCustomer]);

  return (
    <div className="dashboard-page">
      <section className="dashboard-page__section">
        <h3>
          {selectedCustomer &&
            Object.keys(selectedCustomer).length > 0 &&
            selectedCustomer.name + " "}
          statistics
        </h3>
        <div className="dashboard-page__block-wrapper">
          <div className="dashboard-page__block">
            <h5>Facilities</h5>
            <span>
              {selectedCustomer &&
                Object.keys(selectedCustomer).length &&
                selectedCustomer.facilities.length}
            </span>
          </div>
          <div className="dashboard-page__block">
            <h5>Locations</h5>
            <span>
              {selectedCustomer &&
                Object.keys(selectedCustomer).length &&
                selectedCustomer.locations.length}
            </span>
          </div>
          <div className="dashboard-page__block">
            <h5>Equipment</h5>
            <span>
              {selectedCustomer &&
                Object.keys(selectedCustomer).length &&
                selectedCustomer.equipments.length}
            </span>
          </div>
        </div>
      </section>
      <section
        className="dashboard-page__section"
        style={{ marginBottom: "20px" }}
      >
        <h3>Network statistics</h3>
        <div className="dashboard-page__block-wrapper">
          {customerNetwork &&
            Object.keys(customerNetwork).length > 0 &&
            Object.entries(customerNetwork).map(([key, block], index) => (
              <div key={index} className="dashboard-page__block">
                <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                <span>{block}</span>
              </div>
            ))}
        </div>
      </section>
      {/* <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <CardSketch />
        <CardSketch />
        <CardSketch />
        <CardSketch />
        <CardSketch />
        <CardSketch />
        <CardSketch />
        <CardSketch />
      </div> */}
    </div>
  );
};

export default Dashboard;
