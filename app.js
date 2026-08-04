/* ==========================================
   MUSLIM BRO v4
   APP.JS
   PART 1
========================================== */

// ==========================================
// ELEMENTS
// ==========================================

const locationText = document.getElementById("dashboardLocation");
const dateText = document.getElementById("dashboardDate");
const hijriText = document.getElementById("dashboardHijri");

const prayerText = document.getElementById("dashboardPrayer");
const prayerTimeText = document.getElementById("dashboardPrayerTime");
const countdownText = document.getElementById("dashboardCountdown");
const remainingText = document.getElementById("dashboardRemaining");
const progressBar = document.getElementById("progressBar");

const continueCard = document.getElementById("continueCard");
const continueText = document.getElementById("continueText");

const ayahElement = document.getElementById("ayah");
const hadithElement = document.getElementById("hadith");

// ==========================================
// GLOBAL VARIABLES
// ==========================================

let latitude = null;
let longitude = null;
let prayerTimings = null;
let prayerTimer = null;

const prayers = [
    "Fajr",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha"
];

// ==========================================
// LOAD TODAY DATE
// ==========================================

function loadTodayDate(){

    const today = new Date();

    if(dateText){

        dateText.textContent =
        today.toLocaleDateString(undefined,{
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        });

    }

}

// ==========================================
// CONTINUE READING
// ==========================================

function loadContinueReading(){

    if(!continueCard || !continueText) return;

    const lastRead =
    JSON.parse(localStorage.getItem("lastReadSurah"));

    if(!lastRead){

        continueCard.style.display="none";
        return;

    }

    continueCard.style.display="block";

    continueText.textContent =
    `${lastRead.name} • Ayah ${lastRead.ayah}`;

    continueCard.onclick = ()=>{

        location.href =
        `pages/surah.html?id=${lastRead.id}`;

    };

}

// ==========================================
// USER LOCATION
// ==========================================

function loadLocation(){

    if(!navigator.geolocation){

        if(locationText)
            locationText.textContent =
            "Location unavailable";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            try{

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );

                const data = await response.json();

                const city =
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    data.address.county ||
                    data.address.state ||
                    "Current Location";

                if(locationText)
                    locationText.textContent = city;

            }catch{

                if(locationText)
                    locationText.textContent =
                    "Current Location";

            }

            loadPrayerTimes();

        },

        ()=>{

            if(locationText)
                locationText.textContent =
                "Location unavailable";

        },

        {

            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:0

        }

    );

}// ==========================================
// LOAD USER LOCATION
// ==========================================

function loadLocation(){

    if(!navigator.geolocation){

        if(locationText){
            locationText.textContent = "Location unavailable";
        }

        loadPrayerTimesByCity("Nairobi","Kenya");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            try{

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );

                const data = await response.json();

                const city =
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    data.address.county ||
                    data.address.state ||
                    "Current Location";

                const country =
                    data.address.country || "";

                if(locationText){
                    locationText.textContent =
                    city + (country ? ", " + country : "");
                }

            }catch(e){

                if(locationText){
                    locationText.textContent =
                    "Current Location";
                }

            }

            loadPrayerTimesGPS();

        },

        ()=>{

            if(locationText){
                locationText.textContent =
                "Nairobi, Kenya";
            }

            loadPrayerTimesByCity(
                "Nairobi",
                "Kenya"
            );

        },

        {
            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:0
        }

    );

}

// ==========================================
// PRAYER TIMES USING GPS
// ==========================================

