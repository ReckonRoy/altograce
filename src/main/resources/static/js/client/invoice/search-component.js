/**
 * @Date  June 2024
 * @author Le-Roy S. Jongwe
 * @description This component is used to query invoice data in the database
 */

customElements.define("search-invoice-component", class extends HTMLElement{
    render(){
        //check if shadow root exists
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                #search-div-container{
                    width: 80%;
                    margin: 0 auto;
                }

                #instruction-p
                {
                    font-size: 18px;
                    text-align: center;
                }

                #search-field{
                    width: 80%;
                    padding: 10px 5px;
                    font-size: 18px;
                    margin: 0 auto;
                    border-radius: 5px;
                    box-sizing: border-box;
                }

                #seaarch-button{
                    padding: 10px 0;
                    width: 15%;
                    background-color: rgb(0, 128, 240);
                    border-radius: 5px;
                    color: white;
                    box-sizing: border-box;
                }

                #seaarch-button:hover{
                    cursor: pointer;
                    border: 1px solid white;
                    outline: 1px solid orange;
                }

                #invoice-container{
                    width: 100%;
                    margin: 80px auto;
                    background-color: white;
                    padding: 20px;
                    box-sizing: border-box;
                }

                table {
                    width: 90%;
                    border-collapse: collapse;
                    margin: 20px auto;
                    box-shadow: 0 5px 10px #515151;
                }

                thead{
                    box-shadow: 0 5px 10px #515151;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 1rem 2rem;
                    text-align: left;
                    
                }
                th {
                    background-color: #f2f2f2;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 700;
                }

                tr:nth-child(even){
                    background-color: #f1f5fa;
                }

                .action-parent{
                    position: relative;
                }

                .actions-container{
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 0;
                    border: 1px solid gray;
                    background: white;
                    padding: 10px;
                    gap: 1rem;
                    box-sizing: border-box;
                    border-radius: 5px;
                    width: 100%;
                    z-index: 10;
                }

                .actions-ul{
                    list-style: none;
                    padding: 0;
                }
                
                .actions-ul li{
                    flex: 1;
                }
                
                .actions-ul li > button{
                    width: 100%;
                    padding: 5px; 
                    font-weight: normal;
                    font-size: 12px;
                    box-sizing: border-box;
                }

                .select-action{
                    cursor: pointer;
                    text-align: center;
                    padding: 5px;
                    border: 1px solid gray;
                    border-radius: 5px;
                }

                .select-action:hover{
                    border: 1px solid blue;
                }

                .actions-close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: red;
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                .actions-close:hover,
                .actions-close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }

                button {
                    padding: 10px 20px;
                    margin: 5px; /* Add margin around all sides */
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                button:hover {
                    background-color: #0056b3;
                }
            </style
            <div id="container">
                <!-- Search Bar - The search functionality will return the quried invoice -->
                <div id="search-div-container">
                    <div>
                        <p id="instruction-p">Enter invoice ID in the search box below, and press the search button inorder to return an invoice.</p>
                    </div>
                    <div>
                        <input type="text" id="search-field" placeholder="Search invoice...">
                        <button id="seaarch-button">Search</button>
                    </div>
                </div>

                <!-- Invoice result container -->
                <div id="invoice-container">
                    <table id="invoiceTable">
                        <thead>
                            <tr><th>Invoice Number</th><th>Invoice Date</th><th>Client Name</th><th>Payment Balance</th><th>Invoice Total Amount</th><th>Payment Status</th><th>Action</th></tr>
                        </thead>
                    </table>
                </div>
            </div>
        `
    }

    connectedCallback(){
        if(!this.shadowRoot){
            this.attachShadow({mode: 'open'});
        }
        if(!this.rendered){
            this.render();
            this.rendered = true;

            this.getInvoicesRangeTwoWeeks()
        }
    }

    getInvoicesRangeTwoWeeks()
    {
        let invoiceTable = this.shadowRoot.getElementById("invoiceTable");
        fetch(`/client/invoices`)
        .then((response) => {
            if(!response.ok){
                console.log("No invoices found, You can search for an invoice if its older than 2 weeks.");
            }else{
                return response.json();
            }
        })
        .then((data) => {
            if(data.propertyName == "message"){
                console.log(data.message);
            }else{
                
                data.forEach(invoice => {
                    let row = document.createElement("tr");
                    row.innerHTML = `<td>${invoice.invoiceNumber}</td>
                                    <td>${invoice.invoiceDate}</td>
                                    <td>${invoice.clientName}</td>
                                    <td>${invoice.invoiceBalance}</td>
                                    <td>${invoice.invoiceAmount}</td>
                                    <td>${invoice.invoiceStatus}</td>
                                    <td>
                                        <div class="action-parent">
                                            <div class="select-action">Select an action</div>
                                            <div class="actions-container"> 
                                            <span class="actions-close">&times;</span>
                                                <ul class="actions-ul">
                                                    <li><button class="update-invoice-btn" id="${invoice.id}">Update Invoice</button></li>
                                                    <li><button class="print-invoice-btn" id="${invoice.id}">Print Invoice</button></li>
                                                    <li><button class="email-invoice-btn" id="${invoice.id}">Email Invoice</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>`;
                    invoiceTable.appendChild(row);
                });

                /**
                * Actions container - manage visibility of actions container
                */
                let actionContainer = this.shadowRoot.querySelectorAll(".actions-container");
                let actionDiv = this.shadowRoot.querySelectorAll(".select-action");
                actionDiv.forEach((actionEvent) => {
                    actionEvent.addEventListener("click", (event)=>{
                        if(event.target.nextElementSibling.style.display == ""){
                            event.target.nextElementSibling.style.display = "flex";
                        }else{
                            event.target.nextElementSibling.style.display = "";
                        }
                    });
                })

                let closeActions = this.shadowRoot.querySelectorAll(".actions-close");
                closeActions.forEach((closeButton)=>{
                    closeButton.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                    });
                })

                //handle update invoice button event
                let updateInvoice_btn = this.shadowRoot.querySelectorAll(".update-invoice-btn");
                updateInvoice_btn.forEach((update_btn) => {
                    update_btn.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        alert("update invoice has been clicked")
                        //openModal(update_btn.id);
                    })
                });

                //handle print invoice button event
                let printInvoice_btn = this.shadowRoot.querySelectorAll(".print-invoice-btn");
                printInvoice_btn.forEach((print_btn) => {
                    print_btn.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        alert("print invoice has been clicked")
                        //openModal(update_btn.id);
                    })
                });

                //handle email invoice button event
                let emailInvoice_btn = this.shadowRoot.querySelectorAll(".email-invoice-btn");
                emailInvoice_btn.forEach((email_btn) => {
                    email_btn.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        alert("email invoice has been clicked")
                        //openModal(update_btn.id);
                    })
                });
            }
        })
    }
})
