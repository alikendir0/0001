function addRow() {
  let temp = true;
  let ad = prompt("Ad Girin:");
  while (temp) {
    if (Number.isInteger(ad)) {
      temp = false;
    } else {
      ad = prompt("Geçersiz Karakter Lütfen Gerçek Bir Ad Girin:");
      temp = true;
    }
  }

  let soyad = prompt("Soyad Girin:");
  while (temp) {
    if (Number.isInteger(soyad)) {
      temp = false;
    } else {
      soyad = prompt("Geçersiz Karakter Lütfen Gerçek Bir Soyad Girin:");
      temp = true;
    }
  }

  let tcNo = prompt("T.C Numarasını Girin:");
  temp = true;
  while (temp) {
    if (Math.floor(Math.log10(tcNo)) + 1 == 11) {
      temp = false;
    } else {
      tcNo = prompt("T.C. Numarasini Girin (11 rakamdan oluşmalı):");
      temp = true;
    }
  }

  let ogrenciNo = prompt("Öğrencı Numarasını Girin:");
  temp = true;
  while (temp) {
    if (Math.floor(Math.log10(ogrenciNo)) + 1 == 10) {
      temp = false;
    } else {
      temp = true;
      ogrenciNo = prompt("Öğrenci Nurmasını Girin (10 rakamdan oluşmalı):");
    }
  }

  const newRow = document.createElement("tr");
  const adCell = document.createElement("td");
  const soyadCell = document.createElement("td");
  const tcNoCell = document.createElement("td");
  const ogrenciNoCell = document.createElement("td");
  adCell.textContent = ad;
  soyadCell.textContent = soyad;
  tcNoCell.textContent = tcNo;
  ogrenciNoCell.textContent = ogrenciNo;
  newRow.appendChild(adCell);
  newRow.appendChild(soyadCell);
  newRow.appendChild(tcNoCell);
  newRow.appendChild(ogrenciNoCell);

  const table = document.querySelector("table");
  table.appendChild(newRow);
}
