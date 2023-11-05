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

function submit() {
  var ad = document.getElementById("ad").value;
  var soyad = document.getElementById("soyad").value;
  var tcNo = document.getElementById("tcNo").value;
  var ogrenciNo = document.getElementById("ogrenciNo").value;
  const container = document.querySelector(".container");
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if (!credentialsCheck(ad, soyad, tcNo, ogrenciNo)) return;
  createNewRow(container, ad, soyad, tcNo, ogrenciNo);
  clearInputFields();
  modalDisappear(modal, overlay);
  checkTableData();
}

function createNewRow(container, ad, soyad, tcNo, ogrenciNo) {
  const newRow = document.createElement("tr");
  const checkbox = document.createElement("input");
  const boxCell = document.createElement("td");
  const adCell = document.createElement("td");
  const soyadCell = document.createElement("td");
  const tcNoCell = document.createElement("td");
  const ogrenciNoCell = document.createElement("td");
  checkbox.className = "Checkbox";
  checkbox.type = "checkbox";
  adCell.textContent = ad;
  soyadCell.textContent = soyad;
  tcNoCell.textContent = tcNo;
  ogrenciNoCell.textContent = ogrenciNo;
  newRow.appendChild(boxCell);
  boxCell.appendChild(checkbox);
  newRow.appendChild(adCell);
  newRow.appendChild(soyadCell);
  newRow.appendChild(tcNoCell);
  newRow.appendChild(ogrenciNoCell);

  container.appendChild(newRow);
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

function deleteStudent(studentRow) {
  const container = document.querySelector(".container");
  for (let i = 0; i < studentRow.length; i++) {
    if (studentRow[i] >= 1 && studentRow[i] < container.rows.length) {
      container.deleteRow(studentRow[i]);
    } else {
      console.error("Row number is out of range");
    }
  }
}

function getCheckedPositions() {
  const checkboxes = document.querySelectorAll(".Checkbox");
  const checkedPositions = [];
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      checkedPositions.push(index + 1);
    }
  });
  return checkedPositions.reverse();
}

function credentialsCheck(ad, soyad, tcNo, ogrenciNo) {
  let temp = true;
  while (temp) {
    if (!(ad === null || ad === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;
  while (temp) {
    if (!(soyad === null || soyad === "")) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;
  while (temp) {
    if (tcNoCheck(tcNo)) {
      temp = false;
    } else {
      hataliAppear();
      return false;
    }
  }

  temp = true;
  while (temp) {
    if (Math.floor(Math.log10(ogrenciNo)) + 1 == 6) {
      temp = false;
    } else {
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
