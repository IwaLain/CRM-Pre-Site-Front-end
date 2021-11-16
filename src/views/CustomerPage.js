import logo from "../assets/img/company.png";
import "../scss/components/customer-page.scss";
import CustomerCard from "../components/CustomerCard";
import InformationComponent from "../components/InformationComponent";
import { useContext } from "react";
import { SizeContext } from "../context";

const CustomerPage = () => {
  const factories = [
    { id: "id-1", name: "Title", progress: "5" },
    { id: "id-2", name: "Title", progress: "5" },
    { id: "id-2", name: "Title", progress: "5" },
  ];
  const items = [
    { name: "address" },
    { name: "contact user/success manager" },
    { name: "contact phone" },
  ];
  const { size } = useContext(SizeContext);
  return (
    <>
      <div className="d-flex align-items-center customer-page--header">
        <div className="main-img--container">
          <img
            src={logo}
            alt="company img "
            className="customer-page--img"
          ></img>
        </div>
        <h1 className="page-title">Customer Page Title</h1>
      </div>
      <InformationComponent items={items}></InformationComponent>

      <div className="customer-page--factories">
        {" "}
        <h2 className="page-subtitle">Factories Customer</h2>
        <div
          className={
            size > 440 ? "customer-card_group" : "customer-card_group dense"
          }
        >
          {factories.length > 0 ? (
            factories.map((factory) => (
              <CustomerCard
                key={factory.id}
                title={factory.name}
                id={factory.id}
                progress={factory.progress}
              />
            ))
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
