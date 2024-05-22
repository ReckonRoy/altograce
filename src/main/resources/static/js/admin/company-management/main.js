/*----------------------- Fetch API - Update a Company - GetMapping ----------------------------------*/
/**
 * Fetch API
 * GET DATA
 * DISPLAY COMPANY DETAILS IN A FORM FIELD
 * HANDLE ERRORS
 */
let getCompanyDetails = function(selectId)
{
    let companyDetailsMap = {}; // Map to store company details
    let select = document.getElementById(selectId);
    fetch("/company/profile/data")
    .then(response => response.json())
    .then(data => {
        // Ensure the 'select' element is not null before manipulating 'innerHTML'
        if (select) {
            // Clear existing options
            select.innerHTML = '';
            let option = document.createElement('option');
            option.value = "";
            option.text = "-- Select Company --";
            select.appendChild(option);
            
            // Populate options from the fetched data
            data.forEach(company => {
                option = document.createElement('option');
                option.value = company.id;
                option.text = company.name;
                select.appendChild(option);
                
                // Store company details in the map
                companyDetailsMap[company.id] = {
                    country: company.country,
                    province: company.province,
                    city: company.city,
                    postCode: company.postCode,
                    street: company.street,
                    standUnit: company.standUnit
                };
            });

            // Add event listener for change event on the select element
            select.addEventListener('change', function() {
                // Get the selected company ID
                const selectedCompanyId = select.value;
                // Get company details from the map
                const companyDetails = companyDetailsMap[selectedCompanyId];
                // Populate form fields with the retrieved company details
                document.getElementById('update-country').value = companyDetails.country;
                document.getElementById('update-province').value = companyDetails.province;
                document.getElementById('update-city').value = companyDetails.city;
                document.getElementById('update-post-code').value = companyDetails.postCode;
                document.getElementById('update-street').value = companyDetails.street;
                document.getElementById('update-stand-unit').value = companyDetails.standUnit;
            });
        } else {
            console.error('Element with id "company-select" not found.');
        }
    })
    .catch(error => {
        let error_msg = document.getElementById("update-error-msg");
        error_msg.innerText = `Error fetching companies: ${error}`;
    });
}

/*----------------------------------------------------------------------------------------------------*/
/*----------------------- Fetch API - Update a Company - PutMapping ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * UPDATE COMPANY DETAILS
 * HANDLE ERRORS
 */
