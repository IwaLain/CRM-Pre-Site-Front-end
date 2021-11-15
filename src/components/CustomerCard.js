import placeholder from "../assets/img/company.png";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import "../scss/components/customer-card.scss";

const CustomerCard = ({ image, title, progress, id }) => {
  return (
    <div className="customer-card">
      <img src={image ? image : placeholder} alt="customer" />
      <div className="customer-card__body">
        <h4>{title}</h4>
        <Progress
          style={!progress ? { visibility: "hidden" } : {}}
          value={progress}
        />
        <Link to={`/dashboard/customer/${id}`}>View</Link>
      </div>
    </div>
  );
};

export default CustomerCard;
