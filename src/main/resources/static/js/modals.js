let displayModal = function(title, message)
{
    document.getElementById("modal-messages").style.display = "grid";
    document.getElementById("modal-messages").className = "success-modal"
    document.getElementById("modal-bar").className = "success-bar";
    document.getElementById("modal-footer").className = "success-bar";
    document.getElementById("shadow-wrapper").style.display = "block";
    document.getElementById("mb-header").textContent = title;
    document.getElementById("modal-message").textContent = message;
}

let passwordModal = function()
{
    document.getElementById("confirm-password-modal").style.display = "grid";
    document.getElementById("shadow-wrapper").style.display = "block";
}

let errorModal = function(title, message)
{
    document.getElementById("modal-messages").style.display = "grid";
    document.getElementById("modal-messages").className = "error-modal";
    document.getElementById("modal-bar").className= "error-bar";
    document.getElementById("modal-footer").className = "error-bar";
    document.getElementById("shadow-wrapper").style.display = "block";
    document.getElementById("mb-header").textContent = title;
    document.getElementById("modal-message").textContent = message;
}

let closeModal = () => {
    document.getElementById("modal-close-btn").addEventListener("click", function()
    {
        document.getElementById("modal-messages").style.display = "none";
        document.getElementById("shadow-wrapper").style.display = "none";
    });

    document.getElementById("modal-ok-btn").addEventListener("click", function()
    {
        document.getElementById("modal-messages").style.display = "none";
        document.getElementById("shadow-wrapper").style.display = "none";
    });
};

let closePasswordModal = () => {
    document.getElementById("cpm-close-btn").addEventListener("click", function()
    {
        document.getElementById("confirm-password-modal").style.display = "none";
        document.getElementById("shadow-wrapper").style.display = "none";
    });
   
};

closeModal();
closePasswordModal()