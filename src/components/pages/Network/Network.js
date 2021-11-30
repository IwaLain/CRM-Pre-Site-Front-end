import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../context";

const Network = () => {
  const { selectedCustomer } = useContext(GlobalContext);
  const [network, setNetwork] = useState([]);

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
        <div className="dashboard-page__block-wrapper">
          {network &&
            network.map((block, index) => (
              <div key={index} className="dashboard-page__block">
                <h5>{Object.keys(block)[0]}</h5>
                <span>{block[Object.keys(block)[0]]}</span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Network;
