let menu = {    
    cmcSelected(item)
    {
        item.className = "c-p-s"
    },

    selectedCmc: "",
    previousSelect: "",
    previousModal: "",
    content_menu_controls: document.getElementsByClassName("c-p-c"),
    profileContent: document.getElementById("view-branch"),

    menuControl(){
        //id is the key we need
        for(var i = 0; i < menu.content_menu_controls.length; i++)
        {
            menu.content_menu_controls[i].addEventListener("click", function(){

                switch(this.textContent)
                {
                    case "View Branches" : {
                        menu.cmcSelected(this);
                        menu.previousSelect = menu.selectedCmc;
                        menu.previousModal = menu.profileContent;
                        menu.selectedCmc = this;
                        menu.profileContent = document.getElementById("view-branch");
                        document.getElementById("update-branch-det").style.display = "none";
                        document.getElementById("update-branch-det").className = "c-p-c";
                        menu.profileContent.style.display = "grid";
                        }
                    break;
                    case "Add Branch" :  {
                        menu.cmcSelected(this);
                        menu.previousSelect = menu.selectedCmc;
                        menu.previousModal = menu.profileContent;
                        menu.selectedCmc = this;
                        menu.profileContent = document.getElementById("add-branch");
                        document.getElementById("update-branch-det").style.display = "none";
                        document.getElementById("update-branch-det").className = "c-p-c";
                        menu.profileContent.style.display = "grid";
                        }
                    break;
                }

                if(menu.previousModal !== menu.profileContent)
                {
                    menu.previousModal.style.display = "none";
                }
                
                //when not selected item goes back to default color
                if(menu.previousSelect !== "")
                {
                    
                    menu.previousSelect.className = "c-p-c";	
                }

                if(menu.previousSelect === menu.selectedCmc)
                {
                    menu.cmcSelected(this);
                }
            });
        }
    }
}
/*---------------------------------------------------------------------------------------------------------*/
/*----------------------- Fetch API - Update a Company - GetMapping ----------------------------------*/
/**
 * Fetch API
 * GET DATA
 * DISPLAY COMPANY DETAILS IN A FORM FIELD
 * HANDLE ERRORS
 */
let companyProfile = {
    // Map to store company details
    companies: {},
    selectedId: "",
    selectedCompany: document.getElementById("selected-company"),
    companyList: document.querySelector(".company-list"),

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
                    companyProfile.selectedId = this.getAttribute("data-id"); // Get the company ID
                    console.log("Selected Company ID:", companyProfile.selectedId + "from company profile");

                    // Update the selected company text
                    companyProfile.selectedCompany.innerHTML = selectedText + '<span class="dropdown-icon">▼</span>';
                    // Hide the company list
                    companyProfile.companyList.style.display = "none";
                });

                ulElement.appendChild(companyItem);
            }

            // Append ul to the company list
            companyProfile.companyList.appendChild(ulElement);

            //get branch companies
            //check if the view display is visible
            if(document.getElementById("view-branch").style.display != "")
            {
                getBranchCompanies();
            }
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
/*--------------------------------------------------------------------------------------------------------------*/

/*----------------------- Fetch API - Update a Company - GetMapping ----------------------------------*/
/**
 * Fetch API
 * GET DATA
 * DISPLAY COMPANY DETAILS IN A FORM FIELD
 * HANDLE ERRORS
 */
