/* ==========================================
   MUSLIM BRO
   PREMIUM HIJRI CALENDAR
========================================== */

const monthTitle =
document.getElementById("monthTitle");

const hijriTitle =
document.getElementById("hijriTitle");

const calendarGrid =
document.getElementById("calendarGrid");

const eventText =
document.getElementById("eventText");

const prevBtn =
document.getElementById("prevMonth");

const nextBtn =
document.getElementById("nextMonth");

const todayBtn =
document.getElementById("todayBtn");

let currentDate =
new Date();

/* ===================================== */

function buildCalendar(){

calendarGrid.innerHTML="";

const year =
currentDate.getFullYear();

const month =
currentDate.getMonth();

const monthData =
HijriEngine.generateMonth(
year,
month
);

monthTitle.textContent =
currentDate.toLocaleString(
"default",
{
month:"long",
year:"numeric"
}
);

const firstValid =
monthData.find(d=>d);

if(firstValid){

hijriTitle.textContent =
HijriEngine.hijriMonthTitle(firstValid);

}

/* Week Names */

const week=[

"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"

];

week.forEach(name=>{

const head=
document.createElement("div");

head.className=
"weekHeader";

head.textContent=name;

calendarGrid.appendChild(head);

});

/* Days */

monthData.forEach(day=>{

const card=
document.createElement("div");

if(day===null){

card.className=
"calendarDay empty";

calendarGrid.appendChild(card);

return;

}

card.className=
"calendarDay";

if(HijriEngine.isToday(day)){

card.classList.add("today");

}

if(HijriEngine.isFriday(day)){

card.classList.add("friday");

}

const event =
HijriEngine.getHijriEvent(day);

card.innerHTML=`

<div class="gregorianDay">

${day.gregorianDay}

</div>

<div class="hijriDay">

${day.hijriDay}

</div>

`;

card.onclick=()=>{

showDay(day,event);

};

calendarGrid.appendChild(card);

});

}/* ==========================================
   SHOW SELECTED DAY
========================================== */

function showDay(day,event){

const gregorian =

day.date.toLocaleDateString(

undefined,

{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

}

);

const hijri =

`${day.hijriDay} ${day.hijriMonthArabic} ${day.hijriYear} AH`;

if(eventText){

eventText.innerHTML = `

<div class="selectedDate">

<h3>${gregorian}</h3>

<p>🌙 ${hijri}</p>

</div>

<div class="selectedEvent">

${event ? event : "No special Islamic event"}

</div>

`;

}

}

/* ==========================================
   PREVIOUS MONTH
========================================== */

prevBtn.addEventListener("click",()=>{

currentDate.setMonth(

currentDate.getMonth()-1

);

buildCalendar();

});

/* ==========================================
   NEXT MONTH
========================================== */

nextBtn.addEventListener("click",()=>{

currentDate.setMonth(

currentDate.getMonth()+1

);

buildCalendar();

});

/* ==========================================
   TODAY BUTTON
========================================== */

todayBtn.addEventListener("click",()=>{

currentDate=new Date();

buildCalendar();

});

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

buildCalendar();

}

);