let updateCompany = function()
{
    let update_btn = document.getElementById("update-btn");
    update_btn.addEventListener("click", function()
    {
        //company with id to be updated
        let id = document.getElementById('company-select').value;
        
        //check if a valid company is selected
        if(id < 1 || id === "")
        {
            console.log("Please select a valid company");
        }else{
            //form with data to update
            const updateData = {
                country: document.getElementById('update-country').value,
                province: document.getElementById('update-province').value,
                city: document.getElementById('update-city').value,
                postCode: document.getElementById('update-post-code').value,
                street: document.getElementById('update-street').value,
                standUnit: document.getElementById('update-stand-unit').value,
            }

            //fetch api sending data to backend for update
            fetch(`/company/update/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
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
                let message = `Company: ${formData.name} with registration number: ${formData.regNumber} has been successfuly updated`;
                displayModal(title, message);
            })
            .catch(error => {
                errorModal("Update Error Message", error)
            })
        }
    });    
}


/******************************************************************************************/
function cmcSelected(item)
{
    item.className = "c-p-s"
}
var content_menu_controls = document.getElementsByClassName("c-p-c");

var selectedCmc = "";
var previousSelect = "";
var previousModal = "";
var profileContent = document.getElementById("view-content");
//id is the key we need
for(var i = 0; i < content_menu_controls.length; i++)
{
    content_menu_controls[i].addEventListener("click", function(){

        switch(this.textContent)
        {
            case "View" : {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("view-content");
                 profileContent.style.display = "grid";
                 }
            break;
            case "Add Company HQ" :  {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("company-reg-form");
                 profileContent.style.display = "grid";
                }
            break;
            case "Update Account" : {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("update-content");
                 profileContent.style.display = "grid";
                 
                }
            break;
            case "Bank Account" :  {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("a-bank-det");
                 profileContent.style.display = "grid";
                }
            break;
            case "SLA" :  {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("sla");
                 profileContent.style.display = "grid";
                }
            break;
            case "Code Of Conduct" :  {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("code-o-conduct");
                 profileContent.style.display = "grid";
                }
            break;
            case "Ethics" :  {
                 cmcSelected(this);
                 previousSelect = selectedCmc;
                 previousModal = profileContent;
                 selectedCmc = this;
                 profileContent = document.getElementById("ethics");
                 profileContent.style.display = "grid";
                }
            break;
        }

        if(previousModal !== profileContent)
        {
            previousModal.style.display = "none";
        }
        
        //when not selected item goes back to default color
        if(previousSelect !== "")
        {
            
            previousSelect.className = "c-p-c";	
        }

        if(previousSelect === selectedCmc)
        {
            cmcSelected(this);
        }
    });
}
/*-------- End -------*/

/*----------------------- Fetch API - Register a company ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * ADD COMPANY DETAILS
 * HANDLE ERRORS
 */
//document.title = "Leroy";
let registerCompany = function()
{
    const formPost = document.getElementById("company-reg-form");

    /**
     * When clicked we get form data
     * we supply the form data to fetch api
     * we post the data to back end
     */
    formPost.addEventListener('submit', function(event){
        event.preventDefault();
        
        const formData = {
            name: document.getElementById("cname-field").value,
			regNumber: document.getElementById("reg-number").value,	
			taxNumber: document.getElementById("tax-number").value,
			fspNumber: document.getElementById("fsp-number").value,
            initials: document.getElementById("initials-field").value,
			email: document.getElementById("cemail-field").value,
            countryCode: document.getElementById("country-code").value,
			contact1: document.getElementById("comp-contact-details").value,
			contact2: document.getElementById("comp-contact-details2").value,
		    contact3: document.getElementById("comp-contact-details3").value,
			country: document.getElementById("country").value,
			province: document.getElementById("province").value,
			city: document.getElementById("city").value,
			postCode: document.getElementById("postal-code").value,
			street: document.getElementById("street").value,				
			standUnit: document.getElementById("stand-unit").value,
		}

        //post form data to server
        fetch("/company/admin/company-management/add",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.text}`);
            }
            response.text()
        })
        .then( data => {
            //pass message to modal box
            let title = "Registration Message:";
            let message = `Company: ${formData.name} with registration number: ${formData.regNumber} has been successfuly registered`;
            displayModal(title, message);
        })
        .catch(error => {
            errorModal("Error Saving Data:", "Could not save your data! Please try again later");
        });
    });
}

if(document.getElementsByClassName("view-branch") !== ""){
    //route to view branch
    const vbElem = document.getElementsByClassName("view-branch");
    for( let elem = 0; elem < vbElem.length; elem++)
    {
        document.getElementsByClassName("view-branch")[elem].addEventListener("click", function() {
            let comRegNumber = document.getElementsByClassName("registration-number")[elem].textContent;
            location.href = `/admin/branch/settings/${comRegNumber}`;
        });
    }


    //route to add branch
    const abElem = document.getElementsByClassName("add-branch");
    for( let elem = 0; elem < abElem.length; elem++)
    {
        document.getElementsByClassName("add-branch")[elem].addEventListener("click", function() {
            let comRegNumber = document.getElementsByClassName("registration-number")[elem].textContent;
            location.href = `/admin/branch/settings/${comRegNumber}`;
        });
    }
}
/*------------------------------------------------------------------------------------------------*/

/*----------------------- Fetch API - Add Company Banking Details ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * ADD COMPANY BANKING DETAILS
 * HANDLE ERRORS
 */
//document.title = "Leroy";
let addBankingDetails = function(){
    const add_btn = document.getElementById("baccadd-btn");
    add_btn.addEventListener("click", function()
    {
        //company with id to be save
        let id = document.getElementById("com-bank-select").value;
        let companyName = document.getElementById("com-bank-select").textContent;
        
        //check if id is not less than or equals to 0
        if(id < 1 || id === "")
        {
            console.log("Please select a valid company");
        }else{
            //form with data to save
            const bankData = {
                bankName: document.getElementById('bank-name').value,
                accountName: document.getElementById("account-name").value,
                account: document.getElementById('account').value,
            }

            //fetch api POST bank details
            fetch(`/bank/add/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bankData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.text}`);
                }
                response.text()
            })
            .then(data => {
                //pass message to modal box
                let title = "Banking Details Message:";
                let message = `Banking details have been successfuly saved and linked to ${companyName}`;
                displayModal(title, message);
            })
            .catch(error => {
                errorModal("Error Saving Data:", "Could not save your data! Please try again later");
            })
        }
    })
}
/*----------------------------------------------------------------------------------------------------*/

