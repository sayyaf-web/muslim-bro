// ==========================================
// MUSLIM BRO
// app.js
// PART 1
// ==========================================

// ==============================
// DASHBOARD ELEMENTS
// ==============================

const locationText =
document.getElementById("dashboardLocation");

const dateText =
document.getElementById("dashboardDate");

const hijriText =
document.getElementById("dashboardHijri");

const prayerText =
document.getElementById("dashboardPrayer");

const prayerTimeText =
document.getElementById("dashboardPrayerTime");

const countdownText =
document.getElementById("dashboardCountdown");

const remainingText =
document.getElementById("dashboardRemaining");

const progressBar =
document.getElementById("progressBar");

const continueCard =
document.getElementById("continueCard");

const continueText =
document.getElementById("continueText");

const ayahElement =
document.getElementById("ayah");

const hadithElement =
document.getElementById("hadith");

const greetingElement =
document.getElementById("islamicGreeting");

// ==============================
// GLOBAL VARIABLES
// ==============================

let latitude = null;
let longitude = null;

let currentTimings = null;

let countdownInterval = null;

const prayers = [

"Fajr",
"Dhuhr",
"Asr",
"Maghrib",
"Isha"

];

// ==============================
// TODAY'S DATE
// ==============================

function loadTodayDate(){

const today = new Date();

if(dateText){

dateText.textContent =
today.toLocaleDateString(
undefined,
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);

}

}

// ==============================
// CONTINUE READING
// ==============================

function loadContinueReading(){

if(!continueCard || !continueText) return;

const lastRead =
JSON.parse(
localStorage.getItem("lastReadSurah")
);

if(!lastRead){

continueCard.style.display = "none";
return;

}

continueCard.style.display = "block";

continueText.textContent =
`${lastRead.name} • Ayah ${lastRead.ayah}`;

continueCard.onclick = ()=>{

location.href =
`pages/surah.html?id=${lastRead.id}`;

};

}// ==============================
// USER LOCATION
// ==============================

