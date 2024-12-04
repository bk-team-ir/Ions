function fetchJSONData() {
  fetch("/data/data.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const atoms = data.atoms;
      const table = document.getElementById("table");
      atoms.map((atom) => {
        const box = `
                    <button class="box ${atom.group}" ${
          atom.status == 0 ? "disabled" : ""
        } id="${atom.atomicNum}">
                        <p class="group">${atom.tableGroup}</p>
                        <span>
                            <sub>${atom.atomicNum}</sub>
                            <h2>${atom.symbol}</h2>
                            <sup>${atom.ion == "#" ? "" : atom.ion}</sup>
                        </span>
                        <p>${atom.name}</p>
                    </button>
                `;
        table.innerHTML += box;
      });

      const firstBox = document.getElementById("first-box");
      const secondBox = document.getElementById("second-box");
      const resultLeft = document.getElementById("left");
      const resultRight = document.getElementById("right");
      const resultBox = document.getElementById("result");
      const buttons = document.querySelectorAll(".box");
      let firstSelected = null;
      let firstIon = null;
      let secondIon = null;
      let firstLastLayer = null;
      let secondLastLayer = null;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const symbol = button.querySelector("h2").textContent;
          const ion = button.querySelector("sup").textContent;
          const lastLayer = button.querySelector(".group").textContent;

          if (!firstSelected) {
            firstSelected = symbol;
            firstBox.textContent = symbol;
            firstIon = ion;
            firstLastLayer = lastLayer;
          } else {
            secondBox.textContent = symbol;
            secondIon = ion;
            secondLastLayer = lastLayer;
          }
        });
      });

      const invokerButton = document.getElementById("invoker");
      invokerButton.addEventListener("click", () => {
        if (firstSelected && secondBox.textContent) {
          if (firstIon === secondIon) {
            resultLeft.textContent = "این دو عنصر پیوند یونی تشکیل نمی دهند";
            resultRight.textContent = "";
          }
          else if(firstBox.textContent === "H" || secondBox.textContent === "H") {
            if (firstBox.textContent === "H") {
              resultLeft.innerHTML = secondBox.textContent
              resultRight.innerHTML = `H<sub>${secondIon[0] == 1 ? "" : secondIon[0]}</sub>`
            } 
            else if (secondBox.textContent === "H") {
              resultLeft.innerHTML = firstBox.textContent
              resultRight.innerHTML = `H<sub>${firstIon[0] == 1 ? "" : firstIon[0]}</sub>`
            }
          }
          else if (firstIon === secondIon) {
            resultLeft.textContent = "این دو عنصر پیوند یونی تشکیل نمی دهند";
            resultRight.textContent = "";
          }
          else if (firstIon[1] === secondIon[1]) {
            resultLeft.textContent = "این دو عنصر پیوند یونی تشکیل نمی دهند";
            resultRight.textContent = "";
          } 
          else {
            if (firstIon[0] == secondIon[0]) {
              if (firstLastLayer < secondLastLayer) {
                resultLeft.textContent = firstBox.textContent;
                resultRight.textContent = secondBox.textContent;
              } else {
                resultLeft.textContent = secondBox.textContent;
                resultRight.textContent = firstBox.textContent;
              }
            } else if (
              firstIon[0] - secondIon[0] < 3 ||
              firstIon[0] - secondIon[0] > -3
            ) {
              if (firstLastLayer < secondLastLayer) {
                resultLeft.innerHTML = `${firstBox.textContent}<sub>${secondIon[0] == 1 ? "" : secondIon[0]}</sub>`;
                resultRight.innerHTML = `${secondBox.textContent}<sub>${firstIon[0] == 1 ? "" : firstIon[0]}</sub>`;
              } else {
                resultLeft.innerHTML = `${secondBox.textContent}<sub>${firstIon[0] == 1 ? "" : firstIon[0]}</sub>`;
                resultRight.innerHTML = `${firstBox.textContent}<sub>${secondIon[0] == 1 ? "" : secondIon[0]}</sub>`;
              }
            }
          }
        } else {
          resultLeft.textContent = "لطفا دو عنصر انتخاب کنید";
          resultRight.textContent = "";
        }
      });
      
      const clear = document.getElementById("clear")
      clear.addEventListener('click', () => {
        resultLeft.innerHTML = ""
        resultRight.innerHTML = ""
        firstBox.innerHTML = ""
        secondBox.innerHTML = ""
        firstSelected = null;
        firstIon = null;
        secondIon = null;
        firstLastLayer = null;
        secondLastLayer = null;
      })
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

fetchJSONData();
