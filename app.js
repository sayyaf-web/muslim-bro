// ===============================
// Muslim Bro Dashboard
// ===============================

const locationText = document.getElementById("dashboardLocation");
const dateText = document.getElementById("dashboardDate");
const prayerText = document.getElementById("dashboardPrayer");
const countdownText = document.getElementById("dashboardCountdown");
const continueCard = document.getElementById("continueCard");
const continueText = document.getElementById("continueText");

const prayers = [
"Fajr",
"Dhuhr",
"Asr",
"Maghrib",
"Isha"
];

// ===============================
// Today's Date
// ===============================

function loadTodayDate(){

const today = new Date();

if(dateText){

dateText.textContent = today.toLocaleDateString(
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

// ===============================
// Location
// ===============================

function loadLocation(){

if(!locationText) return;

if(!navigator.geolocation){

locationText.textContent = "Location unavailable";

return;

}

navigator.geolocation.getCurrentPosition(

()=>{

locationText.textContent = "Current Location";

},

()=>{

locationText.textContent = "Location unavailable";

}

);

}

// ===============================
// Continue Reading
// ===============================

function loadContinueReading(){

if(!continueCard || !continueText) return;

const last = JSON.parse(
localStorage.getItem("lastReadSurah")
);

if(!last){

continueCard.style.display="none";

return;

}

continueCard.style.display="block";

continueText.textContent =
last.name + " • Ayah " + last.ayah;

continueCard.onclick = ()=>{

location.href =
`pages/surah.html?id=${last.id}`;

};

}

// ===============================
// Prayer Countdown
// ===============================

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

if(prayerText)
prayerText.textContent = "Unavailable";

if(countdownText)
countdownText.textContent = "--:--:--";

}

}

function updateCountdown(timings){

const now = new Date();

let nextPrayer = "";
let nextTime = null;

for(const prayer of prayers){

const parts =
timings[prayer].substring(0,5).split(":");

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

const fajr =
timings.Fajr.substring(0,5).split(":");

nextPrayer = "Fajr";

nextTime = new Date();

nextTime.setDate(nextTime.getDate()+1);

nextTime.setHours(Number(fajr[0]));
nextTime.setMinutes(Number(fajr[1]));
nextTime.setSeconds(0);

}

if(prayerText)
prayerText.textContent = nextPrayer;

const diff = nextTime - now;

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

}

// ===============================
// Daily Ayah
// ===============================

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
json.data.text.substring(0,80) + "...";

}

}catch(e){

console.log(e);

}

}

// ===============================
// Daily Hadith
// ===============================

function loadDailyHadith(){

const hadiths=[

"Actions are judged by intentions.",

"The best among you are those who learn the Qur'an and teach it.",

"Make things easy, not difficult.",

"Allah is gentle and loves gentleness.",

"Smile at your brother; it is charity.",

"The strong believer is better and more beloved to Allah."

];

const hadith =
document.getElementById("hadith");

if(hadith){

const today = new Date().getDate();

hadith.textContent =
hadiths[today % hadiths.length];

}

}

// ===============================
// Premium Islamic Greeting
// ===============================

function loadIslamicGreeting(){

const hour = new Date().getHours();

let greetings = [];

if(hour >= 4 && hour < 11){

greetings = [

"صبحكم الله بالخير 🌅",

"أسعد الله صباحكم بالطاعات 🌅",

"اللهم بارك لنا في هذا الصباح ☀️",

"اللهم اجعل صباحنا نوراً وبركة 🤲",

"رزقكم الله السعادة في هذا الصباح 🌸"

];

}

else if(hour >= 11 && hour < 16){

greetings = [

"السلام عليكم ورحمة الله وبركاته ☀️",

"تقبل الله أعمالكم 🤲",

"بارك الله فيكم 🌿",

"نسأل الله لكم التوفيق والبركة 🕌",

"جعل الله يومكم مباركاً ☀️"

];

}

else if(hour >= 16 && hour < 19){

greetings = [

"مساء الخير والبركة 🌇",

"أسأل الله أن يمسيكم بالخير 🌙",

"اللهم اجعل مساءنا مليئاً بالسكينة 🤲",

"بارك الله لكم في هذا المساء 🌙",

"نسأل الله لكم راحة القلب 🌿"

];

}

else{

greetings = [

"أسأل الله أن يجعل ليلتكم مباركة 🌙",

"اللهم ارزقنا وإياكم قيام الليل 🤲",

"اللهم اجعل ليلتنا طاعة وراحة 🌙",

"غفر الله لكم ولوالديكم 🤍",

"اللهم اختم يومنا برضاك 🤲"

];

}

const greeting =
greetings[Math.floor(Math.random()*greetings.length)];

const tagline =
document.querySelector(".tagline");

if(tagline){

tagline.textContent = greeting;

}

}

// ===============================
// Start Dashboard
// ===============================

loadTodayDate();

loadLocation();

loadContinueReading();

loadPrayerCountdown();

loadDailyAyah();

loadDailyHadith();

loadIslamicGreeting();
