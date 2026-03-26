/**
 * @Author Le-Roy S. Jongwe
 * @description Dependency Management Component for managing:
 * - Creating dependency
 * - Updating dependency
 * - Deleting dependency
 */

customElements.define('dependency-management-component', class extends HTMLElement {
    static get observedAttributes() {
        return ['fileid', 'policyHolderName'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
	
	__addonData;
	
	/*------------------------------------------------------ */	
	//getters and setters
    get addonData()
    {
        return this.__addonData;
    }

    set addonData(addonData){
        this.__addonData = addonData;
    }
	/*------------------------------------------------------ */

    get fileId() {
        return this.getAttribute('fileid');
    }

    set fileId(value) {
        this.setAttribute('fileid', value);
        this.#render();
    }

    get policyHolderName() {
        return this.getAttribute('policyHolderName');
    }

    set policyHolderName(value) {
        this.setAttribute('policyHolderName', value);
        this.#render();
    }

    get dependenciesData() {
        return this.getAttribute('depData');
    }

    set dependenciesData(value)
    {
        this.setAttribute('depData', value);
    }

    connectedCallback() {
        this.#render();
        if (this.fileId) this.#getDependencies(this.fileId);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'fileid' && oldValue !== newValue) {
            this.#render();
            this.#getDependencies(newValue);
        }
    }

    async #getDependencies(fileId) {
        try {
            const response = await fetch(`/client/management/dependencies/${fileId}`);
            if (!response.ok){
                const serverMessage = await response.text();
                throw new Error(serverMessage);
            } 
            const data = await response.json();
            this.depData = data;
            this.#renderTable(data);
        } catch (err) {
            alert(err);
        }
    }

    async #removeDependency(dependencyId, clientId) {
        try {
            const response = await fetch(`/client/management/dependencies/remove/${dependencyId}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ clientid: clientId }),
            });
            if (!response.ok){
                const serverMessage = await response.text(); 
                throw new Error(serverMessage);
            }
            this.#getDependencies(clientId);
        } catch (err) {
            alert("Failed to delete dependency. Contact webmaster@olivine.co.za if issue persists.");
        }
    }

    #renderTable(dependencies) {
        const card = this.shadowRoot.querySelector('#dependency-info-card');
        if (!card) return;

        const rows = dependencies.map(dep => `
            <tr>
                <td>${dep.name}</td>
                <td>${dep.lastName}</td>
                <td>${dep.gender}</td>
                <td>${dep.dob}</td>
                <td>${dep.relationship}</td>
                <td>${dep.id_passport}</td>
            </tr>
            <tr>
                <td colspan="6" class="actions">
                    <button class="prop-button" data-action="remove" data-id="${dep.id}">Remove</button>
                    <button class="prop-button" data-action="deceased" data-name="${dep.name}" data-id="${dep.id}">Deceased</button>
                    <button class="prop-button" data-action="create-addons" data-name="${dep.name} ${dep.lastName}" data-id="${dep.id}">Create Addons</button>
					<button class="prop-button" data-name="${dep.name} ${dep.lastName}" data-action="show-addons" data-id="${dep.id}">View Addons</button>
                </td>
            </tr>
        `).join('');

        card.innerHTML = `
            <table>
                <caption><h2>Dependencies</h2></caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>D.O.B</th>
                        <th>Relationship</th>
                        <th>ID/Passport</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;

        this.#attachEventListeners();
    }

	#attachEventListeners() {
	    const buttons = this.shadowRoot.querySelectorAll('.prop-button');
	    buttons.forEach(btn => {
	        const action = btn.dataset.action;
	        const id = parseInt(btn.dataset.id);
			const name = btn.dataset.name;
	        btn.addEventListener('click', () => {
	            if (action === 'remove') {
	                if (confirm("Do you really want to remove this dependent")) {
	                    this.#removeDependency(id, this.fileId);
	                }
	            } else if (action === 'deceased') {
	                this.depData.forEach(dep => {
	                    if (dep.id === id) {
	                        this.#processDeceased(
	                            this.fileId,
	                            this.policyHolderName,
	                            dep.id,
	                            dep.name,
	                            dep.lastName,
	                            dep.id_passport
	                        );
	                        this.#highlightDeceasedButton(btn);
	                    }
	                });
	            } else if (action === 'create-addons') {
	               this.createAddon(name, id);
	            } else if(action === "show-addons"){
					//call fetchAddons - method fetches addons from server 
					//retrieve addon data from server
					//@param id - dependenceId
					//@param name - dependents full name
					this.displayAddons(name, id);
				}
				
	        });
	    });
	}

	
	/* ------------------------- Addon functionality section ----------------------*/
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
            // send data to backend
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
	
	/** 
	 * create an addon for a dependent
	*/
	createAddon(name, dependentId) {
		const contentWrapper = this.shadowRoot.getElementById("dependency-info-card");
		contentWrapper.innerHTML = "";
    
        // Wrapper for addon contents
        const addonWrapper = document.createElement("div");
        addonWrapper.classList.add("addon-wrapper");
		addonWrapper.style.display = "block";
		
        
        // h2 must not be overwhelming. the font should be friendly
        const heading = document.createElement("h2");
        heading.textContent = `Add an addon for: ${name}`;
		heading.style.textAlign = "center";
        addonWrapper.appendChild(heading);


        // Form
        const formDiv = document.createElement("div");
        formDiv.id = "addon-form-div";
        formDiv.classList.add("modern-form");
        formDiv.innerHTML = `
            <div class="addon-divs">
				<label for="addon-name">Item Name</label>
	            <input type="text" id="addon-name" required />
	            <small class="error-message" id="error-name"></small>
			</div>
			
			<div class="addon-divs">
	            <label for="addon-monthly-amount">Addon Monthly Amount</label>
	            <input id="addon-monthly-amount" type="number" min="1" required />
	            <small class="error-message" id="error-amount"></small>
			</div>

			<div class="addon-divs">
	            <label for="addon-wait-period">Wait Period</label>
	            <input type="number" id="addon-wait-period" min="0" required />
	            <small class="error-message" id="error-wait"></small>
			</div>

			<div class="addon-divs">
	            <label for="addon-created-at">created at</label>
	            <input type="date" id="addon-created-at" />
	            <small class="error-message" id="error-created"></small>
			</div>

			<div id="text-area-div" class="addon-divs">
	            <label type="addon-description">Description</label>
	            <textarea id="addon-description" rows="10" placeholder="Explain briefly about this addon item..."></textarea> 
			</div>
            
			<div id="button-container">
				<button type="button" id="submit-addondata-validation" class="submit-btn">Proceed</button>
				 <button type="button" id="close-createAddon-btn" class="close-createAddon-btn">Close</button>
			</div>
        `;
        addonWrapper.appendChild(formDiv);
		contentWrapper.appendChild(addonWrapper);

        // when the submit button is clicked we invoke validateForm method. the method validates form fields
		let validateAddonForm = this.shadowRoot.getElementById("submit-addondata-validation");
        validateAddonForm.addEventListener("click", () => {
            let addonItem = this.shadowRoot.getElementById("addon-name").value;
			let addonMonthlyAamount = this.shadowRoot.getElementById("addon-monthly-amount").value;
			let waitPeriod = this.shadowRoot.getElementById("addon-wait-period").value;
			let createdAt = this.shadowRoot.getElementById("addon-created-at").value;
			let description = this.shadowRoot.getElementById("addon-description").value;
			
			//TASK TO DO ....
			// create validateAddontData() that will validate our form values
			// on successful validation we call a method that sends the data to back end
			this.#validateAddonData(addonItem, addonMonthlyAamount, waitPeriod, createdAt, description, dependentId);
        });
		
		// close create addon
		let closeCreateAddonForm = this.shadowRoot.getElementById("close-createAddon-btn");
        closeCreateAddonForm.addEventListener("click", () => {
			contentWrapper.innerHTML = "";
			this.#getDependencies(this.fileId);
			this.#render();
		});

    }
	
	#validateAddonData(item, amount, waitPeriod, createdAt, description, dependentId) {
	    let errors = [];

	    if (!item.trim()) {
	        errors.push("Item name is required.");
	    }

	    if (!amount || amount <= 0) {
	        errors.push("Monthly amount must be greater than 0.");
	    }

	    if (waitPeriod < 0) {
	        errors.push("Wait period cannot be negative.");
	    }

	    if (!createdAt) {
	        errors.push("Please select a creation date.");
	    }

	    // If there are errors, display ONE combined alert
	    if (errors.length > 0) {
	        alert(errors.join("\n"));
	        return;
	    }

	    // validation successful, send to backend
		this.#saveAddon(item, amount, waitPeriod, createdAt, description, dependentId)
	}
		
	async #saveAddon(item, amount, waitPeriod, createdAt, description, dependentId){
		alert(`This is dependent id:  ${dependentId}`);
    try {

        const resolve = await fetch(`/client/create-addon-dependent/${this.fileId}/${dependentId}`,{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({
				name: item,
                monthlyAmount: amount,
                description: description,
                waitingPeriodMonths: waitPeriod,
                createdAt: createdAt,
				isPrimaryClient: false
            }),
        });

        if(!resolve.ok){
            const serverMessage = await resolve.text();
            throw new Error(`Message from server: ${serverMessage}`);
        }
        const serverMessage = await resolve.text();
        alert(serverMessage);
		this.#getDependencies(this.fileId);
		this.#render();
        } catch(error){
            alert(error);
        } 
    }
	
	/*---------------------- DISPLAY ADDONS --------------*/
		
	    //fetch a list of addons from server
	    async fetchAddons(dependenceId){
	        try {
	            const resolve = await fetch(`/client/addons/${this.fileId}/${dependenceId}`);
	            if(!resolve.ok){
	                const serverMessage = await resolve.text();
	                throw new Error(serverMessage);
	            }
	            this.addonsData = await resolve.json();
	        } catch (error) {
	            alert(error);
	        }
	    }

	 //display the json list retrieved from server by fetchAddons
     async displayAddons(dependentName, dependentId){
		const contentWrapper = this.shadowRoot.getElementById("dependency-info-card");
		contentWrapper.innerHTML = "";
    
        // Wrapper for addon contents
        const addonWrapper = document.createElement("div");
        addonWrapper.classList.add("addon-wrapper");
		addonWrapper.style.display = "block";
		
        
        // h2 must not be overwhelming. the font should be friendly
        const heading = document.createElement("h2");
        heading.textContent = `Manage Addon(s) for: ${dependentName}`;
		heading.style.textAlign = "center";
        addonWrapper.appendChild(heading);

		//tabular grid to display addon data
		const addonViewGrid = document.createElement("div");
		addonViewGrid.id = "addonViewGrid";
		
		//grid tabular heading 
		let addonView = ` <div>Item Name</div> <div>Monthly Fee</div> <div>Discription</div> <div>Status</div> <div>Actions</div> `;
		addonViewGrid.innerHTML = addonView;
		
		//retrieve addon data from server
		await this.fetchAddons(dependentId);
		this.addonsData.map(( data ) => {
			addonView += `
	            <div>${data.name}</div> <div>${data.monthlyAmount}</div> <div>${data.description}</div> <div>${data.isActive}</div> <button data-action="remove" data-id="${data.id}" class="delete-addon" id="delete-addon">Delete</button>
	        `;	
		});
		
		addonViewGrid.innerHTML = addonView;
		addonWrapper.appendChild(addonViewGrid);
		
		//create close button
		const controlsDiv = document.createElement("div");
		controlsDiv.id = "controls-div";
		controlsDiv.innerHTML = `<div><button id="close-displayAddon-btn" class="close-displayAddon-btn">Close</button></div>`;
		addonWrapper.appendChild(controlsDiv);
		
		
		contentWrapper.appendChild(addonWrapper);
		
		// close create addon
		let closeDisplayAddon = this.shadowRoot.getElementById("close-displayAddon-btn");
        closeDisplayAddon.addEventListener("click", () => {
			contentWrapper.innerHTML = "";
			this.#getDependencies(this.fileId);
			this.#render();
		});
	}
		
		/**
		 * remove an addon
		 * refresh the addon display 
		 */
		async removeAddon(addonId){
		// confirm delete addon
		if (confirm("Are you sure you want to delete this addon?")) {
			try{
				const response = await fetch(`/client/addons/remove/${addonId}/${this.fileId}`, {
					method: "DELETE",
				});
				
				if(!response.ok){
					const serverMessage = await response.text();
					throw new Error(serverMessage)
				}
				
				await this.displayAddons();
				} catch (error){
					alert(error);
				}
			}
		}
		
		addOnEventListeners(){
		const deleteButtons = this.shadowRoot.querySelectorAll(".delete-addon");
		deleteButtons.forEach( btn => {
			const action = btn.dataset.action;
			const id = parseInt(btn.dataset.id);
			
			btn.addEventListener("click", async() => {
				if(action === "remove"){
					btn.disabled = true;
					btn.textContent = "Deleting...";
					await this.removeAddon(id);
					btn.disabled = false;
					btn.textContent = "Delete";
					}
				});
			});
		}
		
	/* ------------------ End addon functions --------------------- */
	

    #processDeceased(fileId, policyHolderName, decId, deceasedName, deceasedSurname, id_passport){
        let fileNumber = fileId;
        let deceasedFullName = `${deceasedName} ${deceasedSurname}`;
        let id_pass = id_passport;
        let deceasedId = decId;
        /**/
        location.href = "/funeral/management" + "?fileId=" + encodeURIComponent(fileNumber) + "&policyHolderName=" + encodeURIComponent(policyHolderName) + "&deceasedFullName=" + encodeURIComponent(deceasedFullName) + "&id_passport=" + encodeURIComponent(id_pass) + "&deceasedId=" + deceasedId;
    }

    #highlightDeceasedButton(activeBtn) {
        this.shadowRoot.querySelectorAll('[data-action="deceased"]').forEach(btn => {
            btn.style.backgroundColor = '#007bff';
            btn.style.color = '#fff';
            btn.style.border = 'none';
        });

        activeBtn.style.backgroundColor = 'white';
        activeBtn.style.color = 'black';
        activeBtn.style.border = '1px solid black';
    }

    #render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    width: 100%;
                }
                .client-info-card {
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    padding: 1.5rem;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
					position: relative;
                }
				
				/* =============================================
					addon-wrapper style
				   =============================================
				*/
				#addon-wrapper{
					padding: 1px;
					box-sizing: border-box;
					display: none;
				}
				
				#addon-form-div{
					display: grid;
					grid-template-columns: 1fr 1fr;
					width: 70%;
					box-shadow: 2px 2px rgba(21, 34, 21, 0.5);
					margin: 0 auto;
					gap: 10px;
					border-radius: 10px;
					padding: 20px;
					box-sizing: border-box;
					border: 1px solid gray;
				}
				
				.addon-divs{
					display: flex;
					flex-direction: column;
					row-gap: 15px;
					padding: 10px 5px;
				}
				
				#addon-form-div > div input[type="text"], input[type="number"], input[type="date"]{
					padding: 10px 5px;
					box-sizing: border-box;
					border-radius: 5px;
				}
				
				#text-area-div{
					grid-column: 1 / 3;
				}
				
				/* ----------------------- button container secion --------------------- */
				#button-container{
					display: block;
					margin: 10px 0;
					padding: 10px;
					box-sizing: border-box;
					border: 1px solid black;
					grid-column: 1 / 3;
				}
				
				
				#button-container > button{
					width: 20%;
					padding: 10px 5px;
					background-color: white;
					border: 1px solid gray;
					box-sizing: border-box;
					border-radius: 5px;
				}
				
				#button-container > button:hover:nth-child(1){
					cursor: pointer;
					outline: 1px solid green;
					border: 1px solid white;
					background-color: green;
					color: white;
				}
				
				#button-container > button:nth-child(2){
					border: 1px solid red;
					background-color: pink;
					color: red;
				}
			
				#button-container > button:hover:nth-child(2){
					cursor: pointer;
					outline: 1px solid red;
					border: 1px solid white;
					background-color: pink;
					color: #8b0000;
					font-weight: bold;
				}
				
				* =============================================
				  End - addon-wrapper style
				=============================================
				*/
				
                h2 {
                    margin: 0 0 1rem;
                    font-size: 1.5rem;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 1rem;
                    border: 1px solid #e0e0e0;
                    text-align: left;
                }
                th {
                    background: #f8f9fa;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                tr:nth-child(even) td {
                    background-color: #f4f6f9;
                }
                .actions {
                    text-align: center;
                }
                .prop-button {
                    background: none;
                    border: 2px solid transparent;
                    color: #333;
                    font-weight: bold;
                    margin: 0.25rem;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 4px;
                }
                .prop-button:hover {
                    background-color: #007bff;
                    color: white;
                    border-color: #007bff;
                }
				
				/* =================================================================================
				------------------------- DISPLAY ADDONS ----------------------
				==================================================================================== */
				#addonViewGrid {
				  display: grid;
				  grid-template-columns: 1.2fr 1fr 2fr 1fr 1fr; /* proportional spacing */
				  border: 1px solid #ddd;
				  border-radius: 8px;
				  overflow: hidden;
				  width: 100%;
				  box-sizing: border-box;
				}
				
				/* Header row (first 5 items) */
				#addonViewGrid > div:nth-child(-n+5) {
				  background: #f5f7fa;
				  font-weight: 600;
				  color: #222;
				  overflow: visible;  /* headers don't need scroll */
				  max-height: none;
				}
				
				/* Each cell */
				#addonViewGrid > div,
				#addonViewGrid > button {
				  padding: 12px 16px;
				  border-bottom: 1px solid #eee;
				  border-right: 1px solid #eee;
				  font-size: 0.95rem;
				  text-align: left;
				  background: #fafafa;
				  max-height: 60px;             /* limit each cell height */
				  overflow: hidden;             /* prevent row stretching */
				  display: flex;                /* align content nicely */
				  align-items: center;          /* vertically center shorter text */
				}
				
				/* Remove border for last column */
				#addonViewGrid > div:nth-child(5n),
				#addonViewGrid > button:nth-child(5n) {
				  border-right: none;
				}
				
				/* Description column only — allow scroll */
				#addonViewGrid > div:nth-child(5n + 3) {  /* 3rd, 8th, 13th ... */
				  overflow-y: auto;             /* scroll vertically inside */
				  white-space: normal;
				  word-wrap: break-word;
				}
				
				/* Optional: small scrollbar styling */
				#addonViewGrid > div:nth-child(3n + 3)::-webkit-scrollbar {
				  width: 6px;
				}
				#addonViewGrid > div:nth-child(3n + 3)::-webkit-scrollbar-thumb {
				  background-color: #ccc;
				  border-radius: 3px;
				}
				
				/* Buttons */
				#addonViewGrid button {
				  background: #e63946;
				  color: white;
				  border: none;
				  border-radius: 6px;
				  padding: 6px 12px;
				  cursor: pointer;
				  font-size: 0.9rem;
				  transition: background 0.2s ease;
				  height: 40px;                 /* fix button height */
				  align-self: center;
				}

				#addonViewGrid button:hover {
				  background: #d62828;
				}
				
				/* -------------- controls div --------------- */
				#controls-div{
					border: 1px solid #ddd;;
					margin: 10px 0;
					padding: 10px;
					box-sizing: border-box;
				}
				
				#close-displayAddon-btn {
				  background: #e63946;
				  color: white;
				  border: none;
				  border-radius: 6px;
				  padding: 6px 12px;
				  cursor: pointer;
				  font-size: 0.9rem;
				  transition: background 0.2s ease;
				  height: 40px;                 /* fix button height */
				  align-self: center;
				}
	
				#close-displayAddon-btn:hover {
				  background: #d62828;
				}
				/* =================================================================================
				------------------------- END DISPLAY ADDONS ----------------------
				==================================================================================== */
            </style>

            <div class="client-info-card" id="dependency-info-card">
                <p>Loading dependencies...</p>
            </div>
        `;
    }
});
