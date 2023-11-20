window.onload = function () {
  modalButtonProperties();
  loadTableContents();
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

function deleteClass(classRow) {
  classRow.reverse();
  const container = document.querySelector(".container");
  for (let i = 0; i < classRow.length; i++) {
    if (classRow[i] >= 1 && classRow[i] < container.rows.length) {
      container.deleteRow(classRow[i]);
    }
  }
  checkTableData();
}

function saveTableContents() {
  const container = document.querySelector(".container");
  const contents = Array.from(container.rows).map((row) =>
    Array.from(row.cells).map((cell) => cell.innerHTML)
  );
  const contentsJson = JSON.stringify(contents);
  localStorage.setItem("classtableContents", contentsJson);
  loadTableContents();
}

function loadTableContents() {
  const container = document.querySelector(".container");
  const contentsJson = localStorage.getItem("classtableContents");
  if (contentsJson) {
    const contents = JSON.parse(contentsJson);
    contents.forEach((rowContents, rowIndex) => {
      let row = container.rows[rowIndex];
      if (!row) {
        row = container.insertRow(rowIndex);
      }
      rowContents.forEach((cellContents, cellIndex) => {
        let cell = row.cells[cellIndex];
        if (!cell) {
          cell = row.insertCell(cellIndex);
        }
        cell.innerHTML = cellContents;
      });
    });
  }
}

function submit() {
  let ders = document.getElementById("ders").value;
  let fakulte = document.getElementById("fakulte").value;
  let zaman = document.getElementById("zaman").value;
  let sinif = document.getElementById("sinif").value;
  let ogretici = document.getElementById("ogretici").value;
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const container = document.querySelector(".container");

  if (!credentialsCheck(ders, fakulte, zaman, sinif, ogretici)) {
    return;
  }

  createNewRow(container, ders, fakulte, zaman, sinif, ogretici);
  clearInputFields();
  modalDisappear(modal, overlay);
  checkTableData();
}

function createNewRow(container, ders, fakulte, zaman, sinif, ogretici) {
  const newRow = document.createElement("tr");
  const checkbox = document.createElement("input");
  const boxCell = document.createElement("td");
  const dersCell = document.createElement("td");
  const fakulteCell = document.createElement("td");
  const zamanCell = document.createElement("td");
  const sinifCell = document.createElement("td");
  const ogreticiCell = document.createElement("td");
  checkbox.className = "Checkbox";
  checkbox.type = "checkbox";
  dersCell.textContent = ders;
  fakulteCell.textContent = fakulte;
  zamanCell.textContent = zaman;
  sinifCell.textContent = sinif;
  ogreticiCell.textContent = ogretici;
  newRow.appendChild(boxCell);
  boxCell.appendChild(checkbox);
  newRow.appendChild(dersCell);
  newRow.appendChild(fakulteCell);
  newRow.appendChild(zamanCell);
  newRow.appendChild(sinifCell);
  newRow.appendChild(ogreticiCell);

  container.appendChild(newRow);
}

function getCheckedPositions() {
  const checkboxes = document.querySelectorAll(".Checkbox");
  const checkedPositions = [];
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      checkedPositions.push(index + 1);
    }
  });
  return checkedPositions;
}

function credentialsCheck(ders, fakulte, zaman, sinif, ogretici) {
  let temp = true;

  while (temp) {
    if (!(ders === null || ders === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(fakulte === null || fakulte === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(zaman === null || zaman === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(sinif === null || sinif === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;

  while (temp) {
    if (!(ogretici === null || ogretici === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }
  return true;
}
