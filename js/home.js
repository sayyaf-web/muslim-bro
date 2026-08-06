/* ==========================================
   MUSLIM BRO - HOME.JS
   PART 1
   APP INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHome();
});

function initHome() {

    hideLoadingScreen();

    updateGreeting();

    updateTodayDate();

    updateConnectionStatus();

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    setInterval(updateGreeting, 60000);
}

/* ==========================================
   LOADING SCREEN
========================================== */

function hideLoadingScreen() {

    const loading = document.getElementById("loadingScreen");

    if (!loading) return;

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 500);

    }, 1200);

}

/* ==========================================
   GREETING
========================================== */

function updateGreeting() {

    const greeting = document.getElementById("greetingText");

    if (!greeting) return;

    const hour = new Date().getHours();

    let text = "Assalamu Alaikum";

    if (hour >= 5 && hour < 12) {

        text = "Good Morning 🌅";

    }

    else if (hour >= 12 && hour < 17) {

        text = "Good Afternoon ☀️";

    }

    else if (hour >= 17 && hour < 20) {

        text = "Good Evening 🌇";

    }

    else {

        text = "Good Night 🌙";

    }

    greeting.textContent = text;

}

/* ==========================================
   TODAY'S DATE
========================================== */

function updateTodayDate() {
loadPrayerTimes();

loadLocation();
    const el = document.getElementById("dashboardDate");

    if (!el) return;

    const today = new Date();

    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };

    el.textContent = today.toLocaleDateString(undefined, options);

}

/* ==========================================
   INTERNET STATUS
========================================== */

function updateConnectionStatus() {

    const box = document.getElementById("connectionStatus");

    if (!box) return;

    box.style.display = "block";

    if (navigator.onLine) {

        box.textContent = "🟢 Online";

        box.style.background = "#0B8457";

    }

    else {

        box.textContent = "🔴 Offline";

        box.style.background = "#b42318";

    }

    setTimeout(() => {

        box.style.display = "none";

    }, 2500);

}

/* ==========================================
   PLACEHOLDERS
   (Implemented in Parts 2 & 3)
========================================== */

function loadPrayerTimes(){}

function startPrayerCountdown(){}

function loadHijriDate(){}

function loadLocation(){}

function loadDailyAyah(){}

function loadDailyHadith(){}

function loadDailyTip(){}

function loadContinueReading(){}
/* ==========================================
   PART 2
   PRAYER • HIJRI • LOCATION
========================================== */

const PRAYER_API = "https://api.aladhan.com/v1/timings";

let prayerTimes = {};
let countdownTimer = null;

function loadPrayerTimes() {

    if (!navigator.geolocation) {

        loadPrayerData(-1.286389, 36.817223);

        return;

    }

    navigator.geolocation.getCurrentPosition(

        position => {

            loadPrayerData(
                position.coords.latitude,
                position.coords.longitude
            );

        },

        () => {

            loadPrayerData(-1.286389, 36.817223);

        }

    );

}

async function loadPrayerData(lat, lon) {

    try {

        const response = await fetch(
            `${PRAYER_API}?latitude=${lat}&longitude=${lon}&method=2`
        );

        const json = await response.json();

        prayerTimes = json.data.timings;

        document.getElementById("dashboardHijri").textContent =
            json.data.date.hijri.date;

        showNextPrayer();

    }

    catch (err) {

        console.error(err);

    }

}

/* ==========================================
   NEXT PRAYER
========================================== */

function showNextPrayer() {

    if (!prayerTimes.Fajr) return;

    const schedule = [

        ["Fajr", prayerTimes.Fajr],

        ["Dhuhr", prayerTimes.Dhuhr],

        ["Asr", prayerTimes.Asr],

        ["Maghrib", prayerTimes.Maghrib],

        ["Isha", prayerTimes.Isha]

    ];

    const now = new Date();

    let nextPrayer = schedule[0];

    for (const prayer of schedule) {

        const parts = prayer[1].substring(0,5).split(":");

        const prayerDate = new Date();

        prayerDate.setHours(parts[0]);

        prayerDate.setMinutes(parts[1]);

        prayerDate.setSeconds(0);

        if (prayerDate > now) {

            nextPrayer = prayer;

            break;

        }

    }

    document.getElementById("dashboardPrayer").textContent =
        nextPrayer[0];

    startPrayerCountdown(nextPrayer[1]);

}

/* ==========================================
   COUNTDOWN
========================================== */

