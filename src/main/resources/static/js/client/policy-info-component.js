/**
 * @Author Le-Roy S. Jongwe
 * @description This component is responsible for managing client dependencies such as:
 * creating dependency
 * updating dependency
 * deleting dependency
 */

customElements.define('policy-info-component', class extends HTMLElement{
    /*-----------------------------------Setters and Getters-------------------------------------------*/ 
    dependentData;
    __productName;
    __productCost = 0.00;
    __productDescription;
    __createdAt;
    __waitPeriod;

    /*------------------------------------------------------ */
    get productName(){
        return this.__productName;
    }

    /**
     * @param {string} productName
     */
    set productName(productName){
        this.__productName = productName;
    }
    /**------------------------------------------------------ */

    /**------------------------------------------------------ */
    get productCost(){
        return this.__productCost;
    }

    /**
     * @param {number} productCost
     */
    set productCost(productCost){
        this.__productCost = productCost;
    }
    /**------------------------------------------------------ */

    /**------------------------------------------------------ */
    get productDescription()
    {
        return this.__productDescription;
    }

    /**
     * @param {string} productDescription
     */
    set productDescription(productDescription){
        this.__productDescription = productDescription;
    }
    /**------------------------------------------------------ */

    /**------------------------------------------------------ */
    get createdAt(){
        return this.__createdAt;
    }

    set createdAt(createdAt){
        this.__createdAt = createdAt;
    }
    /**------------------------------------------------------ */

    /**------------------------------------------------------ */
    get waitPeriod(){
        return this.__waitPeriod;
    }

    /**
     * @param {number} waitPeriod
    */
    set waitPeriod( waitPeriod ){
        this.__waitPeriod = waitPeriod;
    }
    /**------------------------------------------------------ */


    getDependentData()
    {
        return this.dependentData;
    }

    set fileId(value)
    {
        //update the attribute value
        this.setAttribute('fileId', value);
        //render the component when ever the property is set        
        this.render();
    }

    //get fileId
    get fileId()
    {
        return this.getAttribute('fileId');
    }
    /*___________________________________________________________________________________________________*/

    /*--------------------------------------render html content--------------------------------------*/ 
    render()
    {
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host{
                    width: 100%;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }

                thead{
                    box-shadow: 0 5px 5px #515151;
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
                    font-weight: 900;
                }

                tr:nth-child(even){
                    background-color: #f1f5fa;
                }
                .client-info-card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                .client-info-card h3 {
                    margin-top: 0;
                    font-size: 24px;
                }
                .client-info-card p {
                    margin: 10px 0;
                    font-size: 16px;
                }

                select {
                    width: calc(100% - 24px);
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
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

                .delete-btn{
                    background-color: #fdc7cc;
                    color: #d0636a;
                }

                .delete-btn:hover{
                    background-color: #d0636a;
                    color: #fdc7cc;
                }

                /*Policy Holder's Info Style*/
                #policy-info-div{
                    margin-bottom: 50px;
                }
                /*______________________________________*/

                /*Policy Info Style*/
                #policies-div
                {
                    marging-top: 50px;
                }

                #policies-div h2{
                    text-align:left:
                    font-size: 30px;
                }
                /*______________________________________*/   

                /*buttons within the cards*/
                .prop-button{
                    border: none;
                    text-decoration: underline;
                    background-color: white;
                    color: black;
                    font-weight: bold;
                }

                .prop-button:hover {
                    background-color: #007bff;
                    color: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                    text-decoration: none;
                }

                //change policy section
                .change-policy-wrapper {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
                    margin-top: 20px;
                }

                .change-policy-wrapper h2 {
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    color: #333;
                }

                .modern-form {
                    display: grid;
                    gap: 15px;
                }

                .modern-form label {
                    font-weight: 500;
                    color: #444;
                    margin-bottom: 5px;
                }

                .dropdown-box {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 12px;
                    background: #f9f9f9;
                    cursor: pointer;
                }

                .modern-form textarea {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 12px;
                    font-size: 14px;
                    resize: vertical;
                    width: 100%;
                    box-sizing: border-box;
                }

                .submit-btn {
                    background: linear-gradient(135deg, #007bff, #0056b3);
                    border: none;
                    color: white;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .submit-btn:hover {
                    background: linear-gradient(135deg, #0056b3, #003f8a);
                    transform: translateY(-2px);
                }

                .info-message {
                    background: #f0f8ff;
                    border-left: 4px solid #007bff;
                    padding: 12px;
                    margin-top: 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #333;
                    font-style: italic;
                }


                #dependent-select{
                    width = "100%";
                    padding = "10px";
                    borderRadius = "8px";
                    border = "1px solid #ccc";
                }
                /*______________________________________*/

                /*styles for createAddon go here*/
                /* Addon wrapper */
                .addon-wrapper {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 30px;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
                    margin-top: 20px;
                    max-width: 600px;
                }

                /* Heading */
                .addon-wrapper h2 {
                    font-size: 22px;
                    font-weight: 600;
                    margin-bottom: 20px;
                    color: #333;
                    text-transform: capitalize;
                }

                /* Modern form grid */
                .addon-wrapper .modern-form {
                    display: grid;
                    gap: 18px;
                }

                /* Labels */
                .addon-wrapper .modern-form label {
                    font-weight: 500;
                    color: #444;
                    margin-bottom: 5px;
                    font-size: 14px;
                }

                /* Inputs & Textarea */
                .addon-wrapper .modern-form input,
                .addon-wrapper .modern-form textarea {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 12px 14px;
                    font-size: 14px;
                    width: 100%;
                    box-sizing: border-box;
                    transition: border 0.3s ease, box-shadow 0.3s ease;
                }

                /* Focus effects */
                .addon-wrapper .modern-form input:focus,
                .addon-wrapper .modern-form textarea:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
                }

                /* Textarea resize limit */
                .addon-wrapper .modern-form textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                /* Submit button */
                .addon-wrapper .submit-btn {
                    background: linear-gradient(135deg, #007bff, #0056b3);
                    border: none;
                    color: white;
                    padding: 14px;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                    margin-top: 10px;
                }

                /* Hover effect */
                .addon-wrapper .submit-btn:hover {
                    background: linear-gradient(135deg, #0056b3, #003f8a);
                    transform: translateY(-2px);
                }

                /*Validation*/
                /* Validation styles */
                .required {
                    color: red;
                    font-weight: bold;
                }

                input.invalid, textarea.invalid {
                    border: 1px solid red;
                    background: #fff5f5;
                }

                input:focus.invalid, textarea:focus.invalid {
                    outline: none;
                    box-shadow: 0 0 5px rgba(255,0,0,0.5);
                }


                .error-message {
                    color: red;
                    font-size: 12px;
                    margin-top: -8px;
                    margin-bottom: 10px;
                    display: block;
                }
            /*______________________________________*/
                 
            </style>
            <!-- Policy holder's information -->
            <div class="client-info-card" id="client-info-card"></div>    
            
            <!-- Policy information -->
            <div class="client-info-card" id="policy-info-card">
                <!-- Display policy information-->
                <div id="policy-info-div"></div>
                <!-- Upgrade or downgrade cureent user policy -->
                <div id="policies-div"></div>
            </div>  
        `;
    }
    /*_______________________________________________________________________________________________*/

    /*----------------------------------------Connected Callback-----------------------------------*/
    connectedCallback()
    {
        if(!this.shadowRoot){
            this.attachShadow({mode: 'open'})
        }

        if(!this.rendered){
            this.render();
            this.rendered = true;

            //get policy details
            this.getPolicyHolderInfo(this.fileId);
            this.getPolicyInfo(this.fileId);
            this.getPolicies();
            this.updatePolicyHolderInfo(this.fileId);
            this.updatePolicy(this.fileId);
            this.#getDependencies(this.fileId);
            this.attachEventListeners();
        }
    }
    /*_______________________________________________________________________________________________*/

    /*-------------------------------------------Observer--------------------------------------------*/
    static get observedAttributes()
    {
        return ['fileId'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }
    /*_______________________________________________________________________________________________*/

    /*-------------------------------------------Methods--------------------------------------------*/
    //get policy holder's info from server 
    getPolicyHolderInfo(fileId)
    {
        fetch(`/client/management/policy/${fileId}`)
            .then((response) => {
                if(!response.ok)
                {
                    return response.text().then(error => {
                        throw new Error(error);
                    })
                }
                
                return response.json();
            }).then((data) => {
                let contentWrapper = this.shadowRoot.getElementById("client-info-card");

                let clientInfoTable = `
                    <table id="client-info-table">
                    <caption><h2>Policy Holder's Info</h2></caption> 
                    <tr>
                        <td>Province: </td>
                        <td>${data.province}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${data.address}</td>
                    </tr>
                   
                    <tr>
                        <td>Contact 1: </td>
                        <td>${data.phoneContact1}</td>
                    </tr>`;

                if(data.phoneContact2 > 0){
                    clientInfoTable += `
                    <tr>
                        <td>Contact 2: </td>
                        <td>${data.phoneContact2}</td>
                    </tr>`;
                }

                clientInfoTable += `
                        <tr>
                            <td>D.O.B:</td>
                            <td>${data.dob}</td>
                        </tr>
                        <tr>
                            <td>Initials:</td>
                            <td>${data.initials}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>${data.gender}</td>
                        </tr>
                        <tr>
                            <td>ID/Passport Number:</td>
                            <td>${data.id_passport}</td>
                        </tr>
                    </table>
                    <div>
                        <button class="prop-button" id="open-changepolicyholder-form">Change policy holder</button> | <button class="prop-button" id="open-policyholderupdate-form">Update</button> | <button class="prop-button" id="open-addons-form">Add Ons</button>
                    </div>
                `;
            contentWrapper.innerHTML = clientInfoTable;
            }).catch(error => {
                alert(error);
            })
    }

    /** 
     * Get Policy information from server
     * billing info - billing status, amount owed
     * members count - number of members, total members count policy holds
     *  
    */
    getPolicyInfo(fileId){
        fetch(`/client/management/subscription/${fileId}`)
            .then((response) => {
                if(!response.ok)
                {
                    return response.text().then(error => {
                        throw new Error(error);
                    })
                }
                
                return response.json();
            }).then((data) => {
                let policyInfoDiv = this.shadowRoot.getElementById('policy-info-div');
                let policyInfoTableContent = `  
                <table>             
                    <caption><h2>Policy Info</h2></caption>
                    <tbody>
                        <tr>
                            <td><b>Plan Name</b></td><td>${data.name}</td>
                        </tr>
                        <tr>
                            <td><b>Date Of Cover</b></td><td>${data.dateOfCover}</td>
                        </tr>
                        <tr>
                            <td><b>Joining Fee</b></td><td>${data.joiningFee}</td>
                        </tr>
                        `;
                        //check if account waiting period is still on pending
                        if(parseInt(data.waitPeriodLeft) > 0){
                            policyInfoTableContent += `
                                <tr>
                                    <td><b>Wait Period Left/Number of months left<br>for account to be activated</b></td><td>${data.waitPeriodLeft} of ${data.waitPeriod} months</td>
                                </tr>
                            `;
                        }else{
                            if(data.lapseStatus !== null)
                            {
                                policyInfoTableContent += `
                                    <tr>
                                        <td><b>Lapse Status</b></td>
                                        <td> 
                                            <td>${data.policyStatus}</td>
                                            <td>${data.monthsBehind} "of" ${data.lapsePeriod}</td> 
                                        </td>
                                    </tr>
                                `;
                            }
                        }
                        
                        if(data.groupName !== "null")
                        {
                            policyInfoTableContent += `
                                <tr>
                                    <td><b>Group Name</b></td><td>${data.groupName}</td>
                                </tr>
                            `;
                        }

                        policyInfoTableContent += `
                        <tr>
                            <td><b>Policy Payment Status</b></td><td>${data.status}</td>
                        </tr>
                        <tr>
                            <td><b>Next Due Date</b></td><td>${data.nextDueDate}</td>
                        </tr>
                        <tr>
                            <td><b>Months Due</b></td><td>${data.monthsDue}</td>
                        </tr>
                        <tr>
                            <td><b>Balance Due</b></td><td>${data.balance}</td>
                        </tr>
                        <tr>
                            <td><b>Total owed</b></td><td>${data.totalOwed}</td>
                        </tr>
                        <tr>
                            <td><b>Months Covered</b></td><td>${data.monthsCovered}</td>
                        </tr>
                        <tr>
                            <td><b>Member's Count</b></td><td>${data.membersCount}</td>
                        </tr>
                    </tbody>   
                </table> 
                `;

                policyInfoDiv.innerHTML = policyInfoTableContent;
            }).catch(error => {
                alert(error);
            })
    }

    /**
     * Get all policies this company has
     * upgrade or downgrade from list of the policies
     */
    getPolicies(){
        fetch(`/package/packages`)
        .then(response => {
            return response.json();
        }).then(data => {
            let policyDiv = this.shadowRoot.getElementById('policies-div');
            let policyDivContent = `
            <h2>Change Current Policy</h2>
            <select id="policy-option">`;
            data.forEach((pkg, index) => {
                policyDivContent += `<option value="${pkg.id}">${pkg.policyName} - ${pkg.premiumAmount} - ${pkg.membersCount} Members</option>`;
            })

            policyDivContent += `</select>
                            <button id="changePolicyBtn">Change Policy</button>`;
            policyDiv.innerHTML = policyDivContent;
        })
    }

    // fetch dependents
    async #getDependencies(fileId) {
        try {
            const res = await fetch(`/client/management/dependencies/${fileId}`);
            if (!res.ok) throw new Error(`Failed to fetch dependencies: ${res.status}`);
            const data = await res.json();
            this.dependentData = data;
        } catch (err) {
            console.error(err);
        }
    }

    /** 
     * hi chat gpt we are working with this method
     * createAddon()
     * add addon to individual within a policy
     * this method creaates a form content, 
     * in which the user fills in the addon detail
     */ 
    
    createAddon() {
        const contentWrapper = this.shadowRoot.getElementById("client-info-card");
        contentWrapper.innerHTML = "";
    
        // Wrapper for addon contents
        const addonWrapper = document.createElement("div");
        addonWrapper.classList.add("addon-wrapper");
        
        // h2 must not be overwhelming. the font should be friendly
        const heading = document.createElement("h2");
        heading.textContent = "add an addon for this individual";
        addonWrapper.appendChild(heading);


        // Form
        const form = document.createElement("form");
        form.id = "addon-form";
        form.classList.add("modern-form");
        /**
         * this should be a grid
         * the style must be modern and elagant
         * well spaced 
         * 
         */
        form.innerHTML = `
            <label for="addon-name">Item Name</label>
            <input type="text" id="addon-name" required />
            <small class="error-message" id="error-name"></small>

            <label for="addon-monthly-amount">Addon Monthly Amount</label>
            <input id="addon-monthly-amount" type="number" min="1" required />
            <small class="error-message" id="error-amount"></small>

            <label for="addon-wait-period">Wait Period<label>
            <input type="number" id="addon-wait-period" min="0" required />
            <small class="error-message" id="error-wait"></small>

            <label for="addon-created-at">created at</label>
            <input type="date" id="addon-created-at" />
            <small class="error-message" id="error-created"></small>

            <label type="addon-description">Description</label>
            <textarea id="addon-description" rows="4" placeholder="Explain briefly about this addon item..."></textarea> 
            <button type="submit" class="submit-btn">Proceed</button>
        `;
        addonWrapper.appendChild(form);

        // Add action buttons back
        const actionsDiv = document.createElement("div");
        actionsDiv.innerHTML = `
            <button class="prop-button" id="open-changepolicyholder-form">Change policy holder</button> | 
            <button class="prop-button" id="open-policyholderupdate-form">Update</button> | 
            <button class="prop-button" id="open-addons-form">Add Ons</button>
        `;
        addonWrapper.appendChild(actionsDiv);

        contentWrapper.appendChild(addonWrapper);

        // when the submit button is clicked we invoke validateForm method. the method validates form fields
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateForm();
        });

        // Real-time validation on input change
        form.querySelectorAll("input, textarea").forEach((field) => {
            field.addEventListener("input", () => {
                this.validateField(field);
            });
        });
    }

    async #saveAddon(){
        try {
            this.productName = this.shadowRoot.getElementById("addon-name").value;
            this.productCost = this.shadowRoot.getElementById("addon-monthly-amount").value;
            this.productDescription = this.shadowRoot.getElementById("addon-description").value;
            this.createdAt = this.shadowRoot.getElementById("addon-created-at").value;
            this.waitPeriod = this.shadowRoot.getElementById("addon-wait-period").value;

            alert(`wait period: ${this.waitPeriod}`);
            alert(`createdAt: ${this.createdAt}`);
            const resolve = await fetch(`/client/create-addon/${this.fileId}`,{
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    name: this.productName,
                    monthlyAmount: this.productCost,
                    description: this.productDescription,
                    waitingPeriodMonths: this.waitPeriod,
                    createdAt: this.createdAt,
                }),
            });

            if(!resolve.ok)throw new Error(`Message from server: ${resolve.text()}`);
            const serverMessage = await resolve.text();

        } catch(error){
            alert(error);
        } 
    }

    // Validation helpers
    validateForm() {
        let isValid = true;
        const form = this.shadowRoot.querySelector("#addon-form");
        form.querySelectorAll("input[required]").forEach((field) => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            
            // TODO: send data to backend
            this.#saveAddon();
        }
    }

    validateField(field) {
        const form = this.shadowRoot.querySelector("#addon-form");
        let errorEl = form.querySelector(`#error-${field.id.split("addon-")[1]}`);
        let valid = true;
    
        // Reset state
        field.classList.remove("invalid");
        if (errorEl) errorEl.textContent = "";
    
        // Rules
        if (field.required && !field.value.trim()) {
            valid = false;
            field.classList.add("invalid");
            if (errorEl) errorEl.textContent = `${field.previousElementSibling.textContent} is required.`;
        } else if (field.type === "number" && field.value !== "" && parseFloat(field.value) < 0) {
            valid = false;
            field.classList.add("invalid");
            if (errorEl) errorEl.textContent = `Please enter a valid positive number.`;
        }
    
        return valid;
    }
    /*---------------------- END ADD ADDON METHOD ------------------*/

    // Create Change Policyholder form
    createChangePolicyholderForm() {
        const contentWrapper = this.shadowRoot.getElementById("client-info-card");
        contentWrapper.innerHTML = "";
    
        // Wrapper for form
        const changePolicyWrapper = document.createElement("div");
        changePolicyWrapper.classList.add("change-policy-wrapper");
    
        const heading = document.createElement("h2");
        heading.textContent = "Select a member from dependant list";
        changePolicyWrapper.appendChild(heading);


        // Form
        const form = document.createElement("form");
        form.classList.add("modern-form");

        form.innerHTML = `
        <label for="member-drop-down">Choose a new policy holder</label>
        <div id="member-drop-down" class="dropdown-box"></div>

        <label for="changeHolder-textarea">Reason for change</label>
        <textarea id="changeHolder-textarea" rows="4" placeholder="Explain briefly why you are changing the policy holder..."></textarea>

        <button type="submit" class="submit-btn">Proceed</button>
        `;

        changePolicyWrapper.appendChild(form);

        const memberDropdown = form.querySelector("#member-drop-down");
        memberDropdown.innerHTML = ""; // clear previous items

        // Populate dropdown with dependent data
        if (Array.isArray(this.dependentData) && this.dependentData.length > 0) {
            const select = document.createElement("select");
            select.id = "dependent-select";

            // Default option
            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.textContent = "Select a dependent";
            select.appendChild(defaultOption);

            this.dependentData.forEach(dep => {
                const option = document.createElement("option");
                option.value = dep.id;
                option.textContent = `${dep.name} (${dep.relationship})`;
                select.appendChild(option);
            });

            memberDropdown.appendChild(select);

            select.addEventListener("change", (e) => {
                const selectedId = e.target.value;
                const selectedDep = this.dependentData.find(d => d.id == selectedId);
                if (selectedDep) {
                  const heading = changePolicyWrapper.querySelector("h2");
                  heading.textContent = `About to change policy holder to ${selectedDep.name}`;
                }
            });
        } else {
            const noDeps = document.createElement("p");
            noDeps.textContent = "No dependents available to choose from.";
            noDeps.style.color = "red";
            memberDropdown.appendChild(noDeps);
        }

        // Info message
        const info = document.createElement("p");
        info.classList.add("info-message");
        info.textContent =
            "Please note: Once confirmed, this process is irreversible. Ensure the selected member is correct.";
        changePolicyWrapper.appendChild(info);

        // Add action buttons back
        const actionsDiv = document.createElement("div");
        actionsDiv.innerHTML = `
            <button class="prop-button" id="open-changepolicyholder-form">Change policy holder</button> | 
            <button class="prop-button" id="open-policyholderupdate-form">Update</button> | 
            <button class="prop-button" id="open-addons-form">Add Ons</button>
        `;
        changePolicyWrapper.appendChild(actionsDiv);

        contentWrapper.appendChild(changePolicyWrapper);
            
    }

    attachEventListeners() {
        const wrapper = this.shadowRoot.getElementById("client-info-card");

        // Delegated event listeners
        wrapper.addEventListener("click", (event) => {
            if (event.target?.id === "open-changepolicyholder-form") {
                this.createChangePolicyholderForm();
            }
            if (event.target?.id === "open-policyholderupdate-form") {
                alert("Opening policyholder update form");
            }
            if (event.target?.id === "open-addons-form") {
                this.createAddon();
            }
        });
    }

    updatePolicyHolderInfo(fileId){

    }

    updatePolicy(fileId){

    }
});