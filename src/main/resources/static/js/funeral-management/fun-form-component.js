/**
 * @author Le-Roy Jongwe
 * @Date 22 March 2024
 * @description component for billing clients
 */

customElements.define("funeral-form-component", class extends HTMLElement {
/*------------------------------------------------------------------------------------------------------*/
    // Define the primary client property
    set policyHolderName(value) {
        this.setAttribute('policyHolderName', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get policyHolderName() {
        return this.getAttribute('policyHolderName');
    }

    // Define the fileId client property
    set fileId(value) {
        this.setAttribute('fileId', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get fileId() {
        return this.getAttribute('fileId');
    }

    // Define the deceased name property
    set deceasedName(value) {
        this.setAttribute('deceasedFullName', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get deceasedName() {
        return this.getAttribute('deceasedFullName');
    }

    

    // Deceased Id/Passport property
    set idPassport(value) {
        this.setAttribute('idPassport', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get idPassport() {
        return this.getAttribute('idPassport');
    }

    // id
    set deceasedId(value) {
        this.setAttribute('deceasedId', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get deceasedId() {
        return this.getAttribute('deceasedId');
    }

    
/*-------------------------------------------------------------------------------------------------*/    

    render(){
        if (!this.shadowRoot) return; // Check if shadowRoot exists
        this.shadowRoot.innerHTML =`<style>
            .container {
                max-width: 100%;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 5px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h1, h2 {
                font-weight: 700;
                text-transform: uppercase;
                margin-top: 0;
            }

            #invoice-generation-form{
                diplay: flex;
                flex-direction: column;
                justify-content: center;
                margin: 0 auto;
            }

            .form-group {
                display: grid;
                grid-template-columns: 20% 80%;
                margin: 20px auto;
                align-items: center;
            }

            input[type="text"], input[type="number"], input[type="date"], input[type="time"], select {
                width: 80%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 16px;
            }

            button {
                background-color: #333;
                color: #fff;
                padding: 12px 24px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
            }

            button:hover {
                background-color: #555;
            }
            /*close button*/
            #close-btn{
                display: none;
                position: fixed;
                background-color: white;
                color: lightgray;
                font-weight:bold;
                top: 0;
                right: 0;
                z-index: 20;
                border: 1px solid red;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                padding: 0;
                text-align: center;
            }
            
            #close-btn:hover{
                color: red;
            } 
        </style>
        <div class="container">
                <button id="close-btn">X</button>
                <h2>Generate Invoice</h2>
                <form id="invoice-generation-form">
                    <div class="form-group">
                        <label for="client-name">Policy holder's Name:</label>
                        <input type="text" id="client-name" name="clientName" value="${this.policyHolderName}" required>
                    </div>
                    <div class="form-group">
                        <label for="date-of-collection">Date of Collection of Deceased:</label>
                        <input type="date" id="date-of-collection" name="dateOfCollection" required>
                    </div>
                    <div class="form-group">
                        <label for="place-of-death">Place of Death:</label>
                        <input type="text" id="place-of-death" name="placeOfDeath" required>
                    </div>
                    <div class="form-group">
                        <label for="name-of-deceased">Name of Deceased:</label>
                        <input type="text" id="name-of-deceased" name="nameOfDeceased" value="${this.deceasedName}" required>
                    </div>
                    <div class="form-group">
                        <label for="grave-number">BI Number:</label>
                        <input type="text" id="bi-number" name="biNumber" required>
                    </div>

                    <div class="form-group">
                        <label for="identity-number">Identity Number:</label>
                        <input type="text" id="identity-number" name="identityNumber" value="${this.idPassport}" required>
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="text" id="address" name="address" required>
                    </div>
                    <div class="form-group">
                        <label for="informant">Name and Surname of Informant:</label>
                        <input type="text" id="informant" name="informant" value="${this.primaryClient} ${this.surname}"required>
                    </div>
                    <div class="form-group">
                        <label for="tel-number">Telephone Number:</label>
                        <input type="text" id="tel-number" name="telNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="cemetery">Name of Cemetery:</label>
                        <input type="text" id="cemetery" name="cemetery" required>
                    </div>
                    <div class="form-group">
                        <label for="re-open-new-grave">Re-open/New Grave:</label>
                        <select id="re-open-new-grave" name="reOpenNewGrave" required>
                            <option value="Re-open">Re-open</option>
                            <option value="New Grave">New Grave</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="grave-number">Grave Number:</label>
                        <input type="text" id="grave-number" name="graveNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="total-service-amount">Total Service Amount:</label>
                        <input type="number" id="total-service-amount" name="totalServiceAmount" required>
                    </div>
                    <div class="form-group">
                        <label for="deposit">Deposit:</label>
                        <input type="number" id="deposit" name="deposit" required>
                    </div>
                    <div class="form-group">
                        <label for="balance-due">Balance to be Paid in Full Two Days Before Funeral:</label>
                        <input type="text" id="balance-due" name="balanceDue" required>
                    </div>
                    <div class="form-group">
                        <label for="date-of-burial">Date of Burial:</label>
                        <input type="date" id="date-of-burial" name="dateOfBurial" required>
                    </div>
                    <div class="form-group">
                        <label for="time-of-burial">Time of Burial:</label>
                        <input type="time" id="time-of-burial" name="timeOfBurial" required>
                    </div>
                    <div id="items-container">
                        <!-- Item inputs will be added here dynamically -->
                    </div>
                </form>
                <button type="button" id="get-items">View Items</button>
                <button type="button" id="processFormButton">Submit</button>
            </div>
      `;
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        if (!this.rendered) {
            this.render();
            this.rendered = true;

            // Add event listener to the "Generate Invoice" button
            const processFormButton = this.shadowRoot.querySelector('#processFormButton');
            processFormButton.addEventListener('click', () => {
                this.processForm();
            });

            // invoke handle events for all buttons
            this.handleEvents();
        }
    }
 
    static get observedAttributes() {
        return ['fileId', 'policyHolderName', 'deceasedFullName', 'idPassport'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

/*---------------------------------None component default methods------------------------------------*/
    processForm() {
        const form = this.shadowRoot.querySelector('#invoice-generation-form');

        // Perform form validation
        if (!form.checkValidity()) {
            // Display error messages or perform other actions for invalid form
            form.reportValidity();
            return;
        }

        // If form is valid, collect data
        const formData = new FormData(form);
        let form_data = {
            graveNumber: this.shadowRoot.getElementById("grave-number").value,
            biNumber: this.shadowRoot.getElementById("bi-number").value
        };
        formData.forEach((value, key) => {
            form_data[key] = value;
        });
        // create funeral arrangement
        fetch(`/funeral/add/${this.fileId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // add deceased data to deceased records 
            this.addDeceasedRecord(data.nameOfDeceased, data.placeOfDeath, data.identityNumber, data.cemetery, data.dateOfBurial);
            //create invoice
            this.createInvoice(data.identityNumber);
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
/*_________________________________________________________________________________________________________________________________________*/

    
    //event handlers
    handleEvents(){
        const getItems = this.shadowRoot.getElementById("get-items");
        getItems.addEventListener("click", () => {
            this.getItems();
        });

        //close button -> close the modal window
        let closeButton = this.shadowRoot.getElementById("close-btn");
        closeButton.addEventListener("click", () =>{
            let checkListComponent = this.shadowRoot.getElementById("checklist-component");
            checkListComponent.style.display = "none";
            let overlay = this.shadowRoot.getElementById("overlay");
            overlay.style.display = "none";
            closeButton.style.display = "";
        });
    }

    //display checklist component
    getItems(){
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.id = "overlay";
        overlay.style.display = "block";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "10";
        const checkListComponent = document.createElement("checklist-component");
        checkListComponent.id = "checklist-component";
        const checkListContainer = document.createElement("div");
        checkListComponent.style.position = "fixed";
        checkListComponent.style.zIndex = "100";
        checkListComponent.style.top = "10%";
        checkListComponent.setAttribute("fileId", this.fileId);
        this.shadowRoot.appendChild(checkListContainer);

        checkListContainer.appendChild(overlay);
        checkListContainer.appendChild(checkListComponent);
        let closeButton = this.shadowRoot.getElementById("close-btn");
        closeButton.style.display = "block";

    }

    /** 
     * Removes dependency
     * Remove deceased from file, when deaceased record has been saved
     */
    removeDeceasedDependentFromFile()
    {
        //fetchAPI to remove user 
        fetch(`/client/management/dependencies/remove/${this.dependentId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'clientid': this.fileId})
        })
        .then((response)=>{
            if(!response.ok){
                return response.text().then((error) => {
                    throw new Error(error)
                })
            }
            return response.text();
        })
        .then((data)=>{
            console.log(`Funeral Arrangement process completed`);
        })
        .catch(error)
        {
            console.log(error);
        }
    }

    //save deceased record
    addDeceasedRecord(name, pod, id, cemetry, dateOfBurial){
        //get deceased information
        let deceased = {
            fileId: this.fileId,
            deceasedName: name,
            placeOfDeath: pod,
            identityNumber: id,
            cemetery: cemetry,
            dateOfBurial: dateOfBurial,
            graveNumber: this.shadowRoot.getElementById("grave-number").value,
            biNumber: this.shadowRoot.getElementById("bi-number").value
        }

        //FetchAPI - post deceased data to back end
        fetch(`/client/add/deceased/${this.fileId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deceased)
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(error => {
                    throw new Error(error);
                })
            }
            return response.text();
        }) 
        .then(data => {
            this.removeDeceasedDependentFromFile();
        })
        .catch(error => {
            // Handle error
            console.log("Failed to add deceased information" + error);
        });
    }

    //create invoice
    createInvoice(identityNumber)
    {
        alert(identityNumber);
        fetch(`/invoice/add/funeral-invoice/${identityNumber}`)
        .then(response => {
            if(!response.ok){
                return response.text().then(error => {
                    throw new Error(error);
                })
            }

            return response.text()
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert(error);
        })
            
    }
});