function loadLocation(){

if(!navigator.geolocation){

if(locationText){
locationText.textContent = "Location unavailable";
}

return;

}

navigator.geolocation.getCurrentPosition(

async(position)=>{

latitude = position.coords.latitude;
longitude = position.coords.longitude;

// Reverse Geocoding

try{

const response = await fetch(

`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,

{
headers:{
"Accept":"application/json"
}
}

);

const data = await response.json();

const city =
data.address.city ||
data.address.town ||
data.address.village ||
data.address.municipality ||
data.address.county ||
data.address.state ||
"Current Location";

if(locationText){

locationText.textContent = city;

}

}catch(error){

console.log(error);

if(locationText){

locationText.textContent =
"Current Location";

}

}

// Load Prayer Times

loadPrayerTimes();

},

(error)=>{

console.log(error);

if(locationText){

locationText.textContent =
"Location unavailable";

}

},

{

enableHighAccuracy:true,
timeout:15000,
maximumAge:0

}

);

}

// ==============================
// LOAD PRAYER TIMES
// ==============================

async function loadPrayerTimes(){

if(latitude===null || longitude===null){

return;

}

try{

const response = await fetch(

`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`

);

const json = await response.json();

currentTimings = json.data.timings;

// Hijri Date

if(hijriText){

const hijri = json.data.date.hijri;

hijriText.textContent =
`🌙 ${hijri.day} ${hijri.month.en} ${hijri.year} AH`;

}

// prevent multiple intervals

if(countdownInterval){

clearInterval(countdownInterval);

}

updatePrayerCountdown();

countdownInterval =
setInterval(updatePrayerCountdown,1000);

}catch(error){

console.log(error);

if(prayerText)
prayerText.textContent="Unavailable";

if(prayerTimeText)
prayerTimeText.textContent="🕒 --:--";

if(countdownText)
countdownText.textContent="--:--:--";

if(remainingText)
remainingText.textContent="Unable to load prayer times";

}

}// ==============================
// PRAYER COUNTDOWN ENGINE
// ==============================

function updatePrayerCountdown(){

if(!currentTimings) return;

const now = new Date();

let nextPrayer = "";
let nextPrayerTime = null;
let previousPrayerTime = null;

for(let i=0;i<prayers.length;i++){

const prayer = prayers[i];

const parts =
currentTimings[prayer]
.substring(0,5)
.split(":");

const prayerDate = new Date();

prayerDate.setHours(Number(parts[0]));
prayerDate.setMinutes(Number(parts[1]));
prayerDate.setSeconds(0);
prayerDate.setMilliseconds(0);

if(prayerDate > now){

nextPrayer = prayer;
nextPrayerTime = prayerDate;

// Previous prayer

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

// ==============================
// Display Prayer Name
// ==============================

if(prayerText){

prayerText.textContent = nextPrayer;

}

if(prayerTimeText){

const hh =
String(nextPrayerTime.getHours())
.padStart(2,"0");

const mm =
String(nextPrayerTime.getMinutes())
.padStart(2,"0");

prayerTimeText.textContent =
`🕒 ${hh}:${mm}`;

}

// ==============================
// Countdown
// ==============================

const remaining =
nextPrayerTime - now;

const hours =
Math.floor(remaining/3600000);

const minutes =
Math.floor((remaining%3600000)/60000);

const seconds =
Math.floor((remaining%60000)/1000);

if(countdownText){

countdownText.textContent =
`${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}

if(remainingText){

remainingText.textContent =
`${hours}h ${minutes}m remaining`;

}

// ==============================
// Progress Bar
// ==============================

if(progressBar){

const total =
nextPrayerTime - previousPrayerTime;

const elapsed =
now - previousPrayerTime;

let percent =
(elapsed / total) * 100;

percent =
Math.max(0,Math.min(100,percent));

progressBar.style.width =
percent + "%";

}

}// ==============================
// DAILY AYAH
// ==============================

async function loadDailyAyah(){

try{

const response = await fetch(
"https://api.alquran.cloud/v1/ayah/random/en.asad"
);

const json = await response.json();

if(ayahElement){

ayahElement.textContent =
json.data.text.substring(0,120) + "...";

}

}catch(error){

console.log(error);

if(ayahElement){

ayahElement.textContent =
"Unable to load today's Ayah.";

}

}

}

// ==============================
// DAILY HADITH
// ==============================

function loadDailyHadith(){

const hadiths=[

"Actions are judged by intentions. — Sahih al-Bukhari",

"The best among you are those who learn the Qur'an and teach it. — Sahih al-Bukhari",

"Make things easy and do not make them difficult. — Sahih al-Bukhari",

"Allah is gentle and loves gentleness. — Sahih Muslim",

"Your smile for your brother is charity. — Tirmidhi",

"The strong believer is better and more beloved to Allah. — Sahih Muslim",

"Whoever believes in Allah and the Last Day should speak good or remain silent. — Sahih al-Bukhari",

"The most beloved deeds to Allah are those done consistently even if small. — Sahih al-Bukhari",

"None of you truly believes until he loves for his brother what he loves for himself. — Sahih Muslim",

"Allah does not look at your appearance, but at your hearts and deeds. — Sahih Muslim"

];

if(hadithElement){

const index =
new Date().getDate() % hadiths.length;

hadithElement.textContent =
hadiths[index];

}

}

// ==============================
// ISLAMIC GREETING
// ==============================

function loadIslamicGreeting(){

const greetings=[

"السلام عليكم ورحمة الله وبركاته",

"اللهم بارك لنا في يومنا",

"اللهم اجعل القرآن ربيع قلوبنا",

"اللهم ارزقنا الإخلاص والثبات",

"اللهم اغفر لنا ولوالدينا",

"اللهم اجعل هذا اليوم مباركاً",

"اللهم زدنا علماً وهدى",

"اللهم اجعلنا من أهل القرآن",

"اللهم ثبت قلوبنا على دينك",

"اللهم ارزقنا حسن الخاتمة"

];

const greeting =
document.getElementById("islamicGreeting");

if(greeting){

const index =
new Date().getDate() % greetings.length;

greeting.textContent =
greetings[index];

}

}

// ==============================
// START APPLICATION
// ==============================

document.addEventListener("DOMContentLoaded",()=>{

loadTodayDate();

loadLocation();

loadContinueReading();

loadDailyAyah();

loadDailyHadith();

loadIslamicGreeting();

});

// ==============================
// SERVICE WORKER
// ==============================

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("service-worker.js")
.catch(err=>console.log(err));

});

}
/* ==========================================
   PART 9
   PREMIUM LIVE DASHBOARD
========================================== */

function updateGreeting() {

    const greeting = document.getElementById("islamicGreeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    let text = "";

    if (hour < 5) {

        text = "🌙 Peaceful Night";

    } else if (hour < 12) {

        text = "☀️ Good Morning";

    } else if (hour < 17) {

        text = "🌤 Good Afternoon";

    } else if (hour < 20) {

        text = "🌅 Good Evening";

    } else {

        text = "🌙 Blessed Evening";

    }

    greeting.textContent = text;

}

/* Today's Date */

function updateDate() {

    const date = document.getElementById("dashboardDate");

    if (!date) return;

    date.textContent = new Date().toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}

/* Hijri */

function updateHijri() {

    const hijri = document.getElementById("dashboardHijri");

    if (!hijri) return;

    try {

        const formatter = new Intl.DateTimeFormat(
            "en-TN-u-ca-islamic",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        hijri.textContent = formatter.format(new Date());

    } catch {

        hijri.textContent = "Hijri Calendar";

    }

}

/* Location */

function updateLocation() {

    const location = document.getElementById("dashboardLocation");

    if (!location) return;

    if (!navigator.geolocation) {

        location.textContent = "Location unavailable";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        () => {

            location.textContent = "Location detected";

        },

        () => {

            location.textContent = "Location disabled";

        }

    );

}

/* Hero animation */

function animateHero() {

    const hero = document.querySelector(".premiumPrayerCard");

    if (!hero) return;

    hero.animate(
        [
            {
                transform: "translateY(15px)",
                opacity: 0
            },
            {
                transform: "translateY(0px)",
                opacity: 1
            }
        ],
        {
            duration: 800,
            easing: "ease-out"
        }
    );

}

/* Start */

window.addEventListener("load", () => {

    updateGreeting();

    updateDate();

    updateHijri();

    updateLocation();

    animateHero();

});/* ==========================================
   PART 10
   PREMIUM DAILY WIDGETS
========================================== */

/* ---------- Daily Islamic Quotes ---------- */

const islamicQuotes = [

"Indeed, with hardship comes ease. (Quran 94:6)",

"And whoever relies upon Allah – then He is sufficient for him. (65:3)",

"The best among you are those who learn the Qur'an and teach it.",

"Prayer is the key to Paradise.",

"Allah loves those who constantly repent.",

"Remember Allah and He will remember you.",

"Be patient. Allah is with the patient."

];

/* ---------- Daily Dhikr ---------- */

const dailyDhikr = [

"SubhanAllah ×33",

"Alhamdulillah ×33",

"Allahu Akbar ×34",

"La ilaha illallah",

"Astaghfirullah",

"La hawla wa la quwwata illa billah"

];

/* ---------- Daily Dua ---------- */

const dailyDuas = [

"اللهم اغفر لي وارحمني",

"اللهم ارزقني علماً نافعاً",

"اللهم ثبت قلبي على دينك",

"رب زدني علماً",

"رب اغفر لي ولوالدي",

"اللهم اجعل القرآن ربيع قلبي"

];

/* ---------- Random Helper ---------- */

function randomItem(arr){

return arr[Math.floor(Math.random()*arr.length)];

}

/* ---------- Create Widgets ---------- */

function createPremiumWidgets(){

const dashboard=document.querySelector(".dashboardSection");

if(!dashboard) return;

/* Prevent duplicate */

if(document.getElementById("premiumWidgets")) return;

const wrapper=document.createElement("section");

wrapper.id="premiumWidgets";

wrapper.innerHTML=`

<div class="premiumWidget">

<h3>✨ Daily Inspiration</h3>

<p id="dailyQuote">${randomItem(islamicQuotes)}</p>

</div>

<div class="premiumWidget">

<h3>📿 Today's Dhikr</h3>

<p id="todayDhikr">${randomItem(dailyDhikr)}</p>

</div>

<div class="premiumWidget">

<h3>🤲 Daily Dua</h3>

<p id="todayDua">${randomItem(dailyDuas)}</p>

</div>

`;

dashboard.prepend(wrapper);

}

/* ---------- Refresh Every Day ---------- */

function refreshDailyWidgets(){

createPremiumWidgets();

}

/* ---------- Start ---------- */

window.addEventListener("load",refreshDailyWidgets);/* ==========================================
/*=========================================
 PART 14
 PREMIUM PRAYER RING
=========================================*/

function updatePrayerRing(percent){

const ring = document.querySelector(".ringProgress");

if(!ring) return;

const radius = 100;
const circumference = 2 * Math.PI * radius;

ring.style.strokeDasharray = circumference;

const offset =
circumference -
(percent / 100) * circumference;

ring.style.strokeDashoffset = offset;

}

/* Connect Ring To Existing Progress Bar */

const originalUpdatePrayerCountdown = updatePrayerCountdown;

updatePrayerCountdown = function(){

originalUpdatePrayerCountdown();

/* Read progress from existing progress bar */

const progress = document.getElementById("progressBar");

if(!progress) return;

const width =
parseFloat(progress.style.width || "0");

updatePrayerRing(width);

};   
/*=========================================
 PART 15
 PREMIUM HERO EFFECTS
=========================================*/

function updateHeroBackground() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const hour = new Date().getHours();

    let overlay = "";

    if (hour >= 5 && hour < 11) {

        overlay = "linear-gradient(rgba(255,180,60,.18),rgba(0,0,0,.35))";

    } else if (hour >= 11 && hour < 17) {

        overlay = "linear-gradient(rgba(255,255,255,.05),rgba(0,0,0,.30))";

    } else if (hour >= 17 && hour < 20) {

        overlay = "linear-gradient(rgba(255,120,40,.22),rgba(0,0,0,.45))";

    } else {

        overlay = "linear-gradient(rgba(20,35,80,.35),rgba(0,0,0,.60))";

    }

    hero.style.backgroundImage =
        `${overlay}, url("images/mosque.jpg")`;

    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";

}

/* Hero Fade */

function animateHeroContent() {

    const content = document.querySelector(".heroContent");

    if (!content) return;

    content.animate(

        [
            {
                opacity: 0,
                transform: "translateY(35px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }

        ],

        {
            duration: 900,
            easing: "ease-out",
            fill: "forwards"
        }

    );

}

/* Floating Logo */

function animateLogo() {

    const logo = document.querySelector(".logo");

    if (!logo) return;

    let direction = 1;

    setInterval(() => {

        logo.style.transform =
            `translateY(${direction * 4}px)`;

        direction *= -1;

    }, 2500);

}

/* Start Premium Hero */

window.addEventListener("load", () => {

    updateHeroBackground();

    animateHeroContent();

    animateLogo();

});/*=========================================
 PART 16
 PREMIUM CARD EFFECTS
=========================================*/

/* Ripple Animation */

function createRipple(event){

const card = event.currentTarget;

const ripple = document.createElement("span");

const rect = card.getBoundingClientRect();

const size = Math.max(rect.width, rect.height);

ripple.style.width = size + "px";
ripple.style.height = size + "px";

ripple.style.left =
(event.clientX - rect.left - size / 2) + "px";

ripple.style.top =
(event.clientY - rect.top - size / 2) + "px";

ripple.className = "rippleEffect";

card.appendChild(ripple);

setTimeout(() => {

ripple.remove();

}, 650);

}

/* Attach Ripple To Dashboard Cards */

function enableDashboardRipple(){

document.querySelectorAll(".feature").forEach(card=>{

card.style.position="relative";

card.style.overflow="hidden";

card.addEventListener("click",createRipple);

});

}

/* Lift Animation */

function animateDashboardCards(){

const cards = document.querySelectorAll(".feature");

cards.forEach((card,index)=>{

card.animate(

[

{

opacity:0,

transform:"translateY(35px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],

{

duration:600,

delay:index*70,

fill:"forwards",

easing:"ease-out"

}

);

});

}

/* Premium Button Hover */

function animateButtons(){

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.04)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

}

/* Start */

window.addEventListener("load",()=>{

enableDashboardRipple();

animateDashboardCards();

animateButtons();

});
