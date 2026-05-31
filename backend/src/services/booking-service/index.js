const express = require('express');
const router = require('./routes');
const { connectDB } = require('../../config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.BOOKING_SERVICE_PORT || 3002;

app.use(express.json());
app.use('/api/bookings', router);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'booking-service' }));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
  });
});

module.exports = app;
