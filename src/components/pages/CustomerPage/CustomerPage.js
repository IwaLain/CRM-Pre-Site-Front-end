import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import logo from "../../../assets/img/company.png";
import "./customer-page.scss";
import { getCustomerAPI } from "../../../js/api/customer";
import InformationComponent from "../../InformationComponent/InformationComponent";

import CustomerCard from "../../CustomerCard/CustomerCard";

const CustomerPage = () => {
  const [screenSize, SetScreenSize] = useState(window.innerWidth);
  const { id } = useParams();
  const [customer, setCustomer] = useState();

  const handleResize = () => {
    SetScreenSize(window.innerWidth);
  };
  useEffect(() => {
    async function getCustomer() {
      const customerData = await getCustomerAPI(id);
      setCustomer(customerData);
    }
    getCustomer();
    // fetch(`http://crm.loc/api/customer/${id}?access-token=test`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCustomer(data.customer);
    //   })
    //   .then(() => {});

    window.addEventListener("resize", handleResize);
  }, []);

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
          title="Information Customer"
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
          {customer && customer.facilities.length > 0 ? (
            customer.facilities.map((facility) => (
              <CustomerCard
                key={facility.id}
                title={facility.name}
                id={facility.id}
                image={`http://crm.loc/${facility.img}`}
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
