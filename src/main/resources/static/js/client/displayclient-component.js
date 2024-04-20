/**
 * @author Le-Roy Jongwe
 * @Date 06 March 2024
 * @description component for displaying clients
 */

customElements.define("display-client", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =`<style>

        :host{
            width: 90%;
        }
        .container {
            max-width: 90%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
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
            width: 80%;
            border-radius: 8px;
            position: relative;
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
            color: green;
            border: 1px solid green;
        }

        .INACTIVE{
            color: red;
            border: 1px solid red;
        }

    </style>

    <div class="container">
        <h2>Clients Information</h2>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <input type="text" id="search" placeholder="Search by Client ID..">
            <!--<input type="date" id="date" onchange="filterByDate()">-->
        </div>
        <table id="clientTable">
            <thead>
                <tr>
                    <th class="columnSort" id="0">Client ID</th>
                    <th class="columnSort" id="1">Name</th>
                    <th class="columnSort" id="2">Last Name</th>
                    <th class="columnSort" id="3">Email</th>
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
                <input type="text" id="depName" placeholder="Name" required><br>
                <input type="text" id="depSurname" placeholder="Surname" required><br>
                <select id="relationship" required>
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="uncle">Uncle</option>
                    <option value="auntie">Auntie</option>
                    <option value="grandfather">Grandfather</option>
                    <option value="grandmother">Grandmother</option>
                </select><br>
                <label for="male">Male:</label>
                <input type="radio" id="male" name="gender" value="male">
                <label for="female">Female:</label>
                <input type="radio" id="female" name="gender" value="female"><br>
                <input type="text" id="id_passport" placeholder="ID/Passport" required><br>
                <input type="date" id="dob" placeholder="Date of Birth" required><br>
                <input type="date" id="dateOfCover" placeholder="Date of Cover"><br>
                <button type="button" id="save-dep-btn">Save</button>
            </form>
        </div>
    </div>

    <!-- Modal for client information -->
    <div id="clientInfoModal" class="client-info-modal">
        <div class="client-info-modal-content">
            <span class="client-info-close">&times;</span>
            <div class="client-info-card" id="clientInfoCard">
                <!-- Client info will be populated here -->
            </div>
            <div class="client-info-card" id="subscriptionInfoCard">
                <!-- dependency info will be populated here -->
                <table id="subscriptionTable"></table>
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
        let primaryClientName = "";
        let primaryLastName = "";
        let clientsToShow = [];
        let dependencies = [];
        /**
         * this will keep track some fields of the deceased 
         */
        let deceased = {};
        let pageNumber = 0;
        let pageSize = 10; // Change this according to your requirement
        // Function to populate the table with clients
        let populateTable = (pageNumber, pageSize) => {
            fetch(`/client/management/clients/${userData.companyId}?page=${parseInt(pageNumber)}&size=${parseInt(pageSize)}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                return response.json();
            }).then((data) => {
                /*data.forEach((client) => {
                    clients.push({
                        id: client.id,
                        clientid: client.clientid,
                        name: client.name,
                        lastName: client.lastName,
                        maritalStatus: client.maritalStatus,
                        email: client.email,
                        country: client.country,
                        province: client.province,
                        residentialAddress: `Street:  ${client.street}, unit/house number: ${client.standUnit}`,
                        postalAddress: client.postCode,
                        cellNumber: client.cellNumber,
                        homeNumber: client.homeNumber,
                        telephone: client.telephone,
                        firstInitials: client.firstInitials,
                        gender: client.gender,
                        idPassportNumber: client.id_passport,
                    });
                })*/

                let table = this.shadowRoot.getElementById('clientList');
                table.innerHTML = '';
                clientsToShow = data.content;
                clientsToShow.forEach((client) => {
                    var row = `<tr>
                    <td>${client.clientid}</td>
                    <td>${client.name}</td>
                    <td>${client.lastName}</td>
                    <td>${client.email}</td>
                    <td class="client.activationStatus">${client.activationStatus}</td>
                    <td>
                        <button class="billing-btn" id="${client.clientid}">Pay</button>
                        <button class="payment-history-btn" id="${client.clientid}">Payment history</button>
                        <button class="add-dep-btn" id="${client.clientid}">Add Dep</button>
                        <button class="moreinfo-btn" id="${client.clientid}">More Info</button>
                    </td>
                    </tr>`;
                    table.innerHTML += row;
                });

                // Update pagination controls based on totalPages
                let totalPages = data.totalPages;
                updatePaginationControls(totalPages, pageNumber, pageSize);

                let addDep_btn = this.shadowRoot.querySelectorAll(".add-dep-btn");
                addDep_btn.forEach((add_btn) => {
                    add_btn.addEventListener("click", () => {
                        openModal(add_btn.id);
                    })
                });

                let billing_btn = this.shadowRoot.querySelectorAll(".billing-btn");
                billing_btn.forEach((billing) => {
                    billing.addEventListener("click", () => {
                        let idValue = billing.id;
                        displayBillingModal(idValue.toString());
                    })
                });

                let paymentHistory_btn = this.shadowRoot.querySelectorAll(".payment-history-btn");
                paymentHistory_btn.forEach((history) => {
                    history.addEventListener("click", () => {
                        let idValue = history.id;
                        displayPaymentHistoryModal(idValue.toString());
                    })
                });

                let moreinfo_btn = this.shadowRoot.querySelectorAll(".moreinfo-btn");
                moreinfo_btn.forEach((viewinfo_btn) => {
                    viewinfo_btn.addEventListener("click", () => {
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
            var depName = this.shadowRoot.getElementById('depName').value;
            var depSurname = this.shadowRoot.getElementById('depSurname').value;
            var relationship = this.shadowRoot.getElementById('relationship').value;
            var gender = this.shadowRoot.querySelector('input[name="gender"]:checked').value;
            var id_passport = this.shadowRoot.getElementById('id_passport').value;
            var dob = this.shadowRoot.getElementById('dob').value;
            let doc = this.shadowRoot.getElementById("dateOfCover").value;
            
            // Creating dependency object
           let dependency = {
                name: depName,
                relationship: relationship,
                gender: gender,
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
                if (response.ok) {
                    console.log('Dependency saved successfully.');
                } else {
                    console.error('Failed to save dependency.');
                }
            })
            .catch(error => {
                console.error('Error saving dependency:', error);
            });
        }

        this.shadowRoot.querySelector(".close").addEventListener("click", ()=>{
            closeModal();
        });

        // Function to show more information about a client
        let showMoreInfo = (clientId) => {
            // Find the client object
            let client = clientsToShow.find(client => client.clientid === clientId);
            fileId = clientId;
            primaryClientName = client.name;
            primaryLastName = client.lastName;
            // Construct the Client Info Card HTML
            let clientInfoHTML = `
                <table>
                    <tr>
                        <td>Residential Address:</td>
                        <td>${client.residentialAddress}</td>
                    </tr>
                    <tr>
                        <td>Marital Status:</td>
                        <td>${client.maritalStatus}</td>
                    </tr>
                    <tr>
                        <td>Postal Address:</td>
                        <td>${client.postalAddress}</td>
                    </tr>
                    <tr>
                        <td>Cell Number:</td>
                        <td>${client.cellNumber}</td>
                    </tr>
                    <tr>
                        <td>Home Number:</td>
                        <td>${client.homeNumber}</td>
                    </tr>
                    <tr>
                        <td>Telephone:</td>
                        <td>${client.telephone}</td>
                    </tr>
                    <tr>
                        <td>First Initials:</td>
                        <td>${client.firstInitials}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>${client.gender}</td>
                    </tr>
                    <tr>
                        <td>Package Plan Name:</td>
                        <td>${client.packagePlanName}</td>
                    </tr>
                    <tr>
                        <td>ID/Passport Number:</td>
                        <td>${client.idPassportNumber}</td>
                    </tr>
                </table>
            `;
            // Populate the client info card
            this.shadowRoot.getElementById('clientInfoCard').innerHTML = clientInfoHTML;

/*----------------------------------View Package Plan-----------------------------------------*/
            let planTable = this.shadowRoot.getElementById('subscriptionTable');
            planTable.innerHTML = '';
            fetch(`/client/management/subscription/${clientId}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                return response.json();
            }).then((data) => {
                planTable.innerHTML += `
                    <caption><h2>Package Subscription Plan</h2></caption>
                    <thead>
                    <tr>
                        <th>Plan Name</th>
                        <th>Date Of Cover</th>
                        <th>Group Name</th>
                        <th>Joining Fee</th>
                    </tr>
                    </thead>
                `
                let subscriptionPlan = {
                        "groupName": data.groupName,
                        "joiningFee": data.joiningFee,
                        "dateOfCover": data.dateOfCover,
                        "name": data.name
                    }
                let row = `
                    <tr>
                        <td>${subscriptionPlan.name}</td>
                        <td>${subscriptionPlan.dateOfCover}</td>
                        <td>${subscriptionPlan.groupName}</td>
                        <td>${subscriptionPlan.joiningFee}</td>
                    </tr>
                `;
                planTable.innerHTML += row;

            }).catch(error => {
                console.log(error);
            })
/*------------------------------------------------------------------------------------------------*/
            
/*----------------------------------View Dependencies-----------------------------------------*/
            let table = this.shadowRoot.getElementById('dependencyTable');
            table.innerHTML = '';
            fetch(`/client/management/dependencies/${clientId}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                return response.json();
            }).then((data) => {
                table.innerHTML += `
                    <caption><h1>Dependencies</h1></caption>
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
                        removeDependency(remove_btn.id, clientId);
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

        // Example functions for the client info controls
        let billing = () => {
            console.log('Billing button clicked');
        }

        let deleteClient = () => {
            console.log('Delete button clicked');
        }

        let viewDependency = () => {
            console.log('View Dependency button clicked');
        }
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
            let name = deceased.name;
            let id_pass = deceased.id_passport;
            
            location.href = "/funeral/management" + "?fileId=" + encodeURIComponent(fileNumber) + "&clientName=" + encodeURIComponent(clientName) + "&name=" + encodeURIComponent(name) + "&surname=" + encodeURIComponent(surname) + "&id_passport=" + encodeURIComponent(id_pass);
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
        })
    }
})
