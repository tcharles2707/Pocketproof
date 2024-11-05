const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Create a Firebase Function to handle sign-ups
exports.signUp = functions.https.onRequest((req, res) => {
    // Extract 'name' and 'email' from the request body
    const { name, email } = req.body;

    // (Optional) Add database logic here if needed, such as saving to Firestore or logging the data.

    // Send a response
    res.status(200).send("Sign-up successful");
});
