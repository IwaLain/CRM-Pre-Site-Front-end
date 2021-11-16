import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import '../scss/components/login-page.scss';
import logo from '../assets/img/company.png'
import { Card,
         Col,
         Container,
         Form,
         FormGroup,
         Row,
         CardImg,
         CardBody } from 'reactstrap'
import { alert } from '../js/methods/alert';
import { ToastContainer } from 'react-toastify';
import { loginAPI } from '../js/api/api';
const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const onSubmit = (e) => {

        let data = {
            'username': e.username,
            'password': e.password
        }
        
        loginAPI(data).then(data => console.log(data))
        alert('success', 'Complete Login')
    };

    return (
        <Container fluid className='login__bg'>
            <Row className="vh-100 justify-content-sm-center align-items-center">
                <Col sm={8} md={6} lg={4}>
                    <Card className='px-3'>
                        <CardBody>
                            <div className='text-center mb-3'>
                                <CardImg
                                    alt="Logo"
                                    src={logo}
                                    className='login__img'
                                />
                            </div>
                            <Form onClick={handleSubmit(onSubmit)}>
                                <Row>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            placeholder='User Name ...'
                                            autoComplete="off" 
                                            name='username'
                                            className={`form-control ${errors.username && "invalid"}`}
                                            {...register("username", {
                                                required: "UserName is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Minimum 3 simvols",
                                                }
                                            })}
                                            onKeyUp={() => {
                                                trigger("username")

                                            }}
                                        />
                                        {errors.username && (
                                            <small className="text-danger">{errors.username.message}</small>
                                        )}
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <input
                                            type="password"
                                            placeholder='Password ...'
                                            name='password'
                                            className={`form-control ${errors.password && "invalid"}`}
                                            {...register("password", {
                                                required: "Password is Required",
                                                minLength: {
                                                    value: 4,
                                                    message: "Minimum 6 simvols",
                                                },
                                                maxLength: {
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
                                </Row>
                                <Row>
                                    <FormGroup className='d-flex justify-content-end'>
                                        <button
                                         className='login__btn'>
                                            Login
                                        </button>
                                    </FormGroup>
                                </Row>
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