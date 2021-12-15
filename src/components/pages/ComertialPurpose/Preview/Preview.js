import React from 'react';
import './Preview.scss'
import logo from '../../../../assets/img/waites-block-logo-yellow-background.png'
import bottom from '../../../../assets/img/barcode.png'

// Create Document Component
const Previews = ({ data, items, date }) => {
    let total = 0

    items.map(data => {
        total += data.amount
    })
    
    return (
        <div className="purposePre">
          <div className="purposePre_title">
              <div className="purposePre_logo">
                  <div>
                      <img src={logo} alt="" />
                  </div>
              </div>
              <div className="purposePre_adress">
                  Waites Sensor Techologies, Inc.<br/>
                  20 W. 11th St. Suite 200<br/>
                  Covington, KY 41011<br/>
                  <div className="purposePre_contact">(800)574-9248 <div className="purposePre_contact-braek">www.waites.net</div></div>
              </div>
          </div>
          <div className="purposePre_form">
              <div className="purposePre_shipment">
                  <div className="purposePre_quote">
                      <h2 className="purposePre_quote-title">
                          <b>Quote #</b>
                      </h2>
                      <div className="quote">
                          {data.quote}
                      </div>
                  </div>
                  <div className="purposePre_ship">
                      <div className="purposePre_shipment-title">
                            Bill
                      </div>
                      <div className="purposePre_shipment-desc">
                            {data.bill} 
                      </div>
                      <div className="purposePre_shipment-title">
                          <b>Ship to</b>
                      </div>
                      <div className="purposePre_shipment-desc">
                            {data.ship} 
                      </div>
                  </div>
              </div>
              <div className="purposePre_description">
                  <div className="purposePre_info">
                      <div className="purposePre_info-title">
                          <b>Date</b>
                      </div>
                      <div className="purposePre_info-desc" id="date">
                          {date}
                      </div>
                      <div className="purposePre_info-title">
                          <b>Expires</b>
                      </div>
                      <div className="purposePre_info-desc" id="expires">
                            {data.expires}
                      </div>
                      <div className="purposePre_info-title">
                          <b>Memo</b>
                      </div>
                      <div className="purposePre_info-desc" id="memo">
                            {data.memo}
                      </div>
                  </div>
              </div>
          </div>
          <div className="purposePre_table">
              <div className="purposePre_table-title" htmlFor="table">
                  Email orders to orders@waites.net
              </div>
              <table className="items" id="table" cellPadding="8">
                  <thead>
                      <tr>
                          <td width="15%">Item</td>
                          <td width="40%">Description</td>
                          <td width="10%">Units</td>
                          <td width="10%">Quantity</td>
                          <td width="10%">Rate</td>
                          <td width="15%">Amount</td>
                      </tr>
                  </thead>
                  <tbody>
                    {
                        items.map(data => (
                            <tr key={data.item}>
                                <td>{data.item}</td>
                                <td>{data.description}</td>
                                <td>{data.units}</td>
                                <td align="center" className="cost">{data.quantity}</td>
                                <td align="center" className="cost">{data.rate}</td>
                                <td align="center" className="cost">{data.amount}</td>
                            </tr>
                        ))
                    }
                  </tbody>
              </table>
          </div>
          <div className="total">
              Total: ${total}
          </div>
          <div className="purposePre_bottom">
            <div className="purposePre_barcode">
                <img src={bottom} alt="barcode" />
                <div className="barcode">
                    {data.quote}
                </div>
            </div>
            <div className="purposePre_subadress">
                20 W. 11th St.<br/>
                Suite 200<br/>
                Covington, KY 41011<br/>
                United States<br/>
            </div>
        </div>
      </div>
  )
}

export default Previews