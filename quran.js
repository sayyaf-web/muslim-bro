async function loadQuran() {
  try {
    const response = await fetch("../data/surahs.json");
    const json = await response.json();

    // The metadata is in json.data.surahs.references
    const surahs = json.data.surahs.references;

    const list = document.getElementById("surah-list");
    list.innerHTML = "";

    surahs.forEach(surah => {
      const card = document.createElement("div");
      card.className = "surah-card";

      card.innerHTML = `
        <h3>${surah.number}. ${surah.englishName}</h3>
        <p>${surah.name}</p>
        <small>${surah.englishNameTranslation}</small><br>
        <small>${surah.revelationType} • ${surah.numberOfAyahs} Ayahs</small>
      `;

    card.onclick = () => {

    // Save last opened Surah
    localStorage.setItem("lastSurah", surah.number);
    localStorage.setItem("lastSurahName", surah.englishName);

    location.href = `surah.html?id=${surah.number}`;
};

      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);

    document.getElementById("surah-list").innerHTML =
      "<p>Failed to load Surahs.</p>";
  }
}

loadQuran();
