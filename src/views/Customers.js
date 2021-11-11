import '../scss/components/customers.scss'
import { useState } from 'react'
import { Table, Progress, Card, CardGroup, CardImg, CardTitle, CardBody, Button } from 'reactstrap'
import logo from '../assets/img/company.png'

const Customers = () => {
    const [view, setView] = useState(true)

    const toggleView = () => {
        setView(!view)
    }

    return(
        <div className="customers">
            <div className="customers__header">
                <h3>Customers</h3>
                <div className="customers__options">
                    <input className="customers__search" type="text" placeholder="Search..."/>
                    <div className="customers__options_btns">
                        <button className="customers__add-btn">+</button>
                        <button onClick={toggleView} className="customers__toggle-btn">
                        {view ?
                            <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" fill="#DEDEDE"/>
                            <path d="M7 11H25" stroke="white"/>
                            <path d="M7 16L25 16" stroke="white"/>
                            <path d="M7 21L25 21" stroke="white"/>
                            </svg> :
                            <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="44" height="44" fill="#05C12E"/>
                            <path d="M7.5 7.5H14.5V14.5H7.5V7.5Z" stroke="white"/>
                            <rect x="17.5" y="7.5" width="7" height="7" stroke="white"/>
                            <rect x="7.5" y="17.5" width="7" height="7" stroke="white"/>
                            <rect x="17.5" y="17.5" width="7" height="7" stroke="white"/>
                            </svg>
                        }
                        </button>
                    </div>
                </div>
            </div>
            <div className="customers__content">
                {view ?
                    <Table style={{ width: '100%', verticalAlign: 'middle' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '45%' }}>Title</th>
                            <th style={{ width: '45%' }}>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td><Progress value="50"/></td>
                            <td><button className="btn btn-secondary">View</button></td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td><Progress value="50"/></td>
                            <td><button className="btn btn-secondary">View</button></td>
                        </tr>
                    </tbody>
                    </Table> :
                    <CardGroup>
                        <Card className="flex-row factory-card">
                            <CardImg
                            className="customer-page--img"
                            alt="Card image cap"
                            src={logo}
                            width="100%"
                            height="auto"
                            />
                            <CardBody className="card-body--custom">
                            <CardTitle>Card title</CardTitle>
                            <Progress
                                className="progress--custom"
                                color="success"
                                value={63}
                            />
                            <Button className="view-btn">Button</Button>
                            </CardBody>
                        </Card>{" "}
                        <Card className="flex-row factory-card">
                            <CardImg
                            className="customer-page--img"
                            alt="Card image cap"
                            src={logo}
                            width="100%"
                            height="auto"
                            />
                            <CardBody className="card-body--custom">
                            <CardTitle>Card title</CardTitle>
                            <Progress
                                className="progress--custom"
                                color="success"
                                value={63}
                            />
                            <Button className="view-btn">Button</Button>
                            </CardBody>
                        </Card>{" "}
                        <Card className="flex-row factory-card">
                            <CardImg
                            className="customer-page--img"
                            alt="Card image cap"
                            src={logo}
                            width="100%"
                            height="auto"
                            />
                            <CardBody className="card-body--custom">
                            <CardTitle>Card title</CardTitle>
                            <Progress
                                className="progress--custom"
                                color="success"
                                value={63}
                            />
                            <Button className="view-btn">Button</Button>
                            </CardBody>
                        </Card>{" "}
                        <Card className="flex-row factory-card">
                            <CardImg
                            className="customer-page--img"
                            alt="Card image cap"
                            src={logo}
                            width="100%"
                            height="auto"
                            />
                            <CardBody className="card-body--custom">
                            <CardTitle>Card title</CardTitle>
                            <Progress
                                className="progress--custom"
                                color="success"
                                value={63}
                            />
                            <Button className="view-btn">Button</Button>
                            </CardBody>
                        </Card>
                    </CardGroup>
                }
            </div>
        </div>
    )
}

export default Customers