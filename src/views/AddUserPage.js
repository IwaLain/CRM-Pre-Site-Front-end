import React from 'react'
import { Button, Col, Container, Form, FormText, Input, Label, Row } from "reactstrap"
import '../scss/components/add-user-page.scss'

const AddUserPage = () => {
    return (
        <div>
            <Container>
                <h3>Add User</h3>
                <Row>
                    <Col lg={12} className='p-5 pt-4'>
                        <Form>
                            <Row className='addUser__item mt-3'>
                                <Col lg={2}>
                                    <Label className='addUser__label'>Username</Label>
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        type='text'
                                        placeholder='...'
                                    />
                                    <FormText className='addUser__desc'>Short description</FormText>
                                </Col>
                            </Row>
                            <Row className='addUser__item'>
                                <Col lg={2}>
                                    <Label className='addUser__label'>Email</Label>
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        type="email"
                                        placeholder='...'
                                    />
                                    <FormText className='addUser__desc'>Short description</FormText>
                                </Col>
                            </Row>
                            <Row className='addUser__item'>
                                <Col lg={2}>
                                    <Label className='addUser__label'>Phone</Label>
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        type="text"
                                        placeholder='...'
                                    />
                                    <FormText className='addUser__desc'>Short description</FormText>
                                </Col>
                            </Row>
                            <Row className='addUser__item'>
                                <Col lg={2}>
                                    <Label className='addUser__label'>Role</Label>
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        type="select"
                                    >
                                        <option value='User'>
                                            User
                                        </option>
                                        <option value='Admin'>
                                            Admin
                                        </option>
                                    </Input>
                                    <FormText className='addUser__desc'>Short description</FormText>
                                </Col>
                            </Row>
                            <Row className='addUser__item mt-5'>
                                <Col lg={{offset: 2, size: 2}}>
                                    <Button className='addUser__submit'>Submit</Button>
                                </Col>
                                <Col>
                                    <Button className='addUser__cancel'>Cancel</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddUserPage
