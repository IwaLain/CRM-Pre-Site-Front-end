import React, { useContext, useEffect, useState } from 'react'
import DataTable from "react-data-table-component"
import { useHistory } from 'react-router-dom'
import { Col, Label } from "reactstrap"
import { GlobalContext } from '../../../../context'
import customersApi from '../../../../js/api/customer'

const ComertialTable = ({changeCurrentData, dataForm, checkPriceValid}) => {
    const { selectedCustomer } = useContext(GlobalContext)
    const [currentData, setCurrentData] = useState([])
    const [cols, setCols] = useState([])
    const history = useHistory()
    const newData = []
    const columns = []

    const { trigger, errors } = dataForm

    const handlerAmount = (array, itemName, data) => {
        setCurrentData(array.map(itemData => itemData.item === itemName ? {...itemData, itemName: data} : itemData))
    }

    const checkPrice = (e) => {
        if (!e.target.value) {
            let temp = e.target
            temp.classList.add('is-invalid')
        }
        else {
            let temp = e.target
            temp.classList.remove('is-invalid')
        } 
    }

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
                        name: 'price',
                        selector: row => row['rate'],
                        cell: row => <input
                            id={row['item']}
                            type='number'
                            name={row['item']}
                            min="1"
                            className={`ui-kit__input form-control ${(errors.key) ? 'is-invalid' : ''}`}
                            onChange={(e) => {
                                setTimeout(() => {
                                    row[key] = Number(e.target.value)
                                    checkPriceValid(e) 
                                    checkPrice(e)
                                    row['amount'] = row['quantity'] * row[key]
                                    handlerAmount(newData, row['item'], row['amount'])
                                    console.log(row[key])
                                }, 1000);
                            }}
                            onKeyUp={() => {
                                trigger(key)
                            }}
                        />
                    })
                }
                if ( key === 'amount') {
                    columns.push({
                        name: 'cost',
                        selector: row => row['amount'],
                        cell: row => row['amount']
                    })
                }
            })
    
            setCurrentData(newData)
            changeCurrentData(newData)
            setCols(columns)
        })
    }, [])


    return (
        <Col>
            <Label>Email orders to orders@waites.net</Label>
            <DataTable
                dense
                direction="auto"
                columns={cols}
                data={currentData}
            />
        </Col>
    )
}

export default ComertialTable
