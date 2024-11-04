const express = require('express');
const path = require('path'); // Ensure you import the path module
const bodyParser = require('body-parser');
const cors = require('cors');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Access Firebase credentials from Secret Manager
const client = new SecretManagerServiceClient();

async function accessSecretVersion() {
  try {
    const [version] = await client.accessSecretVersion({
      name: 'projects/pocketproof/secrets/pocketproofs_FIREBASE_ADMIN/versions/latest',
    });

    return version.payload.data.toString('utf8');
  } catch (error) {
    console.error('Error accessing secret:', error);
    throw new Error('Failed to access Firebase credentials');
  }
}

// Initialize Firebase Admin SDK when secret is accessed
accessSecretVersion()
  .then((key) => {
    const admin = require('firebase-admin');
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(key)),
    });

    const db = admin.firestore();

    // Initialize the app
    const app = express();

    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    // Serve static files from public directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Route for handling sign-up form submissions
    app.post('/signup', async (req, res) => {
      try {
        const docRef = await db.collection('signups').add({
          name: req.body.name,
          email: req.body.email,
        });
        console.log('Document written with ID: ', docRef.id);
        res.send('Successfully signed up!');
      } catch (err) {
        console.error('Error adding document: ', err);
        res.status(500).send(err);
      }
    });

    // Serve index.html on the root path
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize Firebase Admin SDK:', error);
  });
