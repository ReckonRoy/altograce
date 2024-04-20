const content_menu_controls = document.getElementsByClassName("c-p-c");

function cmcSelected(item)
{
	item.className = "c-p-s"
}

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
			 case "Update Account" :  {
			 	cmcSelected(this);
			 	previousSelect = selectedCmc;
			 	previousModal = profileContent;
			 	selectedCmc = this;
			 	profileContent = document.getElementById("update-content");
			 	profileContent.style.display = "grid";
				}
			 	break;
			 case "Update Password" : {
			 	cmcSelected(this);
			 	previousSelect = selectedCmc;
			 	previousModal = profileContent;
			 	selectedCmc = this;
			 	profileContent = document.getElementById("update-password");
			 	profileContent.style.display = "grid";
			 	}
			 	break;
			 case "Update Email Address" :  {
			 	cmcSelected(this);
			 	previousSelect = selectedCmc;
			 	previousModal = profileContent;
			 	selectedCmc = this;
			 	profileContent = document.getElementById("update-email");
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

/**
 * Method updateUserProfile
 * @description updates user profile
 * uses fetch api to send data to the back-end
 * returns success message on ok status other wise fail message
 */
let updateUserProfile = function()
{
	document.getElementById("update-btn").addEventListener("click", function(){
		let updateForm = {
			contact_details1: document.getElementById("contact-det1-field").value,
            contact_details2: document.getElementById("conatct-det2-field").value,
			dob: document.getElementById("update-dob-field").value,
            maritalStatus: document.getElementById("marital-field").value,
			country: document.getElementById('country').value,
            province: document.getElementById('province').value,
			city: document.getElementById('city').value,
			post_code: document.getElementById('post-code').value,
			street: document.getElementById('street').value,
			stand_unit: document.getElementById('stand-unit').value,
		}

		//fetch api sending data to backend for update
		fetch(`/admin/profile/update`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateForm),
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
            let message = `Your profile has been successfuly updated`;
            displayModal(title, message);
		})
		.catch(error => {
			errorModal("Update Error Message", "Failed to update profile");
		})
	});
}
/*-------------------------------------------------------------------------------------------------*/
/**
 * validate password field
 * validate email field
 * send data to back end
*/
let validatePassword = function(password)
{
	if(password.length < 8 || password.length > 15){
		return false;
	}else{
		return true;
	}
}

function validateEmail(emailField) {
	// Regular expression for a basic email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
	return emailRegex.test(emailField);
}


let updateEmail = function()
{
	document.getElementById("cpm-btn").addEventListener("click", function()
	{
		let formData = {
			email: document.getElementById("email-field").value,
			password: document.getElementById("validate-password-field").value,
		}
		
		if(validatePassword(formData.password) === true){
			//fetch api sending data to backend for update
			fetch(`/admin/email/update`,{
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
				let message = `Your email has been successfuly updated`;
				document.getElementById("confirm-password-modal").style.display = "none";
				displayModal(title, message);
			})
			.catch(error => {
				// Handle PasswordMatchException, display the message or take appropriate action
				console.error("PasswordMatchException:", error.message);
				// Display the error message to the user or take appropriate action
				let passwordMessage = "Incorrect password! Please enter correct password.";
				document.getElementById("error-field").style.display = "block";
				document.getElementById("error-field").textContent = passwordMessage;
			})
		}else{
			let passwordMessage = "password must be between 8 to 15 characters long";
			document.getElementById("error-field").style.display = "block";
			document.getElementById("error-field").textContent = passwordMessage;
		}
	});

	//pop up password modal box
	document.getElementById("email-btn").addEventListener("click", function(){	
		email = document.getElementById("email-field").value;
		if(validateEmail(email)){
			passwordModal();
		}else{
			let emailMessage = "Please provide a valid email address!";
			document.getElementById("email-error-field").style.display = "block";
			document.getElementById("email-error-field").textContent = emailMessage;
		}
		
	});
}
/*------------------------------------------------------------------------------------------------*/
/**
 * Update password
 * confirm old password matches saved password
 * confirm new password
 * save password
 */
