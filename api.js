// KONFIGURASI API VIP RESELLER
const API_URL = "https://vip-reseller.co.id/api/game-feature";
const API_KEY = "MCiFqFJGuVVHcg6ZjVD6Lz1yfAY4kweIrzSHMggWJWyDOtTNZJZAG4Y8CfONUC7Y";

// Buat tanda tangan MD5
function buatSign() {
    return CryptoJS.MD5(API_KEY).toString();
}

// Fungsi kirim pesanan
function kirimPesanan(kodeLayanan, idAkun, zona = "") {
    const hasil = document.getElementById("res_" + kodeLayanan);
    hasil.style.display = "none";

    if (!idAkun) {
        hasil.textContent = "⚠️ Masukkan ID Akun dulu!";
        hasil.className = "hasil gagal";
        hasil.style.display = "block";
        return;
    }

    const dataKirim = new FormData();
    dataKirim.append("key", API_KEY);
    dataKirim.append("sign", buatSign());
    dataKirim.append("type", "order");
    dataKirim.append("service", kodeLayanan);
    dataKirim.append("data_no", idAkun);
    if (zona) dataKirim.append("data_zone", zona);

    fetch(API_URL, { method: "POST", body: dataKirim })
    .then(res => res.json())
    .then(jawaban => {
        hasil.textContent = jawaban.result 
            ? "✅ Berhasil! Trx ID: " + jawaban.data.trxid 
            : "❌ Gagal: " + (jawaban.note || "Cek data/saldo");
        hasil.className = "hasil " + (jawaban.result ? "sukses" : "gagal");
        hasil.style.display = "block";
    })
    .catch(() => {
        hasil.textContent = "❌ Koneksi bermasalah";
        hasil.className = "hasil gagal";
        hasil.style.display = "block";
    });
}
