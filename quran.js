let allSurahs = [];

async function loadQuran() {
    try {
        const response = await fetch("../data/surahs.json");
        const json = await response.json();

        allSurahs = json.data.surahs.references;

        displaySurahs(allSurahs);

        document.getElementById("search").addEventListener("input", filterSurahs);

    } catch (err) {
        console.error(err);
    }
}

function displaySurahs(surahs) {

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
            localStorage.setItem("lastSurah", surah.number);
            localStorage.setItem("lastSurahName", surah.englishName);
            location.href = `surah.html?id=${surah.number}`;
        };

        list.appendChild(card);
    });

}

function filterSurahs() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = allSurahs.filter(surah =>
        surah.englishName.toLowerCase().includes(keyword) ||
        surah.name.includes(keyword) ||
        surah.number.toString().includes(keyword)
    );

    displaySurahs(filtered);
}

loadQuran();
