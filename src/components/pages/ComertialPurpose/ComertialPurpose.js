import React, { useContext, 
      useEffect, 
      useState 
    } from 'react'
import DataTable from 'react-data-table-component';
import { 
        Button, 
        Col, 
        Form, 
        FormGroup, 
        Label, 
        Row 
    } from 'reactstrap';
import logo from "../../../assets/img/waites-block-logo-yellow-background.png";
import './ComertialPurpose.scss'
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf'
import customersApi from '../../../js/api/customer';
import { GlobalContext } from '../../../context';
import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
import { render } from 'react-dom';
import Profile from '../../../js/api/profile';
import { alert } from '../../../js/helpers/alert';

const ComertialPurpouse = () => {
    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const [barcode, setBarcode] = useState('')
    const date = new Date().toLocaleDateString('en-US')
    const { userProfile } = useContext(GlobalContext)

    const getQuote = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000

    const { 
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            quote: 'Q' + getQuote()
        }
    })

    useEffect(() => {
        customersApi.getNetwork(userProfile.id)
        .then(data => {
            console.log(data)
        })
    }, [])

    const summary = (amount) => setTotal(Number(total + amount))

    const updateObjectInArray = (array, index, updateItem) => {
        return array.map((item, i) => {
            if (i !== index) {
                return item
            }
            return {
                ...item,
                ...updateItem
            }
        })
    }

    const jsPdfGenerator = () => {
        let doc = new jsPDF('p', 'pt', 'a4')
        doc.html(document.querySelector("#purpose"), {
            callback: (pdf) => {
                pdf.save("weites.pdf")
            }
        })
    }


    const data = [
        {
            id: 1,
            item: 'Gw2-1011',
            description: '',
            units: 'EA',
            quantity: 4,
            tax: 'Yes',
            amount: 0,
            rate: 0
        },
        {
            id: 2,
            item: 'Gw2-1010',
            description: '',
            units: 'EA',
            quantity: 3,
            tax: 'Yes',
            amount: 0,
            rate: 0
        },
        {
            id: 3,
            item: 'Gw2-1102',
            description: '',
            units: 'EA',
            quantity: 200,
            tax: 'Yes',
            amount: 0,
            rate: 0
        },
        {
            id: 4,
            item: 'Gw2-1606',
            description: '',
            units: 'EA',
            quantity: 5,
            tax: 'Yes',
            amount: 0,
            rate: 0
        },
        {
            id: 5,
            item: 'Gw2-1018',
            description: '',
            units: 'EA',
            quantity: 6,
            tax: 'Yes',
            amount: 0,
            rate: 0
        },
    ]
    const columns = [
        {
            name: 'Item',
            selector: row => row['item'],
        },
        {
            name: 'Description',
            selector: row => row['description'],
            cell: row => <input
                name='description'
                className="ui-kit__input"
                onBlur={(e) => {
                    row['description'] = e.target.value
                    updateObjectInArray(data, row['id'], row['description'])
                }}
                {...register('description')}
            />,
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
            selector: row => row['rate'],
            cell: row => <input
                name='rate'
                className="ui-kit__input"
                onBlur={(e) => {
                    row['rate'] = Number(e.target.value)
                    row['amount'] = row['quantity'] * row['rate']
                    updateObjectInArray(data, row['id'], row['amount'])
                    summary(Number(row['amount']))
                }}
                {...register('rate')}
            />
        },
        {
            name: 'Tax',
            selector: row => row['tax'],
        },
        {
            name: 'Amount',
            selector: row => row['amount'],
            cell: row => row['amount']
        },
    ];

    const onSubmit = (e) => {
        const data = {
            'rate': e.rate,
            'description': e.description,
            'total': total,
        }

        const quote = {
            'quote': e.quote,
        }

        Profile.createBarcode(quote)
        .then(data => {
            setBarcode(process.env.REACT_APP_SERVER_URL + '/' + data.barcode)

            if (data.status) {
                alert('success', data.status)
            } else {
                alert('error', 'Something was wrong')
            }
        })
        
        // jsPdfGenerator()
        console.log(data)
    }

    return (
        <div className="purpose" id="purpose">
            <Row className='purpose__title-print'>
                <Col lg={3} md={5} sm={6} className="purpose__title">
                    <h3>Commertial Purpose</h3>
                    <div>
                        <img src={logo} alt="logo" />
                    </div>
                </Col>
                <Col lg={{offset:1, size:3}} md={5} sm={6} className='purpose__adress'>
                    Waites Sensor Techologies, Inc.<br/>
                    20 W. 11th St. Suite 200<br/> Covington, KY 41011<br/>

                    <div className="mt-3">(800)574-9248 www.waites.net</div>
                </Col>
            </Row>
            <Row>
                <Form id='form' onSubmit={handleSubmit(onSubmit)}>
                    <Row className='purpose__form'>
                        <Col lg={3} md={5}>
                            <FormGroup className='purpose__quote'>
                                <Col>
                                    <h3>
                                        Quote #
                                    </h3>
                                </Col>
                                <input
                                    type='text'
                                    name='quote'
                                    disabled
                                    className="ui-kit__input"
                                    {...register('quote')}
                                />
                            </FormGroup>
                            <FormGroup className='purpose__ship'>
                                <Label md={12}>
                                    Bill to
                                </Label>
                                <textarea
                                    name='bill'
                                    className="ui-kit__textarea"
                                    {...register('bill')}
                                />
                                <Label md={12}>
                                    Ship to
                                </Label>
                                <textarea
                                    name='ship'
                                    className="ui-kit__textarea"
                                    {...register('ship')}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={{offset:1, size:3}} md={5} className="purpose__description">
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
                                <input
                                    type='text'
                                    name='expires'
                                    className="ui-kit__input"
                                    {...register('expires')}
                                />
                            </Row>
                            <Row className='purpose__info'>
                                <Col>
                                    <Label>
                                        Memo
                                    </Label>
                                </Col>
                                <input
                                    type='text'
                                    name='memo'
                                    className="ui-kit__input"
                                    {...register('memo')}
                                />
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
                    <Col 
                        md={2} 
                        className='purpose__total'>
                            Total: {'$' + total}
                    </Col>
                    <FormGroup className='purpose__buttons'>
                        <Col lg={1} md={2}>
                            <Button
                                form='form'
                                onClick={(e) =>{
                                    e.preventDefault()
                                }}>
                                Preview
                            </Button>
                        </Col>
                        <Col lg={1} md={2}>
                            <Button
                                form='form'>
                                Create PDF
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Row>
        </div>
    )
}

export default ComertialPurpouse
