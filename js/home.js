/*=========================================
  MUSLIM BRO
  HOME.JS
  PART 1
==========================================*/

"use strict";

/*=========================================
LOADING SCREEN
=========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loadingScreen");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.remove();

        },500);

    },800);

});

/*=========================================
DOM ELEMENTS
=========================================*/

const prayerName =
document.getElementById("dashboardPrayer");

const countdown =
document.getElementById("dashboardCountdown");

const remaining =
document.getElementById("dashboardRemaining");

const hijri =
document.getElementById("dashboardHijri");

const locationText =
document.getElementById("dashboardLocation");

const todayDate =
document.getElementById("dashboardDate");

const prayerList =
document.getElementById("miniPrayerList");

const ayah =
document.getElementById("ayah");

const hadith =
document.getElementById("hadith");

const dailyTip =
document.getElementById("dailyTip");

const continueCard =
document.getElementById("continueCard");

const continueText =
document.getElementById("continueText");

const connectionStatus =
document.getElementById("connectionStatus");

/*=========================================
TODAY DATE
=========================================*/

const today = new Date();

todayDate.textContent =
today.toLocaleDateString(undefined,{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
});

/*=========================================
ISLAMIC GREETING
=========================================*/

const hour = today.getHours();

const greeting =
document.getElementById("greetingText");

if(hour<12){

greeting.textContent =
"Assalamu Alaikum ☀️";

}

else if(hour<18){

greeting.textContent =
"Good Afternoon 🤲";

}

else{

greeting.textContent =
"Good Evening 🌙";

}
/*=========================================
PART 2
LOCATION • CONNECTION • HIJRI DATE
=========================================*/

/*=========================================
CONNECTION STATUS
=========================================*/

function showConnection(message, color){

    connectionStatus.textContent = message;

    connectionStatus.style.background = color;

    connectionStatus.style.display = "block";

    setTimeout(()=>{

        connectionStatus.style.display = "none";

    },3000);

}

window.addEventListener("online",()=>{

    showConnection(
        "🟢 Back Online",
        "#0B8457"
    );

});

window.addEventListener("offline",()=>{

    showConnection(
        "🔴 No Internet Connection",
        "#C62828"
    );

});

/*=========================================
GET USER LOCATION
=========================================*/

function loadLocation(){

    if(!navigator.geolocation){

        locationText.textContent =
        "Location unavailable";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        success,

        error,

        {

            enableHighAccuracy:true,

            timeout:15000,

            maximumAge:600000

        }

    );

}

/*=========================================
LOCATION SUCCESS
=========================================*/

async function success(position){

    const lat = position.coords.latitude;

    const lon = position.coords.longitude;

    try{

        const response = await fetch(

            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

        );

        const data = await response.json();

        const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        "Unknown";

        const country =
        data.address.country || "";

        locationText.textContent =
        city + ", " + country;

    }

    catch{

        locationText.textContent =
        "Unknown Location";

    }

    loadHijriDate(lat,lon);

}

/*=========================================
LOCATION ERROR
=========================================*/

function error(){

    locationText.textContent =
    "Location Permission Denied";

    hijri.textContent =
    "--";

}

/*=========================================
HIJRI DATE
=========================================*/

async function loadHijriDate(lat,lon){

    try{

        const response = await fetch(

            `https://api.aladhan.com/v1/gToH?date=${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`

        );

        const json = await response.json();

        const h = json.data.hijri;

        hijri.textContent =
        `${h.day} ${h.month.en} ${h.year} AH`;

    }

    catch{

        hijri.textContent =
        "Hijri unavailable";

    }

}

/*=========================================
START LOCATION
=========================================*/

loadLocation();
/*=========================================
PART 3
PRAYER TIMES
=========================================*/

let prayerTimes = {};
let countdownInterval = null;

/*=========================================
LOAD PRAYER TIMES
=========================================*/

async function loadPrayerTimes(lat, lon){

    try{

        const response = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
        );

        const json = await response.json();

        prayerTimes = json.data.timings;

        renderPrayerList();

        startCountdown();

    }

    catch(error){

        prayerName.textContent = "Unavailable";

        countdown.textContent = "--:--:--";

        remaining.textContent =
        "Unable to load prayer times.";

    }

}

