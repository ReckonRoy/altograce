let routes = () => {
    /*- Routes pointing to user profile -*/
    document.getElementById("user-profile-img").addEventListener("click", function(){
        location.href = "/admin/profile";
    });
    document.getElementById("user-profile-btn").addEventListener("click", function(){
        location.href = "/admin/profile";
    });

    /*- Routes pointing to client settings -*/
    document.getElementById("client-settings-img").addEventListener("click", function(){
        location.href = "/client/settings";
    });
    document.getElementById("client-settings-btn").addEventListener("click", function(){
        location.href = "/client/settings";
    });

    /*- Routes pointing to company profile -*/
    document.getElementById("company-profile-img").addEventListener("click", function(){
        location.href = "/company";
    });
    document.getElementById("company-profile-btn").addEventListener("click", function(){
        location.href = "/company";
    });

    /*- Routes pointing to branch profile -*/
    document.getElementById("branch-profile-img").addEventListener("click", function(){
        location.href = "/admin/branch/settings";
    });
    document.getElementById("branch-profile-btn").addEventListener("click", function(){
        location.href = "/admin/branch/settings";
    });

    /*- Routes pointing to invoice settings -*/
    document.getElementById("invoice-img").addEventListener("click", function(){
        location.href = "/admin/invoice/settings";
    });
    document.getElementById("invoice-btn").addEventListener("click", function(){
        location.href = "/admin/invoice/setings";
    });
}

routes();