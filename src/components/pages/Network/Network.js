import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../context";

const Network = () => {
  const { selectedCustomer } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0))
      history.push("/dashboard/customers");
  }, []);

  return (
    <div>
      <section className="dashboard-page__section">
        <h3>Network</h3>
        <div className="dashboard-page__block-wrapper">
          <div 
            className="dashboard-page__block"
            onClick={(e) => {
              
            }}
          >
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
      <section>
        
      </section>
    </div>
  );
};

export default Network;
