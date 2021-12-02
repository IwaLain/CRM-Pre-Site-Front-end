import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../context";
import Button from "../../UIKit/Button/Button";
import List from "../List/List";
import "../../../scss/network.scss";

const Network = () => {
  const { selectedCustomer } = useContext(GlobalContext);
  const [network, setNetwork] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState();

  const history = useHistory();

  useEffect(() => {
    if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0))
      history.push("/dashboard/customers");
    else
      fetch(
        process.env.REACT_APP_SERVER_URL +
          "/api/customer/" +
          selectedCustomer.id +
          "/network?access-token=" +
          localStorage.getItem("token")
      )
        .then((res) => res.json())
        .then((network) => {
          setNetwork(network.Network);
        });
  }, []);

  return (
    <div>
      <section className="dashboard-page__section">
        <h3>Network</h3>
        <div className="dashboard-page__block-wrapper"></div>
        <div className="dashboard-page__block-wrapper">
          <div className="accordion" id="myAccordion">
            <div className="accordion__headers">
              {network &&
                network.map((block, index) => (
                  <h2
                    key={index}
                    className="accordion-header"
                    id={`heading-${index}`}
                  >
                    <div key={index} className="dashboard-page__block">
                      <h5>{Object.keys(block)[0]}</h5>
                      <span>{block[Object.keys(block)[0]]}</span>
                      <Button
                        className="dashboard-page__block-view accorion-button collapsed"
                        color="primary"
                        dataBsToggle="collapse"
                        dataBsTarget={`#collapse-${index}`}
                        onClick={() => setSelectedBlock(index)}
                      >
                        View
                      </Button>
                    </div>
                  </h2>
                ))}
            </div>
            <div>
              {network &&
                network.map((block, index) => (
                  <div
                    key={index}
                    id={`collapse-${index}`}
                    class="accordion-collapse collapse"
                    data-bs-parent="#myAccordion"
                  >
                    <div class="card-body">
                      {selectedBlock === index && (
                        <List
                          type={{ entity: Object.keys(block)[0].toLowerCase() }}
                          title={Object.keys(block)[0]}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Network;
