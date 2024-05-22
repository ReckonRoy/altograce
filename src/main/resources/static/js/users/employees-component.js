/**
 * @author Le-Roy Jongwe
 * @Date 1 April 2024
 * @description component for viewing employees
 */

customElements.define("employee-component", class extends HTMLElement {
connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>
      .employee-card {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        cursor: pointer;
        width: 100%;
        position: relative;
        margin-bottom: 20px; /* Added margin to create space between employee cards */
        }
        
        .employee-details {
            padding: 15px;
        }
        
        .employee-name {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .employee-position {
            color: #555;
            margin-bottom: 10px;
        }
        
        .employee-info {
            margin-bottom: 10px;
        }
        
        .employee-email {
            color: #3498db;
            text-decoration: none;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .employee-actions {
            display: flex;
            gap: 5px;
            margin-top: 10px;
        }
        .delete-btn,
        .add-next-of-kin-btn,
            .vacation-btn,
            .next-of-kin-btn {
                background-color: #e74c3c;
                color: #fff;
                border: none;
                padding: 5px;
                cursor: pointer;
                border-radius: 5px;
                outline: none;
                margin-right: 10px; /* Added margin to create space between action buttons */
                margin-left: 10px;
                margin-bottom: 10px;
            }
        
            .add-next-of-kin-btn{
                background-color: #1b7dbe;
            }
        
            .vacation-btn {
                background-color: #3498db;
            }
        
            .next-of-kin-btn {
                background-color: #2ecc71;
            }

        /*------------------------------------------------------------------------------------------------*/
        /* Popup Form Styles */
        .popup {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
            text-align: center;
            position: relative; /* Added position relative */
        }
    
        h2 {
            color: #3498db;
            margin-bottom: 20px;
        }
    
        .popup form {
            display: grid;
            grid-gap: 15px;
        }
    
        label {
            font-weight: bold;
        }
    
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    
        button {
            background-color: #3498db;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }
        /*----------------------------------Vacation Styles----------------------------------------*/
        .close-btn {
            background-color: #e74c3c;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
        }
    
        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 999;
        }
    
    
        /* Vacation Popup Styles */
        #vacation-popup {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }
        /*---------------------------------------------------------------------------------------*/
    
        .submit-btn {
            background-color: #3498db;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
        }
        </style>
        <div id="emp-container">
        </div>
        <!-- Vacation Popup -->
        <div class="overlay" id="vacationOverlay">
            <div id="vacation-popup">
                <h2>Add Vacation</h2>
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" required>
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" required>
                <label for="vacation-type">Vacation Type:</label>
                <input type="text" id="vacation-type" required>
                <div>
                    <button class="submit-btn" id="vacation-btn">Submit</button>
                    <button class="close-btn" id="close-vacation-btn">Close</button>
                </div>
            </div>
        </div>
      `;
/*-------------------------------------------------------------------------------------------------*/
    let employees = [];
    let employeeObj = {
        idPassport: "",
    };

    
    let openVacationPopup = () => {
        const overlayModal = this.shadowRoot.getElementById('vacationOverlay');
        overlayModal.style.display = "flex";
    }

    let closeVacationButton = this.shadowRoot.getElementById("close-vacation-btn");
    closeVacationButton.addEventListener("click", () => {
        closeVacationPopup();
    });

    let closeVacationPopup = () => {
        let overlayModal = this.shadowRoot.getElementById('vacationOverlay');
        overlayModal.style.display = "none"; 
    }

    //submit vacation button
    let sbmtVacationButton = this.shadowRoot.getElementById("vacation-btn");
    sbmtVacationButton.addEventListener("click", () => {
        submitVacation();
    });

    //vacation method that sends vacation data to backend
    let submitVacation = () => {
    
        let vacationObj = {
            'startDate': this.shadowRoot.getElementById('startDate').value,
            'endDate': this.shadowRoot.getElementById('endDate').value,
            'vacationType': this.shadowRoot.getElementById('vacation-type').value,
            'idPassport': employeeObj.idPassport, 
        }
        console.log(vacationObj);
        
        if (vacationObj.startDate && vacationObj.endDate) {
            let comId = companyProfile.selectedId;
            if(comId > 0){
            fetch(`/hr/employee-management/vacation/${companyProfile.selectedId}`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vacationObj),
            }).then((response) => {
                if(!response.ok)
                {
                    throw new Error(`error:  ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                alert(data);
            }).catch((error) => {
                alert(error);
            });
            }else{
            alert('Please select a company to interact with.');
        }
        } else {
            alert('Please enter both start and end dates.');
        }
    }

let getEmployees = () => {
    let comId = companyProfile.selectedId;
    fetch(`/hr/employee-management/employees/${comId}`)
    .then((response) => {
        if (!response.ok){
            throw new Error(`error:  ${response.status} ${response.statusText}`);
        }

    return response.json();
    })
    .then((data) => {

    let empContainer = this.shadowRoot.getElementById("emp-container");
    empContainer.innerHTML = "";
    data.forEach(employee => {
        employees.push({
            idPassport: employee.id_passport,
        });
        empContainer.innerHTML = `
            <div class="employee-card">
            <div class="employee-details">
            <div class="employee-name">Title: ${employee.honorofic}</div>
            <div class="employee-name">Full name: ${employee.name} ${employee.surname}</div>
            <div class="employee-position">Job title: ${employee.designation}</div>
            <div class="employee-position">Id/Passport: ${employee.id_passport}</div>
            <div class="employee-position">Nationality: ${employee.nationality}</div>
            <div class="employee-info">Gender: ${employee.gender}</div>
            <div class="employee-info">Date of Birth: ${employee.dob}</div>
            <div class="employee-info">Marital status: ${employee.maritalStatus}</div>
            <div class="employee-info">Cell Number: ${employee.contact_details1}</div>
            <div class="employee-info">Country: ${employee.country}</div>
            <div class="employee-info">Province/State: ${employee.province}</div>
            <div class="employee-info">Address: ${employee.postCode} ${employee.street}, ${employee.standUnit}</div>

            <div class="employee-info">Next of Kin: Jane Doe</div>
            <a href="mailto:john.doe@example.com" class="employee-email">john.doe@example.com</a>
            </div>
            <div class="employee-actions">
            <button class="delete-btn">Delete</button>
            <button class="vacation-btn ovm-btn" id="${employee.id_passport}">Add Vacation</button>
            <button class="next-of-kin-btn">Next of Kin</button>
            <button class="add-next-of-kin-btn">Add Next of Kin</button>
            </div>
            </div>
            `;
        });

        //pass id/passport value toopen Vacation Modal
        let openVacModButton = this.shadowRoot.querySelectorAll(".ovm-btn");
        openVacModButton.forEach((btnValue) => {
            btnValue.addEventListener("click", () => {
                employeeObj.idPassport = btnValue.id;
                openVacationPopup();
            });
        })
        
    })
    .catch(error => {
            console.log(error);
        });
    }

/*--------------------------------------Get Employees---------------------------------------------*/
        getEmployees();
    }
})