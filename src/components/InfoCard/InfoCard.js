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
}) => {
  const [subEntity, setSubEntity] = useState("");
  const [progress, setProgress] = useState(0);
  const { setEditId } = useContext(GlobalContext);

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
        break;
      case "facilities":
        if (data.name) totalProgress += 33.3;
        if (data.locations && data.locations.length > 0) totalProgress += 33.3;
        if (data.equipments && data.equipments.length > 0)
          totalProgress += 33.3;
        setSubEntity("Locations");
        break;
      case "locations":
        setSubEntity("Equipment");
        break;
      default:
        setSubEntity("");
        break;
    }

    setProgress(totalProgress);
  }, [type]);

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
            setMode("edit");
            setEditId(data.id);
            toggleModal();
          }}
        >
          <i className="far fa-edit"></i>
        </Button>
      )}
      <img
        src={
          data.img
            ? process.env.REACT_APP_SERVER_URL + "/" + data.img
            : placeholder
        }
        alt="customer"
      />
      <div className="info-card__body">
        <h4>{data.name}</h4>
        {subEntity && (
          <span>{`${subEntity}: ${data[subEntity.toLowerCase()].length}`}</span>
        )}
        <Progress
          style={!progress ? { visibility: "hidden" } : {}}
          value={progress}
        />
        <div className="info-card__btns">
          <Link to={`/dashboard/${type}/${data.id}`}>View</Link>
          <Button
            color="default"
            style={!chooseMode ? { visibility: "hidden" } : {}}
            onClick={() => {
              setMode("edit");
              setEditId(data.id);
              toggleModal();
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
