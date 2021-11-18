import React, { useState, useEffect } from "react";
import { Button, Col, Label } from "reactstrap";
import "./attached-images.scss";
import star from "../../assets/img/star.svg";
const AttachedImages = ({ images, title }) => {
  const [attachedImages, setAttachedImages] = useState();
  useEffect(() => {
    setAttachedImages(
      images.map((image) => {
        return { ...image, img: `http://crm.loc/${image.img}` };
      })
    );
  }, [images]);

  const removeImageHandler = (e) => {
    const imgContainer = e.target.parentNode;
    const img = imgContainer.querySelector("img");

    const id = img.id;
    console.log(id);
    setAttachedImages(attachedImages.filter((item) => item.id !== id));
  };

  const addImageHandler = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const newElement = {
      id: `${attachedImages.length + 1}`,
      img: url,
    };
    e.target.value = "";
    setAttachedImages((attachedImages) => [...attachedImages, newElement]);
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
                      src={image.img}
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
