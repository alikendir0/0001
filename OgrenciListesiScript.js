window.onload = function () {
  createArray();
  getFile();
  modalButtonProperties();
  assignmentModalButtonProperties();
  loadTableContents();
  checkTableData();
  killButtonDetector();
  buttonDetector();
};

function checkTableData() {
  const table = document.querySelector(".container");
  const noDataMessage = document.querySelector(".noData");
  const dbutton = document.getElementById("delete");
  const abutton = document.getElementById("a-open");
  const rbutton = document.getElementById("reset");
  if (table.rows.length === 1) {
    noDataMessage.style.display = "block";
    table.style.display = "none";
    dbutton.classList.add("disabled");
    dbutton.disable = true;
    abutton.classList.add("disabled");
    abutton.disable = true;
    rbutton.classList.add("disabled");
    rbutton.disable = true;
  } else {
    noDataMessage.style.display = "none";
    table.style.display = "table";
    dbutton.classList.remove("disabled");
    dbutton.disable = false;
    abutton.classList.remove("disabled");
    abutton.disable = false;
    rbutton.classList.remove("disabled");
    rbutton.disable = false;
  }
}

function submit() {
  var ad = document.getElementById("ad").value;
  var soyad = document.getElementById("soyad").value;
  var tcNo = document.getElementById("tcNo").value;
  var ogrenciNo = document.getElementById("ogrenciNo").value;
  const container = document.querySelector(".container");
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if (!credentialsCheck(ad, soyad, tcNo, ogrenciNo)) {
    return;
  }

  saveTableContents();
  createNewRow(container, ad, soyad, tcNo, ogrenciNo);
  clearInputFields();
  modalDisappear(modal, overlay);
  checkTableData();
}

function deleteStudent(studentRow) {
  const contents = JSON.parse(localStorage.getItem("assignments"));
  studentRow.reverse();
  const container = document.querySelector(".container");
  for (let i = 0; i < studentRow.length; i++) {
    if (studentRow[i] >= 1 && studentRow[i] < container.rows.length) {
      container.deleteRow(studentRow[i]);
      contents.splice(studentRow[i] - 1, 1);
    }
  }

  const json = JSON.stringify(contents);
  localStorage.setItem("assignments", json);
  saveTableContents();
  checkTableData();
  killButtonDetector();
  buttonDetector();
}

function saveTableContents() {
  const container = document.querySelector(".container");
  const contents = Array.from(container.rows).map((row) =>
    Array.from(row.cells).map((cell) => cell.innerHTML)
  );
  const contentsJson = JSON.stringify(contents);
  localStorage.setItem("tableContents", contentsJson);
  loadTableContents();
}

function loadTableContents() {
  const container = document.querySelector(".container");
  const contentsJson = localStorage.getItem("tableContents");
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

function modalLoadTableContents() {
  const container = document.querySelector(".a-container");
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

async function getFile() {
  const response = await fetch("http://localhost:3001/tableContents");
  let contents = await response.json();
  contents = contents.map((subArray, index) => {
    if (index == 0) {
      subArray.unshift("");
      subArray.push("");
      return subArray;
    }
    subArray.unshift('<input class="Checkbox" type="checkbox">');
    subArray.push('<button class="ders-button">Dersler</button>');
    return subArray;
  });
  const contentsJson = JSON.stringify(contents);
  localStorage.setItem("tableContents", contentsJson);
}

function createArray() {
  let assignments = JSON.parse(localStorage.getItem("assignments"));
  if (!assignments) {
    assignments = [];
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }
}

function modalSubmit() {
  const modal = document.getElementById("a-modal");
  const overlay = document.getElementById("a-overlay");
  const table = document.querySelector(".container");
  const atable = document.querySelector(".a-container");
  let assignments = JSON.parse(localStorage.getItem("assignments"));

  for (let i = 1; i < table.rows.length; i++) {
    assignments.push([]);
    const row = table.rows[i];
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      const classes = getClassCheckedPositions();
      for (let j = 0; j < classes.length; j++) {
        const arow = atable.rows[classes[j]];
        const classToAdd = arow.cells[1].innerText;
        if (!assignments[i - 1].includes(classToAdd)) {
          assignments[i - 1].push(classToAdd);
        }
      }
    }
  }

  const json = JSON.stringify(assignments);
  localStorage.setItem("assignments", json);
  saveTableContents();
  clearCheckBoxes();
  modalDisappear(modal, overlay);
  killButtonDetector();
  buttonDetector();
}

function createNewRow(container, ad, soyad, tcNo, ogrenciNo) {
  const newRow = document.createElement("tr");
  const checkbox = document.createElement("input");
  const boxCell = document.createElement("td");
  const adCell = document.createElement("td");
  const soyadCell = document.createElement("td");
  const tcNoCell = document.createElement("td");
  const ogrenciNoCell = document.createElement("td");
  const buttonCell = document.createElement("td");
  const button = document.createElement("BUTTON");
  const buttonText = document.createTextNode("Dersler");
  button.appendChild(buttonText);

  checkbox.className = "Checkbox";
  checkbox.type = "checkbox";
  adCell.textContent = ad;
  soyadCell.textContent = soyad;
  tcNoCell.textContent = tcNo;
  ogrenciNoCell.textContent = ogrenciNo;
  button.className = "ders-button";
  newRow.appendChild(boxCell);
  boxCell.appendChild(checkbox);
  newRow.appendChild(adCell);
  newRow.appendChild(soyadCell);
  newRow.appendChild(tcNoCell);
  newRow.appendChild(ogrenciNoCell);
  newRow.appendChild(buttonCell);
  buttonCell.appendChild(button);

  container.appendChild(newRow);
  saveTableContents();
  killButtonDetector();
  buttonDetector();
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

function assignmentModalButtonProperties() {
  const modal = document.getElementById("a-modal");
  const overlay = document.getElementById("a-overlay");
  const openBtn = document.getElementById("a-open");
  const closeBtn = document.getElementById("a-close");

  openBtn.addEventListener("click", () => modalAppear(modal, overlay));
  openBtn.addEventListener("click", () => hataliDisappear());
  openBtn.addEventListener("click", () => clearInputFields());
  openBtn.addEventListener("click", () => modalLoadTableContents());
  closeBtn.addEventListener("click", () => modalDisappear(modal, overlay));
  closeBtn.addEventListener("click", () => hataliDisappear());
}

function clearCheckBoxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function clearInputFields() {
  const inputs = document.querySelectorAll(".input");

  inputs.forEach((element) => {
    element.value = "";
  });
}

function resetClasses() {
  console.log("haha");
  let assignments = JSON.parse(localStorage.getItem("assignments"));
  assignments = [];
  const json = JSON.stringify(assignments);
  localStorage.setItem("assignments", json);
}

function killButtonDetector() {
  const buttons = document.querySelectorAll(".ders-button");

  buttons.forEach((button) => {
    let newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });
}

function classes(index) {
  const contents = JSON.parse(localStorage.getItem("assignments"));
  if (contents && contents[index] && contents[index].length > 0) {
    alert(contents[index]);
  } else alert("Hiçbir Ders Atanmadı");
}

function buttonDetector() {
  document.querySelectorAll(".ders-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      classes(index);
    });
  });
}

