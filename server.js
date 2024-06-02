const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://vinSampleUser:TEwaFF2HOfIup0Zi@vincluster.z02uxdh.mongodb.net/?retryWrites=true&w=majority&appName=VINCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
