/**
 * @author Le-Roy Jongwe
 * @Date 23 February 2024
 * @description compnent for package seclection and adding
 */

customElements.define("notification-dialog", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
        :host {
          display: none;
          position: fixed;
          width: 50%;
          top: 150px;
          left: 25%;
        }

        .details-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: none;
      }

        .notification-container {
            position: relative;
          }

          .notification {
            position: relative;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
            z-index: 1;
          }

          .notification::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(145deg, rgba(255,255,255,0.8), rgba(0,0,0,0.1));
            border-radius: 8px;
            z-index: -1;
            animation: overflowEffect 2s infinite alternate;
          }

          @keyframes overflowEffect {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.05);
            }
          }

          .notification h2 {
            margin-top: 0;
            color: #333;
          }

          .notification p {
            margin-bottom: 20px;
            color: #666;
          }

          .btn {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .btn:hover {
            background-color: #45a049;
          }

          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          }
        </style>
          <div>
            <div class="notification" id="notification">
              <span class="close-btn" id="close-btn">&times;</span>
              <h2>Congratulations!</h2>
              <p>You have successfully registered. Welcome aboard!</p>
              <button class="btn" id="confirm-btn">OK</button>
            </div>
            <div class="details-overlay"></div>
          </div>
        `;
         
        let closeNotification = () => {
          let notification = this.shadowRoot.getElementById("notification");
          notification.style.display = "none";
          const detailsOverlay = this.shadowRoot.querySelector('.details-overlay');
          detailsOverlay.style.display = 'none';
        };

        let close_btn = this.shadowRoot.getElementById("close-btn");
          close_btn.addEventListener("click", () => {
            closeNotification();
          });

          let confirm_btn = this.shadowRoot.getElementById("confirm-btn");
          confirm_btn.addEventListener("click", () => {
            closeNotification();
          });
          
    }
});
        