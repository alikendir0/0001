window.onload = function () {
  modalButtonProperties();
  loadTableContents();
  checkTableData();
};

function noResponse() {
  const table = document.querySelector(".container");
  const noResponseMessage = document.querySelector(".noResponse");
  const overlay = document.getElementById("overlay");

  overlay.classList.add("active");
  noResponseMessage.classList.add("active");
  table.style.display = "none";
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

async function deleteClass(classRow) {
  classRow.reverse();
  const container = document.querySelector(".container");
  for (let i = 0; i < classRow.length; i++) {
    fetch(`http://localhost:3000/classTableContents/data/${classRow[i] - 1}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data.message);
        checkTableData();
      });
  }
  for (let i = 0; i < classRow.length; i++) {
    container.deleteRow(classRow[i]);
  }
}

function updateTableContents(kod, fakulte, zaman, sinif, ogretici) {
  return fetch("http://localhost:3000/classTableContents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kod: kod,
      fakulte: fakulte,
      zaman: zaman,
      sinif: sinif,
      ogretici: ogretici,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.code == 1) {
        hataliAppear();
        return false;
      } else {
        console.log(data.message);
        return true;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      checkTableData();
      return false;
    });
}

function loadTableContents() {
  var size;
  var ders;
  const container = document.querySelector(".container");
  fetch("http://localhost:3000/classTableContents")
    .then((response) => response.json())
    .then((data) => {
      size = data.size;
      if (size > 0) {
        for (let i = 0; i < size; i++) {
          ders = data.data[i];
          createNewRow(
            container,
            ders.kod,
            ders.fakulte,
            ders.zaman,
            ders.sinif,
            ders.ogretici
          );
        }
        checkTableData();
      } else checkTableData();
    })
    .catch((error) => {
      console.error("Error:", error);
      noResponse();
    });
}

function submit() {
  let kod = document.getElementById("kod").value;
  let fakulte = document.getElementById("fakulte").value;
  let zaman = document.getElementById("zaman").value;
  let sinif = document.getElementById("sinif").value;
  let ogretici = document.getElementById("ogretici").value;
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const container = document.querySelector(".container");

  updateTableContents(kod, fakulte, zaman, sinif, ogretici).then((result) => {
    if (!result) {
      return;
    }
    createNewRow(container, kod, fakulte, zaman, sinif, ogretici);
    clearInputFields();
    modalDisappear(modal, overlay);
    checkTableData();
  });
}

function createNewRow(container, kod, fakulte, zaman, sinif, ogretici) {
  const newRow = document.createElement("tr");
  const checkbox = document.createElement("input");
  const boxCell = document.createElement("td");
  const kodCell = document.createElement("td");
  const fakulteCell = document.createElement("td");
  const zamanCell = document.createElement("td");
  const sinifCell = document.createElement("td");
  const ogreticiCell = document.createElement("td");
  checkbox.className = "Checkbox";
  checkbox.type = "checkbox";
  kodCell.textContent = kod;
  fakulteCell.textContent = fakulte;
  zamanCell.textContent = zaman;
  sinifCell.textContent = sinif;
  ogreticiCell.textContent = ogretici;
  newRow.appendChild(boxCell);
  boxCell.appendChild(checkbox);
  newRow.appendChild(kodCell);
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
