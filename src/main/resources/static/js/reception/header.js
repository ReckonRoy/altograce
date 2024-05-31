document.body.style.padding = "0";
document.body.style.margin = "0";
document.body.style.backgroundColor = "#f5f5f5";
document.body.style.fontFamily = "Arial, sans-serif";

/**
 * @author Le-Roy Jongwe
 * @Date 8 December 2023
 * @description This is a script that handles UI behavior for the nav section
 */

customElements.define("reception-header", class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        #wrapper {
          position: relative;
          top: 0;
          width: 100%;
          height: 100vh;
          box-sizing: border-box;
          padding: 1px 0;
        }

        /*----------------------------- nav --------------------------------*/
        #nav-wrapper {
          position: relative;
          padding: 0;
          margin: 0;
        }

        nav {
          display: flex;
          justify-content: space-between;
          background: rgb(7, 5, 150);
          padding: 10px 5px;
          color: white;
          left: 0;
          right: 0;
          top: 0;
          align-items: center;
          box-sizing: border-box;
        }

        nav h1 {
          font-size: 18px;
        }

        #menu-control {
          height: 35px;
          background: white;
          width: 50px;
          border-radius: 5px;
        }

        #menu-control:hover {
          cursor: pointer;
          border: 1px solid rgb(96, 180, 248);
          background-color: rgb(96, 180, 248);
        }

        #menu-control div {
          border: 2px solid black;
          margin-top: 6px;
          width: 80%;
          margin-left: 5%;
        }

        #profile-div {
          position: relative;
          background: white;
          width: 50px;
          height: 50px;
          text-align: center;
          font-weight: bolder;
          color: #330d0d;
          border-radius: 50%;
          box-sizing: border-box;
        }

        #profile-div:hover {
          border-inline: 3px solid rgb(96, 180, 248);
          cursor: pointer;
        }

        #profile-div div {
          position: absolute;
          height: 15px;
          top: 18px;
          width: 100%;
        }

        #profile-menu {
          display: none;
          position: absolute;
          border: 1px solid black;
          top: 100;
          right: 0;
          margin-right: 1px;
          width: 150px;
          background-color: white;
          z-index: 1;
        }

        #profile-menu ul {
          margin-left: 0;
          padding: 0;
          list-style-type: none;
        }

        #profile-menu li {
          cursor: pointer;
          padding: 10px 0;
          padding-left: 5px;
          font-weight: bolder;
          color: gray;
        }

        #profile-menu li:hover {
          cursor: pointer;
          background-color: #af87d7;
        }
        /*----------------------------- end nav --------------------------------*/
        /*----------------------------- side nav menu ----------------------------------*/
        #side-nav {
          display: none;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15%;
          background: white;
          color: white;
          z-index: 1;
          padding: 5px;
          border-right: 1px solid gray;
        }

        #sidenav-menu-control {
          height: 40px;
          background: black;
          width: 50px;
          border-radius: 5px;
          float: right;
          margin-top: 10px;
        }

        #sidenav-menu-control:hover {
          cursor: pointer;
        }

        #sidenav-menu-control div {
          border: 2px solid white;
          margin-top: 6px;
          width: 80%;
          margin-left: 5%;
        }

        .clear-both {
          clear: both;
        }
        /*------------------------------------------------------------*/
        #side-nav hr {
          background: purple;
        }

        #side-nav ul {
          margin-top: 60px;
          margin-left: 0;
          padding: 0;
          list-style-type: none;
          font-size: 20px;
        }

        #side-nav li {
          padding: 10px 0;
          text-align: center;
          background-color: black;
          margin-bottom: 10px;
        }

        #side-nav li:hover {
          cursor: pointer;
          background-color: #af87d7;
          color: white;
        }
        /*----------------------------- end nav --------------------------------*/
      </style>

      <div id="nav-wrapper">
        <nav>
          <div id="menu-control">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1>Company Profile</h1>
          <div id="profile-div"><div>profile</div></div>
        </nav>
        <div id="profile-menu">
          <ul>
            <li id="profile">Profile</li>
            <li id="logout">Log Out</li>
          </ul>
        </div>
      </div>

      <div id="side-nav">
        <div id="sidenav-menu-control">
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div class="clear-both"></div>
        <hr/>
        <ul>
          <li id="dashboard-link">Dashboard</li>
          <li id="client-link">Client</li>
        </ul>
      </div>
    `;

    const profile_div = this.shadowRoot.getElementById("profile-div");
    const profile_menu = this.shadowRoot.getElementById("profile-menu");
    const side_nav = this.shadowRoot.getElementById("side-nav");
    const menubtn = this.shadowRoot.getElementById("menu-control");

    profile_div.addEventListener("click", function () {
      if (profile_menu.style.display === "") {
        profile_menu.style.display = "block";
      } else {
        profile_menu.style.display = "";
      }
    });

    menubtn.addEventListener("click", function () {
      if (side_nav.style.display === "") {
        side_nav.style.display = "block";
      } else {
        side_nav.style.display = "";
      }
    });

    const sidemenubtn = this.shadowRoot.getElementById("sidenav-menu-control");

    sidemenubtn.addEventListener("click", function () {
      if (side_nav.style.display === "block") {
        side_nav.style.display = "";
      }
    });

    let logout = () => {
      this.shadowRoot.getElementById("logout").addEventListener("click", () => {
        location.href = "/logout";
      });
    };

    let headerRoutes = () => {
      this.shadowRoot.getElementById("profile").addEventListener("click", () => {
        location.href = "/reception/profile";
      });

      this.shadowRoot.getElementById("dashboard-link").addEventListener("click", () => {
        location.href = "/reception/dashboard";
      });
      this.shadowRoot.getElementById("client-link").addEventListener("click", () => {
        location.href = "/client/management";
      });
    };

    /*------------------------------------------------------------------------------------------------*/

    headerRoutes();
    logout();
  }
});
