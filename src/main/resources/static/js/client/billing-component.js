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
                background-color: #333;
                color: #fff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }

            input[type="text"],
            input[type="date"],
            select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
            }

            button:hover {
                background-color: #555;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
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
              <form id="billing-form">
                  <div class="form-group">
                      <label for="billing-client-id">Client ID:</label>
                      <slot name="clientid" id="billing-client-id"></slot>
                  </div>
                  <div class="form-group">
                      <label for="amount-to-pay">Amount to Pay:</label>
                      <input type="number" id="amount-to-pay" name="amount-to-pay" required>
                  </div>
                  <div class="form-group">
                      <label for="payment-date">Payment Date:</label>
                      <input type="date" id="payment-date" name="payment-date" value="" required>
                  </div>
                  <div class="form-group">
                      <label for="payment-method">Payment Method:</label>
                      <select id="payment-method" name="payment-method">
                          <option value="Cash">Cash</option>
                          <option value="EFT">EFT</option>
                          <option value="POS Machine">POS Machine</option>
                      </select>
                  </div>
                  <button type="button" id="submit-billing">Submit</button>
              </form>
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
            'amountPayed': parseFloat(this.shadowRoot.getElementById('amount-to-pay').value),
            'paymentDate': this.shadowRoot.getElementById('payment-date').value,
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