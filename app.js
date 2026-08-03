// ===============================
// Daily Ayah
// ===============================
async function loadAyah() {
    try {
        const response = await fetch("https://api.alquran.cloud/v1/ayah/random/en.asad");
        const data = await response.json();

        const ayah = document.getElementById("ayah");
        if (ayah) {
            ayah.innerHTML =
                `"${data.data.text}"<br><small>${data.data.surah.englishName} ${data.data.numberInSurah}</small>`;
        }
    } catch (e) {
        const ayah = document.getElementById("ayah");
        if (ayah) ayah.textContent = "Unable to load today's Ayah.";
    }
}

// ===============================
// Daily Hadith
// ===============================
async function loadHadith() {
    try {
        const response = await fetch("https://random-hadith-generator.vercel.app/bukhari/");
        const data = await response.json();

        const hadith = document.getElementById("hadith");
        if (hadith) {
            hadith.innerHTML = `"${data.data.hadith_english}"`;
        }
    } catch (e) {
        const hadith = document.getElementById("hadith");
        if (hadith) hadith.textContent = "Unable to load today's Hadith.";
    }
}

// Load cards
loadAyah();
loadHadith();


// ===============================
// Prayer Notifications
// ===============================

if ("Notification" in window) {
    Notification.requestPermission();
}

async function startPrayerNotifications(lat, lon) {

    const url =
`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

    const response = await fetch(url);
    const data = await response.json();

    const timings = data.data.timings;

    checkPrayer(timings);
}

function checkPrayer(times){

    setInterval(()=>{

        const now = new Date();

        const current =
            now.getHours().toString().padStart(2,"0") +
            ":" +
            now.getMinutes().toString().padStart(2,"0");

        const prayers = {
            Fajr:times.Fajr,
            Dhuhr:times.Dhuhr,
            Asr:times.Asr,
            Maghrib:times.Maghrib,
            Isha:times.Isha
        };

        for(const prayer in prayers){

            if(current===prayers[prayer]){

                new Notification("🕌 Prayer Time",{
                    body:`It's time for ${prayer}.`
                });

            }

        }

    },60000);

}


// ===============================
// Get user location
// ===============================

if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(position=>{

        startPrayerNotifications(
            position.coords.latitude,
            position.coords.longitude
        );

    });

}
const script = document.createElement("script");
script.src = "notification.js";
document.body.appendChild(script);
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log(err));
    });
}
// Continue Reading Card
const lastSurah = localStorage.getItem("lastSurah");
const lastSurahName = localStorage.getItem("lastSurahName");

if (lastSurah && lastSurahName) {

    const card = document.getElementById("continueCard");
    const text = document.getElementById("continueText");

    if (card && text) {
        card.style.display = "block";
        text.textContent = `${lastSurah}. ${lastSurahName}`;

        card.onclick = () => {
            location.href = `pages/surah.html?id=${lastSurah}`;
        };
    }
}
