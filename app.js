// Daily Ayah
async function loadAyah() {
    try {
        const response = await fetch("https://api.alquran.cloud/v1/ayah/random/en.asad");
        const data = await response.json();

        document.getElementById("ayah").innerHTML =
            `"${data.data.text}"<br><small>${data.data.surah.englishName} ${data.data.numberInSurah}</small>`;
    } catch (error) {
        document.getElementById("ayah").textContent =
            "Unable to load today's Ayah.";
    }
}

// Daily Hadith
async function loadHadith() {
    try {
        const response = await fetch("https://random-hadith-generator.vercel.app/bukhari/");
        const data = await response.json();

        document.getElementById("hadith").innerHTML =
            `"${data.data.hadith_english}"`;
    } catch (error) {
        document.getElementById("hadith").textContent =
            "Unable to load today's Hadith.";
    }
}

loadAyah();
loadHadith();
