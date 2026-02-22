/**
 * @Author Le-Roy S. Jongwe
 * @description - Manage dashboard statistics
 * Manage policy holder info
 * Manage addons
 * Manage policy holder's policy
 */

customElements.define('statistics-component', class extends HTMLElement{
	//Class Fields
	__statisticsData;
	
	get statisticsData()
	{
		return this.__statisticsData;
	}
	
	set statisticsData(statisticsData){
		this.__statisticsData = statisticsData;
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
				
				.overview-cards {
				  display: flex;
				  gap: 20px;
				  margin-bottom: 30px;
				}

				.card {
				  flex: 1;
				  background: #ffffff;
				  border-radius: 10px;
				  padding: 20px;
				  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
				}

				.card h3 {
				  margin-bottom: 10px;
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
					
					<div class="card">
		        		<h3>Inactive Members</h3>
		        		<p id="inactiveMembers">0</p>
		      		</div>
					
					<div class="card">
				        <h3>Clients in Arrears</h3>
				        <p id="clientsInErrears">0</p>
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

           this.#displayStatistics();
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
	
	/*-----------------------------------------------------------------------------------------------
	* fetch dashboard statistics from server
	* return fetched statistics for display
	-----------------------------------------------------------------------------------------------*/
	async #fetchStatistics(){
		try{
			let resolve = await fetch("/dashboard/stats");
			
			if(!resolve.ok){
				const errorText = await resolve.text();
				throw new Error(errorText);
			}
			
			this.statisticsData = await resolve.json();
		}catch(error){
			alert(error.message);
		}
		
	}	
	
	async #displayStatistics(){
		await this.#fetchStatistics();
		//populate div acrds with data
		let totalClientsDiv = this.shadowRoot.getElementById("totalClients");
		totalClientsDiv.textContent = this.statisticsData.totalClients;
		
		let activeClientsDiv = this.shadowRoot.getElementById("activeMembers");
		activeClientsDiv.textContent = this.statisticsData.activeClients;
		
		let inactiveClientsDiv = this.shadowRoot.getElementById("inactiveMembers");
		inactiveClientsDiv.textContent = this.statisticsData.inactiveClients;
		
		let clientsInErrearsDiv = this.shadowRoot.getElementById("clientsInErrears");
		clientsInErrearsDiv.textContent = this.statisticsData.clientsInErrears;
	}
});