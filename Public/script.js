// Handle the form submission with JavaScript
document.getElementById("waitingListForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;

    // Send form data to the server
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email })
    })
    .then(response => response.text()) // Assuming server responds with plain text
    .then(data => {
        // Display success message
        const messageBox = document.getElementById("message");
        messageBox.classList.remove("error");
        messageBox.innerText = "Successfully signed up!";
        messageBox.style.display = "block"; // Show the success message
        // Optionally clear the form
        document.getElementById("waitingListForm").reset();
    })
    .catch(error => {
        // Display error message if something goes wrong
        const messageBox = document.getElementById("message");
        messageBox.classList.add("error");
        messageBox.innerText = "Error signing up. Please try again.";
        messageBox.style.display = "block"; // Show the error message
        console.error('Error:', error);
    });
});
