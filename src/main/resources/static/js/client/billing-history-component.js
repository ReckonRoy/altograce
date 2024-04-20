/**
 * @author Le-Roy Jongwe
 * @Date 22 March 2024
 * @description component for billing clients
 */

customElements.define("payment-history-component", class extends HTMLElement {
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
      <!-- Payment history modal -->
        <div id="payment-history-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Payment History</h2>
                <div class="form-group">
                    <label for="billing-client-id">Client ID:</label>
                    <slot name="clientid" id="billing-client-id"></slot>
                </div>
                <table id="payment-history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Client ID</th>
                            <th>Payment Method</th>
                            <th>Account Number</th>
                        </tr>
                    </thead>
                    <tbody id="payment-history-body">
                        <!-- Payment history data will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>
      `;

        // Function to display the payment history modal
        let displayPaymentHistoryModal = () => {
            
            // Retrieve the value of the slot named "clientid"
            let clientIdSlot = this.shadowRoot.querySelector('slot[name="clientid"]');
            let clientId = clientIdSlot.assignedNodes()[0].textContent.trim(); // Get the text content of the assigned node
            var tableBody = this.shadowRoot.getElementById('payment-history-body');
            tableBody.innerHTML = '';

            fetch(`/client/payment-history/${clientId}`) // Assuming your API endpoint follows this pattern
            .then(response => {
                if(!response.ok){
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(payment => {
                    // Create a new row for each payment
                    let row = tableBody.insertRow();
                    let paymentDateCell = row.insertCell(0);
                    let recordEntryDateCell = row.insertCell(1);
                    let amountPayedCell = row.insertCell(2);
                    let paymentMethodCell = row.insertCell(3);

                    // Populate cells with payment data
                    paymentDateCell.textContent = payment.paymentDate;
                    recordEntryDateCell.textContent = payment.recordEntryDate;
                    amountPayedCell.textContent = payment.amountPayed;
                    paymentMethodCell.textContent = payment.paymentMethod;
                });
            })
            .catch(error => console.error('Error fetching payment history:', error));
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
            const modal = this.shadowRoot.getElementById('payment-history-modal');
            modal.style.display = "none";
        }

/*--------------------------------------------------------------------------------------------------*/
        displayPaymentHistoryModal();
    }
})