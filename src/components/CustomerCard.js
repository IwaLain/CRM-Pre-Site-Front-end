import { Button, CardBody, Card, Progress, Col } from "reactstrap";
import React from "react";
import "../scss/components/customer-card.scss";
const CustomerCard = (props) => {
  const { title, image, progress } = props;
  return (
    <>
      {" "}
      <Card className="customer-card">
        <div className="row g-0 customer-card--row">
          {" "}
          <Col className="col-4">
            <img
              src={image ? image : "//placehold.it/100"}
              className="img-fluid  customer-card--img "
              alt="..."
            />
          </Col>
          <Col className="col-8">
            <CardBody className="customer--card-body d-flex flex-column">
              <h5 className="">{title}</h5>{" "}
              {progress && (
                <Progress
                  className="customer-card--progress"
                  color="success"
                  value={progress}
                />
              )}{" "}
              <Button className="view-btn btn-sm ">View</Button>
            </CardBody>
          </Col>{" "}
        </div>
      </Card>
    </>
  );
};
export default CustomerCard;
