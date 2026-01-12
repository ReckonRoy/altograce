/**
 * @Author Le-Roy S. Jongwe
 * @description This component is responsible for managing client info and policy such as:
 * Manage policy holder info
 * Manage addons
 * Manage policy holder's policy
 */

customElements.define('policy-info-component', class extends HTMLElement{

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
           
            /*__________________________________________________________________________________________________________________*/
			/* =============================================================================================
			    Responsive Design
			   ============================================================================================= */

			
			@media (max-width: 1024px) {
				
				
			}

			/*
			=============================================================================================
			Mobile phones (≤768px wide)
			=============================================================================================
			*/
			
			@media (max-width: 768px) {
			
			}

			/*
			=============================================================================================
			Very small screens (≤480px wide)
			=============================================================================================
			*/
			@media (max-width: 480px) {
			 
			}
			</style>
			
			<div class="dashboard-container">
		    	<div class="overview-cards">
		      		<div class="card">
		        		<h3>Total Clients</h3>
		        		<p id="totalClients">0</p>
		      		</div>
					
		      		<div class="card">
		        		<h3>Active Members</h3>
		        		<p id="activeMembers">0</p>
		      		</div>
		   		</div>
			</div>
            
        `;
    }
    /*_______________________________________________________________________________________________*/

    /*----------------------------------------Connected Callback-----------------------------------*/
    connectedCallback()
    {
        if(!this.shadowRoot){
            this.attachShadow({mode: 'open'})
        }

        if(!this.rendered){
            this.render();
            this.rendered = true;

            
        }
    }
    /*_______________________________________________________________________________________________*/

    /*-------------------------------------------Observer--------------------------------------------*/
    static get observedAttributes()
    {
        return ['attribute name'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }
    /*_______________________________________________________________________________________________*/

});