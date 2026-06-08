const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3002;

// Endpoint untuk menerima perintah kirim notifikasi dari Service Antrean
app.post('/kirim-notif', (req, res) => {
    const dataNotif = req.body;

    console.log(`\n--------------------------------------------------`);
    console.log(`[KIRIM NOTIFIKASI VIA HTTP]`);
    console.log(`Tujuan WA : ${dataNotif.telepon}`);
    console.log(`Isi Pesan : ${dataNotif.pesan}`);
    console.log(`--------------------------------------------------`);

    // Kirim respons balik ke Service Antrean bahwa notifikasi sukses diproses
    res.status(200).json({
        status: "Terkirim",
        waktu: new Date().toLocaleTimeString()
    });
});

app.listen(PORT, () => {
    console.log(`[SERVICE NOTIFIKASI] berjalan di http://localhost:${PORT}`);
});
