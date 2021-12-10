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
import Profile from '../../../js/api/profile';
import { alert } from '../../../js/helpers/alert';
import Previews from './Preview/Preview';
import { PDFViewer } from '@react-pdf/renderer';
import { validation } from '../../../js/helpers/validation';

const ComertialPurpouse = () => {
    const [currentData, setCurrentData] = useState([])
    const [cols, setCols] = useState([])
    const [amount, setAmount] = useState(0)
    const [total, setTotal] = useState(0)
    const [barcode, setBarcode] = useState('')
    const [quote, setQuote] = useState('Q' + Math.floor(Math.random() * (9999 - 1000 + 1)))
    const date = new Date().toLocaleDateString('en-US')
    const { selectedCustomer } = useContext(GlobalContext)
    const newData = []

    const columns = [
        // {
            // name: 'Description',
            // selector: row => row['Sensors'],
            // cell: row => <input
            //     name='description'
            //     className="ui-kit__input"
            //     onBlur={(e) => {
            //         row['description'] = e.target.value
            //         updateObjectInArray(currentData, row['id'], row['description'])
            //     }}
            // />,
        // },
        // {
        //     name: 'Units',
        //     selector: row => row['Routers'],
        // },
        // {
            // name: 'Rate',
            // selector: row => row['rate'],
            // cell: row => <input
            //     name='rate'
            //     className="ui-kit__input"
            //     onBlur={(e) => {
            //         row['rate'] = Number(e.target.value)
            //         row['amount'] = row['quantity'] * row['rate']
            //         updateObjectInArray(currentData, row['id'], row['amount'])
            //         summary(Number(row['amount']))
            //     }}
            // />
        // },
        // {
        //     name: 'Amount',
        //     selector: row => row['amount'],
        //     cell: row => row['amount']
        // },
    ];

    const updateObjectInArray = (array, index, updateItem) => {
        return array.map((item, i) => {
            if (i !== index) {
                console.log(item)
                return item
            }
            return {
                ...item,
                ...updateItem
            }
        })
    }

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            quote: quote
        }
    })

    const summary = (amount) => setTotal(Number(total + amount))

    useEffect(() => {
        customersApi.getNetwork(selectedCustomer.id)
        .then(data => {
            setCurrentData(data.Network)

            let index = 0;
            for (const [key, value] of Object.entries(data.Network)) {
                const obj = {}

                obj['item'] = key
                obj['description'] = ''
                obj['units'] = 'EA'
                obj['quantity'] = Number(value)
                obj['rate'] = 0
                obj['amount'] = 0
                newData.unshift(obj)
                index++
            }

            setCurrentData(newData)

            Object.keys(newData[0]).forEach(key => {
                if ( key === 'item' || key === 'units' || key === 'quantity' ) {
                    columns.push({
                        name: key,
                        selector: row => row[key]
                    })
                }
                if ( key === 'description') {
                    columns.push({
                        name: key,
                        selector: row => row[key],
                        cell: row => <input
                            name={key}
                            className="ui-kit__input"
                            onBlur={(e) => {
                                row[key] = e.target.value
                                // updateObjectInArray(currentData, row['id'], row[key])
                            }}
                        />,
                    })
                }
                if ( key === 'rate') {
                    columns.push({
                        name: key,
                        selector: row => row[key],
                        cell: row => <input
                            name={key}
                            className="ui-kit__input"
                            onBlur={(e) => {
                                row[key] = Number(e.target.value)
                                row['amount'] = row['quantity'] * row['rate']
                                // updateObjectInArray(currentData, row['id'], row['amount'])
                                summary(Number(row['amount']))
                            }}
                        />
                    })
                }
                if ( key === 'amount') {
                    columns.push({
                        name: key,
                        selector: row => row['amount'],
                        cell: row => row['amount']
                    })
                }
            })

            setCols(columns)
        })
    }, [])

    // const jsPdfGenerator = (path) => {
    //     let doc = new jsPDF('p', 'pt', 'a4')
    //     doc.html(document.querySelector("#purpose"), {
    //         callback: (pdf) => {
    //             pdf.save(process.env.REACT_APP_SERVER_URL + "/" + path)
    //         }
    //     })
    // }

    const onSubmit = (e) => {
        const data = {
            'billTo': e.bill,
            'shipTo': e.ship,
            'expires': e.expires,
            'memo': e.memo,
            'date': date,
            'quote': quote,
            items: currentData
        }

        Profile.createPdf(data)
        .then(data => {
            if (data.status) {
                alert('success', data.status)
                // jsPdfGenerator(data.pdf)
                let a = document.createElement("a")
                let url = `${process.env.REACT_APP_SERVER_URL}/${data.pdf}`
                a.href = url
                a.download = 'ComertialPurpose'
                a.target = "_blank"
                a.click()
                a.remove()
            } else {
                alert('error', 'Something was wrong')
            }
        })

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
                        <Col lg={3} md={5} className='purpose__form-quote'>
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
                                <Label>
                                    Bill to
                                </Label>
                                <textarea
                                    name='bill'
                                    className="ui-kit__textarea"
                                    {...register('bill', validation('address'))}
                                />
                                <Label>
                                    Ship to
                                </Label>
                                <textarea
                                    name='ship'
                                    className="ui-kit__textarea"
                                    {...register('ship', validation('address'))}
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
                                    {...register('expires', validation('text'))}
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
                                    {...register('memo', validation('text'))}
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
                                columns={cols}
                                data={currentData}
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
                                    let pdf = document.querySelector('.purpose__preview')
                                    pdf.classList.add('visible')
                                }}>
                                Preview
                            </Button>
                        </Col>
                        <Col lg={2} md={2}>
                            <Button
                                id='purpose'
                                form='form'>
                                Create PDF
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Row>
            <div className='purpose__preview'>
                <PDFViewer>
                    <Previews/>
                </PDFViewer>
            </div>
        </div>
    )
}

export default ComertialPurpouse
