/**
 * @author Le-Roy Jongwe
 * @Date 22 March 2024
 * @description Web Component for billing clients and showing payment history (Responsive + Row Hover Highlight)
 */
customElements.define("payment-history-component", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
            button {
                background-color: #333;
                color: #fff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.3s ease;
                margin-left: 10px;
            }

            .delete-payment-btn {
                background-color: #fdc7cc;
                color: #d0636a;
            }   

            .delete-payment-btn:hover {
                background-color: #d0636a;
                color: #fdc7cc;
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
                font-size: 14px;
            }
    
            th, td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }

            /* 🔹 Row hover highlight */
            tbody tr:hover {
                background-color: #f1f1f1;
                transition: background 0.2s ease;
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
                z-index: 1000;
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
                max-width: 800px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }

            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }

            .close:hover,
            .close:focus {
                color: black;
                text-decoration: none;
            }


            /* 🔹 Responsive Styles */
            @media screen and (max-width: 885px) {
                .modal-content {
                    width: 95%;
                    padding: 15px;
                }

                table, thead, tbody, th, td, tr {
                    display: block;
                }

                thead {
                    display: none; /* hide header for mobile */
                }

                tbody tr {
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 10px;
                }

                td {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px;
                }

                td::before {
                    content: attr(data-label);
                    font-weight: bold;
                    flex: 1;
                    text-transform: capitalize;
                }
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
                            <th>Payment Date</th>
                            <th>Record Entry Date</th>
                            <th>(R) Amount</th>
                            <th>Payment Method</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="payment-history-body">
                        <!-- Payment history data will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 🔹 Reusable confirm modal -->
        <div id="remove-payment-modal" class="modal">
            <div class="modal-content">
                <h2>Confirm delete payment</h2>
                <p>Do you really want to delete this payment?</p>
                <div>
                    <button id="cancel-delete">Cancel</button>
                    <button id="confirm-delete">Delete</button>
                </div>
            </div>
        </div>
        `;

        this.displayPaymentHistoryModal();

        // Close button handler
        this.shadowRoot.querySelector(".close").addEventListener("click", () => {
            this.closePaymentHistoryModal();
        });

        // Cancel delete
        this.shadowRoot.querySelector("#cancel-delete").addEventListener("click", () => {
            this.shadowRoot.querySelector("#remove-payment-modal").style.display = "none";
        });
    }

    /**
     * Fetch and display payment history
     */
    async displayPaymentHistoryModal() {
        const clientIdSlot = this.shadowRoot.querySelector('slot[name="clientid"]');
        const assignedNodes = clientIdSlot.assignedNodes();
        if (!assignedNodes.length) return;

        const clientId = assignedNodes[0].textContent.trim();
        const tableBody = this.shadowRoot.getElementById("payment-history-body");
        tableBody.innerHTML = "";

        try {
            const response = await fetch(`/client/payment-history/${clientId}`);
            if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
            
            const data = await response.json();

            data.forEach(payment => {
                const row = tableBody.insertRow();

                const paymentDateCell = row.insertCell(0);
                paymentDateCell.textContent = payment.paymentDate;
                paymentDateCell.setAttribute("data-label", "Payment Date");

                const recordDateCell = row.insertCell(1);
                recordDateCell.textContent = payment.recordEntryDate;
                recordDateCell.setAttribute("data-label", "Record Entry Date");

                const amountCell = row.insertCell(2);
                amountCell.textContent = payment.amountPaid;
                amountCell.setAttribute("data-label", "(R) Amount");

                const methodCell = row.insertCell(3);
                methodCell.textContent = payment.paymentMethod;
                methodCell.setAttribute("data-label", "Payment Method");

                const actionCell = row.insertCell(4);
                actionCell.setAttribute("data-label", "Action");
                actionCell.innerHTML = `
                    <button class="view-receipt-btn">View Receipt</button>
                    <button class="delete-payment-btn prop-button" data-action="remove" data-id="${payment.id}" data-clientid="${clientId}">Delete</button>
                `;
            });

            this.attachEventListeners();
        } catch (error) {
            console.error("Error fetching payment history:", error);
        }
    }

    /**
     * Attach action listeners to buttons
     */
    attachEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll(".prop-button");
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const action = btn.dataset.action;
                const id = parseInt(btn.dataset.id);
                const clientId = btn.dataset.clientid;

                if (action === "remove") {
                    this.removePayment(id, clientId);
                } else {
                    console.log(`Action '${action}' triggered for ID ${id}`);
                }
            });
        });
    }

    /**
     * Show reusable confirm modal
     */
    confirmRemovePayment(paymentId, clientId) {
        const modal = this.shadowRoot.querySelector("#remove-payment-modal");
        modal.style.display = "block";

        // remove old listener to avoid stacking
        const confirmBtn = this.shadowRoot.querySelector("#confirm-delete");
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        // attach fresh event
        newConfirmBtn.addEventListener("click", async () => {
            try {
                const res = await fetch(`/client/remove-payment/${clientId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentid: paymentId }),
                });
                if (!res.ok) throw new Error(`Failed to delete payment: ${res.status}`);

                // Refresh payments
                this.displayPaymentHistoryModal();
            } catch (err) {
                alert("Failed to delete payment. Contact webmaster@olivine.co.za if issue persists.");
                console.error(err);
            }
            modal.style.display = "none";
        });
    }

    /**
     * Attach delete listeners
     */
    attachEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll(".prop-button");
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const paymentId = parseInt(btn.dataset.id);
                const clientId = btn.dataset.clientid;
                this.confirmRemovePayment(paymentId, clientId);
            });
        });
    }

    /**
     * Close modal
     */
    closePaymentHistoryModal() {
        this.shadowRoot.getElementById("payment-history-modal").style.display = "none";
    }

    
});