async function loadPrayerTimesGPS(){

    try{

        const response = await fetch(

            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`

        );

        const json = await response.json();

        currentTimings = json.data.timings;

        if(hijriText){

            const h = json.data.date.hijri;

            hijriText.textContent =
            `🌙 ${h.day} ${h.month.en} ${h.year} AH`;

        }

        updatePrayerCountdown();

        setInterval(updatePrayerCountdown,1000);

    }catch(e){

        loadPrayerTimesByCity(
            "Nairobi",
            "Kenya"
        );

    }

}

// ==========================================
// FALLBACK BY CITY
// ==========================================

async function loadPrayerTimesByCity(city,country){

    try{

        const response = await fetch(

            `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`

        );

        const json = await response.json();

        currentTimings = json.data.timings;

        if(hijriText){

            const h = json.data.date.hijri;

            hijriText.textContent =
            `🌙 ${h.day} ${h.month.en} ${h.year} AH`;

        }

        updatePrayerCountdown();

        setInterval(updatePrayerCountdown,1000);

    }catch(e){

        console.log(e);

    }

}// ==========================================
// PRAYER COUNTDOWN
// ==========================================

function updatePrayerCountdown(){

    if(!currentTimings) return;

    const now = new Date();

    let nextPrayer = "";
    let nextPrayerTime = null;
    let previousPrayerTime = null;

    for(let i=0;i<prayers.length;i++){

        const prayer = prayers[i];

        const time =
        currentTimings[prayer]
        .substring(0,5)
        .split(":");

        const prayerDate = new Date();

        prayerDate.setHours(Number(time[0]));
        prayerDate.setMinutes(Number(time[1]));
        prayerDate.setSeconds(0);

        if(prayerDate > now){

            nextPrayer = prayer;
            nextPrayerTime = prayerDate;

            if(i===0){

                const isha =
                currentTimings.Isha
                .substring(0,5)
                .split(":");

                previousPrayerTime = new Date();

                previousPrayerTime.setDate(
                    previousPrayerTime.getDate()-1
                );

                previousPrayerTime.setHours(Number(isha[0]));
                previousPrayerTime.setMinutes(Number(isha[1]));
                previousPrayerTime.setSeconds(0);

            }else{

                const prev =
                currentTimings[prayers[i-1]]
                .substring(0,5)
                .split(":");

                previousPrayerTime = new Date();

                previousPrayerTime.setHours(Number(prev[0]));
                previousPrayerTime.setMinutes(Number(prev[1]));
                previousPrayerTime.setSeconds(0);

            }

            break;

        }

    }

    // After Isha → Tomorrow Fajr

    if(!nextPrayerTime){

        const fajr =
        currentTimings.Fajr
        .substring(0,5)
        .split(":");

        const isha =
        currentTimings.Isha
        .substring(0,5)
        .split(":");

        nextPrayer = "Fajr";

        nextPrayerTime = new Date();

        nextPrayerTime.setDate(
            nextPrayerTime.getDate()+1
        );

        nextPrayerTime.setHours(Number(fajr[0]));
        nextPrayerTime.setMinutes(Number(fajr[1]));
        nextPrayerTime.setSeconds(0);

        previousPrayerTime = new Date();

        previousPrayerTime.setHours(Number(isha[0]));
        previousPrayerTime.setMinutes(Number(isha[1]));
        previousPrayerTime.setSeconds(0);

    }

    // Prayer Name

    if(prayerText){

        prayerText.textContent = nextPrayer;

    }

    // Prayer Clock

    const prayerClock =
    document.getElementById("dashboardPrayerTime");

    if(prayerClock){

        prayerClock.textContent =
        "🕒 " +
        nextPrayerTime.toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        });

    }

    // Countdown

    const diff =
    nextPrayerTime - now;

    const hours =
    Math.floor(diff/3600000);

    const minutes =
    Math.floor((diff%3600000)/60000);

    const seconds =
    Math.floor((diff%60000)/1000);

    if(countdownText){

        countdownText.textContent =
        String(hours).padStart(2,"0")+":"+
        String(minutes).padStart(2,"0")+":"+
        String(seconds).padStart(2,"0");

    }

    // Remaining Text

    const remaining =
    document.getElementById("dashboardRemaining");

    if(remaining){

        remaining.textContent =
        `⏳ ${hours}h ${minutes}m remaining`;

    }

    // Progress Bar

    if(progressBar){

        const total =
        nextPrayerTime - previousPrayerTime;

        const elapsed =
        now - previousPrayerTime;

        let percent =
        (elapsed/total)*100;

        percent =
        Math.max(0,Math.min(100,percent));

        progressBar.style.width =
        percent + "%";

    }

}// ==========================================
// DAILY AYAH
// ==========================================

async function loadDailyAyah(){

    if(!ayahElement) return;

    try{

        const response = await fetch(
            "https://api.alquran.cloud/v1/ayah/random/en.asad"
        );

        const json = await response.json();

        ayahElement.textContent =
        json.data.text.length > 90
        ? json.data.text.substring(0,90) + "..."
        : json.data.text;

    }catch(error){

        console.log(error);

        ayahElement.textContent =
        "Unable to load today's Ayah.";

    }

}

// ==========================================
// DAILY HADITH
// ==========================================

function loadDailyHadith(){

    if(!hadithElement) return;

    const hadiths=[

        "Actions are judged by intentions. — Sahih al-Bukhari",

        "The best among you are those who learn the Qur'an and teach it. — Sahih al-Bukhari",

        "Make things easy and do not make them difficult. — Sahih al-Bukhari",

        "Allah is gentle and loves gentleness. — Sahih Muslim",

        "Your smile for your brother is charity. — Tirmidhi",

        "The strong believer is better and more beloved to Allah than the weak believer. — Sahih Muslim",

        "Whoever believes in Allah and the Last Day should speak good or remain silent. — Sahih al-Bukhari",

        "The most beloved deeds to Allah are those done consistently even if they are small. — Sahih al-Bukhari",

        "Seek knowledge from the cradle to the grave.",

        "The believer is the mirror of his brother."

    ];

    const today = new Date().getDate();

    hadithElement.textContent =
    hadiths[today % hadiths.length];

}

// ==========================================
// ISLAMIC GREETING
// ==========================================

function loadIslamicGreeting(){

    const greetings=[

        "السلام عليكم ورحمة الله وبركاته",

        "اللهم بارك لنا في هذا اليوم",

        "اللهم اجعل القرآن ربيع قلوبنا",

        "اللهم ارزقنا الإخلاص والثبات",

        "اللهم اغفر لنا ولوالدينا",

        "اللهم اجعل يومنا مباركاً",

        "اللهم زدنا علماً وهدى",

        "اللهم اجعلنا من أهل القرآن",

        "اللهم ثبت قلوبنا على دينك",

        "اللهم ارزقنا حسن الخاتمة"

    ];

    const greeting =
    document.getElementById("islamicGreeting");

    if(greeting){

        const today = new Date().getDate();

        greeting.textContent =
        greetings[today % greetings.length];

    }

}

// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded",()=>{

    loadTodayDate();

    loadLocation();

    loadContinueReading();

    loadDailyAyah();

    loadDailyHadith();

    loadIslamicGreeting();

});
