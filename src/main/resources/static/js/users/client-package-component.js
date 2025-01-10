/**
 * @author Le-Roy Jongwe
 * @Date 23 February 2024
 * @description compnent for package seclection and adding
 */

customElements.define("add-package", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
            :host {
            display: block;
            }

            .container {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
        
            .card {
                background-color: #f9f9f9;
                border-radius: 5px;
                margin: 10px 0;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        
            .card input[type="radio"] {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid #ccc;
                margin-right: 10px;
                cursor: pointer;
            }
        
            .card input[type="radio"]:checked {
                background-color: #2196F3;
                border-color: #2196F3;
            }
        
            .card label {
                font-size: 18px;
                cursor: pointer;
            }
        
            .read-more-button {
                background-color: #4CAF50;
                color: white;
                padding: 5px 10px;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }
        
            .read-more-button:hover {
                background-color: #45a049;
            }
        
            .details-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
                display: none;
            }
        
            .details-modal {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                position: fixed;
                top: 10%;
                left: 10%;
                width: 80%;
                z-index: 9999;
                display: none;
            }
        
            .details-modal h3 {
                margin-top: 0;
            }
        
            .details-modal .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #ccc;
                color: #333;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                cursor: pointer;
            }
        
            .details-modal .close-button:hover {
                background-color: #999;
            }
        
            .add-package-button {
                background-color: #2196F3; /* Blue color */
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s;
            }
        
            .add-package-button:hover {
                background-color: #0d8ae0; /* Darker shade of blue on hover */
            }
        
            .details-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
        
            .details-table th, .details-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
        
            .details-table th {
                background-color: #f2f2f2;
            }
        
            @media (max-width: 768px) {
                .details-modal {
                    width: 80%;
                }
            }
        </style>

        <div id="wrapper">
            <div class="container" id="container">
            <h2>Select a Package:</h2>

            <div id="packages">
                <!-- Packages will be dynamically added here -->
            </div>
            </div>

            <div class="details-overlay"></div>

            <div id="details-modal" class="details-modal">
                <button class="close-button">X</button>
                <h3>Package Details</h3>
                <div id="package-details">
                    <!-- Package details will be dynamically added here -->
                </div>
            </div>
        </div>
        `;
        let packages = {};
        let renderPackages = () => {
            const packagesDiv = this.shadowRoot.getElementById('packages');
            //delay fetch, userData has to be initialised first
            setTimeout(() => {
                
                fetch(`/package/packages`)
                .then(response => {
                    return response.json();
                }).then(data => {
                    //fetch
                    data.forEach((pkg, index) => {
                        packages = {
                            id: pkg.id,
                            packageName: pkg.policyName,
                            membersCount: pkg.membersCount,
                            price: pkg.premiumAmount,
                            waitPeriod: pkg.waitPeriod,
                        }

                        const card = document.createElement('div');
                        card.className = 'card';
                        card.innerHTML = `
                            <div>
                                <input type="radio" class="package-radio-btn" name="package" value="${pkg.id}" id="package${pkg.id}">
                                <label for="package${pkg.id}">${pkg.policyName} - ${pkg.premiumAmount} - ${pkg.membersCount} Members</label>
                            </div>
                            <button class="read-more-button" id="${pkg.id}">Read More</button>
                        `;
                        packagesDiv.appendChild(card);
                    });
                    
                    let radioPackage_btn = this.shadowRoot.querySelectorAll(".package-radio-btn");
                    radioPackage_btn.forEach((btn) => {
                        btn.addEventListener("click", () => {
                            clientRegistration.formData.packageId = btn.value;
                            clientRegistration.formData.waitPeriod = packages[btn.value].waitPeriod;
                        });
                    });
                    /*
                    let readMore_btn = this.shadowRoot.querySelectorAll(".read-more-button");
                    readMore_btn.forEach((btn) => {
                        btn.addEventListener("click", () => {
                            let packageId = parseInt(btn.id);
                            showDetails(packageId);
                        });
                    });
                    */
                })
            }, 2000);
        }

        /*
        let showDetails = (packageId) => {
            const packageDetailsDiv = this.shadowRoot.getElementById('package-details');
            packageDetailsDiv.innerHTML = '';

            const detailsOverlay = this.shadowRoot.querySelector('.details-overlay');
            detailsOverlay.style.display = 'block';

            const detailsModal = this.shadowRoot.getElementById('details-modal');
            detailsModal.style.display = 'block';

            //items offered on package
            const itemsTable = document.createElement('table');
            itemsTable.className = 'details-table';
            let packageForm = {packageType: "standard"};
            fetch(`/package/items/${packageId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packageForm),
            })
            .then(response => response.json())
            .then(data => {
                const itemsHeading = document.createElement('h4');
                itemsHeading.textContent = 'Items:';
                packageDetailsDiv.appendChild(itemsHeading);

                const itemsHeaderRow = document.createElement('tr');
                itemsHeaderRow.innerHTML = '<th>Item</th><th>Quantity</th>';
                itemsTable.appendChild(itemsHeaderRow); 
                data.forEach(item => {
                    const itemRow = document.createElement('tr');
                    itemRow.innerHTML = `<td>${item.itemName}</td><td>${item.itemQuantity}</td>`;
                    itemsTable.appendChild(itemRow);
                    packageDetailsDiv.appendChild(itemsTable);
                });
            }).catch(error => {
            });    

            
            const servicesTable = document.createElement('table');
            servicesTable.className = 'details-table';
            let serviceForm = {packageType: "standard"};
            fetch(`/package/services/${packageId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceForm),
            })
            .then(response => response.json())
            .then(data => {
                const servicesHeading = document.createElement('h4');
                servicesHeading.textContent = 'Services:';
                packageDetailsDiv.appendChild(servicesHeading);

                const servicesHeaderRow = document.createElement('tr');
                servicesHeaderRow.innerHTML = '<th>Service Name</th><th>Description</th>';
                servicesTable.appendChild(servicesHeaderRow);
                data.forEach(service => {
                    const serviceRow = document.createElement('tr');
                    serviceRow.innerHTML = `<td>${service.serviceName}</td><td>${service.description}</td>`;
                    servicesTable.appendChild(serviceRow);
                });
                packageDetailsDiv.appendChild(servicesTable);
            }).catch(error => {
                
            });
        }
        */

        /*
        let closeDetails = () => {
            const detailsOverlay = this.shadowRoot.querySelector('.details-overlay');
            detailsOverlay.style.display = 'none';

            const detailsModal = this.shadowRoot.getElementById('details-modal');
            detailsModal.style.display = 'none';
        }
        */

        /*
        let close_btn = this.shadowRoot.querySelectorAll(".close-button");
        close_btn.forEach((btn) => {
            btn.addEventListener("click", () => {
                closeDetails();
            });
        });
        */
        renderPackages();
    }
});