/**
 * @author Le-Roy Jongwe
 * @Date 22 March 2024
 * @description component for billing clients
 */

customElements.define("funeral-form-component", class extends HTMLElement {
/*------------------------------------------------------------------------------------------------------*/
    // Define the primary client property
    set primaryClient(value) {
        this.setAttribute('primaryClient', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get primaryClient() {
        return this.getAttribute('primaryClient');
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
        this.setAttribute('deceasedName', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get deceasedName() {
        return this.getAttribute('deceasedName');
    }

    // Define the surnname property
    set surname(value) {
        this.setAttribute('surname', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get surname() {
        return this.getAttribute('surname');
    }

    // Define the surnname property
    set idPassport(value) {
        this.setAttribute('idPassport', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get idPassport() {
        return this.getAttribute('idPassport');
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
        </style>
        <div class="container">
                <h2>Generate Invoice</h2>
                <form id="invoice-generation-form">
                    <div class="form-group">
                        <label for="client-name">Client Name:</label>
                        <input type="text" id="client-name" name="clientName" value="${this.primaryClient}" required>
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
                        <label for="total-service-amount">Total Service Amount:</label>
                        <input type="number" id="total-service-amount" name="totalServiceAmount" required>
                    </div>
                    <div class="form-group">
                        <label for="deposit">Deposit:</label>
                        <input type="number" id="deposit" name="deposit" required>
                    </div>
                    <div class="form-group">
                        <label for="balance-due-date">Balance to be Paid in Full Two Days Before Funeral:</label>
                        <input type="date" id="balance-due-date" name="balanceDueDate" required>
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
                <button type="button" onclick="addItem()">Add Item</button>
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
        }
    }

    static get observedAttributes() {
        return ['primaryClient', 'fileId', 'deceasedName', 'surname', 'idPassport'];
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
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data);
        // Send data to backend
        fetch(`/funeral/add/${this.fileId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
            
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
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
        }

        //FetchAPI - post deceased data to back end
        fetch(`/client/add/deceased/${this.fileId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deceased)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        }) 
        .then(data => {
            console.log("deceased has been successfully saved to deceased records.")
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }
});