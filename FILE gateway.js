const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const SERVICE_ANTREAN_URL = 'http://localhost:3001';

// Route 1: Konsumen mendaftar jadwal (Sinkron)
app.post('/api/daftar', (req, res) => {
    const data = JSON.stringify(req.body);
    
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/daftar',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = http.request(options, (response) => {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => res.status(response.statusCode).send(JSON.parse(body)));
    });

    request.on('error', (err) => res.status(500).json({ error: "Service Antrean tidak merespon" }));
    request.write(data);
    request.end();
});

// Route 2: Teknisi mengubah status service menjadi selesai (Sinkron ke Asinkron)
app.post('/api/service-selesai', (req, res) => {
    const data = JSON.stringify(req.body);
    
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/selesai',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = http.request(options, (response) => {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => res.status(response.statusCode).send(JSON.parse(body)));
    });

    request.on('error', (err) => res.status(500).json({ error: "Service Antrean tidak merespon" }));
    request.write(data);
    request.end();
});

app.listen(PORT, () => {
    console.log(`[API GATEWAY] berjalan di http://localhost:${PORT}`);
});
