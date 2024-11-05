const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Create a Firebase Function to handle sign-ups
exports.signUp = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }
        const { name, email } = req.body;
        try {
            const docRef = await db.collection('signups').add({ name, email });
            console.log('Document written with ID:', docRef.id);
            return res.status(200).send('Successfully signed up!');
        } catch (error) {
            console.error('Error adding document:', error);
            return res.status(500).send('Error signing up. Please try again.');
        }
    });
});

    // (Optional) Add database logic here if needed, such as saving to Firestore or logging the data.

    // Send a response
    res.status(200).send("Sign-up successful");
});
