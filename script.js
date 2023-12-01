const mainEle = document.getElementsByTagName("main")[0];
const blockNum = document.getElementsByClassName("block-num")[0];
const alignLeft = document.getElementById("left-align");
const alignRight = document.getElementById("right-align");
const alignCenter = document.getElementById("center-align");
const underlineEle = document.getElementById("underline");
const italicEle = document.getElementById("italic");
const boldEle = document.getElementById("bold");
const actualText = document.getElementsByClassName("actual-text")[0];
const font_styles = document.getElementById("font-styles");
const font_sizes = document.getElementById("font-sizes");
const topAlignIcon = document.getElementById("top-align");
const middleAlignIcon = document.getElementById("middle-align");
const bottomAlignIcon = document.getElementById("bottom-align");
var activeCell = null;
const defaultStyling = {
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  textAlign: "left",
  textColor: "rgb(0,0,0)",
  bgColor: "white",
  fontStyle: "Monospace",
  fontSize: "16",
};

let activeStyling = null;

addRow(0);
window.onload = renderSheet();
function renderSheet() {
  for (let i = 1; i <= 100; i++) {
    addRow(i);
  }
}

function addRow(rowNum) {
  const newRow = document.createElement("div");
  newRow.classList.add("row");
  if (rowNum == 0) {
    for (let i = 64; i <= 90; i++) {
      const newCell = document.createElement("div");

      if (i == 64) {
        newCell.classList.add("slNo");
        newCell.innerHTML = "SI.NO";
      } else {
        newCell.innerHTML = String.fromCharCode(i);
        newCell.classList.add("first-row");
      }
      newRow.appendChild(newCell);
    }
    newRow.style.position = "sticky";
    newRow.style.top = "0px";
  } else {
    for (let i = 64; i <= 90; i++) {
      const newCell = document.createElement("div");

      if (i == 64) {
        newCell.innerHTML = rowNum;
        newCell.classList.add("slNo");
      } else {
        newCell.id = `${String.fromCharCode(i)}${rowNum}`;
        newCell.contentEditable = "true";
        newCell.classList.add("other-row");
        newCell.currentStyle = { ...defaultStyling };
        if (activeCell == null) {
          activeCell = newCell;
          activeStyling = newCell.currentStyle;
        }

        newCell.addEventListener("focus", changeId);
        newCell.addEventListener("keyup", changeActualText);
      }

      newRow.appendChild(newCell);
    }
  }
  mainEle.appendChild(newRow);
}
function changeActualText() {
  actualText.innerHTML = activeCell.innerHTML;
}
function changeId(event) {
  activeCell = event.target;
  activeStyling = event.target.currentStyle;

  blockNum.innerHTML = event.target.id;
  renderStyles();
}
function renderStyles() {
  actualText.innerHTML = activeCell.innerHTML;
  if (activeStyling.isUnderlined) {
    underlineEle.classList.add("active");
  } else {
    underlineEle.classList.remove("active");
  }
  if (activeStyling.isItalic) {
    italicEle.classList.add("active");
  } else {
    italicEle.classList.remove("active");
  }
  if (activeStyling.isBold) {
    boldEle.classList.add("active");
  } else {
    boldEle.classList.remove("active");
  }
  if (activeStyling.textAlign == "left") {
    if (!alignLeft.classList.contains("active"))
      alignLeft.classList.add("active");
    alignRight.classList.remove("active");
    alignCenter.classList.remove("active");
  }
  if (activeStyling.textAlign == "right") {
    if (!alignRight.classList.contains("active"))
      alignRight.classList.add("active");
    alignLeft.classList.remove("active");
    alignCenter.classList.remove("active");
  }
  if (activeStyling.textAlign == "center") {
    if (!alignCenter.classList.contains("active"))
      alignCenter.classList.add("active");
    alignLeft.classList.remove("active");
    alignRight.classList.remove("active");
  }
  font_sizes.value = activeStyling.fontSize;
  font_styles.value = activeStyling.fontStyle;
}


