window.onload = function () {
  modalButtonProperties();
  checkTableData();
};

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

function hataliAppear() {
  const hatali = document.getElementById("hatali");
  hatali.classList.add("active");
}

function hataliDisappear() {
  const hatali = document.getElementById("hatali");
  hatali.classList.remove("active");
}

function modalButtonProperties() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("open");
  const closeBtn = document.getElementById("close");

  openBtn.addEventListener("click", () => modalAppear(modal, overlay));
  openBtn.addEventListener("click", () => hataliDisappear());
  openBtn.addEventListener("click", () => clearInputFields());
  closeBtn.addEventListener("click", () => modalDisappear(modal, overlay));
  closeBtn.addEventListener("click", () => hataliDisappear());
}

function clearInputFields() {
  const inputs = document.querySelectorAll(".input");

  inputs.forEach((element) => {
    element.value = "";
  });
}

function submit() {
  let temp = true;
  let ders = document.getElementById("ders").value;
  while (temp) {
    if (!(ders === null || ders === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let fakulte = document.getElementById("fakulte").value;
  while (temp) {
    if (!(fakulte === null || fakulte === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let zaman = document.getElementById("zaman").value;
  while (temp) {
    if (!(zaman === null || zaman === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let sinif = document.getElementById("sinif").value;
  while (temp) {
    if (!(sinif === null || sinif === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let ogretici = document.getElementById("ogretici").value;
  while (temp) {
    if (!(ogretici === null || ogretici === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
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

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  clearInputFields();
  modalDisappear(modal, overlay);
  checkTableData();
}
