/* ==========================================
   MUSLIM BRO
   HIJRI CALENDAR
========================================== */

const monthName =
document.getElementById("monthName");

const hijriMonth =
document.getElementById("hijriMonth");

const calendarGrid =
document.getElementById("calendarGrid");

const eventText =
document.getElementById("eventText");

const prevBtn =
document.getElementById("prevMonth");

const nextBtn =
document.getElementById("nextMonth");

const backBtn =
document.getElementById("backBtn");

let currentDate =
new Date();

// ==============================
// MONTH NAMES
// ==============================

const months = [

"January","February","March",
"April","May","June",
"July","August","September",
"October","November","December"

];

// ==============================
// DRAW CALENDAR
// ==============================

async function renderCalendar(){

calendarGrid.innerHTML="";

const year =
currentDate.getFullYear();

const month =
currentDate.getMonth();

monthName.textContent =
months[month] + " " + year;

// First day

const firstDay =
new Date(year,month,1).getDay();

// Total days

const totalDays =
new Date(year,month+1,0).getDate();

// Empty cells

for(let i=0;i<firstDay;i++){

const div =
document.createElement("div");

div.className="day empty";

calendarGrid.appendChild(div);

}

// Day cells

for(let day=1;day<=totalDays;day++){

const card =
document.createElement("div");

card.className="day";

const today =
new Date();

if(

today.getDate()===day &&

today.getMonth()===month &&

today.getFullYear()===year

){

card.classList.add("today");

}

card.innerHTML=

`
<div class="dayNumber">${day}</div>

<div class="hijriNumber">
...
</div>
`;

calendarGrid.appendChild(card);

}

// Load Hijri information

loadHijriInfo();

}

// ==============================
// LOAD HIJRI DATE
// ==============================

async function loadHijriInfo(){

try{

const response =
await fetch(
"https://api.aladhan.com/v1/gToH"
);

const json =
await response.json();

const hijri =
json.data.hijri;

hijriMonth.textContent =

`${hijri.month.en} (${hijri.month.ar}) ${hijri.year} AH`;

loadEvents(
hijri.month.en,
Number(hijri.day)
);

}catch{

hijriMonth.textContent =
"Hijri unavailable";

}

}
// ==============================
// ISLAMIC EVENTS
// ==============================

function loadEvents(month,day){

let event = "No special event today.";

if(month==="Ramadan"){

event =
"🌙 Ramadan Mubarak! Increase your Qur'an recitation, duas and charity.";

}

else if(month==="Shawwal" && day===1){

event =
"🎉 Eid al-Fitr — May Allah accept your fasting and good deeds.";

}

else if(month==="Dhul Hijjah" && day===9){

event =
"🤲 Day of Arafah — One of the greatest days for dua and fasting.";

}

else if(month==="Dhul Hijjah" && day===10){

event =
"🐑 Eid al-Adha — Taqabbal Allahu minna wa minkum.";

}

else if(month==="Muharram" && day===10){

event =
"🌙 Ashura — A blessed day. Fasting is highly recommended.";

}

eventText.textContent = event;

}

// ==============================
// MONTH NAVIGATION
// ==============================

prevBtn.onclick = ()=>{

currentDate.setMonth(
currentDate.getMonth()-1
);

renderCalendar();

};

nextBtn.onclick = ()=>{

currentDate.setMonth(
currentDate.getMonth()+1
);

renderCalendar();

};

// ==============================
// BACK BUTTON
// ==============================

backBtn.onclick = ()=>{

history.back();

};

// ==============================
// START
// ==============================

renderCalendar();
