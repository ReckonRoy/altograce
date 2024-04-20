/**
 * @author Le-Roy Jongwe
 * @Date 22 March 2024
 * @description component for billing clients
 */

customElements.define("deceased-records-component", class extends HTMLElement {
/*-------------------------------------Properties-------------------------------------------------*/
    // Define the fileId client property
    set fileId(value) {
        this.setAttribute('fileId', value); // Update the attribute value
        this.render(); // Render the component whenever the property is set
    }

    get fileId() {
        return this.getAttribute('fileId');
    }
/*___________________________________________________________________________________________________*/

/*------------------------------------------Render-------------------------------------------*/    

    render(){
        if (!this.shadowRoot) return; // Check if shadowRoot exists
        let fileId = this.getAttribute('fileId'); // Get the current value of fileId
        console.log("fileId: " + fileId);
        this.shadowRoot.innerHTML =`
            <style>
                :host{
                    display: block;
                    position: absolute;
                    width: 60%;
                    top: 5%;
                    right: 20%;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    z-index: 110;
                    opacity: 1; /* Ensure opacity is not affected by the overlay */
                }

                #wrapper{
                    box-sizing: border-box;
                    padding: 20px;
                }

                .header{
                    font-size: 24px;
                    font-weight: bolder;
                    padding: 10px 0;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                th {
                    background-color: #f2f2f2;
                }
            </style>
            <div id="wrapper">
                <div class="header"><span  id="fileId-header"></span> <center><span>Deceased Records</span></center></div>
                <table id="deceasedTable">
                    <thead>
                        <tr>
                            <th>Deceased Name</th>
                            <th>Place of Death</th>
                            <th>Identity Number</th>
                            <th>Cemetery</th>
                            <th>Date of Burial</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Data will be inserted here dynamically -->
                    </tbody>
                </table>
            </div>
        `;
    }
/*------------------------------------------Connected Callback-----------------------------------*/
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        if (!this.rendered) {
            this.render();
            this.rendered = true;

            //Call getDeceasedRecords
            console.log(this.fileId)
            this.getDeceasedRecords(this.fileId);
        }
    }
/*_______________________________________________________________________________________________*/

/*-------------------------------------------Observer--------------------------------------------*/
    static get observedAttributes() {
        return ['fileId'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

/*_______________________________________________________________________________________________*/

/*-------------------------------------------Method----------------------------------------------*/
    getDeceasedRecords(fileId){
        let overlay = document.getElementById("overlay");
        if(overlay.style.display == "")
        {
            overlay.style.display = "block";
        }else{
            overlay.style.display = "none";
        }
        let fileIdSpan = this.shadowRoot.getElementById("fileId-header");
        fileIdSpan.textContent = `FileId: ${fileId}`;
        fetch( `/client/deceased/getRecords/${fileId}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = this.shadowRoot.querySelector('#deceasedTable tbody');
                data.forEach(deceased => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${deceased.deceasedName}</td>
                        <td>${deceased.placeOfDeath}</td>
                        <td>${deceased.identityNumber}</td>
                        <td>${deceased.cemetery}</td>
                        <td>${deceased.dateOfBurial}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
        .catch(error => console.error('Error fetching data:', error));
        
    }
})