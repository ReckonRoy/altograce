const gender = document.getElementsByName("gender");
let gender_value = "";
for(var gender_val of gender)
{
    gender_val.addEventListener("click", function(){
        gender_value = this.value;
    });
}

let validatePassword = (formData) => {
    let passwordError = document.getElementById("password-error");

    if(formData.password.length < 8 || formData.password.length > 15)
    {
        passwordError.textContent = "password must be between 8 to 15 characters long"
        return false;
    }

    if(formData.password !== formData.confirm_password){
        passwordError.style.display = "block";
        passwordError.textContent = "Passwords do not match!";
        document.getElementById("password-field").style.borderColor = "red";
        document.getElementById("confirm-pwd").style.borderColor = "red";
        return false;
    }
    return true;
}

const formSubmit = document.getElementById("user-reg-form");
formSubmit.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = {
        name: document.getElementById("name-field").value,
        surname: document.getElementById("surname-field").value,
        email: document.getElementById("email-field").value,
        nationality: document.getElementById("nationality-field").value,
        id_passport: document.getElementById("id-passport").value,
        gender: gender_value,
        role: document.getElementById("role-field").value,
        password: document.getElementById("password-field").value,
        confirm_password: document.getElementById("confirm-pwd").value,
        designation: document.getElementById("designation-field").value,
        honorofic: document.getElementById("honorofic-field").value,
        contact_details1: document.getElementById("contact-details1-field").value,
        country: document.getElementById("country").value,
        province: document.getElementById("province").value,
        city: document.getElementById("city").value,
        postCode: document.getElementById("post-code").value,
        street: document.getElementById("street").value,
        standUnit: document.getElementById("stand-unit").value,
    }

    if(validatePassword(formData) != false)
    {
        
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
        setTimeout(()=>{
            fetch("/register", {
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
                errorModal("Error registering User:", "Could not register user, this user already exists!");
            });
        }, 1000);
    }
});