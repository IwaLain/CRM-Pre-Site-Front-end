import React, { useState, useEffect } from "react";
import logo from "../assets/img/company.png";
import "../scss/components/customer-page.scss";

import InformationComponent from "../components/InformationComponent/InformationComponent";

import CustomerCard from "../components/CustomerCard/CustomerCard";

const CustomerPage = () => {
  const [screenSize, SetScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
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
            screenSize > 440
              ? "customer-card_group"
              : "customer-card_group dense"
          }
        >
          {factories.length > 0 ? (
            factories.map((customer) => (
              <CustomerCard
                key={customer.id}
                title={customer.name}
                id={customer.id}
                progress="5"
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
