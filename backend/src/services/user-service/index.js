const express = require('express');
const router = require('./routes');
const { connectDB } = require('../../config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 3001;

app.use(express.json());
app.use('/api/users', router);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'user-service' }));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
});

module.exports = app;
