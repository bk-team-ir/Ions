function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const atomicNum = getQueryParam("atomicNum");

fetch("/data/data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    const atom = data.atoms.find((a) => a.atomicNum == atomicNum);
    document.title = `اطلاعات اتم ${atom.name}`;
    if (atom) {
      const electronConfigurations = data.electronConfigurations;
      const configuration = electronConfigurations[atom.atomicNum];
      let circles = ""
      for (let x = 1; x <= atom.tableGroup; x++) {
        circles += `<div class="circle c${x}"></div>`;
      }
      const details = `
        <div class="details">
          <div class = "box">
            <h2>${atom.symbol}</h2>
            <div class="nums">
              <sup>${atom.symbol == "H" ? 1 : atom.atomicNum * 2}</sup>
              <sub>${atom.atomicNum}</sub>
            </div>
          </div>
          <div class="name">
            <h1>نام اتم: ${atom.name}</h1>
          </div>
          <div class="layers">
            <h1>زیر لایه های اتم ${atom.name}: ${
        configuration ? configuration : "error"
      }</h1>
      <h1>گروه: ${atom.group}</h1>
          </div>
          <div class="teif">
            <h1>طیف نشری اتم ${atom.name}: </h1>
            <img src="${atom.spectrum}" width="40%" />
          </div>
          <div class="lweis">
            <h1>ساختار لوویس اتم ${atom.name}: </h1>
            <div class="shape">
              <h2>${atom.symbol}</h2>
              ${circles}
            </div>
          </div>
          
        </div>
      `;
      document.body.innerHTML += details;
    } else {
      console.error("Atom not found");
    }
  })
  .catch((error) => console.error("Unable to fetch data:", error));
