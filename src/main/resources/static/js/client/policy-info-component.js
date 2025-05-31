/**
 * @Author Le-Roy S. Jongwe
 * @description This component is responsible for managing client dependencies such as:
 * creating dependency
 * updating dependency
 * deleting dependency
 */

customElements.define('policy-info-component', class extends HTMLElement{
    /*-----------------------------------Setters and Getters-------------------------------------------*/ 
    set fileId(value)
    {
        //update the attribute value
        this.setAttribute('fileId', value);
        //render the component when ever the property is set        
        this.render();
    }

    //get fileId
    get fileId()
    {
        return this.getAttribute('fileId');
    }
    /*___________________________________________________________________________________________________*/

    /*--------------------------------------render html content--------------------------------------*/ 
    render()
    {
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host{
                    width: 100%;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                    box-shadow: 0 5px 5px #515151;
                }

                thead{
                    box-shadow: 0 5px 5px #515151;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 1rem 2rem;
                    text-align: left;
                    
                }
                th {
                    background-color: #f2f2f2;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 900;
                }

                tr:nth-child(even){
                    background-color: #f1f5fa;
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

                select {
                    width: calc(100% - 24px);
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
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

                .delete-btn{
                    background-color: #fdc7cc;
                    color: #d0636a;
                }

                .delete-btn:hover{
                    background-color: #d0636a;
                    color: #fdc7cc;
                }

                /*Policy Holder's Info Style*/
                #policy-info-div{
                    margin-bottom: 50px;
                }
                /*______________________________________*/

                /*Policy Info Style*/
                #policies-div
                {
                    marging-top: 50px;
                }

                #policies-div h2{
                    text-align:left:
                    font-size: 30px;
                }
            </style>

            <div class="client-info-card" id="client-info-card">
            </div>    
            
            <div class="client-info-card" id="policy-info-card">
            <div id="policy-info-div"></div>
            <div id="policies-div"></div>
            </div>  
        `;
    }
    /*_______________________________________________________________________________________________*/

    /*------------------------------------------Connected Callback-----------------------------------*/
    connectedCallback()
    {
        if(!this.shadowRoot){
            this.attachShadow({mode: 'open'})
        }

        if(!this.rendered){
            this.render();
            this.rendered = true;

            //get policy details
            this.getPolicyHolderInfo(this.fileId);
            this.getPolicyInfo(this.fileId);
            this.getPolicies();
            this.updatePolicyHolderInfo(this.fileId);
            this.updatePolicy(this.fileId);
        }
    }
    /*_______________________________________________________________________________________________*/

    /*-------------------------------------------Observer--------------------------------------------*/
    static get observedAttributes()
    {
        return ['fileId'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }
    /*_______________________________________________________________________________________________*/

    /*-------------------------------------------Methods--------------------------------------------*/
    //get policy info from server 
    getPolicyHolderInfo(fileId)
    {
        fetch(`/client/management/policy/${fileId}`)
            .then((response) => {
                if(!response.ok)
                {
                    return response.text().then(error => {
                        throw new Error(error);
                    })
                }
                
                return response.json();
            }).then((data) => {
                let contentWrapper = this.shadowRoot.getElementById("client-info-card");

                let clientInfoTable = `
                    <table id="client-info-table">
                    <caption><h2>Policy Holder's Info</h2></caption> 
                    <tr>
                        <td>Province: </td>
                        <td>${data.province}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>${data.address}</td>
                    </tr>
                   
                    <tr>
                        <td>Contact 1: </td>
                        <td>${data.phoneContact1}</td>
                    </tr>`;

                if(data.phoneContact2 > 0){
                    clientInfoTable += `
                    <tr>
                        <td>Contact 2: </td>
                        <td>${data.phoneContact2}</td>
                    </tr>`;
                }

                clientInfoTable += `
                        <tr>
                            <td>D.O.B:</td>
                            <td>${data.dob}</td>
                        </tr>
                        <tr>
                            <td>Initials:</td>
                            <td>${data.initials}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>${data.gender}</td>
                        </tr>
                        <tr>
                            <td>ID/Passport Number:</td>
                            <td>${data.id_passport}</td>
                        </tr>
                    </table>
                    <div>
                        <button>Edit</button>
                    </div>
                `;
            contentWrapper.innerHTML = clientInfoTable;
            }).catch(error => {
                alert(error);
            })
    }

    getPolicyInfo(fileId){
        fetch(`/client/management/subscription/${fileId}`)
            .then((response) => {
                if(!response.ok)
                {
                    return response.text().then(error => {
                        throw new Error(error);
                    })
                }
                
                return response.json();
            }).then((data) => {
                let policyInfoDiv = this.shadowRoot.getElementById('policy-info-div');
                let policyInfoTableContent = `  
                <table>             
                    <caption><h2>Policy Info</h2></caption>
                    <tbody>
                        <tr>
                            <td><b>Plan Name</b></td><td>${data.name}</td>
                        </tr>
                        <tr>
                            <td><b>Date Of Cover</b></td><td>${data.dateOfCover}</td>
                        </tr>
                        <tr>
                            <td><b>Joining Fee</b></td><td>${data.joiningFee}</td>
                        </tr>
                        `;
                        if(parseInt(data.waitPeriodLeft) > 0){
                            policyInfoTableContent += `
                                <tr>
                                    <td><b>Wait Period Left/Number of months left for account to be activated</b></td><td>${data.waitPeriodLeft} of ${data.waitPeriod} months</td>
                                </tr>
                            `;
                        }
                        ;

                        policyInfoTableContent += `
                        <tr>
                            <td><b>Lapse Period</b></td><td>1 of ${data.lapsePeriod} months</td>
                        </tr>
                        <tr>
                            <td><b>Balance Due</b></td><td>200.00</td>
                        </tr>
                        <tr>
                            <td><b>Member's Count</b></td><td>7 / ${data.membersCount}</td>
                        </tr>
                        <tr>
                            <td><b>Group Name</b></td><td>${data.groupName}</td>
                        </tr>
                    </tbody>   
                </table> 
                `;

                policyInfoDiv.innerHTML = policyInfoTableContent;
            }).catch(error => {
                alert(error);
            })
    }

    getPolicies(){
        fetch(`/package/packages`)
        .then(response => {
            return response.json();
        }).then(data => {
            let policyDiv = this.shadowRoot.getElementById('policies-div');
            let policyDivContent = `
            <h2>Change Current Policy</h2>
            <select id="policy-option">`;
            data.forEach((pkg, index) => {
                policyDivContent += `<option value="${pkg.id}">${pkg.policyName} - ${pkg.premiumAmount} - ${pkg.membersCount} Members</option>`;
            })

            policyDivContent += `</select>
                            <button id="changePolicyBtn">Change Policy</button>`;
            policyDiv.innerHTML = policyDivContent;
        })
    }

    updatePolicyHolderInfo(fileId){

    }

    updatePolicy(fileId){

    }
});