/*=========================================
TIME TO MINUTES
=========================================*/

function toMinutes(time){

    const parts = time.split(":");

    return parseInt(parts[0]) * 60 +

           parseInt(parts[1]);

}

/*=========================================
TODAY MINUTES
=========================================*/

function nowMinutes(){

    const now = new Date();

    return now.getHours() * 60 +

           now.getMinutes();

}

/*=========================================
NEXT PRAYER
=========================================*/

function getNextPrayer(){

    const now = nowMinutes();

    const prayers = [

        ["Fajr", prayerTimes.Fajr],

        ["Dhuhr", prayerTimes.Dhuhr],

        ["Asr", prayerTimes.Asr],

        ["Maghrib", prayerTimes.Maghrib],

        ["Isha", prayerTimes.Isha]

    ];

    for(const prayer of prayers){

        if(now < toMinutes(prayer[1])){

            return prayer;

        }

    }

    return [

        "Fajr",

        prayerTimes.Fajr

    ];

}

/*=========================================
COUNTDOWN
=========================================*/

function startCountdown(){

    if(countdownInterval){

        clearInterval(countdownInterval);

    }

    countdownInterval = setInterval(updateCountdown,1000);

    updateCountdown();

}

/*=========================================
UPDATE COUNTDOWN
=========================================*/

function updateCountdown(){

    const next = getNextPrayer();

    prayerName.textContent = next[0];

    const now = new Date();

    let target = new Date();

    const parts = next[1].split(":");

    target.setHours(

        parseInt(parts[0]),

        parseInt(parts[1]),

        0,

        0

    );

    if(target < now){

        target.setDate(target.getDate()+1);

    }

    const diff = target - now;

    const hrs = Math.floor(diff / 3600000);

    const mins = Math.floor(

        (diff % 3600000)/60000

    );

    const secs = Math.floor(

        (diff % 60000)/1000

    );

    countdown.textContent =

        String(hrs).padStart(2,"0") + ":" +

        String(mins).padStart(2,"0") + ":" +

        String(secs).padStart(2,"0");

    remaining.textContent =

        `Time remaining until ${next[0]}`;

}

/*=========================================
PRAYER LIST
=========================================*/

function renderPrayerList(){

    prayerList.innerHTML = "";

    const current = getNextPrayer()[0];

    const prayers = [

        "Fajr",

        "Dhuhr",

        "Asr",

        "Maghrib",

        "Isha"

    ];

    prayers.forEach(name=>{

        const row = document.createElement("div");

        row.className = "prayerItem";

        if(name===current){

            row.classList.add("active");

        }

        row.innerHTML = `

            <span>${name}</span>

            <strong>${prayerTimes[name]}</strong>

        `;

        prayerList.appendChild(row);

    });

}

/*=========================================
START PRAYER TIMES
=========================================*/

/* Add this line at the end of the
   success(position) function from Part 2 */

loadPrayerTimes(lat, lon);
/*=========================================
PART 4
DAILY CONTENT
=========================================*/

/*=========================================
DAILY AYAH
=========================================*/

const dailyAyahs = [

{
arabic:"إِنَّ مَعَ الْعُسْرِ يُسْرًا",
translation:"Indeed, with hardship comes ease.",
reference:"Surah Ash-Sharh 94:6"
},

{
arabic:"وَاذْكُرُوا اللَّهَ كَثِيرًا",
translation:"Remember Allah often so that you may succeed.",
reference:"Surah Al-Anfal 8:45"
},

{
arabic:"فَاذْكُرُونِي أَذْكُرْكُمْ",
translation:"Remember Me, and I will remember you.",
reference:"Surah Al-Baqarah 2:152"
},

{
arabic:"وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
translation:"He is with you wherever you are.",
reference:"Surah Al-Hadid 57:4"
},

{
arabic:"إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
translation:"Indeed Allah is with the patient.",
reference:"Surah Al-Baqarah 2:153"
}

];

