import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../context";
import "../../../scss/dashboard-page.scss";

const Dashboard = () => {
  const { selectedCustomer } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0))
      history.push("/dashboard/customers");
  }, []);

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
      <section className="dashboard-page__section">
        <h3>Network statistics</h3>
        <div className="dashboard-page__block-wrapper">
          <div className="dashboard-page__block">
            <h5>Gateways</h5>
            <span>{"{staticField}"}</span>
          </div>
          <div className="dashboard-page__block">
            <h5>Repeaters</h5>
            <span>{"{staticField}"}</span>
          </div>
          <div className="dashboard-page__block">
            <h5>Nodes</h5>
            <span>{"{staticField}"}</span>
          </div>
          <div className="dashboard-page__block">
            <h5>Modes</h5>
            <span>{"{staticField}"}</span>
          </div>
          <div className="dashboard-page__block">
            <h5>Sensors</h5>
            <span>{"{staticField}"}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
