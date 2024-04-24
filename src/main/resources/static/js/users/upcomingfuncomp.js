/**
 * @author Le-Roy Jongwe
 * @Date 23/04/24
 */

customElements.define("upcoming-funeral", class extends HTMLElement {

/*-------------------------------------------------------------------------------------------------*/    
    render(){
        if (!this.shadowRoot) return; // Check if shadowRoot exists
        this.shadowRoot.innerHTML =`<style>
                #funeralTableGrid {
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
            <div class="grid">
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

            this.populateFuneralTable();
            
        }
    }

    // Dummy JSON data for upcoming funerals
    upcomingFunerals = [
        {
            "date": "2024-04-25",
            "time": "10:00 AM",
            "location": "Greenwood Cemetery",
            "deceased": "John Doe",
            "age": 78,
            "cause_of_death": "Heart Attack"
        },
        {
            "date": "2024-04-27",
            "time": "2:00 PM",
            "location": "Memorial Gardens",
            "deceased": "Jane Smith",
            "age": 82,
            "cause_of_death": "Natural Causes"
        },
        {
            "date": "2024-04-29",
            "time": "11:30 AM",
            "location": "Rosewood Chapel",
            "deceased": "Michael Johnson",
            "age": 65,
            "cause_of_death": "Cancer"
        },
        {
            "date": "2024-05-02",
            "time": "9:30 AM",
            "location": "Sunset Memorial Park",
            "deceased": "Emily Brown",
            "age": 70,
            "cause_of_death": "Stroke"
        },
        {
            "date": "2024-05-04",
            "time": "3:00 PM",
            "location": "Evergreen Cemetery",
            "deceased": "David Wilson",
            "age": 74,
            "cause_of_death": "Pneumonia"
        },
        {
            "date": "2024-05-07",
            "time": "1:00 PM",
            "location": "Lakeview Funeral Home",
            "deceased": "Sarah Davis",
            "age": 68,
            "cause_of_death": "Alzheimer's Disease"
        },
        {
            "date": "2024-05-10",
            "time": "10:30 AM",
            "location": "Maple Grove Cemetery",
            "deceased": "Robert Lee",
            "age": 80,
            "cause_of_death": "Diabetes"
        },
        {
            "date": "2024-05-12",
            "time": "12:00 PM",
            "location": "Hillside Memorial Chapel",
            "deceased": "Karen Taylor",
            "age": 72,
            "cause_of_death": "Respiratory Failure"
        }
    ];
    

     // Function to create a table from JSON data
     createFuneralTable(data) {
        const table = document.createElement('table');
        table.classList.add('funeral-table');
        const tbody = document.createElement('tbody');

        fetch(`/funeral/upcoming/funerals`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((funeral) => {
                const tr = document.createElement('tr');
                const th = document.createElement('th');
                th.textContent = key.replace(/_/g, ' ');
                const td = document.createElement('td');
                td.textContent = data[key];
                tr.appendChild(th);
                tr.appendChild(td);
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            return table;
        })
        .catch((error) => {
            
        });
    }

    populateFuneralTable(){
        // Populate the grid with funeral tables
        const grid = this.shadowRoot.querySelector('.grid');
        grid.id = "funeralTableGrid";
        this.upcomingFunerals.forEach(funeral => {
            const table = this.createFuneralTable(funeral);
            const cell = document.createElement('div');
            cell.appendChild(table);
            grid.appendChild(cell);
        });
    }
})