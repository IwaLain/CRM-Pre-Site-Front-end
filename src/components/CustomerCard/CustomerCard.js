import placeholder from "../../assets/img/company.png";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import "./customer-card.scss";

const CustomerCard = ({ customer }) => {
  let progress = 0;
  if (customer.name) progress += 33.3;
  if (customer.facilities && customer.facilities.length > 0) progress += 33.3;
  if (customer.equipments && customer.equipments.length > 0) progress += 33.3;

  return (
    <div className="customer-card">
      <img
        src={
          customer.image
            ? process.env.REACT_APP_SERVER_URL + "/" + customer.image
            : placeholder
        }
        alt="customer"
      />
      <div className="customer-card__body">
        <h4>{customer.name}</h4>
        <Progress
          style={!progress ? { visibility: "hidden" } : {}}
          value={progress}
        />
        <Link to={`/dashboard/customers/${customer.id}`}>View</Link>
      </div>
    </div>
  );
};

export default CustomerCard;
