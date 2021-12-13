import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { BASE_URL } from '../../../../js/api/constants';

// Create Document Component
const Previews = () => {
  return (
    <div>
        <div class="purpose">
          <div class="purpose_title">
              <div class="purpose_logo">
                  <div>
                      <img src="../../../assets/img/waites-block-logo-yellow-background.png" alt="">
                  </div>
              </div>
              <div class="purpose_adress">
                  Waites Sensor Techologies, Inc.<br/>
                  20 W. 11th St. Suite 200<br/>
                  Covington, KY 41011<br/>
                  <div class="purpose_contact">(800)574-9248 <div class="purpose_contact-braek"></div> www.waites.net</div>
              </div>
          </div>
          <div class="purpose_form">
              <div class="purpose_shipment">
                  <div class="purpose_quote row">
                      <h2 class="purpose_quote-title">
                          <b>Quote #</b>
                      </h2>
                      <div class="quote">
                          <b>Q4353</b>
                      </div>
                  </div>
                  <div class="purpose_ship">
                      <div class="purpose_shipment-title">
                          <b>Bill to</b>
                      </div>
                      <div class="purpose_shipment-desc">
                          Bill Bill Bill Bill Bill
                      </div>
                      <div class="purpose_shipment-title">
                          <b>Ship to</b>
                      </div>
                      <div class="purpose_shipment-desc">
                          Ship Ship Ship Ship Ship
                      </div>
                  </div>
              </div>
              <div class="purpose_description">
                  <div class="purpose_info">
                      <div class="purpose_info-title">
                          <b>Date</b>
                      </div>
                      <div class="purpose_info-desc" id="date">
                          Expires Expires Expires Expires Expires Expires Expires Expires
                      </div>
                      <div class="purpose_info-title">
                          <b>Expires</b>
                      </div>
                      <div class="purpose_info-desc" id="expires">
                          Expires Expires Expires Expires Expires Expires Expires Expires
                      </div>
                      <div class="purpose_info-title">
                          <b>Memo</b>
                      </div>
                      <div class="purpose_info-desc" id="memo">
                          Expires Expires Expires Expires Expires Expires Expires Expires
                      </div>
                  </div>
              </div>
          </div>
          <div class="purpose_table">
              <div class="purpose_table-title" for="table">
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
      </div>
      <div class="purpose__bottom">
          <div class="purpose_barcode">
              <img src="../../../assets/img/0f2e9792efcf90c199ac516320a35374317c1ce6.png" alt="">
              <div class="barcode">
                  Q4353
              </div>
          </div>
          <div class="purpose_subadress">
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