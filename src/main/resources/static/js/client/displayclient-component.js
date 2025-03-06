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

        .container {
            width: 90%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
        }
        h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
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
            font-weight: 900;
        }

        tr:nth-child(even){
            background-color: #f1f5fa;
        }

        input[type="text"],
        input[type="date"],
        select {
            width: calc(100% - 24px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        input[type="radio"] {
            margin: 5px;
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
        #show-deceased-btn{
            background-color: black;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
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
            border-radius: 8px;
            position: relative;
        }

        #dependencyForm{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.2rem;
        }

        #rel-div{
            grid-column: span 2;
        }

        #dependencyForm button{
            grid-column: span 2;
            width: 50%;
            padding: 10px 0;
            margin: 0 auto;
            font-weight: bolder;
        }
        .close {
            color: #aaa;
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
        }
        /* Additional styles for the new modal */
        .client-info-modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
            padding-top: 60px;
        }

        .client-info-modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 50%;
            border-radius: 8px;
            position: relative;
            backround-color: gray;
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

        /*----------Modal top nav controls----------*/
        #client-infor-navbar{
            padding: 10px 0;
            margin: 40px auto;
        }
        /*---------------------------------*/

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

        .ACTIVATED{
            background-color: #c2e3c4;
            color: #69a06a;
            padding: 10px;
            box-sizing: border-box;
            text-align: center;
            border-radius: 5px; 
        }

        .INACTIVE{
            background-color: #fdc7cc;
            color: #d07473;
            padding: 10px;
            box-sizing: border-box;
            text-align: center;
            border-radius: 5px;
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
            font-weight: bold;
            font-size: 16px;
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
        #flash-message{
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100px;
            text-align: center;
        }

        .error-flash-message{
            width: 100%;
            color: white;
            border: 1px solid gray;
            background-color: red;
        }

        .success-message{
            width: 100%;
            color: white;
            border: 1px solid gray;
            background-color: green;
        }

        #flash-message-p{
            font-weight: bolder;
            padding: 20px 0;
            box-sizing: border-box;
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
            <div class="client-info-card" id="clientInfoCard">
                <!-- Client info will be populated here -->
            </div>
            <div class="client-info-card" id="subscriptionInfoCard">
                <table id="subscriptionTable"></table>
                <div id="plan-controls">
                    <h2>Change Current Policy</h2>
                    <select id="policy-option">
                        <option>1</option>
                    </select>
                    <button>Change Policy</button>
                </div>
            </div>
            <div class="client-info-card" id="dependencyInfoCard">
                <!-- dependency info will be populated here -->
                <table id="dependencyTable"></table>
            </div>
            <div class="client-info-controls">
                <button onclick="billing()">Billing</button>
                <button onclick="deleteClient()">Delete</button>
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
        let clientsToShow = [];
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

        // Function to populate the table with clients
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
            // Construct the Client Info Card HTML
            let clientInfoHTML = `
                <table>
                    <caption><h2>Policy Holder's Info</h2></caption> 
                    <tr>
                        <td>Province: </td>
                        <td>${client.province}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${client.address}</td>
                    </tr>
                   
                    <tr>
                        <td>Contact 1: </td>
                        <td>${client.phoneContact1}</td>
                    </tr>`;
            if(client.phoneContact2 > 0){
                clientInfoHTML += `
                <tr>
                    <td>Contact 2: </td>
                    <td>${client.phoneContact2}</td>
                </tr>`;
            }        
                    
            clientInfoHTML += `
                    <tr>
                        <td>D.O.B:</td>
                        <td>${client.dob}</td>
                    </tr>
                    <tr>
                        <td>Initials:</td>
                        <td>${client.initials}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>${client.gender}</td>
                    </tr>
                    <tr>
                        <td>ID/Passport Number:</td>
                        <td>${client.id_passport}</td>
                    </tr>
                </table>
                <div>
                    <button>Edit</button>
                </div>
            `;
            // Populate the client info card
            this.shadowRoot.getElementById('clientInfoCard').innerHTML = clientInfoHTML;

