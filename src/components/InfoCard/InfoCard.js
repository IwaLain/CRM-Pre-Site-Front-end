import placeholder from "../../assets/img/company.png";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import "../../scss/info-card.scss";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Button from "../UIKit/Button/Button";
import "../../scss/card-sketch.scss";

const InfoCard = ({
  data,
  type,
  toggleModal,
  chooseMode,
  selected,
  changeCustomer,
  setMode,
  currentSubEntityName,
  setCurrentSubEntityName,
  hideRecordView,
}) => {
  const [toggleEntityModal, setToggleEntityModal] = useState(false);
  const [subEntity, setSubEntity] = useState("");
  const [progress, setProgress] = useState(0);
  const { setEditId } = useContext(GlobalContext);
  const [mainImage, setMainImage] = useState();
  const onSetMainImage = (images) => {
    if (images && images.length > 0) {
      let image = images.find((el) => el["main_image"] === "1");
      if (image) {
        setMainImage(image.img);
      }
    }
  };

  useEffect(() => {
    let totalProgress = 0;
    switch (type) {
      case "customers":
        if (data.name) totalProgress += 33.333333;
        if (data.facilities && data.facilities.length > 0)
          totalProgress += 33.333333;
        if (data.equipments && data.equipments.length > 0)
          totalProgress += 33.333333;
        setSubEntity("Facilities");
        onSetMainImage(data["customerImages"]);

        break;
      case "facilities":
        if (data.name) totalProgress += 33.333333;
        if (data.locations && data.locations.length > 0)
          totalProgress += 33.333333;
        if (data.equipments && data.equipments.length > 0)
          totalProgress += 33.333333;
        setSubEntity("Locations");
        onSetMainImage(data["facilityImages"]);

        break;
      case "locations":
        setSubEntity("Equipment");
        onSetMainImage(data["locationImages"]);
        break;
      case "equipment":
        setSubEntity(["Sensors", "Mote"]);
        onSetMainImage(data["equipmentImages"]);
        break;
      default:
        setSubEntity("");
        break;
    }

    setProgress(totalProgress);
  }, [type]);
  useEffect(() => {
    if (
      currentSubEntityName &&
      currentSubEntityName.name &&
      toggleEntityModal
    ) {
      setMode("edit");
      setEditId(data.id);
      toggleModal();
      setToggleEntityModal(!toggleEntityModal);
    }
  }, [toggleEntityModal]);
  return (
    <div className="card-sketch">
      {chooseMode ? (
        <input
          type="checkbox"
          checked={selected}
          onChange={() => changeCustomer(data.id)}
        />
      ) : (
        <Button
          color="default"
          className="card-sketch__edit"
          onClick={() => {
            if (setCurrentSubEntityName) {
              setToggleEntityModal(!toggleEntityModal);
              setCurrentSubEntityName((state) => ({ ...state, name: type }));
            } else {
              setMode("edit");
              setEditId(data.id);
              toggleModal();
            }
          }}
        >
          <i className="far fa-edit"></i>
        </Button>
      )}
      <div className="card-sketch__body">
        <div>
          <img
            src={
              mainImage
                ? process.env.REACT_APP_SERVER_URL + "/" + mainImage
                : placeholder
            }
            alt="card error"
          />
        </div>
        <div className="card-sketch__info">
          <h4 title={data.name} className="card-sketch__name">
            {data.name}
          </h4>
          {type !== "equipment"
            ? subEntity && (
                <div>{`${subEntity}: ${
                  data[subEntity.toLowerCase()].length
                }`}</div>
              )
            : subEntity && (
                <div>{`${subEntity[0]}/${subEntity[1]}: ${
                  data[subEntity[0].toLowerCase()].length +
                  data[subEntity[1].toLowerCase()].length
                }`}</div>
              )}
          <div
            className={
              chooseMode
                ? "card-sketch__btns"
                : "card-sketch__btns card-sketch__btns-one"
            }
          >
            <Link
              to={`/dashboard/${type}/${data.id}`}
              style={hideRecordView ? { visibility: "hidden" } : {}}
            >
              View
            </Link>
            {chooseMode && (
              <Button
                color="default"
                onClick={() => {
                  if (setCurrentSubEntityName) {
                    setToggleEntityModal(!toggleEntityModal);
                    setCurrentSubEntityName({ name: type });
                  } else {
                    setMode("edit");
                    setEditId(data.id);
                    toggleModal();
                  }
                }}
              >
                <span>Edit</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {progress ? <Progress value={progress} /> : null}
    </div>
  );
};

export default InfoCard;
