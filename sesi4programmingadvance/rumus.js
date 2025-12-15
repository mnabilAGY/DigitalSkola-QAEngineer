export function kalkulator(angka1, angka2, operator) {
  switch (operator) {
    case "+":
      return angka1 + angka2;
      // tambahkan case untuk pengurangan
    case "-":
      return angka1 - angka2;
      // tambahkan case untuk perkalian
    case "*":
      return angka1 * angka2;
      // tambahkan case untuk pembagian
    case "/":
      return angka2 !== 0 ? angka1 / angka2 : "Tidak bisa dibagi dengan nol!";
    default:
      return "Operator tidak valid!";
  }
}