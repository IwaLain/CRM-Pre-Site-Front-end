import React from 'react';
import './pdf.css'
import logo from '../../../../assets/img/waites-block-logo-yellow-background.png'
import bottom from '../../../../assets/img/barcode.png'

// Create Document Component
const Previews = ({ data, items = '' }) => {
  return (
        <div class="purposePre">
          <div class="purposePre_title">
              <div class="purposePre_logo">
                  <div>
                      <img src={logo} alt="" />
                  </div>
              </div>
              <div class="purposePre_adress">
                  Waites Sensor Techologies, Inc.<br/>
                  20 W. 11th St. Suite 200<br/>
                  Covington, KY 41011<br/>
                  <div class="purposePre_contact">(800)574-9248 <div class="purposePre_contact-braek">www.waites.net</div></div>
              </div>
          </div>
          <div class="purposePre_form">
              <div class="purposePre_shipment">
                  <div class="purposePre_quote">
                      <h2 class="purposePre_quote-title">
                          <b>Quote #</b>
                      </h2>
                      <div class="quote">
                          {data.quote}
                      </div>
                  </div>
                  <div class="purposePre_ship">
                      <div class="purposePre_shipment-title">
                            Bill
                      </div>
                      <div class="purposePre_shipment-desc">
                            {data.bill} 
                      </div>
                      <div class="purposePre_shipment-title">
                          <b>Ship to</b>
                      </div>
                      <div class="purposePre_shipment-desc">
                            {data.ship} 
                      </div>
                  </div>
              </div>
              <div class="purposePre_description">
                  <div class="purposePre_info">
                      <div class="purposePre_info-title">
                          <b>Date</b>
                      </div>
                      <div class="purposePre_info-desc" id="date">
                          ship
                      </div>
                      <div class="purposePre_info-title">
                          <b>Expires</b>
                      </div>
                      <div class="purposePre_info-desc" id="expires">
                            {data.expires}
                      </div>
                      <div class="purposePre_info-title">
                          <b>Memo</b>
                      </div>
                      <div class="purposePre_info-desc" id="memo">
                            {data.memo}
                      </div>
                  </div>
              </div>
          </div>
          <div class="purposePre_table">
              <div class="purposePre_table-title" for="table">
                  Email orders to orders@waites.net
              </div>
              <table class="items" id="table" cellpadding="8">
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
                    {items === object
                        ?
                        items.map(data => (
                            <tr key={data.item}>
                                <td>{data.item}</td>
                                <td>{data.description}</td>
                                <td>{data.units}</td>
                                <td align="center" class="cost">{data.quantity}</td>
                                <td align="center" class="cost">{data.rate}</td>
                                <td align="center" class="cost">{data.amount}</td>
                            </tr>
                        ))
                        : console.log(typeof(items))
                    }
                  </tbody>
              </table>
          </div>
          <div class="total">
              Total: $21321
          </div>
          <div class="purposePre_bottom">
            <div class="purposePre_barcode">
                <img src={bottom} alt="barcode" />
                <div class="barcode">
                    {data.quote}
                </div>
            </div>
            <div class="purposePre_subadress">
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