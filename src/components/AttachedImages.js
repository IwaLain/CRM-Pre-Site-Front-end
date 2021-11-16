import React, { useState } from "react";
import { Button, FormGroup, Col, Label } from "reactstrap";
import "../scss/components/attached-images.scss";

const AttachedImages = ({ images }) => {
  //   const initialImages = [
  //     { id: "1", src: logo },
  //     { id: "2", src: logo },
  //   ];
  const [attachedImages, setAttachedImages] = useState(images);
  const removeImageHandler = (e) => {
    const imgContainer = e.target.parentNode;
    const img = imgContainer.querySelector("img");

    const id = img.id;
    console.log(id);
    setAttachedImages(attachedImages.filter((item) => item.id !== id));
  };

  const addImageHandler = (e) => {
    const newElement = {
      id: `${attachedImages.length + 1}`,
      src: e.target.value,
    };
    e.target.value = "";
    setAttachedImages((attachedImages) => [...attachedImages, newElement]);
  };

  return (
    <>
      <FormGroup row>
        <Label sm={2}>Attached images</Label>
        <Col sm={10}>
          <div className="d-flex flex-wrap">
            {attachedImages &&
              attachedImages.map((img) => (
                <div className="img-container">
                  <img
                    src={img.src}
                    alt="..."
                    className="factory-img"
                    id={img.id}
                  ></img>{" "}
                  <span
                    className="remove-img"
                    onClick={removeImageHandler}
                  ></span>
                </div>
              ))}

            <div className="upload-btn-wrapper factory--upload-btn-wrapper">
              {" "}
              <Button color="secondary" className="factory--upload-btn ">
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
        </Col>
      </FormGroup>
    </>
  );
};
export default AttachedImages;
