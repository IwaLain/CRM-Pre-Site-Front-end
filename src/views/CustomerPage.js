import { List, ListInlineItem, Col } from "reactstrap";
import logo from "../assets/img/company.png";
import "../scss/components/customer-page.scss";
import CustomerCard from "../components/CustomerCard/CustomerCard";
const CustomerPage = () => {
  return (
    <>
      <div className="customer-page--container"></div>
      <div className="d-flex align-items-center customer-page--header">
        <div className="img-container">
          <img
            src={logo}
            alt="company img "
            className="customer-page--img"
          ></img>
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
        <div className="row row-cols-1 row-cols-md-auto g-4">
          <Col className="customer-card--col">
            <CustomerCard
              title="Title"
              progress={67}
              image="//placehold.it/100"
            />
          </Col>{" "}
          <Col className="customer-card--col">
            <CustomerCard title="Title" />
          </Col>{" "}
          <Col className="customer-card--col">
            <CustomerCard title="Title" progress={50} />
          </Col>{" "}
          <Col className="customer-card--col">
            <CustomerCard title="Title" />
          </Col>
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
