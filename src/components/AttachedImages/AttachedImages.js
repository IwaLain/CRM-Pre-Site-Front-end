import React, { useState, useEffect } from "react";
import { Button, Col, Label } from "reactstrap";
import "./attached-images.scss";
import star from "../../assets/img/star.svg";
import { uploadImage } from "../../js/methods/convertImage";

const AttachedImages = ({ attachedImages, title, addImage, deleteImage }) => {
  // const [attachedImages, setAttachedImages] = useState();
  // useEffect(() => {
  //   setAttachedImages(
  //     attachedImages.map((image) => {
  //       return { ...image, img: `http://crm.loc/${image.img}` };
  //     })
  //   );
  // }, []);
  const getImageById = (id) => {
    let image = attachedImages.find((x) => x.id == id);
    return image;
  };
  const removeImageHandler = (e) => {
    const imgContainer = e.target.parentNode;
    const img = imgContainer.querySelector("img");

    const image = getImageById(img.id);

    deleteImage(image);
    // deleteFacilityImageAPI(id);

    // setAttachedImages(attachedImages.filter((item) => item.id !== img.id));
  };

  const addImageHandler = (e) => {
    const file = e.target.files[0];
    // const url = URL.createObjectURL(file);
    uploadImage(file).then((file) => {
      const data = { img: file };

      addImage(data);
      // addFacilityImageApi(12, data);
    });

    // console.log(base64);
    // const newElement = {
    //   id: `${attachedImages.length + 1}`,
    //   img: url,
    // };
    e.target.value = "";
    // setAttachedImages((attachedImages) => [...attachedImages, newElement]);
  };

  return (
    <>
      <div className="row">
        {title ? (
          <h2 className="page-subtitle attached--page-subtitle">{title}</h2>
        ) : (
          <Label sm={2}>Attached images</Label>
        )}

        <Col sm={10} className="attached-images--container">
          <div className="d-flex flex-wrap attached--list">
            {attachedImages &&
              attachedImages.map((image) => (
                <div className="attached--item" key={image.id}>
                  <div className="attached--img-container">
                    <img
                      src={`http://crm.loc/${image.img}`}
                      alt="..."
                      className="attached-img"
                      id={image.id}
                    ></img>
                    <span
                      className="attached--remove-img"
                      onClick={removeImageHandler}
                    ></span>
                  </div>
                </div>
              ))}

            <div className="attached--item">
              <div className="upload-btn-wrapper attached--upload-btn-wrapper">
                <Button color="secondary" className="attached--upload-btn">
                  <img src={star} alt="star" />
                  Add image
                </Button>
                <input
                  id="customerImg"
                  type="file"
                  name="myfile"
                  accept="image/*"
                  onChange={addImageHandler}
                />
              </div>
            </div>
          </div>
        </Col>
      </div>
    </>
  );
};
export default AttachedImages;
