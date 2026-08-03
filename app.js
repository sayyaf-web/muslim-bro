// Daily Ayah
async function loadAyah() {
    try {
        const response = await fetch("https://api.alquran.cloud/v1/ayah/2:255/en.asad");
        const data = await response.json();

        document.getElementById("ayah").innerHTML =
            `"${data.data.text}"<br><small>${data.data.surah.englishName} (${data.data.numberInSurah})</small>`;
    } catch (error) {
        document.getElementById("ayah").textContent =
            "Unable to load Ayah.";
    }
}

// Daily Hadith
function loadHadith() {
    document.getElementById("hadith").innerHTML =
        `"The best among you are those who learn the Qur'an and teach it." <br><small>— Sahih al-Bukhari</small>`;
}

loadAyah();
loadHadith();
