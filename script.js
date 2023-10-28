function addRow() {
  let temp = true;
  let ad = prompt("Ad Girin:");
  while (temp) {
    if (!(ad === null || ad === "")) {
      temp = false;
    } else {
      temp = true;
      ad = prompt("Ad Girin:");
    }
  }

  let soyad = prompt("Soyad Girin:");
  temp = true;
  while (temp) {
    if (!(soyad === null || soyad === "")) {
      temp = false;
    } else {
      temp = true;
      soyad = prompt("Soyad Girin:");
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

  let ogrenciNo = prompt("Öğrenci Numarasını Girin:");
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

  const container = document.querySelector(".container");
  container.appendChild(newRow);
}

window.onload = function () {};
