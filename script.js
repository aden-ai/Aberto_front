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
