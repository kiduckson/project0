const API_URL = "https://api.covid19api.com/summary";
const table = document.querySelector(".data");
const date = document.querySelector("#date");

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  const global = data["Global"];
  const retrieved = data["Date"];
  const formatted = retrieved.replace(/t|z/gi, " ");

  date.textContent = `Updated on ${formatted}`;

  const row = document.createElement("tr");
  const co = document.createElement("td");
  co.textContent = "Global";

  const tc = document.createElement("td");
  tc.textContent = global["TotalConfirmed"].toLocaleString("en");

  const td = document.createElement("td");
  td.textContent = global["TotalDeaths"].toLocaleString("en");

  const tr = document.createElement("td");
  tr.textContent = global["TotalRecovered"].toLocaleString("en");

  row.appendChild(co);
  row.appendChild(tc);
  row.appendChild(td);
  row.appendChild(tr);

  table.appendChild(row);

  data["Countries"]
    .sort((a, b) => b["TotalConfirmed"] - a["TotalConfirmed"])
    .forEach((country) => {
      const row = document.createElement("tr");
      const div = document.createElement("td");
      const img = document.createElement("img");
      img.src = `https://www.countryflags.io/${country["CountryCode"]}/flat/24.png`;

      const co = document.createElement("span");
      co.textContent = country["Country"];
      div.appendChild(img);
      div.appendChild(co);

      const tc = document.createElement("td");
      tc.textContent = country["TotalConfirmed"].toLocaleString("en");

      const td = document.createElement("td");
      td.textContent = country["TotalDeaths"].toLocaleString("en");

      const tr = document.createElement("td");
      tr.textContent = country["TotalRecovered"].toLocaleString("en");

      row.appendChild(div);
      row.appendChild(tc);
      row.appendChild(td);
      row.appendChild(tr);
      table.appendChild(row);
    });
}
getData(API_URL);
