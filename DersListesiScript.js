function addRow() {
  let temp = true;
  let ders = prompt("Ders Kodunu Girin:");
  while (temp) {
    if (!(ders === null || ders === "")) {
      temp = false;
    } else {
      temp = true;
      ders = prompt("Ders Kodunu Girin:");
    }
  }

  let fakulte = prompt("Fakülteyi Girin:");
  temp = true;
  while (temp) {
    if (!(fakulte === null || fakulte === "")) {
      temp = false;
    } else {
      temp = true;
      faculte = prompt("Fakülteyi Girin:");
    }
  }

  let zaman = prompt("Zamanını Girin:");
  temp = true;
  while (temp) {
    if (!(zaman === null || zaman === "")) {
      temp = false;
    } else {
      temp = true;
      zaman = prompt("Zamanını Girin:");
    }
  }

  let sinif = prompt("Sınıfı Girin:");
  temp = true;
  while (temp) {
    if (!(sinif === null || sinif === "")) {
      temp = false;
    } else {
      temp = true;
      sinif = prompt("Sınıfı Girin:");
    }
  }

  let ogretici = prompt("Öğretim Görevlisi Girin:");
  temp = true;
  while (temp) {
    if (!(ogretici === null || ogretici === "")) {
      temp = false;
    } else {
      temp = true;
      ogretici = prompt("Öğretim Görevlisi Girin:");
    }
  }

  const newRow = document.createElement("tr");
  const dersCell = document.createElement("td");
  const fakulteCell = document.createElement("td");
  const zamanCell = document.createElement("td");
  const sinifCell = document.createElement("td");
  const ogreticiCell = document.createElement("td");
  dersCell.textContent = ders;
  fakulteCell.textContent = fakulte;
  zamanCell.textContent = zaman;
  sinifCell.textContent = sinif;
  ogreticiCell.textContent = ogretici;
  newRow.appendChild(dersCell);
  newRow.appendChild(fakulteCell);
  newRow.appendChild(zamanCell);
  newRow.appendChild(sinifCell);
  newRow.appendChild(ogreticiCell);

  const container = document.querySelector(".container");
  container.appendChild(newRow);
}
