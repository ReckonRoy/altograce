/**
 * @author Le-Roy
 * @date 2024/03/02
 * @description get logged in user and company they belong to
 */
let contentWrapper = document.getElementById("wrapper");
let displayClient;
let userData = {
    "userId": 0,
    "companyId": 0,

    getUserDetails: () => {
        fetch("/client/management/user")
        .then(response => {
            return response.json();
        })
        .then(data => {
            userData.companyId = data.companyId;
            userData.userId = data.userId;
            
            // Create an instance of the notification-dialog element
            displayClient = document.createElement("display-client");
            displayClient.id = "display-client";
            contentWrapper.appendChild(displayClient);
            
            let controlsWrapper = document.getElementById("controls-wrapper");
            clientControls = document.createElement("client-controls");
            controlsWrapper.appendChild(clientControls);
        })
        .catch(error => {
            console.log(error)
        })
    }
}

// Create an instance of the notification-dialog element
const notificationDialog = document.createElement("notification-dialog");
document.body.appendChild(notificationDialog);

let clientRegistration = {
    formData: {},
    gender: "",

    //Post client data to server
    registerClient: () => {
        fetch(`/client/management/register/${userData.companyId}`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientRegistration.formData),
        }).then((response) => {
            if(!response.ok)
            {
                return response.text().then((error) => {
                    throw new Error(error);
                })
            }

            return response.json();
        }).then((data) => {
            console.log(data);
            
            notificationDialog.style.display = "block";
            
            const detailsOverlay = notificationDialog.querySelector('.details-overlay');
            detailsOverlay.style.display = 'block';
            
        }).catch(error => {
            alert(error);
        });
    },

    getClientDetails: () => {

        let gender_btn = document.querySelectorAll(".gender-field");
        gender_btn.forEach((btn) => {
            btn.addEventListener("click", () => {
                clientRegistration.gender = btn.value;
            });
            
        })
        
        document.getElementById("reg-client-btn").addEventListener("click", () => {
            clientRegistration.formData.title = document.getElementById("title-field").value;
            clientRegistration.formData.name = document.getElementById("name-field").value;
            clientRegistration.formData.lastName = document.getElementById("surname-field").value;
            clientRegistration.formData.initials = document.getElementById("fi-field").value;
            clientRegistration.formData.id_passport = document.getElementById("id-passport-field").value;
            clientRegistration.formData.gender = clientRegistration.gender;
            clientRegistration.formData.dob = document.getElementById("dob-field").value;
            clientRegistration.formData.maritalStatus = document.getElementById("marital-field").value;
            clientRegistration.formData.email = document.getElementById("email-field").value;
            clientRegistration.formData.groupName = document.getElementById("group-field").value;
            clientRegistration.formData.dateOfCover = document.getElementById("joiningDate-field").value;
            clientRegistration.formData.joiningFee = parseFloat(document.getElementById("joiningFee-field").value);
            clientRegistration.formData.countryCode = document.getElementById("countryCode-field").value;
            clientRegistration.formData.cellNumber = document.getElementById("cellPhone-field").value;
            clientRegistration.formData.homePhone = document.getElementById("homePhone-field").value;
            clientRegistration.formData.telePhone = document.getElementById("telePhone-field").value;
            clientRegistration.formData.country = document.getElementById("country-field").value;
            clientRegistration.formData.province = document.getElementById("province-field").value;
            clientRegistration.formData.City = document.getElementById("city-field").value;
            clientRegistration.formData.postCode = document.getElementById("postCode-field").value;
            clientRegistration.formData.street = document.getElementById("street-field").value;
            clientRegistration.formData.standUnit = document.getElementById("stand-unit").value; 
            clientRegistration.formData.staffId = userData.userId;

            clientRegistration.registerClient();
        })
        
    }
}

clientRegistration.getClientDetails();

/*------------------Objects and method calls------------------------------*/
userData.getUserDetails();