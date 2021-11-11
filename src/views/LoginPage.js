import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/components/login-page.scss';
import logo from '../assets/img/company.png'
import { Button,
         Card,
         Col,
         Container,
         Form,
         FormGroup,
         Row,
         CardImg,
         CardBody } from 'reactstrap'
import { alert } from '../js/methods/alert';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        alert('success', 'Complete Login')
        reset();
    };

    return (
        <Container fluid className='bg_login'>
            <Row className="vh-100 justify-content-sm-center align-items-center">
                <Col className="col-sm-8 col-md-6 col-lg-4">
                    <Card>
                        <CardBody>
                            <div className='text-center mb-3'>
                                <CardImg
                                    alt="Logo"
                                    src={logo}
                                    className='login_img'
                                />
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                <input
                                    type="text"
                                    placeholder='User Name ...'
                                    className={`form-control ${errors.username && "invalid"}`}
                                    {...register("username", {
                                        required: "UserName is Required",
                                        min: {
                                            value: 3,
                                            message: "Minimum 3 simvols",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("username");
                                    }}
                                />
                                {errors.username && (
                                    <small className="text-danger">{errors.username.message}</small>
                                )}
                                </FormGroup>
                                <FormGroup>
                                <input
                                    type="password"
                                    placeholder='Password ...'
                                    className={`form-control ${errors.password && "invalid"}`}
                                    {...register("password", {
                                        required: "Password is Required",
                                        min: {
                                            value: 4,
                                            message: "Minimum 6 simvols",
                                        },
                                        max: {
                                            value: 16,
                                            message: "Maximum 16 simvols",
                                        },
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                            message: "Password should contain atleast one number and one special character",
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger("password");
                                    }}
                                />
                                {errors.password && (
                                    <small className="text-danger">{errors.password.message}</small>
                                )}
                                </FormGroup>
                                <FormGroup className='d-flex justify-content-sm-end pt-1'>
                                    <Button
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ToastContainer position='bottom-right'/>
        </Container>
    );
}

export default LoginPage