let validatePasswords = (oldPassword, newPassword, confirmPassword) =>
{
	let errorField = document.getElementById("update-password-error");
	errorField.innerText = "";

	if(oldPassword.length < 8 || oldPassword.length > 15)
	{
		errorField.innerText = "Password field must be between 8 to 15 characters long";
		return false;
	}

	if(newPassword.length < 8 || newPassword.length > 15){
		errorField.innerText = "Password field must be between 8 to 15 characters long";
		return false;
	}

	if(newPassword !== confirmPassword)
	{
		errorField.innerText = "passwords do not match";
		return false;
	}

	if(newPassword == oldPassword)
	{
		errorField.innerText = "Old password and new password must not be the same";
		return false;
	}
	return true;
}
	
let updatePasswordButton = document.getElementById("update-password-btn");
updatePasswordButton.addEventListener("click", (event) => {
	let oldPassword = document.getElementById("old-pwd-field").value;
	let newPassword = document.getElementById("password-field").value;
	let confirmPassword = document.getElementById("confirm-pwd-field").value; 

	if(validatePasswords(oldPassword, newPassword, confirmPassword) == true)
	{
		let formData = {
			oldPassword: document.getElementById("old-pwd-field").value,
			newPassword: document.getElementById("password-field").value,
		}

		fetch(`/admin/password/update`,{
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
			let existingSVG = document.getElementById("success-svg");
			if (existingSVG) {
				existingSVG.remove();
			}

			// Create SVG element
			let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("width", "100");
			svg.setAttribute("height", "100");
			svg.setAttribute("id", "success-svg");
	
			// Create circle element
			let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle.setAttribute("cx", "50");
			circle.setAttribute("cy", "50");
			circle.setAttribute("r", "50");
			circle.setAttribute("fill", "green");
	
			// Append circle to the SVG
			svg.appendChild(circle);
	
			// Calculate the size for the tick mark (adjust as needed)
			let tickSizePercentage = 60; // 80% of the circle's radius
			let tickSize = (parseFloat(circle.getAttribute("r")) * tickSizePercentage) / 100;
	
			// Calculate the center of the circle
			let centerX = parseFloat(circle.getAttribute("cx"));
			let centerY = parseFloat(circle.getAttribute("cy"));
	
			// Calculate the coordinates for the tick mark
			let tickX1 = centerX - tickSize;
			let tickY1 = centerY;
			let tickX2 = centerX;
			let tickY2 = centerY + tickSize;
			let tickX3 = centerX + tickSize;
			let tickY3 = centerY - tickSize;
	
			// Create tick mark path
			let tickPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
			tickPath.setAttribute("d", `M${tickX1} ${tickY1} L${tickX2} ${tickY2} L${tickX3} ${tickY3}`);
			tickPath.setAttribute("stroke", "white");
			tickPath.setAttribute("stroke-width", "10");
			tickPath.setAttribute("fill", "transparent");
	
			// Append tick mark to the SVG
			svg.appendChild(tickPath);
	
			// Append SVG to the document body
			document.getElementById("up-success").appendChild(svg);
	
			// Display success message below the SVG
			let successMessage = document.createElement("p");
			successMessage.textContent = "Password successfully saved";
			document.getElementById("up-success").appendChild(successMessage);
			document.getElementById("up-success").style.display = "flex";
			setTimeout(function()
			{
				document.getElementById("up-success").style.display = "none";
				svg.remove();
			}, 3000);
		})
		.catch(error => {
			let errorMessage = document.getElementById("update-password-error");
			errorMessage.style.display = "block";
			errorMessage.textContent = "Incorrect password. Please enter correct password for this user!";
		});
	}else{
		let errorField = document.getElementById("update-password-error");
		
		errorField.style.display="block";
		if(errorField.style.display == "block"){
			setTimeout(function(){
				errorField.style.display = "none";
			}, 3000);
		}
	}
});
/*------------------------------------------------------------------------------------------------*/
//document.getElementById("old-pwd-field").value = "";
//Update existing user profile
updateUserProfile();

//Update Email
updateEmail();
