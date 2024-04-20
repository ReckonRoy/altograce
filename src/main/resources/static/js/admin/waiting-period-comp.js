/**
 * @author Le-Roy
 * @date 19 March 2024
 * @description this script manages the main content of the page
 * 
 */

customElements.define("waitingperiod-component", class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML =`
        <style>

        </style>

        <div>
            <label for="monthsInput">Enter waiting period (in months):</label>
            <input type="number" id="monthsInput" min="1">
            <button id="set_btn">Set Waiting Period</button>
            <p id="result"></p>
        </div>
      `

        let setPeriod_btn = this.shadowRoot.getElementById('set_btn');
        setPeriod_btn.addEventListener('click', () => {
            let months = parseInt(this.shadowRoot.getElementById('monthsInput').value);
            if (isNaN(months) || months <= 0 || months > 12) {
            this.shadowRoot.getElementById('result').textContent = "Please enter a valid number of months (1-12).";
        } else {
            postMonthsToBackend(months);
        }
        });

        function postMonthsToBackend(months) {
        comId = parseInt(comId.id);
        fetch(`/client/settings/setwaitingperiod/${comId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ months: months })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to post months to backend');
            }
            return response.text();
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
        alert('Error posting months to backend:', error);
        });
        }

        function fetchWaitingPeriodFromBackend() {
        fetch('/waiting-period', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ months: months })
        })
        .then(response => {
        if (response.ok) {
        return response.json();
        }
        throw new Error('Failed to fetch waiting period from backend');
        })
        .then(data => {
        // Set the returned result to the months field value
        this.shadowRoot.getElementById('monthsInput').value = data.waitingPeriod;
        })
        .catch(error => {
        console.error('Error fetching waiting period from backend:', error);
        // Handle error
        });
        }
    }
})