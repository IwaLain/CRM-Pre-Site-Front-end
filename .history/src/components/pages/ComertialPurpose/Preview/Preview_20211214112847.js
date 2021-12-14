import React from 'react';
import './pdf.css'
import logo from '../../../../assets/img/waites-block-logo-yellow-background.png'
import bottom from '../../../../assets/img/barcode.png'

// Create Document Component
const Previews = ({ data, barcode }) => {
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
                          <input 
                            type="quote"
                            name='quote'
                            {...data('quote')} 
                          />
                      </div>
                  </div>
                  <div class="purposePre_ship">
                      <div class="purposePre_shipment-title">
                            Bill
                      </div>
                      <div class="purposePre_shipment-desc">
                            <input 
                                type="bill"
                                name='bill'
                                {...data('bill')} 
                            />
                      </div>
                      <div class="purposePre_shipment-title">
                          <b>Ship to</b>
                      </div>
                      <div class="purposePre_shipment-desc">
                            <input 
                                type="ship"
                                name='ship'
                                {...data('ship')} 
                            />
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
                            <input 
                                type="expires"
                                name='expires'
                                {...data('expires')} 
                            />
                      </div>
                      <div class="purposePre_info-title">
                          <b>Memo</b>
                      </div>
                      <div class="purposePre_info-desc" id="memo">
                          Expires Expires Expires Expires Expires Expires Expires Expires
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
                      <tr>
                          <td>fasdfdfdf</td>
                          <td>dsafasdfdsa</td>
                          <td>fdsfdsff</td>
                          <td align="center" class="cost">dfasfddsf</td>
                          <td align="center" class="cost">dsfasdfsdf</td>
                          <td align="center" class="cost">sdafdsafsaf</td>
                      </tr>
                      <tr>
                          <td>fasdfdfdf</td>
                          <td>dsafasdfdsa</td>
                          <td>fdsfdsff</td>
                          <td align="center" class="cost">dfasfddsf</td>
                          <td align="center" class="cost">dsfasdfsdf</td>
                          <td align="center" class="cost">sdafdsafsaf</td>
                      </tr>
                      <tr>
                          <td>fasdfdfdf</td>
                          <td>dsafasdfdsa</td>
                          <td>fdsfdsff</td>
                          <td align="center" class="cost">dfasfddsf</td>
                          <td align="center" class="cost">dsfasdfsdf</td>
                          <td align="center" class="cost">sdafdsafsaf</td>
                      </tr>
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
                    Q4353
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