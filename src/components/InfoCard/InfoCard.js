import placeholder from "../../assets/img/company.png";
import { Progress, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./info-card.scss";
import { useContext } from "react";
import { GlobalContext } from "../../context";

const InfoCard = ({ data, type, toggleModal }) => {
  const { setEditId } = useContext(GlobalContext);

  let progress = 0;

  switch (type) {
    case "customers":
      if (data.name) progress += 33.3;
      if (data.facilities && data.facilities.length > 0) progress += 33.3;
      if (data.equipments && data.equipments.length > 0) progress += 33.3;
      break;
    case "facilities":
      if (data.name) progress += 33.3;
      if (data.locations && data.locations.length > 0) progress += 33.3;
      if (data.equipments && data.equipments.length > 0) progress += 33.3;
      break;
    default:
      break;
  }

  return (
    <div className="info-card">
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
        <Progress
          style={!progress ? { visibility: "hidden" } : {}}
          value={progress}
        />
        <div className="info-card__btns">
          <Link to={`/dashboard/${type}/${data.id}`}>View</Link>
          <Button
            onClick={() => {
              setEditId(data.id);
              toggleModal();
            }}
          >
            <i className="far fa-edit"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
