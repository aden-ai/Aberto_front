// Function to Show Create Case Form and Hide Welcome Message
function showCreateCase() {
    document.getElementById('createCaseForm').classList.remove('hidden');
    document.getElementById('welcomeText').classList.add('hidden');
}

// Function to Send Alert and Display Selection
function sendAlert() {
    let selectedServices = [];
    if (document.getElementById('police').checked) selectedServices.push("Police");
    if (document.getElementById('fire').checked) selectedServices.push("Fire");
    if (document.getElementById('ambulance').checked) selectedServices.push("Ambulance");

    return selectedServices.join(", ");
}

// Toggle Active/Inactive Button in Navbar
document.querySelector(".toggle-btn").addEventListener("click", function () {
    if (this.textContent === "Active") {
        this.textContent = "Inactive";
        this.classList.add("inactive");
    } else {
        this.textContent = "Active";
        this.classList.remove("inactive");
    }
});

document.getElementById('createCaseForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.services = sendAlert();  // This gets your selected services

    try {
        const response = await fetch('http://localhost:3000/add_case', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            // Form reset after successful submission
            this.reset();
            alert('Case added successfully');
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add case');
    }
});

function showNotification(message, type = "info") {
    alert(`[${type.toUpperCase()}] ${message}`);
}

    async function showCases() {
    showNotification("Fetching all cases...");

    try {
        const response = await fetch("http://localhost:3000/get_cases");
        const cases = await response.json();

        if (!cases.length) {
            document.getElementById("mainContent").innerHTML = "<h2>No cases found.</h2>";
            return;
        }

        document.getElementById("mainContent").innerHTML = `
            <h2>All Cases</h2>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Age</th>
                        <th>Number</th>
                        <th>Injured People</th>
                        <th>Alert Level</th>
                        <th>Accident Details</th>
                        <th>Acquaintance</th>
                        <th>Vehicle</th>
                        <th>Services</th>
                    </tr>
                </thead>
                <tbody id="caseTableBody"></tbody>
            </table>
        `;

        updateTableContent(cases);
    } catch (error) {
        console.error("Error fetching cases:", error);
        showNotification("Failed to load cases", "error");
    }
}

function updateTableContent(cases) {
    const caseTableBody = document.getElementById("caseTableBody");
    if (!caseTableBody) return;

    caseTableBody.innerHTML = "";

    cases.forEach(caseItem => {
        const row = createTableRow(caseItem);
        caseTableBody.appendChild(row);
    });
}

function createTableRow(caseItem) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${caseItem.id}</td>
        <td>${caseItem.name}</td>
        <td>${caseItem.location}</td>
        <td>${caseItem.age || ""}</td>
        <td>${caseItem.number || ""}</td>
        <td>${caseItem.injuredPeople || ""}</td>
        <td>${caseItem.alertLevel || ""}</td>
        <td>${caseItem.accidentDetails || ""}</td>
        <td>${caseItem.acquaintance ? "Yes" : "No"}</td>
        <td>${caseItem.vehicle || ""}</td>
        <td>${caseItem.services || ""}</td>
    `;
    return row;
}
