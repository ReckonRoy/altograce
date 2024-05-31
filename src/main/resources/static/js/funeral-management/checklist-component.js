/**
 * @author Le-Roy Jongwe
 * @Date 8 May 2024
 * @description item checklist clients
 */

customElements.define("checklist-component", class extends HTMLElement {

/*---------------------------------------------------------Properties--------------------------------------------------------*/
set fileId(value){
    this.setAttribute('fileId', value); // Update the attribute value
    this.render(); // Render the component whenever the property is set
}

get fileId(){
    return this.getAttribute('fileId');
}

/*---------------------------------------------------------Render--------------------------------------------------------*/
    render(){
        if (!this.shadowRoot) return; // Check if shadowRoot exists
        this.shadowRoot.innerHTML =`<style>
            :host{
                width: 80%;
                background-color: white;
                z-index: 100;
                top: 10;
                height: 85%;
                left: 10;
                right: 10;
                padding: 50px 10px;
                box-sizing: border-box;
                border-radius: 10px;
                overflow-y: auto;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                border: 1px solid gray;
                border-radius: 10px;
            }

            th, td {
                border: 1px solid black;
                padding: 8px;
            }
            /*-----------------------------Modifiable items container style section----------------------------------------*/
            #mod-container{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }

            h2{
                color: gray;
                background-color: #eeeeee;
            }

            #modifiable-h2{
                grid-column: span 2;
                
            }
            
            #mod-section-one{
                display: flex;
                flex-direction: row;
                gap: 8%;
                width: 100%;
            }

            .mso-article{
                flex-shrink: 1;
                flex-basis: 45%;
                border: 1px solid gray;
                border-radius: 5px;
                box-sizing: border-box;
                padding: 5px;
                align-self: start;
            }

            #mod-container input[type="text"],
            input[type="number"]
            {
                padding: 5px 0;
            }

            #cost-perkm-div input[type="text"]{
                border: none;
            }
            #cost-perkm-div{
                border: 1px solid gray;
            }

            /*pref-notes-div*/
            #pref-notes-div{
                display: flex;
                flex-direction: column;
            }
            /*pref notes text area */
            #preference-notes{
                width: 100%;
                height: 200px;
            }
            /*_____________________________________________________________________________________________________________*/

            button{
                margin-top: 10px;
                padding: 10px 0;
                width: 200px;
                box-sizing: border-box;
                font-weight: bold;
                border-radius: 10px;
                border: 1px solid white;
                color: white;
            }

            #addItemBtn {
                background-color: blue;
            }

            #add-invoice-btn{
                background-color: green;
                grid-column: span 2;
                margin: 0 auto;
            }

            button:hover{
                background-color: blue;
                color: white;
                outline: 1px solid orange;
                cursor: pointer;
            }
            </style>
            <div id="overlay"></div>
            
            <table id="checklist">
                <caption id="table-caption"><h2 id="caption-h2"></h2></caption>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <!-- Table rows will be added dynamically using JavaScript -->
                </tbody>
            </table>

            <div id="mod-container">
                <h2 id="modifiable-h2">Modifiable Items</h2>
                <div id="mod-section-one">
                    <!--Section for coffin/casket item-->
                    <div class="mso-article">
                        <div>
                            <label for="casket-field">Casket:</label><br/>
                            <input type="text" id="casket-field"/>
                        </div>
                        <div>
                            <label for="casket-price-field">Price:</label><br/>
                            <input type="text" id="casket-price-field" value="0.00"/>
                        </div>
                    </div>
                    
                    <!--Section for headstone item-->
                    <div class="mso-article">
                        <div>
                            <label for="head-stone-field">Head Stone:</label><br/>
                            <input type="text" id="head-stone-field"/>
                        </div>
                        <div>
                            <label for="head-stone-price-field">Cost:</label><br/>
                            <input type="text" id="head-stone-price-field" value="0.00"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Distance Covered</h2>
                    <p>
                        (Note)For areas outside local area, specify location, distance and cost per km.</p> 
                    </p>
                    <div>
                        <div>
                            <label for="location-field">Location:</label><br/>
                            <input type="text" id="location-field"/>
                        </div>
                        <div>    
                            <label for="distance-field">Distance in km:</label><br/>
                            <input type="text" id="distance-field"/><label>km</label>
                        </div>
                        <div>
                            <label id="cost-perkm-field">Cost Per Km:</label><br/>
                            <div cost-perkm-div><input type="text" id="cost-perkm-field" value="0.00"/><label>/km</label></div>
                        </div>
                    </div>    
                </div>
                <div id="pref-notes-div">
                    <h2>Client's preference Notes</h2>
                    <textarea id="preference-notes"></textarea>
                </div>

                <button id="add-invoice-btn">Submit</button>
            </div>
        `;
    }
/*__________________________________________________________________________________________________________________________*/    

/*-----------------------------------------------------Connected Call Back--------------------------------------------------*/
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        if (!this.rendered) {
            this.render();
            this.rendered = true;

            this.populateTable();
            this.buttonEvents();
        }
    }

    static get observedAttributes() {
        return ['fileId'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
/*____________________________________________________________________________________________________________________________*/

    // Function to populate table with data
    populateTable() {

        const checklistTable = this.shadowRoot.getElementById('checklist');
        

        // fetch data from server data
        fetch(`/client/management/subscription/${this.fileId}`)
        .then((response) => {
            if(!response.ok)
            {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            
            return response.json();
        }).then((data) => {
            const captionHeader = this.shadowRoot.getElementById("caption-h2");
            captionHeader.textContent = `Subscription Plan: ${data.name}`;
            let packageId = parseInt(data.packageId);
            this.getSubscriptionItems(packageId)
        }).catch(error => {
            console.log(error);
        })
    }

    //fetch items for users subsciption plan
    getSubscriptionItems(packageId){
        let packageForm = {packageType: 'standard'};
        fetch(`/package/items/${packageId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(packageForm),
        })
        .then(response => response.json())
        .then(data => {
            const tbody = this.shadowRoot.getElementById('table-body');
            tbody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td contenteditable="true">${item.itemName}</td>
                    <td contenteditable="true">${item.itemQuantity}</td>
                    <td contenteditable="true">${item.price}</td>
                `;
                tbody.appendChild(row);
            });
        }).catch(error => {
            
        });
    }

    //button event handler
    buttonEvents(){
        /*
        // Add item button click event
        const addItemBtn = this.shadowRoot.getElementById('addItemBtn');
        addItemBtn.addEventListener('click', function () {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            `;
            tbody.appendChild(newRow);
        });
        */

        // Submit button click event
        const submitButton = this.shadowRoot.getElementById("add-invoice-btn");
        submitButton.addEventListener('click', () => {
                this.addInvoiceData();
        });
    }

    //add invoice data.
    addInvoiceData(){

        let invoiceForm = {
            casket: this.shadowRoot.getElementById('casket-field').value,
            casketPrice: this.shadowRoot.getElementById('casket-price-field').value,
            headStone: this.shadowRoot.getElementById('head-stone-field').value,
            headStonePrice: this.shadowRoot.getElementById('head-stone-price-field').value,
            location: this.shadowRoot.getElementById('location-field').value,
            distance: this.shadowRoot.getElementById('distance-field').value,
            distanceCost: this.shadowRoot.getElementById('cost-perkm-field').value,
        }        

        console.log(invoiceForm);


        /*fetch(`/funeral/add/funeral-invoice/${this.fileId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        })
       .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        }) 
       .then(data => {
            console.log("invoice has been successfully saved.")
        })
       .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
        */
    }
})