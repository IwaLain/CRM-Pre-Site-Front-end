import {
  Button,
  List,
  ListInlineItem,
  CardBody,
  CardGroup,
  Card,
  CardImg,
  CardTitle,
  Progress,
} from "reactstrap";
import logo from "../assets/img/company.png";
import "../scss/components/customer-page.scss";
const CustomerPage = () => {
  return (
    <>
      <div className="customer-page--container"></div>
      <div className="d-flex align-items-center customer-page--header">
        <div className="img-container">
          <img src={logo} alt="company img"></img>
        </div>
        <h1 className="page-title">Customer Page Title</h1>
      </div>
      <div className="customer-page--information">
        <h2 className="page-subtitle">Information Customer</h2>

        <List className="information--list" type="inline">
          <ListInlineItem className="information--item">address</ListInlineItem>
          <ListInlineItem className="information--item">
            contact user/success manager
          </ListInlineItem>
          <ListInlineItem className="information--item">
            contact phone
          </ListInlineItem>
        </List>
      </div>
      <div className="customer-page--factories">
        {" "}
        <h2 className="page-subtitle">Factories Customer</h2>
        <CardGroup>
          <Card className="flex-row factory-card">
            <CardImg
              className=" custom"
              alt="Card image cap"
              src={logo}
              width="100%"
              height="auto"
            />
            <CardBody className="card-body--custom">
              <CardTitle>Card title</CardTitle>
              <Progress
                className="progress--custom"
                color="success"
                value={63}
              />
              <Button className="view-btn">Button</Button>
            </CardBody>
          </Card>{" "}
          <Card className="flex-row factory-card">
            <CardImg
              className=" custom"
              alt="Card image cap"
              src={logo}
              width="100%"
              height="auto"
            />
            <CardBody className="card-body--custom">
              <CardTitle>Card title</CardTitle>
              <Progress
                className="progress--custom"
                color="success"
                value={63}
              />
              <Button className="view-btn">Button</Button>
            </CardBody>
          </Card>{" "}
          <Card className="flex-row factory-card">
            <CardImg
              className=" custom"
              alt="Card image cap"
              src={logo}
              width="100%"
              height="auto"
            />
            <CardBody className="card-body--custom">
              <CardTitle>Card title</CardTitle>
              <Progress
                className="progress--custom"
                color="success"
                value={63}
              />
              <Button className="view-btn">Button</Button>
            </CardBody>
          </Card>
        </CardGroup>
      </div>
    </>
  );
};

export default CustomerPage;
