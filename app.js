// =====================================
// MUSLIM BRO APP
// Dashboard Controller
// =====================================

// Dashboard Elements

const locationText =
document.getElementById("dashboardLocation");

const dateText =
document.getElementById("dashboardDate");

const hijriText =
document.getElementById("dashboardHijri");

const prayerText =
document.getElementById("dashboardPrayer");

const countdownText =
document.getElementById("dashboardCountdown");

const progressBar =
document.getElementById("progressBar");

const continueCard =
document.getElementById("continueCard");

const continueText =
document.getElementById("continueText");

// User Location

let latitude = null;
let longitude = null;

// Prayer Names

const prayers = [

"Fajr",
"Dhuhr",
"Asr",
"Maghrib",
"Isha"

];

// =====================================
// TODAY'S DATE
// =====================================

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

// =====================================
// USER LOCATION
// =====================================

function loadLocation(){

if(!navigator.geolocation){

if(locationText){

locationText.textContent =
"Location unavailable";

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

`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

);

const data = await response.json();

if(locationText){

locationText.textContent =

data.address.city ||

data.address.town ||

data.address.village ||

data.address.county ||

"Current Location";

}

}catch{

if(locationText){

locationText.textContent =
"Current Location";

}

}

// Load Prayer Times

loadPrayerTimes();

},

()=>{

if(locationText){

locationText.textContent =
"Location unavailable";

}

}

);

}

// =====================================
// CONTINUE READING
// =====================================

function loadContinueReading(){

if(!continueCard || !continueText){

return;

}

const last =
JSON.parse(
localStorage.getItem("lastReadSurah")
);

if(!last){

continueCard.style.display =
"none";

return;

}

continueCard.style.display =
"block";

continueText.textContent =

last.name +

" • Ayah " +

last.ayah;

continueCard.onclick = ()=>{

location.href =
`pages/surah.html?id=${last.id}`;

};

}// =====================================
// PRAYER TIMES
// =====================================

async function loadPrayerTimes(){

if(latitude === null || longitude === null){

return;

}

try{

const response = await fetch(

`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`

);

const json = await response.json();

const timings = json.data.timings;

// Hijri Date

if(hijriText){

const hijri = json.data.date.hijri;

hijriText.textContent =

"🌙 " +

hijri.day +

" " +

hijri.month.en +

" " +

hijri.year +

" AH";

}

updatePrayerCountdown(timings);

setInterval(()=>{

updatePrayerCountdown(timings);

},1000);

}catch(error){

console.log(error);

if(prayerText){

prayerText.textContent="Unavailable";

}

if(countdownText){

countdownText.textContent="--:--:--";

}

}

}

// =====================================
// PRAYER COUNTDOWN
// =====================================

function updatePrayerCountdown(timings){

const now = new Date();

let nextPrayer = "";

let nextPrayerTime = null;

let previousPrayerTime = null;

for(let i=0;i<prayers.length;i++){

const prayer = prayers[i];

const parts =
timings[prayer]
.substring(0,5)
.split(":");

const prayerDate = new Date();

prayerDate.setHours(Number(parts[0]));

prayerDate.setMinutes(Number(parts[1]));

prayerDate.setSeconds(0);

if(prayerDate > now){

nextPrayer = prayer;

nextPrayerTime = prayerDate;

if(i===0){

const isha =
timings.Isha
.substring(0,5)
.split(":");

previousPrayerTime =
new Date();

previousPrayerTime.setDate(
previousPrayerTime.getDate()-1
);

previousPrayerTime.setHours(Number(isha[0]));

previousPrayerTime.setMinutes(Number(isha[1]));

previousPrayerTime.setSeconds(0);

}else{

const previous =
timings[prayers[i-1]]
.substring(0,5)
.split(":");

previousPrayerTime =
new Date();

previousPrayerTime.setHours(Number(previous[0]));

previousPrayerTime.setMinutes(Number(previous[1]));

previousPrayerTime.setSeconds(0);

}

break;

}

}

if(!nextPrayerTime){

const fajr =
timings.Fajr
.substring(0,5)
.split(":");

const isha =
timings.Isha
.substring(0,5)
.split(":");

nextPrayer="Fajr";

nextPrayerTime =
new Date();

nextPrayerTime.setDate(
nextPrayerTime.getDate()+1
);

nextPrayerTime.setHours(Number(fajr[0]));

nextPrayerTime.setMinutes(Number(fajr[1]));

nextPrayerTime.setSeconds(0);

previousPrayerTime =
new Date();

previousPrayerTime.setHours(Number(isha[0]));

previousPrayerTime.setMinutes(Number(isha[1]));

previousPrayerTime.setSeconds(0);

}

if(prayerText){

prayerText.textContent =
nextPrayer;

}

const remaining =
nextPrayerTime-now;

const hours =
Math.floor(remaining/3600000);

const minutes =
Math.floor((remaining%3600000)/60000);

const seconds =
Math.floor((remaining%60000)/1000);

if(countdownText){

countdownText.textContent =

String(hours).padStart(2,"0")+":"+

String(minutes).padStart(2,"0")+":"+

String(seconds).padStart(2,"0");

}

// Progress Bar

if(progressBar && previousPrayerTime){

const total =
nextPrayerTime-previousPrayerTime;

const elapsed =
now-previousPrayerTime;

let percent =
(elapsed/total)*100;

percent =
Math.max(0,Math.min(100,percent));

progressBar.style.width =
percent + "%";

}

}// =====================================
// DAILY AYAH
// =====================================

async function loadDailyAyah(){

try{

const response = await fetch(
"https://api.alquran.cloud/v1/ayah/random/en.asad"
);

const json = await response.json();

const ayah =
document.getElementById("ayah");

if(ayah){

ayah.textContent =
json.data.text.substring(0,90) + "...";

}

}catch(error){

console.log(error);

}

}

// =====================================
// DAILY HADITH
// =====================================

function loadDailyHadith(){

const hadiths=[

"Actions are judged by intentions. — Sahih al-Bukhari",

"The best among you are those who learn the Qur'an and teach it. — Sahih al-Bukhari",

"Make things easy and do not make them difficult. — Sahih al-Bukhari",

"Allah is gentle and loves gentleness. — Sahih Muslim",

"Your smile for your brother is charity. — Jami' at-Tirmidhi",

"The strong believer is better and more beloved to Allah than the weak believer. — Sahih Muslim",

"Whoever believes in Allah and the Last Day should speak good or remain silent. — Sahih al-Bukhari"

];

const hadith =
document.getElementById("hadith");

if(hadith){

const today = new Date().getDate();

hadith.textContent =
hadiths[today % hadiths.length];

}

}

// =====================================
// ISLAMIC GREETING
// =====================================

function loadIslamicGreeting(){

const greetings=[

"السلام عليكم ورحمة الله وبركاته",

"اللهم بارك لنا في يومنا",

"اللهم اجعل القرآن ربيع قلوبنا",

"اللهم ارزقنا الإخلاص والثبات",

"اللهم اغفر لنا ولوالدينا",

"اللهم اجعل هذا اليوم مباركاً",

"اللهم زدنا علماً وهدى",

"اللهم اجعلنا من أهل القرآن"

];

const tagline =
document.querySelector(".tagline");

if(tagline){

const index =
new Date().getDate() % greetings.length;

tagline.textContent =
greetings[index];

}

}

// =====================================
// START APP
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

loadTodayDate();

loadLocation();

loadContinueReading();

loadDailyAyah();

loadDailyHadith();

loadIslamicGreeting();

});
