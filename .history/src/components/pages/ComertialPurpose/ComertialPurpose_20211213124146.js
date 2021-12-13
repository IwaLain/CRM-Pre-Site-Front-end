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
import customersApi from '../../../js/api/customer';
import { GlobalContext } from '../../../context';
import { alert } from '../../../js/helpers/alert';
import { validation } from '../../../js/helpers/validation';
import { getToken } from '../../../js/helpers/helpers';
import { BASE_URL } from '../../../js/api/constants';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Previews from './Preview/Preview';
const ComertialPurpouse = () => {
    const token = getToken()
    const [quote, setQuote] = useState('Q' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000))
    const [currentData, setCurrentData] = useState([])
    const [cols, setCols] = useState([])
    const [preview, setPreview] = useState(false)

    const { selectedCustomer } = useContext(GlobalContext)
    const date = new Date().toLocaleDateString('en-US')
    const history = useHistory()
    const newData = []
    const columns = []

    const handlerAmount = (array, itemName, data) => {
        setCurrentData(array.map(itemData => itemData.item === itemName ? {...itemData, itemName: data} : itemData))
    }

    const pdfPreview = () => setPreview(!preview)

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues: {
            quote: quote
        }
    })

    useEffect(() => {
        if (!selectedCustomer || !(Object.keys(selectedCustomer).length > 0)) history.push("/dashboard/customers")
        else customersApi.getNetwork(selectedCustomer.id)
        .then(data => {
            setCurrentData(data.Network)

            for (const [key, value] of Object.entries(data.Network)) {
                const obj = {}

                obj['item'] = key
                obj['description'] = ''
                obj['units'] = 'EA'
                obj['quantity'] = Number(value)
                obj['rate'] = 0
                obj['amount'] = 0.00
                newData.unshift(obj)
            }

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
                        cell: row =>
                        <input
                            type={key}
                            name={key}
                            className="ui-kit__input"
                            onBlur={(e) => {
                                row[key] = e.target.value
                                handlerAmount(newData, row['item'], row[key])
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
                                row['amount'] = row['quantity'] * row[key]
                                handlerAmount(newData, row['item'], row['amount'])
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

            setCurrentData(newData)
            setCols(columns)
        })
    }, [])

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

        fetch(BASE_URL + `/api/commercial-purpose/create-pdf?access-token=${token}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(data => {
            if (data) {
                alert('success', 'Download is success')
                return data.blob()
            } else {
                alert('success', 'Download is denide')
            }
        })
        .then(blob => {
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.download = 'Comertial_Purpose.pdf'
            document.body.appendChild(a)
            a.click()
            a.remove()
        })
    }

    return (
        <div className="purpose" id="purpose">
            <Row className='purpose__title-print'>
                <Col lg={4} md={5} sm={6} className="purpose__title">
                    <h3>Commertial Purpose</h3>
                    <div>
                        <img src={logo} alt="logo" />
                    </div>
                </Col>
                <Col lg={{offset:1, size:4}} md={5} sm={6} className='purpose__adress'>
                    Waites Sensor Techologies, Inc.<br/>
                    20 W. 11th St. Suite 200<br/>
                    Covington, KY 41011<br/>

                    <div className="mt-3">(800)574-9248 www.waites.net</div>
                </Col>
            </Row>
            <Row>
                <Form id='form' onSubmit={handleSubmit(onSubmit)}>
                    <Row className='purpose__form'>
                        <Col lg={4} md={5} className='purpose__form-quote'>
                            <FormGroup className='purpose__quote'>
                                <Col>
                                    <h3>
                                        Quote #
                                    </h3>
                                </Col>
                                <input
                                    name='quote'
                                    type='text'
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
                                    type='text'
                                    className={`ui-kit__textarea form-control ${errors.bill ? 'is-invalid' : ''}`}
                                    {...register('bill', validation('address'))}
                                    onKeyUp={() => {
                                        trigger('bill')
                                    }}
                                />
                                <Label>
                                    Ship to
                                </Label>
                                <textarea
                                    name='ship'
                                    type='text'
                                    className={`ui-kit__textarea form-control ${errors.ship ? 'is-invalid' : ''}`}
                                    {...register('ship', validation('address'))}
                                    onKeyUp={() => {
                                        trigger('ship')
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={{offset:1, size:4}} md={5} className="purpose__description">
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
                                    name='expires'
                                    type='text'
                                    className={`ui-kit__textarea form-control ${errors.expires ? 'is-invalid' : ''}`}
                                    {...register('expires', validation('text'))}
                                    onKeyUp={() => {
                                        trigger('expires')
                                    }}
                                />
                            </Row>
                            <Row className='purpose__info'>
                                <Col>
                                    <Label>
                                        Memo
                                    </Label>
                                </Col>
                                <input
                                    name='memo'
                                    type='text'
                                    className={`ui-kit__textarea form-control ${errors.memo ? 'is-invalid' : ''}`}
                                    {...register('memo', validation('text'))}
                                    onKeyUp={() => {
                                        trigger('memo')
                                    }}
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
                    <FormGroup className='purpose__buttons'>
                        <Col lg={2} md={2}>
                            <Button
                                form='form'
                                onClick={(e) => {
                                    e.preventDefault()
                                    let pdf = document.querySelector('.purpose__preview')
                                    pdfPreview()
                                    preview
                                    ? pdf.classList.add('visible')
                                    : pdf.classList.remove('visible')
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
                <iframe src={BASE_URL + '/' + 'image/pdf/d3040739cbb290c87cc57521991582b45cf6db2d.pdf?page=hsn#toolbar=0'} />
            </div>
            <Previews/>
            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default ComertialPurpouse
