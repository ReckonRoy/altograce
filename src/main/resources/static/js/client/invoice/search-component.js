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
                    width: 80%;
                    margin: 60px auto;
                }
                table{
                    width: 100%;
                }
                table, th{
                    border: 1px solid gray;
                    border-collapse: collapse;
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
                            <tr><th>Invoice ID</th><th>Invoice Number</th><th>Invoice Date</th><th>Client Name</th><th>Invoice Amount</th><th>Action</th></tr>
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
                    row.innerHTML = `<td>${invoice.id}</td>
                                    <td>${invoice.invoiceNumber}</td>
                                    <td>${invoice.invoiceDate}</td>
                                    <td>${invoice.clientName}</td>
                                    <td>${invoice.invoiceAmount}</td>
                                    <td><button>Print Invoice</button><button>Email Invoice</button></td>`;
                    invoiceTable.appendChild(row);
                });
            }
        })
    }
})
