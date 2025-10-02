/**
 * @Author Le-Roy S. Jongwe
 * @description Dependency Management Component for managing:
 * - Creating dependency
 * - Updating dependency
 * - Deleting dependency
 */

customElements.define('dependency-management-component', class extends HTMLElement {
    static get observedAttributes() {
        return ['fileid', 'policyHolderName'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    get fileId() {
        return this.getAttribute('fileid');
    }

    set fileId(value) {
        this.setAttribute('fileid', value);
        this.#render();
    }

    get policyHolderName() {
        return this.getAttribute('policyHolderName');
    }

    set policyHolderName(value) {
        this.setAttribute('policyHolderName', value);
        this.#render();
    }

    get dependenciesData() {
        return this.getAttribute('depData');
    }

    set dependenciesData(value)
    {
        this.setAttribute('depData', value);
    }

    connectedCallback() {
        this.#render();
        if (this.fileId) this.#getDependencies(this.fileId);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'fileid' && oldValue !== newValue) {
            this.#render();
            this.#getDependencies(newValue);
        }
    }

    async #getDependencies(fileId) {
        try {
            const res = await fetch(`/client/management/dependencies/${fileId}`);
            if (!res.ok) throw new Error(`Failed to fetch dependencies: ${res.status}`);
            const data = await res.json();
            this.depData = data;
            this.#renderTable(data);
        } catch (err) {
            console.error(err);
        }
    }

    async #removeDependency(dependencyId, clientId) {
        try {
            const res = await fetch(`/client/management/dependencies/remove/${dependencyId}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ clientid: clientId }),
            });
            if (!res.ok) throw new Error(`Failed to delete dependency: ${res.status}`);
            this.#getDependencies(clientId);
        } catch (err) {
            alert("Failed to delete dependency. Contact webmaster@olivine.co.za if issue persists.");
        }
    }

    #renderTable(dependencies) {
        const card = this.shadowRoot.querySelector('#dependency-info-card');
        if (!card) return;

        const rows = dependencies.map(dep => `
            <tr>
                <td>${dep.name}</td>
                <td>${dep.lastName}</td>
                <td>${dep.gender}</td>
                <td>${dep.dob}</td>
                <td>${dep.relationship}</td>
                <td>${dep.id_passport}</td>
            </tr>
            <tr>
                <td colspan="6" class="actions">
                    <button class="prop-button" data-action="remove" data-id="${dep.id}">Remove</button>
                    <button class="prop-button" data-action="replace" data-id="${dep.id}">Replace</button>
                    <button class="prop-button" data-action="deceased" data-name="dep.name" data-id="${dep.id}">Deceased</button>
                    <button class="prop-button" data-action="addons" data-id="${dep.id}">Add Ons</button>
                </td>
            </tr>
        `).join('');

        card.innerHTML = `
            <table>
                <caption><h2>Dependencies</h2></caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>D.O.B</th>
                        <th>Relationship</th>
                        <th>ID/Passport</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;

        this.#attachEventListeners();
    }

    #attachEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll('.prop-button');
        buttons.forEach(btn => {
            const action = btn.dataset.action;
            const id = parseInt(btn.dataset.id);

            btn.addEventListener('click', () => {
                if (action === 'remove') {
                    this.#removeDependency(id, this.fileId);
                } else if (action === 'deceased') {
                    
                    this.depData.forEach(dep => {
                        if(dep.id === id)
                        {
                            
                            this.#processDeceased(this.fileId, this.policyHolderName, dep.id, dep.name, dep.lastName, dep.id_passport);
                            this.#highlightDeceasedButton(btn);
                        }
                    })
                } else {
                    console.log(`Action '${action}' triggered for ID ${id}`);
                }
            });
        });
    }

    #processDeceased(fileId, policyHolderName, decId, deceasedName, deceasedSurname, id_passport){
        let fileNumber = fileId;
        let deceasedFullName = `${deceasedName} ${deceasedSurname}`;
        let id_pass = id_passport;
        let deceasedId = decId;
        /**/
        location.href = "/funeral/management" + "?fileId=" + encodeURIComponent(fileNumber) + "&policyHolderName=" + encodeURIComponent(policyHolderName) + "&deceasedFullName=" + encodeURIComponent(deceasedFullName) + "&id_passport=" + encodeURIComponent(id_pass) + "&deceasedId=" + deceasedId;
    }

    #highlightDeceasedButton(activeBtn) {
        this.shadowRoot.querySelectorAll('[data-action="deceased"]').forEach(btn => {
            btn.style.backgroundColor = '#007bff';
            btn.style.color = '#fff';
            btn.style.border = 'none';
        });

        activeBtn.style.backgroundColor = 'white';
        activeBtn.style.color = 'black';
        activeBtn.style.border = '1px solid black';
    }

    #render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    width: 100%;
                }
                .client-info-card {
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    padding: 1.5rem;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                }
                h2 {
                    margin: 0 0 1rem;
                    font-size: 1.5rem;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 1rem;
                    border: 1px solid #e0e0e0;
                    text-align: left;
                }
                th {
                    background: #f8f9fa;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                tr:nth-child(even) td {
                    background-color: #f4f6f9;
                }
                .actions {
                    text-align: center;
                }
                .prop-button {
                    background: none;
                    border: 2px solid transparent;
                    color: #333;
                    font-weight: bold;
                    margin: 0.25rem;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 4px;
                }
                .prop-button:hover {
                    background-color: #007bff;
                    color: white;
                    border-color: #007bff;
                }
            </style>

            <div class="client-info-card" id="dependency-info-card">
                <p>Loading dependencies...</p>
            </div>
        `;
    }
});
