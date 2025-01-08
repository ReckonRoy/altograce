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
    let deceasedName = getQueryParam("name");
    let surname = getQueryParam("surname");
    let primaryClient = getQueryParam("clientName");
    let idPassport = getQueryParam("id_passport");
    let dependentId = getQueryParam("dependentId");

    
    let funeralFormComponent = document.createElement("funeral-form-component");
    funeralFormComponent.setAttribute("primaryClient", primaryClient);
    funeralFormComponent.setAttribute("fileId", fileId);
    funeralFormComponent.setAttribute("deceasedName", deceasedName);
    funeralFormComponent.setAttribute("surname", surname);
    funeralFormComponent.setAttribute("idPassport", idPassport);
    funeralFormComponent.setAttribute("dependentId", dependentId);
    
    
    let formContainer = document.getElementById("form-container");
    formContainer.appendChild(funeralFormComponent);

    
});