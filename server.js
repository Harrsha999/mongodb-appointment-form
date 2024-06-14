const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/appointments')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define appointment schema and model
const appointmentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    date: String,
    time: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Handle form submission
app.post('/submit', async (req, res) => {
    const { name, age, email, date, time } = req.body;
    const newAppointment = new Appointment({ name, age, email, date, time });
    
    try {
        await newAppointment.save();
        res.send('Appointment booked successfully!');
    } catch (err) {
        res.status(500).send('Failed to book appointment.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