function activateBold(element) {
  element.classList.toggle("active");

  if (activeStyling.isBold) {
    activeStyling.isBold = false;
    activeCell.style.fontWeight = "normal";
  } else {
    activeStyling.isBold = true;
    activeCell.style.fontWeight = "bold";
  }
}
function activateItalic(element) {
  element.classList.toggle("active");

  if (activeStyling.isItalic) {
    activeStyling.isItalic = false;
    activeCell.style.fontStyle = "normal";
  } else {
    activeStyling.isItalic = true;
    activeCell.style.fontStyle = "italic";
  }
}
function activateUnderline(element) {
  element.classList.toggle("active");

  if (activeStyling.isUnderlined) {
    activeStyling.isUnderlined = false;
    activeCell.style.textDecoration = "none";
  } else {
    activeStyling.isUnderlined = true;
    activeCell.style.textDecoration = "underline";
  }
}
function activateTextAlign(element) {
  element.classList.toggle("active");
  console.log(activeCell.style.textAlign);
  if (element.id === "left-align") {
    activeStyling.textAlign = "left";
    activeCell.style.justifyContent = "flex-start";
    alignRight.classList.remove("active");
    alignCenter.classList.remove("active");
  } else if (element.id === "center-align") {
    if (activeStyling.textAlign === "center") {
      activeStyling.textAlign = "left";
      activeCell.style.justifyContent = "flex-start";
    } else {
      activeStyling.textAlign = "center";
      activeCell.style.justifyContent = "center";
    }
    alignRight.classList.remove("active");
    alignLeft.classList.remove("active");
  } else {
    if (activeStyling.textAlign === "right") {
      activeStyling.textAlign = "left";
      activeCell.style.justifyContent = "flex-start";
    } else {
      activeStyling.textAlign = "right";
      activeCell.style.justifyContent = "flex-end";
    }
    alignCenter.classList.remove("active");
    alignLeft.classList.remove("active");
  }
}




function activatevTextAlign(element) {
  element.classList.toggle("active");

  if (element.id === "top-align") {
    activeStyling.verticalAlign = "top";
    activeCell.style.alignItems = "flex-start";
  } else if (element.id === "middle-align") {
    activeStyling.verticalAlign = "middle";
    activeCell.style.alignItems = "center";
  } else if (element.id === "bottom-align") {
    activeStyling.verticalAlign = "bottom";
    activeCell.style.alignItems = "flex-end";
  }

  // Reset horizontal alignment when changing vertical alignment
  alignLeft.classList.remove("active");
  alignCenter.classList.remove("active");
  alignRight.classList.remove("active");
}


function changeTextColor(element) {
  const selectedColor = element.value;

  activeCell.style.color = selectedColor;
  activeStyling.textColor = selectedColor;
}
function changeBackGroundColor(element) {
  const selectedColor = element.value;

  activeCell.style.backgroundColor = selectedColor;
  activeStyling.bgColor = selectedColor;
}
function changeFontSize(element) {
  const selectedSize = element.value;
  activeStyling.fontSize = selectedSize;
  activeCell.style.fontSize = `${selectedSize}px`;
}
function changeFontFam(element) {
  const selectedFam = element.value;
  activeStyling.fontStyle = selectedFam;
  activeCell.style.fontFamily = selectedFam;
}
function changeVerticalAlign(element) {
  activeStyling.verticalAlign = element.value;
  activeCell.style.alignItems = element.value;
}

// function addNewSheet() {
//   const sheetsContainer = document.getElementsByTagName("main")[0];
//   sheetsContainer.innerHTML = "";
//   renderSheet();
// }

sheetCount=1;
function addNewSheet() {
  const sheetsContainer = document.getElementById("sheet-list");
  const sheetButton = document.createElement("button");
  sheetButton.classList.add("button");
  sheetButton.textContent = `Sheet ${sheetCount}`;
  sheetButton.onclick = function () {
    changeSheet(sheetCount);
  };
  sheetsContainer.appendChild(sheetButton);

  sheetCount++;

  renderSheet();
}




function changeSheet(sheetNumber) {
  // Add logic to handle sheet changes
  console.log(`Switching to Sheet ${sheetNumber}`);
}

function downloadPage() {
  const htmlContent = document.documentElement.outerHTML;
  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "google-sheet.html";
  link.click();
}