/*----------------------- Fetch API - Add Service Level Agreement ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * ADD Service Level Agreement
 * HANDLE ERRORS
 */
//document.title = "Leroy";
let addServiceLevelAgreement = function(){
    const add_btn = document.getElementById("add-sla-btn");
    add_btn.addEventListener("click", function()
    {
        //company with id to be save
        let id = document.getElementById("com-sla-select").value;
        
        //check if id is not less than or equals to 0
        if(id < 1 || id === "")
        {
            console.log("Please select a valid company");
        }else{
            //form with data to save
            const slaData = {
                sla: document.getElementById('sla-textarea').value,
            }

            //fetch api POST sla details
            fetch(`/sla/add/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(slaData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.body}`);
                }
                response.text()
            })
            .then(data => {
                //pass message to modal box
                let title = "SLA Message:";
                let message = `SLA document has been successfuly saved.`;
                displayModal(title, message);
            })
            .catch(error => {
                errorModal("Error Saving Data:", "Could not save your data! Please try again later");
            })
        }
    })
}
/*-------------------------------------------------------------------------------------------------*/

/*----------------------- Fetch API - Add Code of Conduct ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * ADD Service Level Agreement
 * HANDLE ERRORS
 */
//document.title = "Leroy";
let addCodeOfConduct = function(){
    const add_btn = document.getElementById("coc-btn");
    add_btn.addEventListener("click", function()
    {
        //company with id to be updated
        let id = document.getElementById("com-cod-select").value;
        
        //check if id is not less than or equals to 0
        if(id < 1 || id === "")
        {
            console.log("Please select a valid company");
        }else{
            //form with data to save
            const cocData = {
                cocDocument: document.getElementById('coc-textarea').value,
            }

            //fetch api POST bank details
            fetch(`/codeofconduct/add/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cocData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.body}`);
                }
                response.text()
            })
            .then(data => {
                //pass message to modal box
                let title = "Code of Conduct Message:";
                let message = `Code of Conduct document has been successfuly saved.`;
                displayModal(title, message);
            })
            .catch(error => {
                errorModal("Error Saving Data:", "Could not save your data! Please try again later");
            })
        }
    })
}
/*-------------------------------------------------------------------------------------------------*/

/*----------------------- Fetch API - Company Ethics ----------------------------------*/
/**
 * Fetch API
 * POST DATA
 * ADD Service Level Agreement
 * HANDLE ERRORS
 */
//document.title = "Leroy";
let addEthics = function(){
    const add_btn = document.getElementById("add-ethics-btn");
    add_btn.addEventListener("click", function()
    {
        //company with id to be updated
        let id = document.getElementById("com-ethics-select").value;
        
        //check if id is not less than or equals to 0
        if(id < 1 || id === "")
        {
            console.log("Please select a valid company");
        }else{
            //form with data to save
            const ethicsData = {
                ethics: document.getElementById('ethics-textarea').value,
            }

            //fetch api POST bank details
            fetch(`/company/ethics/add/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ethicsData),
            })
            .then(response => {
                
        
                response.text();
            })
            .then(data => {
                //pass message to modal box
                let title = "Ethics Message:";
                let message = `Ethics has been successfuly saved.`;
                displayModal(title, message);
            })
            .catch(error => {
                errorModal("Error Saving Data:", "Could not save your data! Please try again later");
            })
        }
    })
}
/*-------------------------------------------------------------------------------------------------*/

//add new company
registerCompany();

//update existing company details 
updateCompany();

//add bank account
addBankingDetails();

//add service level agreement
addServiceLevelAgreement();

//add code of conduct
addCodeOfConduct();

//add ethics
addEthics();
/*------------------------------------------------------------------------------------------------*/
//when clicked route to URL
document.getElementById("view-btn").addEventListener("click", function() {
    location.href = "/company";
});

/*------------------------------------------------------------------------------------------------*/

//when clicked request for company details from the server
document.getElementById('get-companies').addEventListener('click', function(){
    getCompanyDetails("company-select");
});
document.getElementById('abc-btn').addEventListener('click', function() {
    getCompanyDetails("com-bank-select");
});
document.getElementById('sla-btn').addEventListener('click', function() {
    getCompanyDetails("com-sla-select");
});
document.getElementById('cod-btn').addEventListener('click', function() {
    getCompanyDetails("com-cod-select");
});
document.getElementById('ethics-btn').addEventListener('click', function() {
    getCompanyDetails("com-ethics-select");
});
/*-----------------------------------------------------------------------------------------*/