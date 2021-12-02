import React from 'react'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import logo from "../../../assets/img/waites-block-logo-yellow-background.png";
import Input from '../../UIKit/Input/Input'
const ComertialPurpouse = () => {
    const columns = [
        {
            name: 'Item',
            selector: row => row['first_name'],
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row['last_name'],
            sortable: true,
            grow: 2
        },
        {
            name: 'Units',
            selector: row => row['username'],
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row['username'],
        },
        {
            name: 'Rate',
            cell: <Input/>
        },
        {
            name: 'Tax',
            selector: row => row['username'],
        },
        {
            right: true,
            grow: 0
        },
    ];

    return (
        <div className="purpose">
            <Form>
                <Row>
                    <Col className="purpose__title">
                        <Row>
                            <h3>Commertial Purpose</h3>
                            <div>
                                <img src={logo} alt="logo" />
                            </div>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label>
                                    Quote #
                                </Label>
                                <Input/>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Bill to
                                </Label>
                                <Input/>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Ship to
                                </Label>
                                <Input/>
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col md={4} className="purpose__description">
                        <p>
                            Waites Sensor Techologies, Inc.
                            20 W. 11th St. Suite 200 Covington, KY 41011

                            (800) 574-9248                www.waites.net
                        </p>
                        <p>
                            Date 01/14/2021
                            Expires <Input/>
                            Memo <Input/>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label>Email orders to orders@waites.net</Label>
                        {/* <DataTable
                            direction="auto"
                            columns={columns}
                            data={filteredItems}
                        /> */}
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ComertialPurpouse
