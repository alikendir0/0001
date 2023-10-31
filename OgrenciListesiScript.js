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
    if (Math.floor(Math.log10(ogrenciNo)) + 1 == 6) {
      temp = false;
    } else {
      temp = true;
      ogrenciNo = prompt("Öğrenci Nurmasını Girin (6 rakamdan oluşmalı):");
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

  checkTableData();
}

function checkTableData() {
  const table = document.querySelector(".container");
  const noDataMessage = document.querySelector(".noData");
  if (table.rows.length === 1) {
    noDataMessage.style.display = "block";
    table.style.display = "none";
  } else {
    noDataMessage.style.display = "none";
    table.style.display = "table";
  }
}

function modalAppear(modal, overlay) {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function modalDisappear(modal, overlay) {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function modalButtonProperties() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");

  openBtn.addEventListener("click", () => modalAppear(modal, overlay));
  closeBtn.addEventListener("click", () => modalDisappear(modal, overlay));
}

function submit() {
  let temp = true;
  let ad = document.getElementById("ad").value;
  while (temp) {
    if (!(ad === null || ad === "")) {
      temp = false;
    } else return;
  }

  let soyad = document.getElementById("soyad").value;

  temp = true;
  let tcNo = document.getElementById("tcNo").value;
  while (temp) {
    if (tcNoCheck(tcNo)) {
      temp = false;
    } else return;
  }

  let ogrenciNo = document.getElementById("ogrenciNo").value;

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

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  modalDisappear(modal, overlay);
  checkTableData();
}

function tcNoCheck(tcNo) {
  if (Math.floor(Math.log10(tcNo)) + 1 == 11) return true;
  else return false;
}

window.onload = function () {
  modalButtonProperties();
  checkTableData();
};
