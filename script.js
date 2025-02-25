// Handle the form submission with JavaScript
document.getElementById("waitingListForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;

    // Send form data to the Firebase function
    fetch('https://signup-m7nt6cwi3q-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Assuming server responds with plain text on success
        } else {
            throw new Error("Failed to sign up");
        }
    })
    .then(data => {
        // Display success message
        const messageBox = document.getElementById("message");
        messageBox.classList.remove("error");
        messageBox.classList.add("success");
        messageBox.innerText = "Successfully signed up!";
        messageBox.style.display = "block"; // Show the success message

        // Clear the form
        document.getElementById("waitingListForm").reset();
    })
    .catch(error => {
        // Display error message if something goes wrong
        const messageBox = document.getElementById("message");
        messageBox.classList.add("error");
        messageBox.classList.remove("success");
        messageBox.innerText = "Error signing up. Please try again.";
        messageBox.style.display = "block"; // Show the error message
        console.error('Error:', error);
    });
});

// Sidebar menu functionality
const menuIcon = document.getElementById('menuIcon');
const sidebarMenu = document.getElementById('sidebarMenu');

// Open sidebar menu
menuIcon.addEventListener('click', function() {
    sidebarMenu.style.width = '250px'; // Open the sidebar menu
});

// Close sidebar menu
function closeSidebar() {
    sidebarMenu.style.width = '0'; // Close the sidebar menu
}

// Attach close function to the close button in the sidebar
document.querySelector('.close-btn').addEventListener('click', closeSidebar);

// Login Modal Functionality
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeModalBtn = document.querySelector(".close-modal-btn");

// Ensure the modal is hidden on page load
loginModal.style.display = "none";

// Open login modal when login button is clicked
loginBtn.addEventListener("click", function () {
    loginModal.style.display = "flex";
});

// Close login modal when close button is clicked
closeModalBtn.addEventListener("click", function () {
    loginModal.style.display = "none";
});

// Close login modal when clicking outside the modal
window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});
