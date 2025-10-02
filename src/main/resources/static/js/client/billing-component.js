/**
 * @author Le-Roy Jongwe
 * @Date 22 March 2024
 * @description component for billing clients
 */

customElements.define("billing-component", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =`<style>
            button {
                background-color: blue;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin: 0 auto;
                font-weight: bold;
            }

            input[type="text"],
            input[type="date"],
            input[type="number"],
            select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
            }

            button:hover {
                background-color: #5dff00;
                color: black;
            }

            h1, h2 {
                font-weight: 700;
                text-transform: uppercase;
            }
    
            .form-group {
                margin-bottom: 20px;
            }

            /* Modal styles */
            .modal {
                display: block;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.4);
                padding-top: 60px;
            }

            .modal-content {
                background-color: #fefefe;
                margin: 5% auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                border-radius: 5px;
            }

            #billing-form{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
            }

            #amount-div{
                grid-column-start: 1;
                grid-row-start: 2;
            }

            #date-div{
                grid-column-start: 2;
                grid-row-start: 2;
            }

            #pmethod-div{
                grid-column: 1/3;
                background-color: lightgray;
                grid-row-start: 3;
                padding: 20px 0; 
            }

            #submit-billing{
                grid-column: span 2;
            }

            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
      </style>
      <!-- Billing modal -->
      <div id="billing-modal" class="modal">
          <div class="modal-content">
              <span class="close">&times;</span>
              <h2>Billing</h2>
                <div id="billing-form">
                  <div class="form-group">
                      <label for="billing-client-id">Client ID:</label>
                      <slot name="clientid" id="billing-client-id"></slot>
                  </div>
                  <div id="amount-div" class="form-group">
                      <label for="amount-to-pay">Amount to Pay:</label><br/>
                      <input type="number" id="amount-to-pay" name="amount-to-pay" required>
                  </div>
                  <div id="pmethod-div" class="form-group">
                      <label for="payment-method">Payment Method:</label>
                      <select id="payment-method" name="payment-method">
                          <option value="Cash">Cash</option>
                          <option value="EFT">EFT</option>
                          <option value="POS Machine">POS Machine</option>
                      </select>
                  </div>
                  <button type="button" id="submit-billing">Proceed with payment</button>
              </div>
          </div>
      </div>
      `;

      // Function to submit the billing form
      let submitBilling_btn = this.shadowRoot.getElementById("submit-billing");
      submitBilling_btn.addEventListener("click", ()=>{
        submitBilling();
      });

      let submitBilling = () => {
        let billingData = {
            'amountPaid': parseFloat(this.shadowRoot.getElementById('amount-to-pay').value),
            'paymentMethod': this.shadowRoot.getElementById('payment-method').value,
        }

        // Retrieve the value of the slot named "clientid"
        let clientIdSlot = this.shadowRoot.querySelector('slot[name="clientid"]');
        let clientId = clientIdSlot.assignedNodes()[0].textContent.trim(); // Get the text content of the assigned node

        // Make a POST request using Fetch API
        fetch(`/client/billing/${clientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billingData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Handle successful response
            alert(data);
        })
        .catch(error => {
            // Handle error
            alert('Error:', error);
        });
        // Close the billing modal
        closeBillingModal();
    }

    
    const close_btn = this.shadowRoot.querySelectorAll('.close');
    close_btn.forEach(close => {
        close.addEventListener("click", ()=>{
            // Close the billing modal
            closeBillingModal();
        })
    });
    // Function to close the billing modal
    let closeBillingModal = () => {
        const modal = this.shadowRoot.getElementById('billing-modal');
        modal.style.display = "none";
    }

/*--------------------------------------------------------------------------------------------------*/
        
        
    }
})