function startPrayerCountdown(timeString) {

    if (countdownTimer)

        clearInterval(countdownTimer);

    countdownTimer = setInterval(() => {

        const now = new Date();

        const target = new Date();

        const parts = timeString.substring(0,5).split(":");

        target.setHours(parts[0]);

        target.setMinutes(parts[1]);

        target.setSeconds(0);

        let diff = target - now;

        if (diff < 0) {

            clearInterval(countdownTimer);

            loadPrayerTimes();

            return;

        }

        const hours =
            Math.floor(diff / 3600000);

        const minutes =
            Math.floor(diff % 3600000 / 60000);

        const seconds =
            Math.floor(diff % 60000 / 1000);

        document.getElementById(
            "dashboardCountdown"
        ).textContent =
            `${hours.toString().padStart(2,"0")}:` +
            `${minutes.toString().padStart(2,"0")}:` +
            `${seconds.toString().padStart(2,"0")}`;

        document.getElementById(
            "dashboardRemaining"
        ).textContent =
            "Remaining until prayer";

    },1000);

}

/* ==========================================
   LOCATION
========================================== */

async function loadLocation() {

    const label =
        document.getElementById("dashboardLocation");

    if (!label) return;

    label.textContent =
        "Current Location";

}/* ==========================================
   PART 3
   DAILY AYAH • HADITH • TIP
========================================== */

/* Daily Ayah */

const dailyAyahs = [

{
arabic:"إِنَّ مَعَ الْعُسْرِ يُسْرًا",
translation:"Indeed, with hardship comes ease.",
reference:"Surah Ash-Sharh (94:6)"
},

{
arabic:"فَاذْكُرُونِي أَذْكُرْكُمْ",
translation:"So remember Me; I will remember you.",
reference:"Surah Al-Baqarah (2:152)"
},

{
arabic:"رَّبِّ زِدْنِي عِلْمًا",
translation:"My Lord, increase me in knowledge.",
reference:"Surah Ta-Ha (20:114)"
},

{
arabic:"إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
translation:"Indeed, Allah is with the patient.",
reference:"Surah Al-Baqarah (2:153)"
},

{
arabic:"وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
translation:"Whoever relies upon Allah, He is sufficient for him.",
reference:"Surah At-Talaq (65:3)"
},

{
arabic:"ادْعُونِي أَسْتَجِبْ لَكُمْ",
translation:"Call upon Me; I will respond to you.",
reference:"Surah Ghafir (40:60)"
},

{
arabic:"اللَّهُ خَيْرُ الرَّازِقِينَ",
translation:"Allah is the Best of Providers.",
reference:"Surah Al-Jumu'ah (62:11)"
},

{
arabic:"إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
translation:"Indeed, Allah loves those who rely upon Him.",
reference:"Surah Aal-Imran (3:159)"
}

];

function loadDailyAyah(){

const ayah=document.getElementById("ayah");

if(!ayah) return;

const today=new Date().getDate();

const verse=dailyAyahs[today%dailyAyahs.length];

ayah.innerHTML=`

<div class="ayahArabic">

${verse.arabic}

</div>

<div class="ayahTranslation">

${verse.translation}

</div>

<div class="ayahReference">

${verse.reference}

</div>

`;

}

/* ==========================================
   DAILY HADITH
========================================== */

const dailyHadiths=[

"The best among you are those who learn the Qur'an and teach it.",

"Actions are judged by intentions.",

"Allah is gentle and loves gentleness.",

"Smile at your brother—it is charity.",

"The strong believer is better and more beloved to Allah.",

"Make things easy and do not make them difficult.",

"The most beloved deeds are those done consistently.",

"Purity is half of faith."

];

function loadDailyHadith(){

const hadith=document.getElementById("hadith");

if(!hadith) return;

const today=new Date().getDate();

hadith.textContent=dailyHadiths[today%dailyHadiths.length];

}

/* ==========================================
   DAILY TIP
========================================== */

const dailyTips=[

"Pray every Salah on time.",

"Read at least one page of the Qur'an today.",

"Remember Allah frequently.",

"Help someone today for the sake of Allah.",

"Recite SubhanAllah 33 times.",

"Recite Alhamdulillah 33 times.",

"Recite Allahu Akbar 34 times.",

"Send abundant blessings upon Prophet Muhammad ﷺ."

];

function loadDailyTip(){

const tip=document.getElementById("dailyTip");

if(!tip) return;

const today=new Date().getDate();

tip.textContent=dailyTips[today%dailyTips.length];

}

/* ==========================================
   CONTINUE READING
========================================== */

function loadContinueReading(){

const card=document.getElementById("continueCard");

const text=document.getElementById("continueText");

if(!card||!text) return;

const surah=localStorage.getItem("lastSurah");

const ayah=localStorage.getItem("lastAyah");

if(surah){

card.style.display="flex";

text.textContent=`Continue Surah ${surah} • Ayah ${ayah||1}`;

card.onclick=()=>{

location.href="pages/quran.html";

};

}

}

/* ==========================================
   START EVERYTHING
========================================== */

window.addEventListener("load",()=>{

loadPrayerTimes();

loadLocation();

loadDailyAyah();

loadDailyHadith();

loadDailyTip();

loadContinueReading();

});
