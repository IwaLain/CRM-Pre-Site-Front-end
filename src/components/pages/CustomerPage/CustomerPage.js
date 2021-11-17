import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import logo from "../../../assets/img/company.png";
import "./customer-page.scss";

import InformationComponent from "../../InformationComponent/InformationComponent";

import CustomerCard from "../../CustomerCard/CustomerCard";
import { PageTitleContext } from "../../../context";
const CustomerPage = () => {
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const { pageTitle } = useContext(PageTitleContext);
  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  useEffect(() => {
    fetch(`http://crm.loc/api/customer/${id}?access-token=test`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data.customer);
      });
    console.log(customer);
    window.addEventListener("resize", handleResize);
  }, []);
  const factories = [
    { id: "id-1", name: "Title", progress: "5" },
    { id: "id-2", name: "Title", progress: "5" },
    { id: "id-3", name: "Title", progress: "5" },
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
          {
            <img
              src={
                customer && customer.img
                  ? `http://crm.loc/${customer.img}`
                  : logo
              }
              alt="company img "
              className="customer-page--img"
            ></img>
          }
        </div>
        <h1 className="page-title">{customer && customer.name}</h1>
      </div>
      {customer && (
        <InformationComponent
          items={[
            { fieldTitle: "address", value: customer.address },
            { fieldTitle: "email", value: customer.email },
            { fieldTitle: "phone", value: customer.phone },
          ]}
        ></InformationComponent>
      )}

      <div className="customer-page--factories">
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
