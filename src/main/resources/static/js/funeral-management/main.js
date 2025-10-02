document.addEventListener("DOMContentLoaded", function() {
    // Function to get query parameter by name
    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    /**
     * Retrieve the values from the URL
     * @param name: name of deceased
     * @param surname: surname of deceased
     * @param id_pass: id or passport number of deceased
     */
    
    let fileId = getQueryParam("fileId");
    let deceasedId = getQueryParam("deceasedId");
    let deceasedFullName = getQueryParam("deceasedFullName");
    let policyHolderName = getQueryParam("policyHolderName");
    let idPassport = getQueryParam("id_passport");
    

    
    let funeralFormComponent = document.createElement("funeral-form-component");
    funeralFormComponent.setAttribute("policyHolderName", policyHolderName);
    funeralFormComponent.setAttribute("fileId", fileId);
    funeralFormComponent.setAttribute("deceasedId", deceasedId);
    funeralFormComponent.setAttribute("deceasedFullName", deceasedFullName);
    funeralFormComponent.setAttribute("idPassport", idPassport);
    
    
    let formContainer = document.getElementById("form-container");
    formContainer.appendChild(funeralFormComponent);

    
});