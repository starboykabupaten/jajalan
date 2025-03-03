const axios = require('axios');
const fs = require('fs');
const Web3 = require('web3');
const crypto = require('crypto');

// Fungsi untuk membuat kode referral acak
const generateReferralCode = () => {
    return crypto.randomBytes(6).toString('hex').toUpperCase();  // Kode referral berupa 12 karakter hex
};

// Fungsi untuk membaca kode referral dari file 'code.txt'
const readReferralCodeFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('code.txt', 'utf8', (err, data) => {
            if (err) {
                reject('Gagal membaca file code.txt: ' + err.message);
            } else {
                resolve(data.trim());  // Menghilangkan spasi tambahan di awal/akhir
            }
        });
    });
};

// Fungsi untuk membuat wallet baru (menggunakan Web3.js untuk Ethereum)
const createWallet = () => {
    const web3 = new Web3();

    // Membuat wallet Ethereum baru
    const account = web3.eth.accounts.create();

    return account; // Mengembalikan alamat dan private key
};

// Base URL untuk pendaftaran
const baseUrl = 'https://back.aidapp.com';

// Fungsi untuk mendaftar wallet dan menyimpan data ke file account.txt
const registerWallet = async () => {
    try {
        // Membaca kode referral dari file code.txt
        const referralCode = await readReferralCodeFromFile();

        // Membuat wallet baru
        const account = createWallet();

        // Menyusun data untuk pendaftaran
        const registrationData = {
            password: 'supersecurepassword', // Ganti dengan password yang diinginkan
            referralCode: referralCode,      // Kode referral yang diambil dari file
            walletAddress: account.address,  // Alamat wallet baru
            privateKey: account.privateKey   // Private key wallet baru
        };

        // Mengirimkan POST request ke API untuk registrasi
        const response = await axios.post(`${baseUrl}/register`, registrationData);

        // Mengecek status pendaftaran
        if (response.status === 200) {
            console.log('Registrasi wallet berhasil!');
            console.log('Data Pendaftaran:', response.data); // Tampilkan respons dari API jika perlu

            // Simpan data wallet (alamat dan private key) ke file account.txt
            const accountData = `Wallet Address: ${account.address}\nPrivate Key: ${account.privateKey}`;
            fs.writeFileSync('account.txt', accountData, 'utf8');
            console.log('Data wallet berhasil disimpan ke account.txt');
        } else {
            console.log('Pendaftaran wallet gagal. Status:', response.status);
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat pendaftaran:', error.message);
    }
};

// Panggil fungsi untuk mendaftar wallet
registerWallet();