/*-----  ---------------------------View Package Plan-----------------------------------------*/
            let planTable = this.shadowRoot.getElementById('subscriptionTable');
            planTable.innerHTML = '';
            fetch(`/client/management/subscription/${id}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                return response.json();
            }).then((data) => {
                subscriptionPlan = {
                    "groupName": data.groupName,
                    "joiningFee": data.joiningFee,
                    "dateOfCover": data.dateOfCover,
                    "name": data.name
                }
                planTable.innerHTML += `
                    <caption><h2>Policy Info</h2></caption>
                    <tbody>
                    <tr>
                        <td><b>Plan Name</b></td><td>${subscriptionPlan.name}</td>
                    </tr>
                    <tr>
                        <td><b>Date Of Cover</b></td><td>${subscriptionPlan.dateOfCover}</td>
                    </tr>
                    <tr>
                        <td><b>Joining Fee</b></td><td>${subscriptionPlan.joiningFee}</td>
                    </tr>
                    <tr>
                        <td><b>Wait Period Left</b></td><td>${subscriptionPlan.joiningFee}</td>
                    </tr>
                    <tr>
                        <td><b>Lapse Period</b></td><td>${subscriptionPlan.joiningFee}</td>
                    </tr>
                    <tr>
                        <td><b>Balance Due</b></td><td>200.00</td>
                    </tr>
                    <tr>
                        <td><b>Member's Count</b></td><td>7 / 8</td>
                    </tr>
                    <tr>
                        <td><b>Group Name</b></td><td>${subscriptionPlan.groupName}</td>
                    </tr>
                    </tbody>
                `;

                let planControls = this.shadowRoot.getElementById("plan-controls");


            }).catch(error => {
                console.log(error);
            })
/*------------------------------------------------------------------------------------------------*/
            
/*----------------------------------View Dependencies-----------------------------------------*/
            let table = this.shadowRoot.getElementById('dependencyTable');
            table.innerHTML = '';
            fetch(`/client/management/dependencies/${id}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                return response.json();
            }).then((data) => {
                table.innerHTML += `
                    <caption><h2>Dependencies</h2></caption>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>D.O.B</th>
                        <th>Relationship</th>
                        <th>ID/Passport Number</th>
                    </tr>
                    </thead>
                `
                data.forEach((dependency) => {
                    dependencies.push({
                        id: dependency.id,
                        name: dependency.name,
                        surname: dependency.lastName,
                        id_passport: dependency.id_passport, 
                    });
                    let row = `
                        <tr>
                            <td>${dependency.name}</td>
                            <td>${dependency.lastName}</td>
                            <td>${dependency.gender}</td>
                            <td>${dependency.dob}</td>
                            <td>${dependency.relationship}</td>
                            <td>${dependency.id_passport}</td>
                        </tr>
                    
                        <tr>
                            <td colspan="7">
                                <button class="remove-dep-btn" id="${dependency.id}">Remove</button>
                                <button class="add-dep-btn" id="${dependency.id}">Replace</button>
                                <button class="deceased-btn" id="${dependency.id}">Deceased</button>
                            </td>
                        </tr>
                   `;
                    table.innerHTML += row;
                })

                let removeDep_btn = this.shadowRoot.querySelectorAll(".remove-dep-btn");
                removeDep_btn.forEach((remove_btn) => {
                    remove_btn.addEventListener("click", () => {
                        removeDependency(remove_btn.id, id);
                    })
                });

                let deceased_btn = this.shadowRoot.querySelectorAll(".deceased-btn");
                deceased_btn.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        /*-----preset-----*/
                        deceased_btn.forEach((btn) => {
                            btn.style.backgroundColor = "#007bff";
                            btn.style.color = "#fff";
                            btn.style.border = "none";
                        });
                        /*-----------------------------------------------------------------------*/

                        btn.style.backgroundColor = "white";
                        btn.style.color = "black";
                        btn.style.border = "1px solid black";
                        let id_val = parseInt(btn.id);
                        processDeaceased(id_val);
                    })
                });

            }).catch(error => {
                console.log(error);
            })
/*---------------------------------------------------------------------------------------------------*/

            // Display the modal
            this.shadowRoot.getElementById('clientInfoModal').style.display = "block";
        }

        //Remove dependency
        let removeDependency = (dependency_id, clientId) => {
            let dependencyId = parseInt(dependency_id);
            fetch(`/client/management/dependencies/remove/${dependencyId}`,{
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({clientid: clientId}),
            }).then((response) => {
                if(!response.ok){
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                 return response.text();
            }).then((data) => {
                alert(data);
            }).catch(error => {
                alert("Failed to delete dependent. Please try again later, if problem persist kindy contact web master: webmaster@altograce.co.za");
            })
        }

        // Function to close the client info modal
        let closeClientInfoModal = () => {
            this.shadowRoot.getElementById('clientInfoModal').style.display = "none";
        }


        this.shadowRoot.querySelector(".client-info-close").addEventListener("click", ()=>{
            closeClientInfoModal();
        });
/*-------------------------------Deacesed Information Processing-------------------------------------*/
        let processDeaceased = (id_val) => {
            deceased = dependencies.find(dependency => dependency.id === id_val);
        }

        let fa_btn = this.shadowRoot.getElementById("fa-btn");
        fa_btn.addEventListener("click", () => {
            funeralArrangements();
        });

        let funeralArrangements = () => {
            let fileNumber = fileId;
            let clientName = primaryClientName;
            let surname = primaryLastName;
            let name;
            if(deceased.name === undefined){
                name = "";
            }else{
                name = `${deceased.name} ${deceased.surname}`;
            }
                
            
            let id_pass;
            if(name !== ""){
                id_pass = deceased.id_passport;
            }else{
                id_pass = idPassportNumber;
            }
            
            location.href = "/funeral/management" + "?fileId=" + encodeURIComponent(fileNumber) + "&clientName=" + encodeURIComponent(clientName) + "&name=" +
             encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&id_passport=" + encodeURIComponent(id_pass) + "&dependentId=" + deceased.id;
        }

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
