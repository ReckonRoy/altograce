/**
 * @author Le-Roy Jongwe
 * @Date 23/04/24
 */

customElements.define("upcoming-funeral", class extends HTMLElement {

/*-------------------------------------------------------------------------------------------------*/    
    render(){
        if (!this.shadowRoot) return; // Check if shadowRoot exists
        this.shadowRoot.innerHTML =`<style>
                .funeralTableGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }

                .funeral-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    border: 1px solid gray; 
                }

                .funeral-table th,
                .funeral-table td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }

                .funeral-table th {
                    background-color: #f2f2f2;
                }

                .funeral-table tbody tr:hover {
                    background-color: #f9f9f9;
                }
            </style>

            <h1>Upcoming Funerals</h1>
            <div id="grid">
                <!-- JSON Data Goes Here -->
            </div>
        `;
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        if (!this.rendered) {
            this.render();
            this.rendered = true;

            this.createFuneralTable();
        }
    }
    

     // Function to create a table from JSON data
     createFuneralTable() {
        let grid = this.shadowRoot.getElementById('grid');
        grid.className = "funeralTableGrid";
        

        fetch(`/funeral/upcoming/funerals`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            if(data !== null)
            {
                data.forEach((funeral) => {
                let cell = document.createElement('div'); 
                    cell.innerHTML = `
                        <table class="funeral-table">
                            <tbody class="funeral-table">
                                <tr><th>Name:</th><td>${funeral.nameOfDeceased}</td></tr>
                                <tr><th>Date:</th><td>${funeral.dateOfBurial}</td></tr>
                                <tr><th>Time:</th><td>${funeral.timeOfBurial}</td></tr>
                                <tr><th>Cemetery:</th><td>${funeral.cemetery}</td></tr>
                            </tbody>
                        <table>
                    `;
                    // Create a new row for each payment
                    /*let row = tableBody.insertRow();
                    let funeralDateCell = row.insertCell(0);
                    let funeralTimeCell = row.insertCell(1);
                    let cemetryCell = row.insertCell(2);
                    let deceasedCell = row.insertCell(3);
                    
                    // Populate cells with payment data
                    funeralDateCell.textContent = funeral.dateOfBurial;
                    funeralTimeCell.textContent = funeral.timeOfBurial;
                    cemetryCell.textContent = funeral.cemetry;
                    deceasedCell.textContent = funeral.nameOfDeceased;
                    * */
                    grid.appendChild(cell);
                });
            }else{
                let cell = document.createElement('div'); 
                cell.innerHTML = `<strong>${data.message}</strong>`;
                grid.appendChild(cell);
            }
            
        })
        .catch((error) => {
            alert(error);
        });
    }
})