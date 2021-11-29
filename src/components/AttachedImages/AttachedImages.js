import React from "react";
import { Button, Col, Label } from "reactstrap";
import "./attached-images.scss";
import star from "../../assets/img/star.svg";
import uploadImage from "../../js/methods/convertImage";
import Previews from "../Previews/Previews";
const AttachedImages = ({ attachedImages, title, addImage, deleteImage }) => {
  const getImageById = (id) => {
    let image = attachedImages.find((x) => x.id == id);
    return image;
  };
  const removeImageHandler = (e) => {
    const imgContainer = e.target.parentNode;
    const img = imgContainer.querySelector("img");

    const image = getImageById(img.id);

    deleteImage(image);
  };

  const addImageHandler = (e) => {
    const file = e.target.files[0];
    uploadImage(file).then((file) => {
      const data = { img: file };

      addImage(data);
    });

    e.target.value = "";
  };

  return (
    <>
      {title ? (
        <h2 className="page-subtitle attached--page-subtitle">{title}</h2>
      ) : (
        <Label>Attached images</Label>
      )}

      <div className="attached-images--container">
        <div className="d-flex flex-wrap attached--list">
          {attachedImages &&
            attachedImages.map((image) => (
              <div className="attached--item" key={image.id}>
                <img
                  src={process.env.REACT_APP_SERVER_URL + "/" + image.img}
                  alt="..."
                  className="attached-img"
                  id={image.id}
                ></img>
                <span
                  className="attached--remove-img"
                  onClick={removeImageHandler}
                ></span>
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
      </div>
    </>
  );
};
export default AttachedImages;
