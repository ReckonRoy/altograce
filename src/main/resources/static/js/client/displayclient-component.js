/**
 * @author Le-Roy Jongwe
 * @Date 06 March 2024
 * @description component for displaying clients
 */

customElements.define("display-client", class extends HTMLElement {

    gender = "";

    getGender(){
        return this.gender;
    }

    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =`<style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
		

		:host {
		  font-family: "Poppins", sans-serif;
		  color: #222;
		}

        .container {
		  width: 95%;
		  max-width: 100%;
		  margin: 2rem auto;
		  background-color: #fff;
		  padding: 2rem;
        }
		
        h2 {
		  color: #333;
		  text-align: center;
		  margin-bottom: 1.5rem;
		  font-weight: 600;
		  font-size: 1.8rem;
        }
		
		/* ------------ Table Styling ------------ */
		table {
		  width: 100%;
		  border-collapse: collapse;
		  margin-bottom: 1.5rem;
		  border-radius: 8px;
		  overflow-y: both;
		  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
		}

        thead{
            background-color: #f7f8fa;
        }

        th, td {
			border: 1px solid #eee;
			padding: 1rem;
			text-align: left;
			font-size: 0.95rem;
            
        }
        th {
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-weight: 600;
			background-color: #f4f6f9;
        }

        tr:nth-child(even){
  			background-color: #f9fafc;
        }


		/* ------------ Inputs & Buttons ------------ */		
		input[type="text"],
		input[type="date"],
		select {
		  width: 100%;
		  padding: 10px 12px;
		  margin: 0.5rem 0;
		  border: 1px solid #ccc;
		  border-radius: 6px;
		  font-size: 0.95rem;
		  box-sizing: border-box;
		}

		input:focus,
		select:focus {
		  outline: none;
		  border-color: #007bff;
		  box-shadow: 0 0 5px rgba(0,123,255,0.3);
		}
		
        input[type="radio"] {
            margin: 5px;
        }
		
		button {
		  padding: 10px 18px;
		  margin: 5px;
		  background-color: #007bff;
		  color: #fff;
		  border: none;
		  border-radius: 6px;
		  cursor: pointer;
		  font-weight: 500;
		  transition: background 0.3s;
		}

		button:hover {
		  background-color: #0056b3;
		}
		
		.delete-btn {
		  background-color: #ffe6e6;
		  color: #b02a37;
		}

		.delete-btn:hover {
		  background-color: #b02a37;
		  color: #ffe6e6;
		}

        #show-deceased-btn{
            background-color: black;
        }
		
		/* ------------ Modal Styling ------------ */
		.modal,
		.client-info-modal {
		  display: none;
		  position: fixed;
		  z-index: 10;
		  inset: 0;
		  background-color: rgba(0,0,0,0.4);
		  overflow-y: auto;
		  padding: 2rem 0;
		}

		.modal-content,
		.client-info-modal-content {
		  background: #fff;
		  margin: auto;
		  padding: 2rem;
		  border-radius: 12px;
		  position: relative;
		  animation: fadeIn 0.3s ease;
		  width: 70%;
		  box-sizing: border-box;
		}
		
		@keyframes fadeIn {
		  from {opacity: 0; transform: scale(0.95);}
		  to {opacity: 1; transform: scale(1);}
		}
		
		.close,
		.client-info-close {
		  color: #aaa;
		  position: absolute;
		  top: 15px;
		  right: 15px;
		  font-size: 24px;
		  cursor: pointer;
		  transition: color 0.2s;
		}

		.close:hover,
		.client-info-close:hover {
		  color: #000;
		}
		
		/* ------------ Dependency Form Grid ------------ */
		#dependencyForm {
		  display: grid;
		  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		  gap: 1rem;
		}

		#dependencyForm button {
		  grid-column: 1 / -1;
		  width: 50%;
		  justify-self: center;
		  font-weight: 600;
		}

        /*----------Modal Header----------*/
        #modal-heading{
            margin: 40px auto;
        }

        #modal-heading h1{
            text-align: center;
            padding: 10px 0;
            margin-bottom: 10px;
        }
        /*---------------------------------*/

		/* ------------ Client Info Modal ------------ */
		#client-info-header {
		  text-align: center;
		}

		#client-infor-navbar {
		  display: flex;
		  flex-wrap: wrap;
		  justify-content: center;
		  gap: 0.5rem;
		  margin: 1.5rem 0;
		}

		#client-infor-navbar button {
		  flex: 1 1 120px;
		}

		#client-info-main {
		  display: flex;
		  flex-direction: column;
		  gap: 1rem;
		}


        .client-info-close {
            color: #aaa;
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
        }
        .client-info-close:hover,
        .client-info-close:focus {
            color: black;
            text-decoration: none;
        }
        
        .client-info-controls {
            text-align: center;
            margin-top: 20px;
        }
        .client-info-controls button {
            padding: 10px 20px;
            margin: 5px; /* Add margin around all sides */
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .client-info-controls button:hover {
            background-color: #0056b3;
        }

		/* ------------ Status Labels ------------ */
		.ACTIVATED {
		  background-color: #d4f8d3;
		  color: #2d6a2d;
		  padding: 8px;
		  border-radius: 5px;
		  text-align: center;
		}

		.INACTIVE {
		  background-color: #ffe2e2;
		  color: #a33a3a;
		  padding: 8px;
		  border-radius: 5px;
		  text-align: center;
		}
        
        .action-parent{
            position: relative;
        }
        
		/* ------------ Custom Actions Dropdown (Modern & Elegant) ------------ */

		.action-parent {
		  position: relative;
		  display: inline-block;
		  width: 100%;
		}

		/* Dropdown Container */
		.actions-container {
		  display: none;
		  flex-direction: column;
		  position: absolute;
		  top: 110%;
		  left: 0;
		  background: #ffffff;
		  border: 1px solid #e5e7eb;
		  border-radius: 10px;
		  width: 180px;
		  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
		  padding: 0.8rem 0;
		  z-index: 20;
		  animation: fadeInDropdown 0.25s ease;
		  transform-origin: top;
		}

		@keyframes fadeInDropdown {
		  from {
		    opacity: 0;
		    transform: translateY(-8px) scale(0.98);
		  }
		  to {
		    opacity: 1;
		    transform: translateY(0) scale(1);
		  }
		}

		/* Dropdown Trigger */
		.select-action {
		  cursor: pointer;
		  text-align: center;
		  padding: 10px 16px;
		  background-color: #f9fafb;
		  border: 1px solid #d1d5db;
		  border-radius: 8px;
		  font-weight: 500;
		  font-size: 0.95rem;
		  color: #374151;
		  transition: all 0.3s ease;
		}

		.select-action:hover {
		  background-color: #eef2ff;
		  border-color: #6366f1;
		  color: #111827;
		  box-shadow: 0 2px 6px rgba(99,102,241,0.15);
		}

		/* List Styles */
		.actions-ul {
		  list-style: none;
		  margin: 0;
		  padding: 0;
		}

		.actions-ul li {
		  width: 100%;
		}

		/* Buttons inside dropdown */
		.actions-ul li > button {
		  width: 100%;
		  background: none;
		  border: none;
		  text-align: left;
		  padding: 10px 16px;
		  font-size: 0.95rem;
		  color: #374151;
		  font-weight: 500;
		  cursor: pointer;
		  transition: all 0.2s ease;
		  border-radius: 6px;
		}

		.actions-ul li > button:hover {
		  background-color: #f3f4f6;
		  color: #111827;
		  padding-left: 20px;
		}

		/* Divider (optional for grouping actions) */
		.actions-divider {
		  height: 1px;
		  background-color: #e5e7eb;
		  margin: 0.4rem 0;
		}

		/* Close Icon (if used inside dropdown) */
		.actions-close {
		  position: absolute;
		  top: 8px;
		  right: 10px;
		  color: #9ca3af;
		  font-size: 20px;
		  font-weight: bold;
		  cursor: pointer;
		  transition: color 0.2s ease;
		}

		.actions-close:hover {
		  color: #111827;
		}

		/* Responsive Adjustments */
		@media (max-width: 600px) {
		  .actions-container {
		    width: 95%;
		    left: 2.5%;
		  }

		  .select-action {
		    font-size: 1rem;
		    padding: 12px;
		  }

		  .actions-ul li > button {
		    font-size: 1rem;
		    padding: 12px;
		  }
		}

        #con-dialog{
            display: none;
            position: fixed;
            top: 100px;
            margin-left: 25%;
            width: 40%;
            background-color: #550000;
            padding: 10px;
            color: #525252;
            border-radius: 10px;
            box-sizing: border-box;
            z-index: 11;
        }

        #overlay{
            display: none;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: black;
            z-index: 10;
            opacity: 0.8;
        }

        #con-dialog-child
        {
            display: flex;
            flex-direction: column;
            background-color: #d35f5f;
            border-radius: 10px;
            box-sizing: border-box;
        }
        
        #con-dialog-header{
            display: flex;
            margin-bottom: 5px;
        }

        #con-dialog-header p{
            flex-basis: 90%;
            border-radius:25%;
        }

        #con-dialog-header button{
            border-radius: 25px;
            background-color: #ff8080;
            color: #d40000;
            width: 30px;
            height: 30px;
            padding: 5px;
            text-align: center;
        }

        #con-dialog-header button:hover{
            outline: 1px solid #ff8080;
            background-color: #d40000;
            color: #ff8080;
        }

        #con-dialog-content{
            background-color: white;
            margin-bottom: 15px;
            text-align: center;
            padding: 15px 10px;
            box-sizing: border-box;
        }

        #confirm-btn{
            background-color: #55d400;
            color: #225500;
        }

        #confirm-btn:hover{
            outline: 1px solid #55d400;
            background-color: #2d7200;
            color: #55d400;
        }

        #cancel-btn{
            background-color: #ff8080;
            color: #d90f0f;
        }
        #cancel-btn:hover{
            outline: 1px solid #ff8080;
            background-color: #d40000;
            color: #ff8080;
        }

        .poppins-light {
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-style: normal;
        }

        /*---------------FLASH MESSAGE STYLES--------------------*/
		#flash-message {
		  display: none;
		  position: fixed;
		  top: 10px;
		  left: 10%;
		  right: 10%;
		  z-index: 20;
		}

		.success-message,
		.error-flash-message {
		  padding: 1rem;
		  border-radius: 6px;
		  text-align: center;
		  font-weight: 600;
		  color: white;
		}

		.success-message {
		  background-color: #28a745;
		}

		.error-flash-message {
		  background-color: #dc3545;
		}
		
        .client-info-modal {
            padding-top: 20px 0;
        }

        .client-info-modal-content {
            padding: 20px 0;
            border: 1px solid #888;
        }
		/* ------------ Responsive Design ------------ */
		@media (max-width: 992px) {
		  .container {
		    padding: 1.5rem;
		  }

		  h2 {
		    font-size: 1.5rem;
		  }

		  th, td {
		    font-size: 0.9rem;
		    padding: 0.75rem;
		  }
		}
		
		@media (max-width: 768px) {
			
			.client-info-modal{
				width: 100%;
			}	
			
			.client-info-modal-content{
				width: 100%;
				margin: 0 auto;
			}	
				
			/* ============ table style ============= */		
			.client-cards {
			    display: flex;
			    flex-direction: column;
			    gap: 1.2rem;
			    margin-top: 1rem;
			  }

			  .client-card {
			    background: #fff;
			    border: 1px solid #e2e5ea;
			    border-radius: 10px;
			    padding: 1rem;
			    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
			    transition: transform 0.2s ease;
			  }

			  .client-card:hover {
			    transform: translateY(-3px);
			  }

			  .client-item {
			    display: flex;
			    justify-content: space-between;
			    align-items: center;
			    padding: 6px 0;
			    border-bottom: 1px solid #f1f1f1;
			  }

			  .client-item:last-child {
			    border-bottom: none;
			  }

			  .client-item strong {
			    font-weight: 600;
			    color: #444;
			    flex: 0 0 45%;
			  }

			  .client-item span {
			    flex: 1;
			    text-align: right;
			    color: #222;
			  }
			  /* ============ End table style ============= */

		  input[type="text"] {
		    width: 100%;
		  }
		  
	    #dependencyForm button {
	      width: 100%;
	    }
	  }
    </style>
    <div id="flash-message">
        <p id="flash-message-p"></p>    
    </div>
    <div id="overlay"></div>
    <!--Confirmation Dialog Box-->
        <div id="con-dialog">
            <div id="con-dialog-child">
                <div id="con-dialog-header"><p>Confirmation Dialog</p><button id="close-btn">X</button></div>
                <div id="con-dialog-content"><p>Please confirm that you want to delete this file.
                Kindly note this action is irreversible!!!</p></div>
                <div><button id="confirm-btn">Confirm</button><button id="cancel-btn">Cancel</button></div>
            </div>
        </div>

    <div class="container">
        
        <h2>Clients Information</h2>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <input type="text" id="search" placeholder="Search by Client ID..">
            <!--<input type="date" id="date" onchange="filterByDate()">-->
        </div>
        <table id="clientTable">
            <thead>
                <tr>
                    <th class="columnSort" id="1">Name</th>
                    <th class="columnSort" id="2">Last Name</th>
                    <th class="columnSort" id="3">Phone Contact 1</th>
                    <th>Account Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="clientList">
                <!-- Client data will be populated here -->
            </tbody>
        </table>
        <div id="pagination" style="text-align: center;">
            <!-- Pagination will be populated here -->
            <button id="prevPage">Previous</button>
            <button id="nextPage">Next</button>
        </div>
    </div>

    <!-- Modal for adding dependency -->
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add Dependency</h2>
            <form id="dependencyForm">
                <div>
                    <label>Name:</label>
                    <input type="text" id="depName" placeholder="Name" required><br>
                </div>
                <div>
                    <label>Surname:</labe>
                    <input type="text" id="depSurname" placeholder="Surname" required><br>
                </div>
                <div id="rel-div">
                    <label>Relationship:</label>
                    <select id="relationship" required>
                        <option value="">Select Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Parent">Parent</option>
                        <option value="Extended Family">Extended Family</option>
                    </select>
                </div>
                <div>
                    <label><Strong>Gender:</strong></label>
                    <label for="male">Male:</label>
                    <input type="radio" id="male" class="dep-gender-radButton" name="gender" value="male">
                    <label for="female">Female:</label>
                    <input type="radio" id="female" class="dep-gender-radButton" name="gender" value="female"><br>
                </div>
                <div>
                    <label>Id/Passport:</label>
                    <input type="text" id="id_passport" placeholder="ID/Passport" required><br>
                </div>
                <div>
                    <label>D.O.B:</label>
                    <input type="date" id="dob" placeholder="Date of Birth" required><br>
                </div>
                <div>
                    <label>Date Of Cover:</label>
                    <input type="date" id="dateOfCover" placeholder="Date of Cover"><br>
                </div>
                    <button type="button" id="save-dep-btn">Save</button>
            </form>
        </div>
    </div>

    <!-- Modal for client information -->
    <div id="clientInfoModal" class="client-info-modal">
        <div class="client-info-modal-content">
            <span class="client-info-close">&times;</span>

            <!-- client-info-header: header for this modal -->
            <div id="client-info-header">
                <div id="modal-heading"></div>
                <!-- Nav -->
                <div id="client-infor-navbar">
                    <button id="policy-info-btn">Policy Info</button>
                    <button id="dependants-btn">Dependants</button>
                    <button id="contracts-btn">Contracts</button>
                    <button id="statements-btn">Statements</button>
                    <button id="notes-btn">Notes</button>
                </div>
            </div>

            <!-- main content div-->
            <div id="client-info-main">
                <!-- 
                *main content goes in here
                *the content is created from components
                -->
            </div>

            <div class="client-info-controls">
                <button id="show-deceased-btn">Deceased Records</button>
                <button id="fa-btn">Funeral Arrangements</button>
            </div>
        </div>
    </div>
    `;
    
        // Sample JSON data (replace with your actual data)
        let clients = [];
        let fileId = "";
        let idPassportNumber = "";
        let primaryClientName = "";
        let primaryLastName = "";
        let clientsToShow = []
        let dependencies = [];
        let genderValue = "";
        let subscriptionPlan;
        /**
         * this will keep track some fields of the deceased 
         */
        let deceased = {};

        //paging properties
        let pageNumber = 0;
        let pageSize = 50;

        this.getDepGender();
        /*-------------------------------------------Flash Message----------------------------------------*/
        let flashMessage = (classValue, messageContent) => {
            let flashMessageDiv = this.shadowRoot.getElementById("flash-message");
            flashMessageDiv.style.display = "block";
            let message = this.shadowRoot.getElementById("flash-message-p");
            message.textContent = messageContent;
            flashMessageDiv.className = classValue;
            setTimeout(() => {
                flashMessageDiv.style.display = "none";
            }, 3000);
        }
        /*________________________________________________________________________________________________*/

		/* ========================================== 
		Restructure html when view is mobile-view 
		=============================================*/
		const restructureClientTable = () => {
		  const table = this.shadowRoot.getElementById('clientTable');
		  const tbody = this.shadowRoot.getElementById('clientList');
		  if (!table || !tbody) return;

		  const isMobile = window.innerWidth <= 768;

		  // If already transformed and still mobile, skip
		  if (isMobile && !table.classList.contains('mobile-view')) {
		    table.classList.add('mobile-view');

		    // Get headers text
		    const headers = [...this.shadowRoot.querySelectorAll('thead th')].map(th =>
		      th.textContent.trim()
		    );

		    // Create mobile cards
		    const rows = [...tbody.querySelectorAll('tr')];
		    const cardsContainer = document.createElement('div');
		    cardsContainer.classList.add('client-cards');

		    rows.forEach(row => {
		      const cells = [...row.querySelectorAll('td')];
		      const card = document.createElement('div');
		      card.classList.add('client-card');

		      cells.forEach((cell, i) => {
		        const item = document.createElement('div');
		        item.classList.add('client-item');

		        const label = document.createElement('strong');
		        label.textContent = headers[i] + ': ';
		        const value = document.createElement('span');
		        value.innerHTML = cell.innerHTML;

		        item.appendChild(label);
		        item.appendChild(value);
		        card.appendChild(item);
		      });

		      cardsContainer.appendChild(card);
		    });

		    // Hide the old table and append cards
		    table.style.display = 'none';
		    table.parentNode.insertBefore(cardsContainer, table.nextSibling);
		  } 
		  else if (!isMobile && table.classList.contains('mobile-view')) {
		    // Revert to table layout
		    table.classList.remove('mobile-view');
		    const cardsContainer = this.shadowRoot.querySelector('.client-cards');
		    if (cardsContainer) cardsContainer.remove();
		    table.style.display = 'table';
		  }
		};


		// Trigger restructure on load and resize
		window.addEventListener('load', restructureClientTable);
		window.addEventListener('resize', restructureClientTable);
		
        /*------------------Function to populate the table with clients --------------------*/
        let populateTable = (pageNumber, pageSize) => {
            fetch(`/client/management/clients?page=${parseInt(pageNumber)}&size=${parseInt(pageSize)}`)
            .then((response) => {
                if(!response.ok)
                {
                    return response.text().then((error) => {
                        throw new Error(error);
                    });
                }
                return response.json();
            }).then((data) => {
                let table = this.shadowRoot.getElementById('clientList');
                table.innerHTML = '';
                clientsToShow = data.content;
                clientsToShow.forEach((client) => {
                    var row = `<tr>
                    <td>${client.name}</td>
                    <td>${client.lastName}</td>
                    <td>${client.phoneContact1}</td>
                    <td><p class="${client.activationStatus}">${client.activationStatus}<p></td>
                    <td>
                        <div class="action-parent">
                            <div class="select-action">Select an action</div>
                            <div class="actions-container"> 
                            <span class="actions-close">&times;</span>
                                <ul class="actions-ul">
                                    <li><button class="billing-btn" id="${client.id}">Pay</button></li>
                                    <li><button class="payment-history-btn" id="${client.id}">Payment history</button></li>
                                    <li><button class="add-dep-btn" id="${client.id}">Add Dep</button></li>
                                    <li><button class="delete-btn" id="${client.id}">Delete</button></li>
                                    <li><button class="moreinfo-btn" id="${client.id}">More Info</button></li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    </tr>`;
                    table.innerHTML += row;
                });
				
				//restructure content when data is loaded from back end
				restructureClientTable();  
                
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

                // Update pagination controls based on totalPages
                let totalPages = data.totalPages;
                updatePaginationControls(totalPages, pageNumber, pageSize);

                let addDep_btn = this.shadowRoot.querySelectorAll(".add-dep-btn");
                addDep_btn.forEach((add_btn) => {
                    add_btn.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        openModal(add_btn.id);
                    })
                });

                //billing button action
                let billing_btn = this.shadowRoot.querySelectorAll(".billing-btn");
                billing_btn.forEach((billing) => {
                    billing.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        let idValue = billing.id;
                        displayBillingModal(idValue.toString());
                    })
                });

                //delete button action
                let delete_btn = this.shadowRoot.querySelectorAll(".delete-btn");
                delete_btn.forEach((deleteAction) => {
                    deleteAction.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        let idValue = deleteAction.id;
                        confirmDeleteModal(idValue.toString());
                    })
                });

                let paymentHistory_btn = this.shadowRoot.querySelectorAll(".payment-history-btn");
                paymentHistory_btn.forEach((history) => {
                    history.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }
                        let idValue = history.id;
                        displayPaymentHistoryModal(idValue.toString());
                    })
                });

                let moreinfo_btn = this.shadowRoot.querySelectorAll(".moreinfo-btn");
                moreinfo_btn.forEach((viewinfo_btn) => {
                    viewinfo_btn.addEventListener("click", () => {
                        for(let actions of actionContainer)
                        {
                            actions.style.display = "";
                        }

                        loadPolicyInfo(viewinfo_btn.id);
                        showMoreInfo(viewinfo_btn.id);
                    })
                });
            }).catch(error => {
                console.log(error);
            }) 
        }

        let updatePaginationControls = (totalPages, pageNumber, pageSize) => {
            let paginationDiv = this.shadowRoot.getElementById('pagination');
            paginationDiv.innerHTML = ''; // Clear previous pagination controls
        
            // Create previous page button
            let prevPageButton = document.createElement('button');
            prevPageButton.textContent = 'Previous';
            prevPageButton.id = 'prevPage';
            paginationDiv.appendChild(prevPageButton);
        
            // Create page number buttons
            for (let i = 1; i <= totalPages; i++) {
                let pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('pageNumber');
                pageButton.dataset.page = i;
                paginationDiv.appendChild(pageButton);

                // Add event listener to each page button
                pageButton.addEventListener('click', (event) => {
                    // Extract the page number from the dataset
                    let pageNumber = parseInt(event.target.dataset.page) - 1;
                    
                    // Call populateTable with the clicked page number
                    populateTable(pageNumber, pageSize);
                });
            }
        
            // Create next page button
            let nextPageButton = document.createElement('button');
            nextPageButton.textContent = 'Next';
            nextPageButton.id = 'nextPage';
            paginationDiv.appendChild(nextPageButton);
        
            // Event listener for previous page button
            this.shadowRoot.getElementById('prevPage').addEventListener('click', () => {
                if (pageNumber > 0) {
                    pageNumber--;
                    populateTable(pageNumber, pageSize);
                }
            });
        
            // Event listener for next page button
            this.shadowRoot.getElementById('nextPage').addEventListener('click', () => {
                if (pageNumber < totalPages) {
                    pageNumber++;
                    populateTable(pageNumber, pageSize);
                }
            });
        };
        
        //billing - call create element billing component
        let displayBillingModal = (clientId) => {
            //create element for the billing component
            let billingComponent = document.createElement("billing-component");

            //create span element to pass clientId value to our slot
            let clientSpan = document.createElement("span");
            clientSpan.setAttribute("slot", "clientid");
            clientSpan.textContent = clientId;
            // Append the clientSpan span to the billing-component
            billingComponent.appendChild(clientSpan);

            this.shadowRoot.appendChild(billingComponent);
        }
    /*-----------------------------------------Confirm Dialog-------------------------------------*/
        let confirmDialog = this.shadowRoot.getElementById("con-dialog");
        let overlay = this.shadowRoot.getElementById("overlay");
        let clientIdValue;
        //delete - confirm delete action
        let confirmDeleteModal = (clientId) => {

            clientIdValue = clientId;
            //make confirmation dialog visible
            if(confirmDialog.style.display !== "block")
            {
                confirmDialog.style.display = "block";
                overlay.style.display = "block"
            }
        }

        //cancel button confirm dialog - cancel pending process
        let cancelButton = this.shadowRoot.getElementById("cancel-btn");
        cancelButton.addEventListener("click", ()=>{
            confirmDialog.style.display = "none";
                overlay.style.display = "none";
        });

        let closeButton = this.shadowRoot.getElementById("close-btn");
        closeButton.addEventListener("click", () => {
            confirmDialog.style.display = "none";
            overlay.style.display = "none";
        });
        
        //when confirm button is pressed delete file
        let confirmDeleteFile = this.shadowRoot.getElementById("confirm-btn");
        confirmDeleteFile.addEventListener("click", () => {
            //call delete function
            deleteFile(clientIdValue);
        });

        //delete file
        let deleteFile = (fileId) => {
            fetch(`/client/delete-file/${fileId}`,{
                method: 'DELETE'
            })
            .then((response) => {
                if(!response.ok){
                    return response.text().then((error) => {
                        throw new Error(error);
                    }) 
                }
                return response.text();
            })
            .then((data) => {
                confirmDialog.style.display = "none";
            overlay.style.display = "none";
                let message = data;
                populateTable(pageNumber, pageSize);
                //flashMessage("success-message", message);
                alert(message);
            })
            .catch(error => {
                confirmDialog.style.display = "none";
                overlay.style.display = "none";
                //flashMessage("error-flash-message", error);
                alert(message);
            })

            
        }
    /*________________________________________________________________________________________*/

        //payment history - call create element paymenthistory component
        let displayPaymentHistoryModal = (clientId) => {
            //create element for the billing component
            let paymentHistoryComponent = document.createElement("payment-history-component");

            //create span element to pass clientId value to our slot
            let clientSpan = document.createElement("span");
            clientSpan.setAttribute("slot", "clientid");
            clientSpan.textContent = clientId;
            // Append the clientSpan span to the billing-component
            paymentHistoryComponent.appendChild(clientSpan);

            this.shadowRoot.appendChild(paymentHistoryComponent);
        }

        // Function to open modal for adding dependency
        let openModal = (clientId) => {
            // Add your logic to open modal
            this.shadowRoot.getElementById('myModal').style.display = "block";
            let saveDep_btn = this.shadowRoot.getElementById("save-dep-btn");
            saveDep_btn.addEventListener("click", ()=>{
                saveDependency(clientId)
            });
        }

        // Function to close modal
        let closeModal = () => {
            this.shadowRoot.getElementById('myModal').style.display = "none";
        }

        // Function to save dependency
        let saveDependency = (clientId) => {
            // Add your logic to save dependency
            let depName = this.shadowRoot.getElementById('depName').value;
            let depSurname = this.shadowRoot.getElementById('depSurname').value;
            let relationship = this.shadowRoot.getElementById('relationship').value;
            let id_passport = this.shadowRoot.getElementById('id_passport').value;
            let dob = this.shadowRoot.getElementById('dob').value;
            let doc = this.shadowRoot.getElementById("dateOfCover").value;

            if(depName == "" || depSurname == "" || relationship == ""|| this.gender == "" || id_passport == "" || dob == "" || doc == "")
            {
                alert("Please fill in all fields");
            }else{
                // Creating dependency object
                let dependency = {
                    name: depName,
                    lastName: depSurname,
                    relationship: relationship,
                    gender: this.gender,
                    id_passport: id_passport,
                    dob: dob,
                    dateOfCover: doc,
                };

                // Send data to the server using Fetch API
                fetch(`/client/management/add/dependency/${clientId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers if required
                    },
                    body: JSON.stringify(dependency)
                })
                .then(response => {
                    if (!response.ok) {
                        if(response.status === 400)
                        {
                            alert("This dependent has already been registered");
                        }else{
                            alert('Error saving dependency:', response);
                        }
                    }
                
                    return response.json();
                }).then((data) => {
                    alert(`Dependent: ${data.name} ${data.lastName} has been successfuly added.`);
                    this.shadowRoot.getElementById('myModal').style.display = "";
                })
                .catch(error => {
                    
                });
            }
        }

        this.shadowRoot.querySelector(".close").addEventListener("click", ()=>{
            closeModal();
        });

        /*----------------------------------Display Policy Info Component-----------------------------*/
        let loadPolicyInfo = (fileId) => {
            let mainContentWrapper = this.shadowRoot.getElementById("client-info-main");
            mainContentWrapper.innerHTML = ``;
            let policyInfoComponent = document.createElement("policy-info-component");
			policyInfoComponent.id = "policy-info-component";
            if(policyInfoComponent)
            {
                policyInfoComponent.setAttribute('fileId', fileId);
                mainContentWrapper.appendChild(policyInfoComponent);
            }
        }

         //Tab button - loadPolicyInfo
         let policyInfoTabBtn = this.shadowRoot.getElementById('policy-info-btn');
         policyInfoTabBtn.addEventListener("click", () => {
            this.shadowRoot.getElementById("client-info-main").innerHTML = "";
            loadPolicyInfo(fileId);
         });
        /*------------------------------------------------------------------------------------------------*/

        /*----------------------------------Dependencies Info Component-----------------------------------------*/
        let dependencyTabBtn = this.shadowRoot.getElementById("dependants-btn");
        dependencyTabBtn.addEventListener("click", () => {
            this.shadowRoot.getElementById("client-info-main").innerHTML = "";

            //invoke dependency management component
            let mainContentWrapper = this.shadowRoot.getElementById("client-info-main");
            let dependencyManagementComponent = document.createElement("dependency-management-component");
            if(dependencyManagementComponent)
            {
               let client = clientsToShow.find(client => client.id == fileId);
               let policyHolderName = `${client.name} ${client.lastName}`;
               dependencyManagementComponent.setAttribute('fileId', fileId); 
               dependencyManagementComponent.setAttribute('policyHolderName', policyHolderName); 
               mainContentWrapper.appendChild(dependencyManagementComponent);
            }
        });
        
        /*------------------------------------------------------------------------------------------------*/
        // Function to show more information about a client
        let showMoreInfo = (id) => {
            // Find the client object
            let client = clientsToShow.find(client => client.id == id);

            //set heading
            let modalHeader = this.shadowRoot.getElementById("modal-heading");
            modalHeader.innerHTML = `<h1>Policy for: <span id="policy-holders-name">${client.title} ${client.name} ${client.lastName}</span></h1>`;

            fileId = id;
            idPassportNumber = client.id_passport;
            primaryClientName = client.name;
            primaryLastName = client.lastName;

            // Display the modal
            this.shadowRoot.getElementById('clientInfoModal').style.display = "block";
        }
        //-----End showMoreInfo
        /*______________________________________________________________________________________________*/


        // Function to close the client info modal
        let closeClientInfoModal = () => {
            this.shadowRoot.getElementById('clientInfoModal').style.display = "none";
        }


        this.shadowRoot.querySelector(".client-info-close").addEventListener("click", ()=>{
            closeClientInfoModal();
        });

/*-------------------------------Deacesed Information Processing-------------------------------------*/
        let fa_btn = this.shadowRoot.getElementById("fa-btn");
        fa_btn.addEventListener("click", () => {
            funeralArrangements();
        });

        /** 
        let funeralArrangements = () => {
            let fileNumber = fileId;
            let name = `${deceased.name} ${deceased.surname}`;
            id_pass = deceased.id_passport;
            
            location.href = "/funeral/management" + "?fileId=" + encodeURIComponent(fileNumber) + "&clientName=" + encodeURIComponent(clientName) + "&name=" +
             encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&id_passport=" + encodeURIComponent(id_pass) + "&dependentId=" + deceased.id;
        }
        */

        // Function to display clients in the table
        let displayClient = (clientsToShow) => {
            var table = this.shadowRoot.getElementById('clientList');
            table.innerHTML = '';
            clientsToShow.forEach((client) => {
                var row = `<tr>
                                <td>${client.clientid}</td>
                                <td>${client.name}</td>
                                <td>${client.lastName}</td>
                                <td>${client.maritalStatus}</td>
                                <td>${client.email}</td>
                                <td>
                                    <button onclick="openModal(${client.id})">Add Dependency</button>
                                    <button onclick="showMoreInfo(${client.id})">More Info</button>
                                </td>
                            </tr>`;
                table.innerHTML += row;
            });
        }

        // Function to filter clients by date
        function filterByDate() {
            var selectedDate = this.shadowRoot.getElementById('date').value;
            if (selectedDate === '') {
                // If no date selected, display all clients
                populateTable();
                return;
            }
            var filteredClients = clientsToShow.filter(client => client.dob === selectedDate);
            if (filteredClients.length > 0) {
                // Display filtered clients
                displayClient(filteredClients);
            } else {
                // Display message if no clients found for selected date
                this.shadowRoot.getElementById('clientList').innerHTML = '<tr><td colspan="7">No clients found for selected date</td></tr>';
            }
        }

        // Function to search for a client by ID
        let searchField = this.shadowRoot.getElementById("search");
        searchField.addEventListener("keyup",(event) => {
            var searchInput = event.target.value.trim();
            if (searchInput === '') {
                // If search input is empty, display all clients
                populateTable(pageNumber, pageSize);
                return;
            }


            //filter clientsToShow based on searchInput
            var foundClient = clientsToShow.find(client => client.clientid.includes(searchInput));
            if (foundClient) {
                // Display the found client
                displayClient([foundClient]);
            } else {
                // Display message if client not found
                this.shadowRoot.getElementById('clientList').innerHTML = '<tr><td colspan="7">Client not found</td></tr>';
            }
        })

        // Function to sort the table by column
        let sortTable = (colVal) => {
            let columnIndex = colVal;
             clients.sort((a, b) => {
            const valueA = a[Object.keys(a)[columnIndex]];
            const valueB = b[Object.keys(b)[columnIndex]];

            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB);
            } else {
                return valueA - valueB;
            }
        });

            // Re-populate the table with sorted data
            populateTable();
        }

        let columnSort_btn = this.shadowRoot.querySelectorAll(".columnSort");
        columnSort_btn.forEach((columnValue) => {
            columnValue.addEventListener("click", () => {
                sortTable(parseInt(columnValue.id));
            });
        });
        // Initial population of the table
        populateTable(pageNumber, pageSize);

/*____________________________________________________________________________________________________*/

/*-----------------------------------------Deceased Records-------------------------------------------*/
        //show deceased modal box
        let showDeceasedButton = this.shadowRoot.getElementById("show-deceased-btn");
        showDeceasedButton.addEventListener("click", () => {
            alert(fileId);
            
            let deceasedContainer = document.getElementById("deceased-records-component");
            let deceasedRecordsComponent = document.createElement("deceased-records-component");
            if (deceasedRecordsComponent) {
                deceasedRecordsComponent.setAttribute("fileId", fileId);
                deceasedContainer.appendChild(deceasedRecordsComponent);
                closeClientInfoModal();
            } else {
                console.error("Error: deceased-records-component not found");
            }
        });
    }

    getDepGender(){
        let gender = this.shadowRoot.querySelectorAll(".dep-gender-radButton");
        gender.forEach((gen) => {
            gen.addEventListener("click", () => {
                this.gender = gen.value;
            });
        })
    }
})
