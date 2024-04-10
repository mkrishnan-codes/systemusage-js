const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define route to serve index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define route for CPU usage API
app.get('/system-usage', (req, res) => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);

    const cpuUsagePercent = os.loadavg()[0]; // Get the CPU usage over the last 1 minute

    res.json({
        totalMemory: `${(totalMemory / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        freeMemory: `${(freeMemory / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        usedMemory: `${(usedMemory / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        memoryUsagePercent: memoryUsagePercent,
        cpuUsagePercent: cpuUsagePercent
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