function getStudentCheckedPositions() {
  const checkboxes = document.querySelectorAll(".container .Checkbox");
  const checkedPositions = [];
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      checkedPositions.push(index + 1);
    }
  });
  return checkedPositions;
}

function getClassCheckedPositions() {
  const checkboxes = document.querySelectorAll(".a-container .Checkbox");
  const checkedPositions = [];
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      checkedPositions.push(index + 1);
    }
  });
  return checkedPositions;
}

function credentialsCheck(ad, soyad, tcNo, ogrenciNo) {
  var element = document.querySelector(".hatali");
  let temp = true;
  while (temp) {
    if (!(ad === null || ad === "")) {
      temp = false;
    } else {
      element.innerText = "Adınızı Yanlış Girdiniz!";
      hataliAppear();
      return false;
    }
  }

  temp = true;
  while (temp) {
    if (!(soyad === null || soyad === "")) {
      temp = false;
    } else {
      element.innerText = "Soyadınızı Yanlış Girdiniz!";
      hataliAppear();
      return false;
    }
  }

  temp = true;
  while (temp) {
    if (tcNoCheck(tcNo)) {
      temp = false;
    } else {
      element.innerText = "T.C. Numaranızı Yanlış Girdiniz!";
      hataliAppear();
      return false;
    }
  }

  temp = true;
  while (temp) {
    if (ogrenciNo.length === 6) {
      temp = false;
    } else {
      element.innerText = "Öğrenci Numaranızı Yanlış Girdiniz!";
      hataliAppear();
      return false;
    }
  }
  return true;
}

function tcNoCheck(tcNo) {
  var temp = String(tcNo).split("").map(Number);
  if (!/^\d{11}$/.test(tcNo)) return false;

  let temp10 = 0;
  let temp11 = 0;
  for (let i = 0; i < temp.length; i++) {
    switch (i) {
      case 0:
        if (temp[i] == 0) {
          hataliAppear();
          return false;
        }
        temp10 += temp[i];
        break;
      case 1:
        temp11 += temp[i];
        break;
      case 2:
        temp10 += temp[i];
        break;
      case 3:
        temp11 += temp[i];
        break;
      case 4:
        temp10 += temp[i];
        break;
      case 5:
        temp11 += temp[i];
        break;
      case 6:
        temp10 += temp[i];
        break;
      case 7:
        temp11 += temp[i];
        break;
      case 8:
        temp10 += temp[i];
        break;
      case 9:
        if (!((temp10 * 7 - temp11) % 10 == temp[i])) {
          hataliAppear();
          return false;
        }
        temp11 += temp[i];
        break;
      case 10:
        if (!((temp10 + temp11) % 10 == temp[i])) {
          hataliAppear();
          return false;
        }
        break;
    }
  }
  return true;
}
