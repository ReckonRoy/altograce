/**
 * @Author Le-Roy S. Jongwe
 * @description This component is responsible for managing client dependencies such as:
 * creating dependency
 * updating dependency
 * deleting dependency
 */

customElements.define('dependency-management-component', class extends HTMLElement{
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
        if(!this.shadowRoot) return
        alert(this.getAttribute('fileId'));
        this.shadowRoot.innerHTML = `

        <style>
            :host{
                width: 100%;
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

            table{
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                box-shadow: 0 5px 10px #515151;
            }

            thead{
                box-shadow: 0 5px 10px #515151;
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

            input[type="text"],
            input[type="date"],
            select {
                width: calc(100% - 24px);
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }
            input[type="radio"] {
                margin: 5px;
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
        </style>

        
        <div class="client-info-card" id="dependency-info-card">
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

            //get dependendencies
            this.getDependencies(this.fileId);
            //handle dependency operations
            this.handleDependencies();
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
    //get dependencies from server 
    getDependencies(fileId)
    {
        fetch(`/client/management/dependencies/${fileId}`)
            .then((response) => {
                if(!response.ok)
                {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                
                return response.json();
            }).then((data) => {
                let contentWrapper = this.shadowRoot.getElementById("dependency-info-card");
                let dependenciesInfoTable = `
                <table>
                    <caption><h2>Dependencies</h2></caption>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>D.O.B</th>
                        <th>Relationship</th>
                        <th>ID/Passport Number</th>
                    </tr>
                    </thead>
                `
                data.forEach((dependency) => {
                    dependenciesInfoTable += `
                        <tr>
                            <td>${dependency.name}</td>
                            <td>${dependency.lastName}</td>
                            <td>${dependency.gender}</td>
                            <td>${dependency.dob}</td>
                            <td>${dependency.relationship}</td>
                            <td>${dependency.id_passport}</td>
                        </tr>
                    
                        <tr>
                            <td colspan="7">
                                <button class="remove-dep-btn" id="${dependency.id}">Remove</button>
                                <button class="add-dep-btn" id="${dependency.id}">Replace</button>
                                <button class="deceased-btn" id="${dependency.id}">Deceased</button>
                            </td>
                        </tr>
                   `;
                })

                dependenciesInfoTable += `</table>`
                contentWrapper.innerHTML = dependenciesInfoTable;


                let removeDep_btn = this.shadowRoot.querySelectorAll(".remove-dep-btn");
                removeDep_btn.forEach((remove_btn) => {
                    remove_btn.addEventListener("click", () => {
                        removeDependency(remove_btn.id, id);
                    })
                });

                let deceased_btn = this.shadowRoot.querySelectorAll(".deceased-btn");
                deceased_btn.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        /*-----preset-----*/
                        deceased_btn.forEach((btn) => {
                            btn.style.backgroundColor = "#007bff";
                            btn.style.color = "#fff";
                            btn.style.border = "none";
                        });
                        /*-----------------------------------------------------------------------*/

                        btn.style.backgroundColor = "white";
                        btn.style.color = "black";
                        btn.style.border = "1px solid black";
                        let id_val = parseInt(btn.id);
                        processDeaceased(id_val);
                    })
                });

            }).catch(error => {
                console.log(error);
            })
    }

    handleDependencies(){

    }
});