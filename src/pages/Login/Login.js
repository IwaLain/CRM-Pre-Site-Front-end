import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";
import logo from "../../assets/img/top-logo-black.svg";
import {
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  CardImg,
  CardBody,
} from "reactstrap";
import { alert } from "../../js/helpers/alert";
import { ToastContainer } from "react-toastify";
import Profile from "../../js/api/profile";
import InputForm from "../../js/helpers/input";
import { GlobalContext } from "../../context";
import { useContext } from "react";
import { getToken } from "../../js/helpers/helpers";

const LoginPage = () => {
  const { setUserProfile, setSelectedCustomer } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const dataInput = {
    register,
    formState: { errors },
    trigger,
  };

  const onSubmit = (e) => {
    const data = {
      username: e.username,
      password: e.password,
    };

    try {
      Profile.loginRequest(data).then((data) => {
        if (data.errors) {
          alert("error", data.errors);
        } else {
          localStorage.setItem("token", data.token);
          alert("success", "Login success");
        }

        const token = getToken();

        if (token) {
          Profile.getProfile().then((data) => {
            if (data) {
              setUserProfile(data.user);
              if (data.user.last_customer) {
                try {
                  fetch(
                    process.env.REACT_APP_SERVER_URL +
                      "/api/customer/" +
                      data.user.last_customer +
                      "?access-token=" +
                      localStorage.getItem("token")
                  )
                    .then((res) => res.json())
                    .then((customer) => {
                      setSelectedCustomer(
                        customer.customer[data.user.last_customer]
                      );
                    });
                } catch (e) {
                  console.log(e);
                }
              }
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container fluid className="login__bg">
      <Row className="vh-100 justify-content-sm-center align-items-center">
        <Col sm={8} md={6} lg={3}>
          <Card className="px-3">
            <CardBody>
              <div className="text-center">
                <CardImg alt="Logo" src={logo} className="login__img" />
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <FormGroup>
                    <InputForm
                      type={"username"}
                      data={dataInput}
                      errors={errors.username}
                      placeholder={"username..."}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <InputForm
                      type={"password"}
                      data={dataInput}
                      errors={errors.password}
                      placeholder={"password..."}
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="d-flex justify-content-end">
                    <button className="login__btn">Login</button>
                  </FormGroup>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer position="bottom-right" />
    </Container>
  );
};

export default LoginPage;
