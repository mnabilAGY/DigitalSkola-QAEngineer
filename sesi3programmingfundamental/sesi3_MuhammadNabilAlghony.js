const tinggiSegitiga = 8; 

for (let i = 1; i <= tinggiSegitiga; i++) {
  let baris = '';
  for (let j = 1; j <= i; j++) {
    baris += '*';
  }
  console.log(baris);
}
