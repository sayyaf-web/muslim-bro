/* ==========================================
   MUSLIM BRO
   OFFLINE HIJRI ENGINE
   PART 1
========================================== */

const HIJRI_MONTHS = [

"Muharram",
"Safar",
"Rabi al-Awwal",
"Rabi al-Thani",
"Jumada al-Awwal",
"Jumada al-Thani",
"Rajab",
"Sha'ban",
"Ramadan",
"Shawwal",
"Dhul Qa'dah",
"Dhul Hijjah"

];

const HIJRI_MONTHS_AR = [

"محرم",
"صفر",
"ربيع الأول",
"ربيع الآخر",
"جمادى الأولى",
"جمادى الآخرة",
"رجب",
"شعبان",
"رمضان",
"شوال",
"ذو القعدة",
"ذو الحجة"

];

const WEEK_DAYS = [

"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"

];

/* ==========================================
   GREGORIAN → JULIAN DAY
========================================== */

function gregorianToJD(year, month, day){

if(month <= 2){

year--;
month += 12;

}

const A = Math.floor(year / 100);
const B = 2 - A + Math.floor(A / 4);

return Math.floor(

365.25 * (year + 4716)

)

+

Math.floor(

30.6001 * (month + 1)

)

+

day

+

B

-

1524;

}

/* ==========================================
   ISLAMIC → JULIAN DAY
========================================== */

function islamicToJD(year, month, day){

return day

+

Math.ceil(

29.5 * (month - 1)

)

+

(year - 1) * 354

+

Math.floor(

(3 + 11 * year) / 30

)

+

1948439

-

1;

}/* ==========================================
   JULIAN DAY → HIJRI DATE
========================================== */

function jdToIslamic(jd){

jd = Math.floor(jd) + 0.5;

const year = Math.floor(

(30 * (jd - 1948439) + 10646) / 10631

);

let month = Math.min(

12,

Math.ceil(

(jd - (29 + islamicToJD(year,1,1))) / 29.5

) + 1

);

if(month < 1){

month = 1;

}

const firstDayOfMonth =
islamicToJD(year,month,1);

const day =
Math.floor(jd - firstDayOfMonth + 1);

return{

day:day,

month:month,

monthName:
HIJRI_MONTHS[month-1],

monthArabic:
HIJRI_MONTHS_AR[month-1],

year:year

};

}

/* ==========================================
   GREGORIAN → HIJRI
========================================== */

function gregorianToHijri(date){

const jd = gregorianToJD(

date.getFullYear(),

date.getMonth()+1,

date.getDate()

);

return jdToIslamic(jd);

}

/* ==========================================
   FORMAT HIJRI
========================================== */

function formatHijri(date){

const h =
gregorianToHijri(date);

return{

day:h.day,

month:h.month,

monthName:h.monthName,

monthArabic:h.monthArabic,

year:h.year,

text:

`${h.day} ${h.monthName} ${h.year} AH`

};

}/* ==========================================
   HIJRI LEAP YEAR
========================================== */

function isHijriLeapYear(year){

return ((11 * year + 14) % 30) < 11;

}

/* ==========================================
   DAYS IN HIJRI MONTH
========================================== */

function hijriMonthDays(year,month){

if(month % 2 === 1){

return 30;

}

if(month !== 12){

return 29;

}

return isHijriLeapYear(year) ? 30 : 29;

}

/* ==========================================
   DAYS IN GREGORIAN MONTH
========================================== */

function gregorianMonthDays(year,month){

return new Date(year,month+1,0).getDate();

}

/* ==========================================
   FIRST WEEKDAY OF MONTH
========================================== */

function firstWeekday(year,month){

return new Date(year,month,1).getDay();

}

/* ==========================================
   CREATE GREGORIAN DAY OBJECT
========================================== */

function createDayObject(year,month,day){

const date =
new Date(year,month,day);

const hijri =
gregorianToHijri(date);

return{

date,

gregorianDay:day,

gregorianMonth:month,

gregorianYear:year,

weekday:

WEEK_DAYS[date.getDay()],

hijriDay:hijri.day,

hijriMonth:hijri.month,

hijriMonthName:hijri.monthName,

hijriMonthArabic:hijri.monthArabic,

hijriYear:hijri.year

};

}

/* ==========================================
   TODAY
========================================== */

function todayHijri(){

return gregorianToHijri(new Date());

}/* ==========================================
   GENERATE MONTH DATA
========================================== */

function generateMonth(year,month){

const monthData=[];

const firstDay=
firstWeekday(year,month);

const totalDays=
gregorianMonthDays(year,month);

// Empty cells before month starts

for(let i=0;i<firstDay;i++){

monthData.push(null);

}

// Month days

for(let day=1;day<=totalDays;day++){

monthData.push(

createDayObject(
year,
month,
day
)

);

}

// Fill last row

while(monthData.length % 7 !==0){

monthData.push(null);

}

return monthData;

}

/* ==========================================
   IS TODAY
========================================== */

function isToday(dayObj){

if(!dayObj) return false;

const now=new Date();

return(

dayObj.gregorianDay===now.getDate() &&

dayObj.gregorianMonth===now.getMonth() &&

dayObj.gregorianYear===now.getFullYear()

);

}

/* ==========================================
   IS FRIDAY
========================================== */

function isFriday(dayObj){

if(!dayObj) return false;

return dayObj.weekday==="Friday";

}

/* ==========================================
   IS WEEKEND
========================================== */

function isWeekend(dayObj){

if(!dayObj) return false;

return(

dayObj.weekday==="Saturday" ||

dayObj.weekday==="Sunday"

);

}

/* ==========================================
   FORMAT GREGORIAN DATE
========================================== */

function formatGregorian(dayObj){

return(

dayObj.gregorianDay+" "+

months[dayObj.gregorianMonth]+" "+

dayObj.gregorianYear

);

}/* ==========================================
   ISLAMIC EVENTS
========================================== */

const HIJRI_EVENTS = {

"1-1":"🌙 Islamic New Year",

"10-1":"🌙 Day of Ashura",

"12-3":"🌸 Mawlid an-Nabi",

"27-7":"🌙 Isra & Mi'raj",

"15-8":"🌙 Mid Sha'ban",

"1-9":"🌙 First Day of Ramadan",

"27-9":"🌙 Laylatul Qadr",

"1-10":"🎉 Eid al-Fitr",

"8-12":"🕋 Start of Hajj",

"9-12":"🤲 Day of Arafah",

"10-12":"🐑 Eid al-Adha",

"11-12":"🐑 Days of Tashreeq",

"12-12":"🐑 Days of Tashreeq",

"13-12":"🐑 Days of Tashreeq"

};

/* ==========================================
   GET EVENT
========================================== */

function getHijriEvent(dayObj){

if(!dayObj) return "";

const key =

dayObj.hijriDay +

"-" +

dayObj.hijriMonth;

return HIJRI_EVENTS[key] || "";

}

/* ==========================================
   HAS EVENT
========================================== */

function hasEvent(dayObj){

return getHijriEvent(dayObj)!=="";

}

/* ==========================================
   MONTH TITLE
========================================== */

function hijriMonthTitle(dayObj){

if(!dayObj) return "";

return(

dayObj.hijriMonthArabic+

" • "+

dayObj.hijriYear+

" AH"

);

}

/* ==========================================
   EXPORT HELPERS
========================================== */

window.HijriEngine={

gregorianToHijri,

generateMonth,

todayHijri,

formatHijri,

getHijriEvent,

hasEvent,

hijriMonthTitle,

HIJRI_MONTHS,

HIJRI_MONTHS_AR

};
