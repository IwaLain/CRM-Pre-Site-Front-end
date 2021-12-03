import React from 'react'
import DataTable from 'react-data-table-component';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import logo from "../../../assets/img/waites-block-logo-yellow-background.png";
import Input from '../../UIKit/Input/Input'
import Textarea from '../../UIKit/Textarea/Textarea'
import './ComertialPurpose.scss'
const ComertialPurpouse = () => {
    const date = new Date().toLocaleDateString('en-US')
    const data = [
        {
            item: 'GW2-1010',
            descriptioon: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 5,
            tax: 'yes'
        },
        {
            item: 'GW2-1010',
            descriptioon: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 5,
            tax: 'yes'
        },
        {
            item: 'GW2-1010',
            descriptioon: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 5,
            tax: 'yes'
        },
        {
            item: 'GW2-1010',
            descriptioon: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 5,
            tax: 'yes'
        },
        {
            item: 'GW2-1010',
            descriptioon: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 5,
            tax: 'yes'
        },
    ]
    const columns = [
        {
            name: 'Item',
            selector: row => row['item'],
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row['descriptioon'],
            sortable: true,
            grow: 3
        },
        {
            name: 'Units',
            selector: row => row['units'],
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row['quantity'],
        },
        {
            name: 'Rate',
            cell: row => <Input />,
        },
        {
            name: 'Tax',
            selector: row => row['yes'],
        },
        {
            name: 'Amount',
            right: true,
            grow: 0
        },
    ];

    return (
        <div className='purpose'>
            <Form>
                <Row>
                    <Col md={4} className='purpose__title'>
                        <Row>
                            <h4>Commertial Purpose</h4>
                            <div>
                                <img src={logo} alt='logo' />
                            </div>
                        </Row>
                        <Row>
                            <FormGroup className='purpose__quote'>
                                <Label>
                                    Quote #
                                </Label>
                                <Input />
                            </FormGroup>
                            <FormGroup className='purpose__ship'>
                                <Label md={12}>
                                    Bill to
                                </Label>
                                <Textarea />
                            </FormGroup>
                            <FormGroup className='purpose__ship'>
                                <Label md={12}>
                                    Ship to
                                </Label>
                                <Textarea />
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col md={{offset:1, size:4}} className="purpose__description">
                        <Row>
                            Waites Sensor Techologies, Inc.
                            20 W. 11th St. Suite 200 Covington, KY 41011
                            (800) 574-9248                www.waites.net
                        </Row>
                        <Row>
                            Date {date}
                        </Row>
                        <Row>
                            Expires <Input/>
                        </Row>
                        <Row>
                            Memo <Input/>
                        </Row>
                    </Col>
                </Row>
                <Row className='purpose__table'>
                    <Col>
                        <Label>Email orders to orders@waites.net</Label>
                        <DataTable
                            direction="auto"
                            columns={columns}
                            data={data}
                            dense
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ComertialPurpouse
