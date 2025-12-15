// menu.js
import { kalkulator } from './rumus.js';
import readline from 'readline';
// Membuat interface untuk input dari terminal
const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Minta input dari pengguna
inputUser.question('Masukkan angka pertama: ', angka1 => {
    // tambahkan input untuk angka kedua
  inputUser.question('Masukkan angka kedua: ', angka2 => {
    // tambahkan input untuk memasukkan operator(+, -, *, /)
    inputUser.question('Masukkan operator (+, -, *, /): ', operator => {
      const hasil = kalkulator(
        parseFloat(angka1),
        parseFloat(angka2),
        operator
      );
      console.log(`Hasil: ${hasil}`);
      inputUser.close();
    });
  });
});