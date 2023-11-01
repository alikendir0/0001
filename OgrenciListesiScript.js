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
  let ad = document.getElementById("ad").value;
  while (temp) {
    if (!(ad === null || ad === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let soyad = document.getElementById("soyad").value;
  while (temp) {
    if (!(soyad === null || soyad === "")) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let tcNo = document.getElementById("tcNo").value;
  while (temp) {
    if (tcNoCheck(tcNo)) {
      temp = false;
    } else {
      hataliAppear();
      return;
    }
  }

  temp = true;
  let ogrenciNo = document.getElementById("ogrenciNo").value;
  while (temp) {
    if (Math.floor(Math.log10(ogrenciNo)) + 1 == 6) {
      temp = false;
    } else {
      hataliAppear();
      return;
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

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  clearInputFields();
  modalDisappear(modal, overlay);
  checkTableData();
}

function tcNoCheck(tcNo) {
  if (!(tcNo.toString().length == 11)) return false;

  let temp10 = 0;
  let temp11 = 0;
  let tcNoStr = String(tcNo);
  for (let i = 0; i < tcNoStr.length; i++) {
    switch (i) {
      case 0:
        if (parseInt(tcNoStr[i]) == 0) {
          hataliAppear();
          return false;
        }
        temp10 += parseInt(tcNoStr[i]);
        break;
      case 1:
        temp11 += parseInt(tcNoStr[i]);
        break;
      case 2:
        temp10 += parseInt(tcNoStr[i]);
        break;
      case 3:
        temp11 += parseInt(tcNoStr[i]);
        break;
      case 4:
        temp10 += parseInt(tcNoStr[i]);
        break;
      case 5:
        temp11 += parseInt(tcNoStr[i]);
        break;
      case 6:
        temp10 += parseInt(tcNoStr[i]);
        break;
      case 7:
        temp11 += parseInt(tcNoStr[i]);
        break;
      case 8:
        temp10 += parseInt(tcNoStr[i]);
        break;
      case 9:
        if (!((temp10 * 7 - temp11) % 10 == parseInt(tcNoStr[i]))) {
          hataliAppear();
          return false;
        }
        temp11 += parseInt(tcNoStr[i]);
        break;
      case 10:
        if (!((temp10 + temp11) % 10 == parseInt(tcNoStr[i]))) {
          hataliAppear();
          return false;
        }
        break;
    }
  }
  return true;
}
