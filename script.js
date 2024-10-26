"use strict";

const albumi = [];

const ocijeniAlbum = (event) => {
  event.preventDefault();
  event.stopPropagation();

  console.log("Ocjenjujem album...");
  const imeAlbuma = event.target.album.value;
  const ocjenaAlbuma = event.target.ocjena.value;
  const izvodjac = event.target.izvodjac.value;

  albumi.push({
    imeAlbuma,
    ocjenaAlbuma,
    izvodjac,
    datum: new Date().toISOString(),
    favorit: false,
  });

  prikaziAlbum(albumi);

  event.target.reset(); // resetira formu
};

const prikaziAlbum = (albumi) => {
  const albumi_element = document.getElementById("albumi");

  const sviAlbumi = albumi.map(prikaziJedanAlbum);
  albumi_element.innerHTML = sviAlbumi.join("");
};

const prikaziJedanAlbum = (album) => {
  return `<p>
        ${album.favorit ? "⭐️" : ""}
        <strong>Album:</strong> ${album.imeAlbuma}
        <br />
        <strong>Izvođač:</strong> ${album.izvodjac}
        <br />
        <strong>Ocjena:</strong> ${album.ocjenaAlbuma}
        <br />
        <strong>Datum:</strong> ${album.datum}
        <br />
        <button onclick="favorit(${albumi.indexOf(album)})">Favorit</button>
        <button onclick="obrisi(${albumi.indexOf(album)})">Obriši</button>
      </p>`;
};

const favorit = (index) => {
  console.log("Označavam album kao favorit...");
  albumi[index].favorit = !albumi[index].favorit;
  prikaziAlbum(albumi);
};

const obrisi = (index) => {
  console.log(`Brišem album ${index}`);

  albumi.splice(index, 1);
  prikaziAlbum(albumi);
};

document.getElementById("form").addEventListener("submit", ocijeniAlbum);
