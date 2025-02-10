// Function to Show Create Case Form and Hide Welcome Message
function showCreateCase() {
    document.getElementById('createCaseForm').classList.remove('hidden');
    document.getElementById('welcomeText').classList.add('hidden');
}

// Function to Show Send Alert Popup
function showSendAlert() {
    document.getElementById('alertPopup').classList.remove('hidden');
    document.getElementById('popupOverlay').classList.remove('hidden'); // Show background overlay
}

// Function to Close the Popup
function closePopup() {
    document.getElementById('alertPopup').classList.add('hidden');
    document.getElementById('popupOverlay').classList.add('hidden'); // Hide background overlay
}

// Function to Send Alert and Display Selection
function sendAlert() {
    let selectedServices = [];
    if (document.getElementById('police').checked) selectedServices.push("Police");
    if (document.getElementById('fire').checked) selectedServices.push("Fire");
    if (document.getElementById('ambulance').checked) selectedServices.push("Ambulance");

    if (selectedServices.length > 0) {
        alert("🚨 Alert Sent to: " + selectedServices.join(", "));
    } else {
        alert("⚠️ No services selected!");
    }

    closePopup();
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
