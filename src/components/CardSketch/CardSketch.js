import skeletonImg from "../../assets/img/company.png";
import { Progress } from "reactstrap";
import Button from "../UIKit/Button/Button";
import "../../scss/card-sketch.scss";

const CardSketch = () => {
  return (
    <div style={{ padding: ".1px" }}>
      <div className="card-sketch">
        <input type="checkbox" />
        <div className="card-sketch__body">
          <div>
            <img src={skeletonImg} />
          </div>
          <div className="card-sketch__info">
            <h4>Name</h4>
            <div>Facilities: 5</div>
            <div className="card-sketch__btns">
              <Button color="primary">View</Button>
              <Button color="default">Edit</Button>
            </div>
          </div>
        </div>
        <Progress value="66" />
      </div>
    </div>
  );
};

export default CardSketch;