let getBranchCompanies = function()
{
    // Map to store company details
    let branchDetailsMap = {};
    fetch(`/admin/branch/branches/${companyProfile.selectedId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
            let viewDiv = document.getElementById("view-branch"); 
            viewDiv.style.gridTemplateColumns = "1fr";
            viewDiv.style.backgroundColor = "white";
            viewDiv.innerHTML = "";
            for(let branch of data)
            {
                let branchContainer = document.createElement("div");
                branchContainer.className = "view-container";
                branchContainer.innerHTML = `
                    <div class="branch-general-det">
                        <div>Branch Name: ${branch.name}</div>
                    </div>
                    <div class="branch-contact-det">
                        <div id="countryCode">Country Code: ${branch.countryCode}</div>
                        <div id="view-contact1">Contact: ${branch.contact1}</div>
                        <div id="view-contact2">Contact: ${branch.contact2}</div>
                        <div id="view-contact3">Contact: ${branch.contact3}</div>
                    </div>
                    <div class="branch-address-det">
                        <div>Country: ${branch.country}</div>
                        <div>Province: ${branch.province}</div>
                        <div>City: ${branch.city}</div>
                        <div>Post Code: ${branch.postCode}</div>
                        <div>Street: ${branch.street}</div>
                        <div>Stand Unit: ${branch.standUnit}</div>
                    </div>
                `
                viewDiv.appendChild(branchContainer);
                if(document.getElementById("view-contact1").value == "")
                {
                    document.getElementById("view-contact1").style.display = "none";
                }

                if(document.getElementById("view-contact2").value == "")
                {
                    document.getElementById("view-contact2").style.display = "none";
                }

                if(document.getElementById("view-contact3").value == "")
                {
                    document.getElementById("view-contact3").style.display = "none";
                }

                if(document.getElementById("countryCode").value == "")
                {
                    document.getElementById("countryCode").style.display = "none";
                }

                const updateBranch_btn = document.createElement("button");
                updateBranch_btn.innerText = "Update";
                branchContainer.appendChild(updateBranch_btn);

                updateBranch_btn.addEventListener("click", ()=>{
                    branchDetailsMap = {
                        id: branch.id,
                        name: branch.name,
                        countryCode: branch.countryCode,
                        contact1: branch.contact1,
                        contact2: branch.contact2,
                        contact3: branch.contact3,
                        country: branch.country,
                        provine: branch.province,
                        city: branch.city,
                        postCode: branch.postCode,
                        street: branch.street,
                        standUnit: branch.standUnit,
                    }

                    document.getElementById("update-branch-det").style.display = "grid";
                    document.getElementById("update-branch-det").className = "c-p-s";
                    document.getElementById("view-branch").style.display = "none";
                    document.getElementById("view-branch").className = "c-p-c";
                    branchUpdate(branchDetailsMap);
                })
            }

        /* Add event listener for change event on the select element
        select.addEventListener('change', function() {
            // Get the selected company ID
            const selectedBranchId = select.value;
            // Get company details from the map
            const branchDetails = companyDetailsMap[selectedBranchId];
            */
    })
    .catch(error => {
        let viewDiv = document.getElementById("view-branch"); 
        viewDiv.style.gridTemplateColumns = "1fr";
        viewDiv.style.backgroundColor = "white";
        viewDiv.innerHTML = "";
        let error_msg = document.createElement("p");
        error_msg.id = "branch-error-msg";
        error_msg.innerText = `No branch company has been found, please add!`;
        viewDiv.appendChild(error_msg);
    });
}
/*--------------------------------------------------------------------------------------------------------------*/
/*Get branch object when update btn is clicked
*/

let branchUpdate = (branch) => { 
    /*display data into form field*/
    document.getElementById("u-b-n").value = branch.name;
    document.getElementById("u-b-c1").value = branch.contact1;
    document.getElementById("u-b-c2").value = branch.contact2;
    document.getElementById("u-b-country").value = branch.country;
    document.getElementById("u-b-province").value = branch.province;
    document.getElementById("u-b-city").value = branch.city;
    document.getElementById("u-b-postCode").value = branch.postCode;
    document.getElementById("u-b-street").value = branch.street;
    document.getElementById("u-b-standUnit").value = branch.standUnit;

    document.getElementById("update-branch-btn").addEventListener("click", ()=>{
        const branchId = branch.id;

        /*get new data from form field*/
        const formData = {
            name: document.getElementById("u-b-n").value,
            contact1: document.getElementById("u-b-c1").value,
            contact2: document.getElementById("u-b-c2").value,
            country: document.getElementById("u-b-country").value,
            province: document.getElementById("u-b-province").value,
            city: document.getElementById("u-b-city").value,
            postCode: document.getElementById("u-b-postCode").value,
            street: document.getElementById("u-b-street").value,
            standUnit: document.getElementById("u-b-standUnit").value,
        };

        //requst a update fetch api
         //fetch api sending data to backend for update
         fetch(`/admin/branch/update/${branchId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.body}`);
            }
            response.json()
        })
        .then(data => {
            //pass message to modal box
            let title = "Update Message:";
            let message = `Branch ${formData.name} details has been successfuly updated`;
            displayModal(title, message);
            console.log("updated successfuly");
        })
        .catch(error => {
            errorModal("Update Error Message", error)
        })
        
    });
        
}

/*----------------------- Fetch API - Add A Branch Company - GetMapping ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * Display result message
 * HANDLE ERRORS
 */

let addBranchCompany = function()
{
    document.getElementById("add-branch-btn").addEventListener("click", function(){
        //company with id to be updated
        let id = document.getElementById('branch-add-select').value;
        //check if a valid company is selected
        if(companyProfile.selectedId < 1 || companyProfile.selectedId === "")
        {
            alert("Please select a valid company");
        }else{
            //branch company form-data
            const formData = {
                name: document.getElementById('branch-name').value,
                countryCode: document.getElementById('country-code').value,
                contact1: document.getElementById('add-con-det1').value,
                contact2: document.getElementById('add-con-det2').value,
                contact3: document.getElementById('add-con-det3').value,
                country: document.getElementById('country').value,
                province: document.getElementById('province').value,
                city: document.getElementById('city').value,
                postCode: document.getElementById('post-code').value,
                street: document.getElementById('street').value,
                standUnit: document.getElementById('stand-unit').value,
            }

            //fetch api sending data to backend inorder to save/add new branch
            fetch(`/admin/branch/add/${companyProfile.selectedId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.body}`);
                }
                response.json()
            })
            .then(data => {
                //pass message to modal box
                let title = "Success Message:";
                let message = `Branch Company: ${formData.name} has been successfuly added`;
                displayModal(title, message);
            })
            .catch(error => {
                errorModal("Save Error Message", error)
            })
        }
    });
}

/*----------------------------------------------------------------------------------------------------*/
//menu control
menu.menuControl();

//select company
companyProfile.fetchData();

document.getElementById("view-branch-btn").addEventListener("click", ()=>{
    getBranchCompanies();
});

//add branch company
addBranchCompany();
//document.title = "Leroy";
