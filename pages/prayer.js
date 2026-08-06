/*=========================================
 MUSLIM BRO
 prayer.js
 PART 1
=========================================*/

"use strict";

/*=========================================
 ELEMENTS
=========================================*/

const loadingScreen = document.getElementById("loadingScreen");

const connectionStatus = document.getElementById("connectionStatus");

const nextPrayerName = document.getElementById("nextPrayerName");

const countdown = document.getElementById("countdown");

const remainingText = document.getElementById("remainingText");

const ringCountdown = document.getElementById("ringCountdown");

const ringPrayer = document.getElementById("ringPrayer");

const prayerList = document.getElementById("prayerList");

const hijriDate = document.getElementById("hijriDate");

const gregorianDate = document.getElementById("gregorianDate");

const userLocation = document.getElementById("userLocation");

const ringProgress = document.getElementById("ringProgress");

/*=========================================
 VARIABLES
=========================================*/

let prayerTimes = {};

let countdownInterval = null;

let currentLatitude = null;

let currentLongitude = null;

/*=========================================
 PAGE LOADED
=========================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.style.opacity = "0";

        setTimeout(() => {

            loadingScreen.style.display = "none";

        }, 500);

    }, 700);

});

/*=========================================
 TODAY'S DATE
=========================================*/

function loadTodayDate() {

    const today = new Date();

    gregorianDate.textContent =
        today.toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

loadTodayDate();

/*=========================================
 HIJRI DATE
=========================================*/

function loadHijriDate() {

    const hijri = new Intl.DateTimeFormat(
        "en-TN-u-ca-islamic",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    hijriDate.textContent = hijri.format(new Date());

}

/*=========================================
 LOCATION
=========================================*/

function getLocation() {

    if (!navigator.geolocation) {

        userLocation.textContent = "Location unavailable";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        successLocation,

        errorLocation,

        {
            enableHighAccuracy: true
        }

    );

}

function successLocation(position) {

    currentLatitude = position.coords.latitude;

    currentLongitude = position.coords.longitude;

    userLocation.textContent =
        `${currentLatitude.toFixed(3)}, ${currentLongitude.toFixed(3)}`;

    loadPrayerTimes();

}

function errorLocation() {

    userLocation.textContent = "Location permission denied";

}

/*=========================================
 INITIALIZE
=========================================*/

loadHijriDate();

getLocation();
/*=========================================
 PART 2
 LOAD PRAYER TIMES
=========================================*/

async function loadPrayerTimes() {

    try {

        const today = new Date();

        const month = today.getMonth() + 1;

        const year = today.getFullYear();

        const day = today.getDate();

        const url =
`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${currentLatitude}&longitude=${currentLongitude}&method=2`;

        const response = await fetch(url);

        const json = await response.json();

        prayerTimes = json.data[day - 1].timings;

        renderPrayerList();

        updateCurrentPrayer();

    }

    catch (error) {

        console.error(error);

        prayerList.innerHTML = `
        <div class="prayerRow">
            Unable to load prayer times.
        </div>
        `;

    }

}

/*=========================================
 PRAYER ORDER
=========================================*/

const prayerNames = [

"Fajr",

"Dhuhr",

"Asr",

"Maghrib",

"Isha"

];

/*=========================================
 FORMAT TIME
=========================================*/

function formatTime(time){

    if(!time) return "--:--";

    return time.substring(0,5);

}

/*=========================================
 CREATE LIST
=========================================*/

function renderPrayerList(){

    prayerList.innerHTML = "";

    prayerNames.forEach(name=>{

        const row=document.createElement("div");

        row.className="prayerRow";

        row.id=`row-${name}`;

        row.innerHTML=`

            <div class="prayerName">

                ${name}

            </div>

            <div class="prayerTime">

                ${formatTime(prayerTimes[name])}

            </div>

        `;

        prayerList.appendChild(row);

    });

}

/*=========================================
 CURRENT PRAYER
=========================================*/

function updateCurrentPrayer(){

    document
    .querySelectorAll(".prayerRow")
    .forEach(row=>row.classList.remove("active"));

    const now=new Date();

    let current=null;

    prayerNames.forEach(name=>{

        const value=prayerTimes[name];

        if(!value) return;

        const parts=value.substring(0,5).split(":");

        const prayerDate=new Date();

        prayerDate.setHours(
            parseInt(parts[0]),
            parseInt(parts[1]),
            0,
            0
        );

        if(now>=prayerDate){

            current=name;

        }

    });

    if(current){

        const row=document.getElementById(`row-${current}`);

        if(row){

            row.classList.add("active");

        }

    }

    startCountdown();

}
/*=========================================
  MUSLIM BRO
  prayer.js
  PART 4
  Countdown + Active Prayer
=========================================*/

function getCurrentPrayer(prayerTimes){

    const now = new Date();

    const prayers = [
        {name:"Fajr", time:prayerTimes.Fajr},
        {name:"Dhuhr", time:prayerTimes.Dhuhr},
        {name:"Asr", time:prayerTimes.Asr},
        {name:"Maghrib", time:prayerTimes.Maghrib},
        {name:"Isha", time:prayerTimes.Isha}
    ];

    let current = null;
    let next = prayers[0];

    for(let i=0;i<prayers.length;i++){

        const prayerTime = parseTime(prayers[i].time);

        if(now >= prayerTime){

            current = prayers[i];

        }else{

            next = prayers[i];
            break;

        }
    }

    if(!current){

        current = {
            name:"Isha",
            time:prayerTimes.Isha
        };
    }

    return {
        current,
        next
    };

}

function highlightPrayer(name){

    document.querySelectorAll(".prayerCard")
    .forEach(card=>{

        card.classList.remove("activePrayer");

        if(card.dataset.name===name){

            card.classList.add("activePrayer");

        }

    });

}

function updateCountdown(){

    if(!window.todayPrayerTimes) return;

    const prayerInfo = getCurrentPrayer(window.todayPrayerTimes);

    highlightPrayer(prayerInfo.current.name);

    const nextTime = parseTime(prayerInfo.next.time);

    const now = new Date();

    let diff = nextTime-now;

    if(diff<0){

        diff += 24*60*60*1000;

    }

    const hrs = Math.floor(diff/3600000);

    const mins = Math.floor((diff%3600000)/60000);

    const secs = Math.floor((diff%60000)/1000);

    const countdown =
        String(hrs).padStart(2,"0")+":"+
        String(mins).padStart(2,"0")+":"+
        String(secs).padStart(2,"0");

    const countdownElement =
        document.getElementById("countdown");

    if(countdownElement){

        countdownElement.textContent = countdown;

    }

    const nextPrayerElement =
        document.getElementById("nextPrayerName");

    if(nextPrayerElement){

        nextPrayerElement.textContent =
            prayerInfo.next.name;

    }

}

setInterval(updateCountdown,1000);
/* ==========================================
   MUSLIM BRO
   prayer.js
   PART 5 (FINAL)
========================================== */

function updateCountdown() {

    if (!todayPrayerTimes) return;

    const now = new Date();

    const prayers = [
        { name: "Fajr", time: todayPrayerTimes.Fajr },
        { name: "Dhuhr", time: todayPrayerTimes.Dhuhr },
        { name: "Asr", time: todayPrayerTimes.Asr },
        { name: "Maghrib", time: todayPrayerTimes.Maghrib },
        { name: "Isha", time: todayPrayerTimes.Isha }
    ];

    let nextPrayer = prayers[0];
    let target = null;

    for (const prayer of prayers) {

        const [h, m] = prayer.time.split(":").map(Number);

        const prayerDate = new Date();

        prayerDate.setHours(h, m, 0, 0);

        if (prayerDate > now) {

            nextPrayer = prayer;
            target = prayerDate;
            break;

        }

    }

    if (!target) {

        const [h, m] = prayers[0].time.split(":").map(Number);

        target = new Date();

        target.setDate(target.getDate() + 1);

        target.setHours(h, m, 0, 0);

        nextPrayer = prayers[0];

    }

    const diff = target - now;

    const hrs = Math.floor(diff / 3600000);

    const mins = Math.floor((diff % 3600000) / 60000);

    const secs = Math.floor((diff % 60000) / 1000);

    const countdown =
        `${String(hrs).padStart(2, "0")}:` +
        `${String(mins).padStart(2, "0")}:` +
        `${String(secs).padStart(2, "0")}`;

    const nextPrayerElement =
        document.getElementById("nextPrayer");

    const countdownElement =
        document.getElementById("countdown");

    if (nextPrayerElement)
        nextPrayerElement.textContent = nextPrayer.name;

    if (countdownElement)
        countdownElement.textContent = countdown;

    highlightCurrentPrayer(nextPrayer.name);

}

/* ==========================================
   Highlight Next Prayer
========================================== */

function highlightCurrentPrayer(name) {

    document.querySelectorAll(".prayerCard")
        .forEach(card => card.classList.remove("active"));

    const target =
        document.querySelector(
            `[data-prayer="${name}"]`
        );

    if (target)
        target.classList.add("active");

}

/* ==========================================
   Notifications
========================================== */

function schedulePrayerReminder() {

    console.log("Prayer reminder initialized.");

}

/* ==========================================
   Location
========================================== */

function detectLocation() {

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(

        position => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            loadPrayerTimes();

        },

        () => {

            latitude = -1.286389;
            longitude = 36.817223;

            loadPrayerTimes();

        }

    );

}

/* ==========================================
   Refresh Every Minute
========================================== */

setInterval(() => {

    updateCountdown();

}, 1000);

/* ==========================================
   Initialize
========================================== */

window.addEventListener("load", () => {

    updateHijriDate();

    detectLocation();

    schedulePrayerReminder();

});
