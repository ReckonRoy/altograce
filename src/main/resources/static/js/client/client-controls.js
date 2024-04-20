/**
 * @author Le-Roy Jongwe
 * @Date 06 March 2024
 * @description component for displaying clients
 */

customElements.define("client-controls", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =`<style>
      button {
        padding: 15px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    button:hover {
        background-color: #2980b9;
    }
      </style>

        <div>
            <button id="show-clients-btn">Clients</button>
            <button id="add-client-btn">Add Client</button>
        </div>
        `
        let addClient = document.getElementById("member-registration");
        let showClients = document.getElementById("display-client");
        
        let addClient_btn = this.shadowRoot.getElementById("add-client-btn");
        addClient_btn.addEventListener("click", ()=>{
            showClients.style.display = "none";
            addClient.style.display = "flex";
        });

        let showClient_btn = this.shadowRoot.getElementById("show-clients-btn");
        showClient_btn.addEventListener("click", ()=>{
            addClient.style.display = "none";
            showClients.style.display = "flex";
        });
    }
});