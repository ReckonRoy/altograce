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
        if(!this.shadowRoot) return
        alert(this.getAttribute('fileId'));
        this.shadowRoot.innerHTML = `

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
            this.getPolicyInfo(this.fileId);
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
    //get dependencies from server 
    getPolicyInfo(fileId)
    {
        alert(`This is my fileId: ${fileId} from policy info compenent`);
    }

    updatePolicyHolderInfo(fileId){

    }

    updatePolicy(fileId){

    }
});