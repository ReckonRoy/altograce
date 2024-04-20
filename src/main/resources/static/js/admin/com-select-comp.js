/**
 * @author Le-Roy
 * @date 19 March 2024
 * @description this script manages the main content of the page
 * 
 */
let comId = {'id': 0};

customElements.define("comselect-component", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =`
      <style>
      /*-----------------------------------------------------------------------------------------------------*/
        #main-header {
            box-sizing: border-box;
            grid-column: 1/3;
            display: flex;
            padding: 20px 0;
            /* Add your main header styles here */
        }

        #selected-company {
            position: relative;
            display: inline-block;
            border-bottom: 1px solid #000;
            cursor: pointer;
        }

        #selected-company .dropdown-icon {
            margin-left: 5px;
        }

        .company-list {
            position: absolute;
            display: none;
            border: 1px solid #333;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 5px;
            border-radius: 4px;
            z-index: 1;
            /* Additional styling for the company list */
        }

        .company-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .company-list li {
            cursor: pointer;
            transition: background-color 0.3s;
            padding: 8px;
        }

        .company-list li:hover {
            background-color: #f0f0f0;
        }

        .no-companies-message {
            padding: 5px 0;
        }
        /*---------------------------------------------------------------------------------------------------*/

      </style>
      <div id="main-header">
      <div id="company-profile">
        <label>Select company you would like to interact with:</label>
        <div id="selected-company">
          <!-- Displayed company text from selected list -->
          Company?
          <span class="dropdown-icon">▼</span>
        </div>
        <div class="company-list">
          <!-- Message to display if there is no registered company -->
          <p class="no-companies-message">No available companies registered</p>
          <!-- List of companies will be dynamically added here -->
        </div>
      </div>
      `
      let companyProfile = {
        // Map to store company details
        companies: {},
        selectedCompany: this.shadowRoot.getElementById("selected-company"),
        companyList: this.shadowRoot.querySelector(".company-list"),
    
        fetchData: () => {
    
            companyProfile.selectedCompany.addEventListener("click", function () {
                // Toggle company list visibility
                if (companyProfile.companyList.style.display == "") {
                    companyProfile.companyList.style.display = "block";
                } else {
                    companyProfile.companyList.style.display = "";
                }
            });
    
            fetch("/company/profile/data")
            .then(response => response.json())
            .then(data => {
                //store returned object into companies
                data.forEach(company => {
                    companyProfile.companies[company.id] = {
                        name: company.name
                    };
                });
    
                // Clear existing content
                companyProfile.companyList.innerHTML = "";
    
                // Create ul element dynamically
                var ulElement = document.createElement("ul");
                ulElement.style.listStyle = "none";
                ulElement.style.padding = "0";
                ulElement.style.margin = "0";
    
                // Populate company list
                for (var companyId in companyProfile.companies) {
                    var companyItem = document.createElement("li");
                    companyItem.textContent = companyProfile.companies[companyId].name;
                    companyItem.setAttribute("data-id", companyId); // Set data-id attribute with the company ID
                    companyItem.style.cursor = "pointer";
                    companyItem.style.transition = "background-color 0.3s";
                    companyItem.style.padding = "8px";
    
                    companyItem.addEventListener("click", function () {
                        var selectedText = this.textContent;
                        comId.id = this.getAttribute("data-id"); // Get the company ID
                        console.log("Selected Company ID:", comId.id + "from company profile");
    
                        // Update the selected company text
                        companyProfile.selectedCompany.innerHTML = selectedText + '<span class="dropdown-icon">▼</span>';
                        // Hide the company list
                        companyProfile.companyList.style.display = "none";
                    });
    
                    ulElement.appendChild(companyItem);
                }
    
                // Append ul to the company list
                companyProfile.companyList.appendChild(ulElement);
            })
            .catch(error => {
                console.log(error);
                // Clear existing content
                companyProfile.companyList.innerHTML = "";
    
                // If companies is empty, display the no-companies message
                companyProfile.companyList.innerHTML = '<p class="no-companies-message">No available companies registered</p>';
            });
        },
    }
    
    //call companyProfile()
    companyProfile.fetchData();
    /*------------------------------------------------------------------------------------------------------------*/
    }
});

