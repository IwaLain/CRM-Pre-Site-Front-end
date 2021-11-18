import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import star from "../../../assets/img/star.svg";

import "react-toastify/dist/ReactToastify.css";
import "./factory-page.scss";
import InformationComponent from "../../InformationComponent/InformationComponent";
import FormComponent from "../../FormComponent/FormComponent";
import AttachedImages from "../../AttachedImages/AttachedImages";
import { getFacilityApi } from "../../../js/api/facilities";

const CustomerFactoryPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState();
  useEffect(() => {
    async function getFacility() {
      const facilityData = await getFacilityApi(id);
      await setFacility(facilityData);
      setFactoryImage(`http://crm.loc/${facilityData.img}`);
    }

    getFacility();

    // fetch(`http://crm.loc/api/facilities/${id}?access-token=test`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setFacility(data.facility);
    //     return data.facility;
    //   })
    //   .then((facility) => {
    //     setFactoryImage(`http://crm.loc/${facility.img}`);
    //   });
  }, []);
  const formFields = [
    { name: "title", type: "text", defaultValue: "default", id: "id-1" },
    { name: "title", type: "text", defaultValue: "default", id: "id-2" },
    { name: "title", type: "text", defaultValue: "default", id: "id-3" },
    { name: "title", type: "text", defaultValue: "default", id: "id-4" },
  ];

  const [factoryImage, setFactoryImage] = useState();

  const editImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setFactoryImage(url);
  };

  return (
    <>
      <div className="d-flex align-items-center factory-page--header">
        <div className="img-container">
          <img
            src={factoryImage}
            alt="company img "
            className="factory-img"
          ></img>
          <div className="image-upload">
            <label htmlFor="factoryImg">
              <span className="edit-img">
                <img src={star} alt="star" />
              </span>
            </label>
            <input
              id="factoryImg"
              type="file"
              name="myfile"
              accept="image/*"
              onInput={editImage}
            />
          </div>
        </div>
        <h1 className="page-title">{facility && facility.name}</h1>
      </div>
      {facility && (
        <InformationComponent
          items={[
            { fieldTitle: "address", value: facility.address },
            // { fieldTitle: "email", value: facility.email },
            // { fieldTitle: "phone", value: facility.phone },
          ]}
          title="Information Factory"
        ></InformationComponent>
      )}

      <FormComponent
        formFields={formFields}
        formName="Factories Customer Locations Form"
        addFieldBtn={true}
        attachedImages={false}
      ></FormComponent>
      <AttachedImages
        images={
          facility && facility.facilityImages.length > 0
            ? facility.facilityImages
            : []
        }
        title="Attached images"
      ></AttachedImages>
    </>
  );
};

export default CustomerFactoryPage;
