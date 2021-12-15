import placeholder from "../../assets/img/company.png";
import { Progress, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import "../../scss/info-card.scss";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Button from "../UIKit/Button/Button";

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
  showView = true,
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
        if (data.name) totalProgress += 33.3;
        if (data.facilities && data.facilities.length > 0)
          totalProgress += 33.3;
        if (data.equipments && data.equipments.length > 0)
          totalProgress += 33.3;
        setSubEntity("Facilities");
        onSetMainImage(data["customerImages"]);

        break;
      case "facilities":
        if (data.name) totalProgress += 33.3;
        if (data.locations && data.locations.length > 0) totalProgress += 33.3;
        if (data.equipments && data.equipments.length > 0)
          totalProgress += 33.3;
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
    <div className="info-card">
      {chooseMode ? (
        <FormGroup check>
          <Input
            type="checkbox"
            checked={selected}
            onChange={() => changeCustomer(data.id)}
          />
        </FormGroup>
      ) : (
        <Button
          color="default"
          className="info-card__edit"
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
      <img
        src={
          mainImage
            ? process.env.REACT_APP_SERVER_URL + "/" + mainImage
            : placeholder
        }
        alt="customer"
      />
      <div className="info-card__body">
        <h4>{data.name}</h4>
        {type !== "equipment"
          ? subEntity && (
              <span>{`${subEntity}: ${
                data[subEntity.toLowerCase()].length
              }`}</span>
            )
          : subEntity && (
              <span>{`${subEntity[0]}/${subEntity[1]}: ${
                data[subEntity[0].toLowerCase()].length +
                data[subEntity[1].toLowerCase()].length
              }`}</span>
            )}
        <Progress
          style={!progress ? { visibility: "hidden" } : {}}
          value={progress}
        />
        <div className="info-card__btns">
          <Link
            to={`/dashboard/${type}/${data.id}`}
            style={!showView ? { visibility: "hidden" } : {}}
          >
            View
          </Link>
          <Button
            color="default"
            style={!chooseMode ? { visibility: "hidden" } : {}}
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
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
