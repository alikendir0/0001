window.onload = function () {
  checkTableData();
  modalButtonProperties();
  assignmentModalButtonProperties();
  loadTableContents();
  killButtonDetector();
  buttonDetector();
};

function noResponse() {
  const table = document.querySelector(".container");
  const noResponseMessage = document.querySelector(".noResponse");
  const overlay = document.getElementById("overlay");
  const tbutton = document.getElementById("open");
  const dbutton = document.getElementById("delete");
  const abutton = document.getElementById("a-open");
  const rbutton = document.getElementById("reset");

  overlay.classList.add("active");
  noResponseMessage.classList.add("active");
  table.style.display = "none";
  tbutton.classList.add("disabled");
  dbutton.classList.add("disabled");
  abutton.classList.add("disabled");
  rbutton.classList.add("disabled");
}

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
    abutton.classList.add("disabled");
    rbutton.classList.add("disabled");
  } else {
    noDataMessage.style.display = "none";
    table.style.display = "table";
    dbutton.classList.remove("disabled");
    abutton.classList.remove("disabled");
    rbutton.classList.remove("disabled");
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

  updateTableContents(ad, soyad, tcNo, ogrenciNo).then((result) => {
    if (!result) {
      return;
    }
    createNewRow(container, ad, soyad, tcNo, ogrenciNo);
    clearInputFields();
    modalDisappear(modal, overlay);
    checkTableData();
  });
}

async function deleteStudent(studentRow) {
  studentRow.reverse();
  const container = document.querySelector(".container");
  for (let i = 0; i < studentRow.length; i++) {
    fetch(
      `http://localhost:3000/studentTableContents/data/${studentRow[i] - 1}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Message:", data.message);
        checkTableData();
      });
  }
  for (let i = 0; i < studentRow.length; i++) {
    container.deleteRow(studentRow[i]);
  }
  killButtonDetector();
  buttonDetector();
}

function updateTableContents(ad, soyad, tcNo, ogrenciNo) {
  return fetch("http://localhost:3000/studentTableContents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ad: ad,
      soyad: soyad,
      tcNo: tcNo,
      ogrenciNo: ogrenciNo,
      dersler: [],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      var element = document.querySelector(".hatali");
      switch (data.code) {
        case 1:
          element.innerText = "Adınızı Yanlış Girdiniz!";
          hataliAppear();
          return false;
        case 2:
          element.innerText = "Soyadınızı Yanlış Girdiniz!";
          hataliAppear();
          return false;
        case 3:
          element.innerText = "T.C. Numaranızı Yanlış Girdiniz!";
          hataliAppear();
          return false;
        case 4:
          element.innerText = "Öğrenci Numaranızı Yanlış Girdiniz!";
          hataliAppear();
          return false;
        default:
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
  var ogrenci;
  const container = document.querySelector(".container");
  while (container.rows.length > 1) {
    container.deleteRow(container.rows.length - 1);
  }
  fetch("http://localhost:3000/studentTableContents")
    .then((response) => response.json())
    .then((data) => {
      size = data.size;
      if (size > 0) {
        for (let i = 0; i < size; i++) {
          ogrenci = data.data[i];
          createNewRow(
            container,
            ogrenci.ad,
            ogrenci.soyad,
            ogrenci.tcNo,
            ogrenci.ogrenciNo
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

function modalLoadTableContents() {
  const container = document.querySelector(".a-container");
  while (container.rows.length > 1) {
    container.deleteRow(container.rows.length - 1);
  }
  fetch("http://localhost:3000/classTableContents")
    .then((response) => response.json())
    .then((data) => {
      size = data.size;
      if (size > 0) {
        for (let i = 0; i < size; i++) {
          ders = data.data[i];
          modalCreateNewRow(
            container,
            ders.kod,
            ders.fakulte,
            ders.zaman,
            ders.sinif,
            ders.ogretici
          );
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function modalSubmit() {
  const modal = document.getElementById("a-modal");
  const overlay = document.getElementById("a-overlay");
  const table = document.querySelector(".container");
  const atable = document.querySelector(".a-container");

  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      const classes = getClassCheckedPositions();
      for (let j = 0; j < classes.length; j++) {
        const arow = atable.rows[classes[j]];
        const kod = arow.cells[1].innerText;

        fetch(`http://localhost:3000/studentTableContents/${i - 1}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kod: kod,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    }
  }

  clearCheckBoxes();
  modalDisappear(modal, overlay);
  killButtonDetector();
  buttonDetector();
}

function modalCreateNewRow(container, kod, fakulte, zaman, sinif, ogretici) {
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
  fetch("http://localhost:3000/studentTableContents/data", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Message:", data.message);
      checkTableData();
    });
}

function killButtonDetector() {
  const buttons = document.querySelectorAll(".ders-button");

  buttons.forEach((button) => {
    let newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });
}

function classes(index) {
  fetch(`http://localhost:3000/studentTableContents/${index}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) alert(data.dersler);
      else alert("Hiçbir ders atanmadı!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