function loadDailyAyah(){

const day = new Date().getDate();

const item = dailyAyahs[
day % dailyAyahs.length
];

ayah.innerHTML = `

<div class="ayahArabic">

${item.arabic}

</div>

<div class="ayahTranslation">

${item.translation}

</div>

<div class="ayahReference">

${item.reference}

</div>

`;

}

/*=========================================
DAILY HADITH
=========================================*/

const hadiths = [

"Actions are judged by intentions. — Sahih al-Bukhari",

"The best among you are those who learn the Qur'an and teach it. — Bukhari",

"Allah is gentle and loves gentleness in all matters. — Muslim",

"Smiling at your brother is charity. — Tirmidhi",

"The strong believer is better and more beloved to Allah. — Muslim"

];

function loadDailyHadith(){

const day = new Date().getDate();

hadith.textContent =

hadiths[day % hadiths.length];

}

/*=========================================
DAILY TIP
=========================================*/

const tips = [

"Read at least one page of the Qur'an today.",

"Pray every Salah on time.",

"Remember Allah frequently through Dhikr.",

"Give charity even if it is little.",

"Forgive someone for the sake of Allah.",

"Make sincere dua after every prayer.",

"Smile because it is Sunnah.",

"Help someone today.",

"Read Surah Al-Mulk before sleeping.",

"Keep your tongue busy with Astaghfirullah."

];

function loadDailyTip(){

const day = new Date().getDate();

dailyTip.textContent =

tips[day % tips.length];

}

/*=========================================
CONTINUE READING
=========================================*/

function loadContinueReading(){

const lastSurah =
localStorage.getItem("lastSurah");

const lastAyah =
localStorage.getItem("lastAyah");

if(lastSurah){

continueCard.style.display = "flex";

continueText.textContent =

`Surah ${lastSurah} • Ayah ${lastAyah || 1}`;

continueCard.onclick = ()=>{

location.href=

`pages/quran.html?surah=${lastSurah}&ayah=${lastAyah || 1}`;

};

}

}

/*=========================================
START DAILY CONTENT
=========================================*/

loadDailyAyah();

loadDailyHadith();

loadDailyTip();

loadContinueReading();
/*=========================================
PART 5
FINAL POLISH
=========================================*/

/*=========================================
RIPPLE EFFECT
=========================================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="rippleEffect";

        const size=Math.max(
            this.clientWidth,
            this.clientHeight
        );

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        const rect=this.getBoundingClientRect();

        ripple.style.left=
            (e.clientX-rect.left-size/2)+"px";

        ripple.style.top=
            (e.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },650);

    });

});

/*=========================================
ACTIVE NAVIGATION
=========================================*/

document.querySelectorAll(".bottomNav button")
.forEach(button=>{

    button.addEventListener("click",function(){

        document
        .querySelectorAll(".bottomNav button")
        .forEach(btn=>{

            btn.classList.remove("active");

        });

        this.classList.add("active");

    });

});

/*=========================================
PAGE VISIBILITY
Refresh prayer countdown
=========================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(!document.hidden){

            updateCountdown();

        }

    }

);

/*=========================================
REFRESH EVERY MINUTE
=========================================*/

setInterval(()=>{

    if(typeof updateCountdown==="function"){

        updateCountdown();

    }

},60000);

/*=========================================
SAVE LAST VISIT
=========================================*/

localStorage.setItem(

    "lastVisit",

    new Date().toISOString()

);

/*=========================================
WELCOME MESSAGE
=========================================*/

const lastVisit=

localStorage.getItem("lastVisit");

if(lastVisit){

console.log(

"Last visit:",

new Date(lastVisit)

);

}

/*=========================================
SERVICE WORKER
=========================================*/

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("sw.js")

.then(()=>{

console.log("Service Worker Registered");

})

.catch(error=>{

console.log(error);

});

});

}

/*=========================================
APP VERSION
=========================================*/

console.log(

"Muslim Bro Home Loaded Successfully"

);

/*=========================================
END OF HOME.JS
=========================================*/
