/**
 * @author Le-Roy
 * @date 26 Jan 2024
 * @description this script manages the main content of the page
 * 
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
/*------------------------------------------------------------------------------------------------------------*/

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
			 	profileContent.style.display = "flex";
			 	}
			 	break;
			 case "Add Staff Member" :  {
			 	cmcSelected(this);
			 	previousSelect = selectedCmc;
			 	previousModal = profileContent;
			 	selectedCmc = this;
			 	profileContent = document.getElementById("register-content-div");
			 	profileContent.style.display = "flex";
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
//document.title = "Leroy";
let handleRegistration = {
    gender: "",
    maritalStatus: "",
    isValid: false,
    // Initialize a flag to check if there are empty fields
    hasEmptyFields: false,

    getGender: ()=>{
        const gender = document.getElementsByName("gender");
        
        for(var gender_val of gender)
        {
            gender_val.addEventListener("click", function(){
                handleRegistration.gender = this.value;
            });
        }
    },

    getMaritalStatus: ()=>{
        const maritalStatus = document.getElementsByName("marital_status");
        
        for(var marital_val of maritalStatus)
        {
            marital_val.addEventListener("click", function(){
                handleRegistration.maritalStatus = this.value;
            });
        }
    },

    validateEmail: (emailField) => {
        // Regular expression for a basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        return emailRegex.test(emailField);
    },

    addMember: () => {
        const formFields = {
            name: document.getElementById("r-name"),
            surname: document.getElementById("r-surname"),
            email: document.getElementById("r-email"),
            nationality: document.getElementById("r-nationality"),
            idPassport: document.getElementById("r-id"),
            contact1: document.getElementById("r-contact-det"),
            dob: document.getElementById("dob"),
            ethnicity: document.getElementById("ethnicity-field"),
            gender: handleRegistration.gender,
            maritalStatus: handleRegistration.maritalStatus,
            country: document.getElementById("country"),
            province: document.getElementById("province"),
            city: document.getElementById("city"),
            postCode: document.getElementById("postal-code"),
            street: document.getElementById("street"),
            standUnit: document.getElementById("stand-unit"),
        }

        const formData = {
            name: document.getElementById("r-name").value,
            surname: document.getElementById("r-surname").value,
            email: document.getElementById("r-email").value,
            nationality: document.getElementById("r-nationality").value,
            id_passport: document.getElementById("r-id").value,
            contact_details1: document.getElementById("r-contact-det").value,
            dob: document.getElementById("dob").value,
            ethnicity: document.getElementById("ethnicity-field").value,
            designation: document.getElementById("designation-field").value,
            honorofic: document.getElementById("honorofic-field").value,
            gender: handleRegistration.gender,
            maritalStatus: handleRegistration.maritalStatus,
            country: document.getElementById("country").value,
            province: document.getElementById("province").value,
            city: document.getElementById("city").value,
            postCode: document.getElementById("postal-code").value,
            street: document.getElementById("street").value,
            standUnit: document.getElementById("stand-unit").value,
            role: document.getElementById("role-field").value
        }

        if(handleRegistration.validateEmail(formData.email)){
			if(document.getElementById("email-error").style.display === "block"){
                document.getElementById("email-error").style.display = "";
                handleRegistration.isValid = true;
            }
		}else{
			let emailMessage = "Please provide a valid email address!";
			document.getElementById("email-error").style.display = "block";
			document.getElementById("email-error").textContent = emailMessage;
                        handleRegistration.isValid = false;
		}

        // Fields to be excluded from validation
        const excludedFields = ['email', 'gender', 'maritalStatus', 'dob'];

        // Iterate through formFields
        for (const key in formFields) {
            if (formFields.hasOwnProperty(key) && !excludedFields.includes(key)) {
                const element = document.getElementById(formFields[key].id);
            // Check if the value is empty
                if (formFields[key].value === "") {
                    handleRegistration.hasEmptyFields = true;
                    handleRegistration.isValid = false;
                    document.getElementById("error-message").style.display = "block";
                    document.getElementById("error-message").textContent = "Please fill in required fields!";
                    // Add red border to empty field
                    element.style.border = "1px solid red";
                    break; // Exit the loop as soon as an empty field is found
                }else{
                    handleRegistration.isValid = true;
                    document.getElementById("error-message").style.display = "none";
                    // Remove red border from non-empty field
                    element.style.border = "";
                }
            }
        }

        // If there are empty fields, scroll to the top with a smooth animation
        if (handleRegistration.hasEmptyFields) {
            const scrollToTop = () => {
                const currentScrollY = window.scrollY;
                if (currentScrollY > 0) {
                    window.scrollTo(0, currentScrollY - 20);
                    window.requestAnimationFrame(scrollToTop);
                }
            };
            
            scrollToTop();
        }
        if(handleRegistration.isValid){
            // Create SVG element for loading animation
        let loadingSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        loadingSVG.setAttribute("width", "100");
        loadingSVG.setAttribute("height", "100");
        loadingSVG.setAttribute("id", "loading-svg");
        loadingSVG.setAttribute("style", "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);");

        // Append loading SVG to the "result-container" div
        let resultContainer = document.getElementById("result-container");
        resultContainer.appendChild(loadingSVG);
        resultContainer.style.display = "block";
        document.getElementById("shadow-wrapper").style.display = "block";

        // Create three spinning circles in circular rotation around an invisible center
        for (let i = 0; i < 3; i++) {
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "50");
            circle.setAttribute("cy", "50");
            circle.setAttribute("r", "10");
            circle.setAttribute("fill", "#888"); // Grey color
            circle.setAttribute("style", `animation: spin${i} 1.5s linear infinite`);
            loadingSVG.appendChild(circle);

            // Add CSS animation for spinning
            let style = document.createElement("style");
            style.innerHTML = `
                @keyframes spin${i} {
                    0% { transform: rotate(${i * 120}deg) translate(40px) rotate(-${i * 120}deg); }
                    100% { transform: rotate(${i * 120 + 360}deg) translate(40px) rotate(-${i * 120 + 360}deg); }
                }
            `;
            document.head.appendChild(style);
        }
        /*******************************************************************************/
        if(companyProfile.selectedId >= 1)
        {
            errorResponse = "";;
            setTimeout(()=>{
                fetch(`/hr/employee-management/register/${companyProfile.selectedId}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => {
                    loadingSVG.remove();
                    resultContainer.style.display = "none";
                    document.getElementById("shadow-wrapper").style.display = "none";
                    if (!response.ok) {
                        errorResponse = JSON.parse(response.body);
                        throw new Error(`Error: ${response.status} - ${response.body}`);
                    }
        
                    response.text()
                })
                .then(data => {
                    //pass message to modal box
                    let title = "Registration Message:";
                    let message = `User Account for ${formData.name} ${formData.surname} has been successfuly created`;
                    displayModal(title, message);
                })
                .catch(error => {
                    console.log(errorResponse);
                    errorModal("Error registering User:", "Error registering user. Try with a different email address!");
                });
            }, 1000);
        }else{
            loadingSVG.remove();
            resultContainer.style.display = "none";
            document.getElementById("shadow-wrapper").style.display = "none";
            alert("Please select a valid company!");
        }
        }

    }
}
function deleteEmployee(email) {
    // Implement the delete employee functionality
    console.log(`Deleting employee with email: ${email}`);
}

function openNextOfKinPopup(email) {
    const overlayKin = document.getElementById('nextOfKinOverlay');
    overlayKin.style.display = 'flex';
}

function closeNextOfKinPopup() {
    const overlayKin = document.getElementById('nextOfKinOverlay');
    overlayKin.style.display = 'none';
}

function viewNextOfKin(email) {
    // Implement the view next of kin functionality
    console.log(`Viewing next of kin for employee with email: ${email}`);
}

/*function add next of kin*/
function openAddNextOfKinForm() {
    const overlayKin = document.getElementById('addNextOfKinOverlay');
    overlayKin.style.display = 'flex';
}

function closeAddNextOfKinForm() {
    const overlayKin = document.getElementById('addNextOfKinOverlay');
    overlayKin.style.display = 'none';
}

function submitNextOfKin() {
    const kinName = document.getElementById('kinName').value;
    const kinRelationship = document.getElementById('kinRelationship').value;
    const kinContact = document.getElementById('kinContact').value;

    if (kinName && kinRelationship && kinContact) {
        console.log(`Next of Kin submitted: Name - ${kinName}, Relationship - ${kinRelationship}, Contact - ${kinContact}`);
        closeAddNextOfKinForm();
        // Additional logic to handle the submitted next of kin details
    } else {
        alert('Please fill in all fields.');
    }
}
/*------------------------------------------------------------------------------------------------------------*/
handleRegistration.getGender();
handleRegistration.getMaritalStatus();
document.getElementById("register-btn").addEventListener("click", () => {
    handleRegistration.addMember();
});
/*------------------------------------------------------------------------------------------------------------*/
companyProfile.fetchData();