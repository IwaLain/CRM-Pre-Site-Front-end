import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';
import logo from '../../../assets/img/top-logo-black.svg'
import { Card,
         Col,
         Container,
         Form,
         FormGroup,
         Row,
         CardImg,
         CardBody } from 'reactstrap'
import { alert } from '../../../js/methods/alert';
import { ToastContainer } from 'react-toastify';
import { login } from '../../../js/api/login';
import { useHistory } from 'react-router';
import { inputs } from '../../../js/methods/input';

const LoginPage = () => {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

    const data = {
      register,
      handleSubmit,
      formState: { errors },
      trigger
    }

    const onSubmit = (e) => {
        const data = {
            'username': e.username,
            'password': e.password
        }

        login(data)
        .then(data => {
            if(data.errors) {
                alert('error', data.errors)
            } else {
                localStorage.setItem('token', data.token);
                alert('success', 'Login success');
                history.push('/dashboard');
            }
        })
    };

    return (
        <Container fluid className='login__bg'>
            <Row className="vh-100 justify-content-sm-center align-items-center">
                <Col sm={8} md={6} lg={4}>
                    <Card className='px-3'>
                        <CardBody>
                            <div className='text-center'>
                                <CardImg
                                    alt="Logo"
                                    src={logo}
                                    className='login__img'
                                />
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <FormGroup>
                                        {inputs('username', data, 'Username:', errors.username)}
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        {inputs('password', data, 'Password:', errors.password)}
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup className='d-flex justify-content-end'>
                                        <button className='login__btn'>
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

export default LoginPage;
