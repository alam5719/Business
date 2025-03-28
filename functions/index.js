// const functions = require('firebase-functions');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors({origin: true}));
// app.use(express.json());


//  mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/yourDatabaseName')
//     .then(() => console.log('MongoDB connected'))
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 









const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Access MongoDB URI from Firebase config
const MONGO_URI = functions.config().mongodb.uri;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/api/hello', (req, res) => {
    res.status(200).send('✅ Hello from Firebase backend!');
});

// Export the API
exports.api = functions.https.onRequest(app);








