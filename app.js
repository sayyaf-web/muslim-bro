// ===============================
// Muslim Bro Dashboard
// ===============================

const locationText =
document.getElementById("dashboardLocation");

const dateText =
document.getElementById("dashboardDate");

const prayerText =
document.getElementById("dashboardPrayer");

const countdownText =
document.getElementById("dashboardCountdown");

const continueCard =
document.getElementById("continueCard");

const continueText =
document.getElementById("continueText");

// ===============================
// Today's Date
// ===============================

function loadTodayDate(){

const today = new Date();

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

// ===============================
// User Location
// ===============================

function loadLocation(){

if(!navigator.geolocation){

locationText.textContent =
"Location unavailable";

return;

}

navigator.geolocation.getCurrentPosition(

(position)=>{

locationText.textContent="Current Location";

},

()=>{

locationText.textContent=
"Location unavailable";

}

);

}

// ===============================
// Continue Reading
// ===============================

function loadContinueReading(){

const last =
JSON.parse(
localStorage.getItem("lastReadSurah")
);

if(!last){

continueCard.style.display="none";

return;

}

continueCard.style.display="block";

continueText.textContent =
last.name +
" • Ayah " +
last.ayah;

continueCard.onclick=()=>{

location.href=
`pages/surah.html?id=${last.id}`;

};

}// ===============================
// Prayer Countdown
// ===============================

const prayers = [

"Fajr",

"Dhuhr",

"Asr",

"Maghrib",

"Isha"

];

async function loadPrayerCountdown(){

try{

const response = await fetch(

"https://api.aladhan.com/v1/timingsByCity?city=Nairobi&country=Kenya&method=2"

);

const json = await response.json();

const timings = json.data.timings;

updateCountdown(timings);

setInterval(()=>{

updateCountdown(timings);

},1000);

}catch(error){

console.log(error);

prayerText.textContent="Unavailable";

countdownText.textContent="--:--:--";

}

}

function updateCountdown(timings){

const now = new Date();

let nextPrayer = "";

let nextTime = null;

for(const prayer of prayers){

const time = timings[prayer].substring(0,5);

const parts = time.split(":");

const prayerDate = new Date();

prayerDate.setHours(Number(parts[0]));

prayerDate.setMinutes(Number(parts[1]));

prayerDate.setSeconds(0);

if(prayerDate > now){

nextPrayer = prayer;

nextTime = prayerDate;

break;

}

}

if(!nextTime){

const fajr = timings.Fajr.substring(0,5).split(":");

nextPrayer = "Fajr";

nextTime = new Date();

nextTime.setDate(nextTime.getDate()+1);

nextTime.setHours(Number(fajr[0]));

nextTime.setMinutes(Number(fajr[1]));

nextTime.setSeconds(0);

}

prayerText.textContent = nextPrayer;

const diff = nextTime - now;

const hours = Math.floor(diff/3600000);

const minutes = Math.floor((diff%3600000)/60000);

const seconds = Math.floor((diff%60000)/1000);

countdownText.textContent =

String(hours).padStart(2,"0")+":"+

String(minutes).padStart(2,"0")+":"+

String(seconds).padStart(2,"0");

}

// ===============================
// Start Dashboard
// ===============================

loadTodayDate();

loadLocation();

loadContinueReading();

loadPrayerCountdown();
// ===============================
// Daily Ayah
// ===============================

async function loadDailyAyah(){

try{

const response = await fetch(

"https://api.alquran.cloud/v1/ayah/random/en.asad"

);

const json = await response.json();

const ayah = document.getElementById("ayah");

if(ayah){

ayah.textContent =

json.data.text.substring(0,80) + "...";

}

}catch(e){

console.log(e);

}

}

// ===============================
// Daily Hadith
// ===============================

async function loadDailyHadith(){

const hadiths=[

"Actions are judged by intentions.",

"The best among you are those who learn the Qur'an and teach it.",

"Make things easy, not difficult.",

"Allah is gentle and loves gentleness.",

"Smile at your brother; it is charity.",

"The strong believer is better and more beloved to Allah."

];

const today=new Date().getDate();

const hadith=document.getElementById("hadith");

if(hadith){

hadith.textContent=

hadiths[today % hadiths.length];

}

}

// ===============================
// Load Everything
// ===============================

loadDailyAyah();

loadDailyHadith();
