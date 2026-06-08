const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3001;

// Handler Pendaftaran Jadwal
app.post('/daftar', (req, res) => {
    const { nama, tipeHP } = req.body;
    if (!nama || !tipeHP) {
        return res.status(400).json({ status: "Gagal", message: "Data tidak lengkap" });
    }
    const noAntrean = "DGK-" + Math.floor(1000 + Math.random() * 9000);
    
    console.log(`[SERVICE ANTREAN] Pendaftaran Berhasil: ${nama} - ${tipeHP}`);
    res.status(201).json({
        status: "Sukses",
        data: { noAntrean, nama, tipeHP }
    });
});

// Handler ketika Teknisi klik Selesai (Langsung oper ke Service Notif lewat HTTP)
app.post('/selesai', async (req, res) => {
    const { noAntrean, namaKonsumen, noWa } = req.body;

    console.log(`[SERVICE ANTREAN] HP ${noAntrean} selesai. Menghubungi Service Notifikasi...`);

    // Kirim data langsung ke Service Notifikasi via HTTP POST
    try {
        const response = await fetch('http://localhost:3002/kirim-notif', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                noAntrean,
                nama: namaKonsumen,
                telepon: noWa,
                pesan: `Halo ${namaKonsumen}, HP Anda (${noAntrean}) di Toko Digikar SUDAH SELESAI.`
            })
        });

        const hasilNotif = await response.json();
        
        res.status(200).json({ 
            status: "Sukses", 
            message: "Status diperbarui & Notifikasi langsung terkirim!",
            detailNotif: hasilNotif
        });

    } catch (error) {
        console.error("[SERVICE ANTREAN] Gagal menghubungi Service Notifikasi:", error.message);
        res.status(500).json({ status: "Gagal", message: "Gagal mengirim notifikasi karena Service Notif mati." });
    }
});

app.listen(PORT, () => {
    console.log(`[SERVICE ANTREAN] berjalan di http://localhost:${PORT}`);
});
