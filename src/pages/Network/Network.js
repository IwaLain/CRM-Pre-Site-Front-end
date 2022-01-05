import { useContext, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../context";
import Button from "../../components/UIKit/Button/Button";
import List from "../../components/List/List";
import "../../scss/network.scss";
import { alert } from "../../js/helpers/alert";
import { reducer } from "../../reducer";

const Network = () => {
  const { selectedCustomer, updateTrigger } = useContext(GlobalContext);
  const [network, setNetwork] = useState([]);

  const initialState = {
    isLoading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading } = state;

  const history = useHistory();

  useEffect(() => {
    if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0)) {
      history.push("/customers");
      alert("error", "You need to select customer first.");
    } else {
      dispatch({ isLoading: true });
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/customer/" +
            selectedCustomer.id +
            "/network?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((network) => {
            setNetwork(Object.entries(network.Network));
            dispatch({ isLoading: false });
          });
      } catch (e) {}
    }
  }, [history, selectedCustomer, updateTrigger]);

  return (
    <div className="network">
      <section className="dashboard-page__section">
        <h3>Network</h3>
        <div className="dashboard-page__block-wrapper">
          <div className="accordion" id="myAccordion">
            <div className="accordion__headers">
              {network &&
                network.map(([key, value], index) => (
                  <h2
                    key={index}
                    className="accordion-header"
                    id={`heading-${index}`}
                  >
                    <div key={index} className="dashboard-page__block">
                      <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                      <span>{value.length}</span>
                      <Button
                        className="dashboard-page__block-view accorion-button collapsed"
                        color="primary"
                        dataBsToggle="collapse"
                        dataBsTarget={`#collapse-${index}`}
                      >
                        View
                      </Button>
                    </div>
                  </h2>
                ))}
            </div>
            <div>
              {network &&
                network.map(([key, value], index) => (
                  <div
                    key={index}
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#myAccordion"
                  >
                    <div className="card-body">
                      <List
                        type={{ entity: key.toLowerCase() }}
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                        hideChangeView
                        hideRecordView
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default Network;
