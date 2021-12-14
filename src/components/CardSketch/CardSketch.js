import skeletonImg from "../../assets/img/company.png";
import { Progress } from "reactstrap";
import Button from "../UIKit/Button/Button";
import "../../scss/card-sketch.scss";

const CardSketch = () => {
  return (
    <div style={{ padding: ".1px" }}>
      <div className="card-sketch">
        <img src={skeletonImg} />
        <input type="checkbox" />
        <div>Name</div>
        <div>Facilities: 5</div>
        <Progress value="33" />
        <div className="card-sketch__btns">
          <Button color="primary">View</Button>
          <Button color="default">Edit</Button>
        </div>
      </div>
    </div>
  );
};

export default CardSketch;
