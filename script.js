const preview = document.getElementById("result");
const ranges = document.querySelectorAll(".parameter input");
const copyBtn = document.querySelector(".container__bottom-copy");
const code = document.querySelector(".container__bottom-code");

const generateStyles = () => {
  let xShadow = document.getElementById("horizontal-shadow").value;
  let yShadow = document.getElementById("vertical-shadow").value;
  let blurRadius = document.getElementById("blur-radius").value;
  let spreadRadius = document.getElementById("spread-radius").value;
  let borderRadius = document.getElementById("border-radius").value;
  let shadowOpacity = document.getElementById("shadow-opacity").value;
  let inset = document.getElementById("inset").checked;
  let shadowColor = document.getElementById("shadow-color").value;

  const boxShadow = ` ${
    inset ? "inset" : ""
  } ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
    shadowColor,
    shadowOpacity
  )}`;

  preview.style.boxShadow = boxShadow;
  preview.style.borderRadius = `${borderRadius}px`;

  code.innerText = `box-shadow: ${boxShadow}; 
  border-radius: ${borderRadius}px;`;
};

const hexToRgba = (shadowColor, shadowOpacity) => {
  const r = parseInt(shadowColor.substr(1, 2), 16);
  const g = parseInt(shadowColor.substr(3, 2), 16);
  const b = parseInt(shadowColor.substr(5, 2), 16);

  return `rgba(${r}, ${g}, ${b} ,${shadowOpacity}%)`;
};

ranges.forEach((slider) => {
  slider.value = 10
  slider.addEventListener("input", generateStyles);
});

function copyCode() {
  const storage = document.createElement("textarea");
  storage.value = code.textContent;
  code.appendChild(storage);
  storage.select();
  storage.setSelectionRange(0, 99999);
  document.execCommand("copy");
  copyBtn.innerText = "Copied!";
  setTimeout(() => {
    copyBtn.innerText = "Copy Code";
  }, 1000);
  code.removeChild(storage);
}

generateStyles();
copyBtn.addEventListener("click", copyCode);
