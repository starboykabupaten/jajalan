Struktur File:
wallet.txt: Berisi daftar alamat penerima, satu alamat per baris.

0xRecipientAddress1
0xRecipientAddress2
0xRecipientAddress3
pk.txt: Berisi private key pengirim dan alamat kontrak token, dipisahkan oleh baris baru:

PRIVATE_KEY_SENDER
TOKEN_CONTRACT_ADDRESS
Pilihan Jaringan: Pilihan untuk memilih jaringan Layer 2 seperti Optimism, Base, Arbitrum, atau Lisk.

Jumlah Token: Jumlah token yang akan dikirimkan akan diberikan sebagai parameter input.
Penjelasan Kode:
Provider Jaringan L2:

Fungsi getProvider(network) mengembalikan URL provider sesuai dengan jaringan yang dipilih. Anda bisa memilih antara jaringan Optimism, Base, Arbitrum, atau Lisk. Pilihan jaringan diambil dari argumen yang diberikan melalui terminal.

Jika jaringan yang dimasukkan tidak valid, script akan melemparkan error.

Baca Data dari File:

File pk.txt berisi private key dan alamat kontrak token ERC-20, yang dibaca oleh script.
File wallet.txt berisi daftar alamat penerima yang akan dikirim token.
Input Jumlah Token:

Jumlah token yang akan dikirimkan diambil dari parameter baris perintah (process.argv[2]). Anda dapat memberikan jumlah token secara langsung saat menjalankan script.
Jika tidak ada input jumlah token, defaultnya adalah 10 token.
Mengirim Token:

Script menggunakan ABI ERC-20 untuk memanggil metode transfer dan mengirim token ke setiap alamat penerima.
Token dikirim dalam satuan yang sesuai dengan desimal token (misalnya 18 desimal).
Menunggu Konfirmasi:

Setelah mengirim transaksi, script akan menunggu hingga transaksi selesai dengan memanggil tx.wait().
Langkah-langkah Penggunaan:
Persiapkan File wallet.txt dan pk.txt:

wallet.txt: Daftar alamat penerima (satu alamat per baris).
pk.txt: Private key pengirim di baris pertama dan alamat kontrak token ERC-20 di baris kedua.
Menjalankan Script: Untuk menjalankan script, Anda dapat memberikan dua parameter melalui baris perintah:

Jumlah token yang ingin dikirim (defaultnya 10 token).
Jaringan yang ingin digunakan (optimism, base, arbitrum, lisk).
Contoh perintah untuk mengirim 20 token ke semua alamat di wallet.txt melalui jaringan Optimism:

node sendTokens.js 20 optimism
Untuk menggunakan jaringan Arbitrum, Anda dapat menjalankan:

node sendTokens.js 15 arbitrum
Konfirmasi: Setelah transaksi dikirim, Anda akan melihat hash transaksi dan status pemrosesan di terminal.

Catatan:
Private Key: Pastikan private key Anda disimpan dengan aman dan jangan pernah membagikannya secara publik.
Gas Fees: Pastikan pengirim memiliki cukup saldo untuk membayar biaya gas di jaringan L2 yang dipilih.
Keamanan: Gunakan script ini dengan hati-hati dan pastikan Anda memverifikasi alamat penerima dengan benar.
Semoga ini membantu! Jika Anda memiliki pertanyaan lebih lanjut atau butuh penyesuaian, jangan ragu untuk bertanya!
