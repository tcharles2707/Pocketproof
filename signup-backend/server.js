const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

// Use a relative path to require the service account key
const serviceAccount = require('./pocketproof-b5e0e-firebase-adminsdk-gu8vk-4932f5c0b1.json'); // Adjust the path if necessary

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Firestore
const db = admin.firestore();

// Initialize the app
const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());  // Allow cross-origin requests

// Route for handling sign-up form submissions
app.post('/signup', async (req, res) => {
    try {
        // Add a new document with auto-generated ID to Firestore
        const docRef = await db.collection('signups').add({
            name: req.body.name,
            email: req.body.email
        });
        console.log('Document written with ID: ', docRef.id);
        res.send("Successfully signed up!");
    } catch (err) {
        console.error('Error adding document: ', err);
        res.status(500).send(err);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
