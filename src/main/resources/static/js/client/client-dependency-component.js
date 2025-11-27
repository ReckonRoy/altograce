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
                    <button class="prop-button" data-action="deceased" data-name="dep.name" data-id="${dep.id}">Deceased</button>
                    <button class="prop-button" data-action="create-addons" data-id="${dep.id}">Create Addons</button>
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
	                alert(`About to add an addon ${id}`);
	                // this.createAddon();
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
	createAddon() {
        const contentWrapper = this.shadowRoot.getElementById("dependency-info-card");
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
        addonWrapper.appendChild(this.displayPolicyHolderInfoActions());
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

        if(!resolve.ok){
            const serverMessage = await resolve.text();
            throw new Error(`Message from server: ${serverMessage}`);
        }
        const serverMessage = await resolve.text();
        alert(serverMessage);
        } catch(error){
            alert(error);
        } 
    }
	
	/*---------------------- DISPLAY ADDONS --------------*/
		
	    //fetch a list of addons from server
	    async fetchAddons(){
	        try {
	            const resolve = await fetch(`/client/addons/${this.fileId}`);
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
	     async displayAddons(){
	        const contentWrapper = this.shadowRoot.getElementById("client-info-card");
	        contentWrapper.innerHTML = "";
	    
	        // Wrapper for addon contents
	        const manageAddonsWrapper = document.createElement("div");
	        manageAddonsWrapper.classList.add("addon-wrapper");
	        
	        // h2 must not be overwhelming. the font should be friendly
	        const heading = document.createElement("h2");
	        heading.textContent = "Manage Addons";
	        manageAddonsWrapper.appendChild(heading);
			
			const addonViewGrid = document.createElement("div");
			addonViewGrid.id = "addonViewGrid";
			let addonView = ` <div>Item Name</div> <div>Monthly Fee</div> <div>Discription</div> <div>Status</div> <div>Actions</div> `;
			addonViewGrid.innerHTML = addonView;
			
			//retrieve addon data from server
			await this.fetchAddons();
			this.addonsData.map(( data ) => {
				addonView += `
		            <div>${data.name}</div> <div>${data.monthlyAmount}</div> <div>${data.description}</div> <div>${data.isActive}</div> <button data-action="remove" data-id="${data.id}" class="delete-addon" id="delete-addon">Delete</button>
		        `;	
			});
	        
	        addonViewGrid.innerHTML = addonView;
	        manageAddonsWrapper.appendChild(addonViewGrid)
	        manageAddonsWrapper.appendChild(this.displayPolicyHolderInfoActions())
	        contentWrapper.appendChild(manageAddonsWrapper);
			this.addOnEventListeners();
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
                }
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
            </style>

            <div class="client-info-card" id="dependency-info-card">
                <p>Loading dependencies...</p>
            </div>
        `;
    }
});
