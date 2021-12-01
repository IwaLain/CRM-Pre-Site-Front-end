import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Accordion, AccordionHeader, AccordionItem } from "reactstrap";
import { GlobalContext } from "../../../context";
import Button from "../../UIKit/Button/Button";
import List from "../List/List";

const Network = () => {
  const { selectedCustomer } = useContext(GlobalContext);
  const [network, setNetwork] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(1);

  const history = useHistory();

  const handleSelectedBlock = (e) => {
    console.log(e);
  };

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
          <div class="accordion" id="myAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  type="button"
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  1. What is HTML?
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#myAccordion"
              >
                <div class="card-body">
                  <p>
                    HTML stands for HyperText Markup Language. HTML is the
                    standard markup language for describing the structure of web
                    pages.{" "}
                    <a
                      href="https://www.tutorialrepublic.com/html-tutorial/"
                      target="_blank"
                    >
                      Learn more.
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  type="button"
                  class="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  2. What is Bootstrap?
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse show"
                data-bs-parent="#myAccordion"
              >
                <div class="card-body">
                  <p>
                    Bootstrap is a sleek, intuitive, and powerful front-end
                    framework for faster and easier web development. It is a
                    collection of CSS and HTML conventions.{" "}
                    <a
                      href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/"
                      target="_blank"
                    >
                      Learn more.
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  type="button"
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  3. What is CSS?
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#myAccordion"
              >
                <div class="card-body">
                  <p>
                    CSS stands for Cascading Style Sheet. CSS allows you to
                    specify various style properties for a given HTML element
                    such as colors, backgrounds, fonts etc.{" "}
                    <a
                      href="https://www.tutorialrepublic.com/css-tutorial/"
                      target="_blank"
                    >
                      Learn more.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <List type={{ entity: "gateways" }} />
        </div>
        <div className="dashboard-page__block-wrapper">
          {network &&
            network.map((block, index) => (
              <div key={index} className="dashboard-page__block">
                <h5>{Object.keys(block)[0]}</h5>
                <span>{block[Object.keys(block)[0]]}</span>
                <Button className="dashboard-page__block-view" color="primary">
                  View
                </Button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Network;
