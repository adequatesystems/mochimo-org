const express = require('express');
const path = require('path');
const supplyRoutes = require('./routes/supply');

const app = express();
const PORT = process.env.PORT || 3001;

// Supply API routes (before static file serving)
app.use('/supply', supplyRoutes);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../build')));

// Handle React routing - return index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
