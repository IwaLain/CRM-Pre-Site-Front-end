import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';
import logo from "../../../assets/img/waites-block-logo-yellow-background.png";
import Input from '../../UIKit/Input/Input'
import Textarea from '../../UIKit/Textarea/Textarea'
import './ComertialPurpouse.scss'
import { useForm } from 'react-hook-form';

const ComertialPurpouse = () => {
    const [amount, setAmount] = useState()
    const [summary, setSummary] = useState()
    const date = new Date().toLocaleDateString('en-US')

    const {
        register,
        handleSubmit,
    } = useForm()

    const current = (row) => console.log(row)
    const didAmount = (quantity, rate, tax) => {
        let result = 0
        if (tax !== '') result = quantity * rate * tax
        else result = quantity * rate
        return setAmount(result)
    }

    useEffect(() => {
        console.log()
    }, [])

    const data = [
        {
            id: 1,
            item: 'Gw2-1011',
            descripyion: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 4,
            tax: 'Yes',
            amount: '',
            rate: ''
        },
        {
            id: 2,
            item: 'Gw2-1010',
            descripyion: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 3,
            tax: 'Yes',
            amount: '',
            rate: ''
        },
        {
            id: 3,
            item: 'Gw2-1102',
            descripyion: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 200,
            tax: 'Yes',
            amount: '',
            rate: ''
        },
        {
            id: 4,
            item: 'Gw2-1606',
            descripyion: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 5,
            tax: 'Yes',
            amount: '',
            rate: ''
        },
        {
            id: 5,
            item: 'Gw2-1018',
            descripyion: 'Gateway - weatherproof',
            units: 'EA',
            quantity: 6,
            tax: 'Yes',
            amount: '',
            rate: ''
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
            selector: row => row['descripyion'],
            sortable: true,
            grow: 2
        },
        {
            name: 'Units',
            selector: row => row['units'],
        },
        {
            name: 'Quantity',
            selector: row => row['quantity'],
        },
        {
            name: 'Rate',
            cell: row => <Input
                onBlur={(e) => {
                    row['rate'] = Number(e.target.value)
                    current(row)
                }}
            />
        },
        {
            name: 'Tax',
            selector: row => row['tax'],
        },
        {
            name: 'Amount',
            cell: row => row['amount'] = row['quantity'] * row['rate'],
        },
    ];

    const onSubmit = (e) => {
        const data = {
            'bill': e.bill,
            'ship': e.ship,
            'expires': e.expires,
            'memo': e.memo,
        }

        console.log(e)
    }

    return (
        <div className="purpose">
            <Form id='form' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col lg={3} md={4} sm={6} className="purpose__title">
                        <FormGroup>
                            <h3>Commertial Purpose</h3>
                            <div>
                                <img src={logo} alt="logo" />
                            </div>
                        </FormGroup>
                        <Row>
                            <FormGroup className='purpose__quote'>
                                <Col>
                                    <h3>
                                        Quote #
                                    </h3>
                                </Col>
                                <Input
                                    type='text'
                                    name='quote'
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup className='purpose__ship'>
                                <Label md={12}>
                                    Bill to
                                </Label>
                                <Textarea
                                    name='bill'
                                    {...register('bill')}
                                />
                                <Label md={12}>
                                    Ship to
                                </Label>
                                <Textarea
                                    name='ship'
                                    {...register('ship')}
                                />
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col lg={3} md={{offset:1, size:4}} sm={6} className="purpose__description">
                        <Row>
                            <Col className='purpose__adress'>
                                Waites Sensor Techologies, Inc.<br/>
                                20 W. 11th St. Suite 200 Covington, KY 41011<br/>

                                <div className="mt-3">(800)574-9248 www.waites.net</div>
                            </Col>
                        </Row>
                        <Row>
                            <Row className='purpose__info'>
                                <Col>
                                    <Label>
                                        Date
                                    </Label>
                                </Col>
                                {date}
                            </Row>
                            <Row className='purpose__info my-2'>
                                <Col>
                                    <Label>
                                        Expires
                                    </Label>
                                </Col>
                                <Input
                                    type='text'
                                    name='expires'
                                    {...register('expires')}
                                />
                            </Row>
                            <Row className='purpose__info'>
                                <Col>
                                    <Label>
                                        Memo
                                    </Label>
                                </Col>
                                <Input
                                    type='text'
                                    name='memo'
                                    {...register('memo')}
                                />
                            </Row>
                        </Row>
                    </Col>
                </Row>
                <FormGroup className="purpose__table">
                    <Col>
                        <Label>Email orders to orders@waites.net</Label>
                        <DataTable
                            dense
                            direction="auto"
                            columns={columns}
                            data={data}
                        />
                    </Col>
                </FormGroup>
                <FormGroup className='purpose__buttons'>
                    <Col md={1}>
                        <Button
                            form='form'
                            onClick={(e) =>{
                                e.preventDefault()
                            }}>
                            Preview
                        </Button>
                    </Col>
                    <Col md={1}>
                        <Button
                            form='form'>
                            Create PDF
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}

export default ComertialPurpouse
