/* ==========================================
   MUSLIM BRO
   OFFLINE HIJRI ENGINE
   PART 1
========================================== */

/* ==========================================
   GREGORIAN MONTHS
========================================== */

const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];

/* ==========================================
   HIJRI MONTHS
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

/* ==========================================
   WEEK DAYS
========================================== */

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

    return (

        Math.floor(365.25 * (year + 4716)) +

        Math.floor(30.6001 * (month + 1)) +

        day +

        B -

        1524

    );

}

/* ==========================================
   HIJRI → JULIAN DAY
========================================== */

function islamicToJD(year, month, day){

    return (

        day +

        Math.ceil(29.5 * (month - 1)) +

        (year - 1) * 354 +

        Math.floor((3 + 11 * year) / 30) +

        1948439 -

        1

    );

}/* ==========================================
   JULIAN DAY → HIJRI DATE
========================================== */

function jdToIslamic(jd){

    jd = Math.floor(jd) + 0.5;

    const year = Math.floor(

        (30 * (jd - 1948439) + 10646) / 10631

    );

    let month = Math.ceil(

        (jd - 29 - islamicToJD(year, 1, 1)) / 29.5

    ) + 1;

    if(month < 1){

        month = 1;

    }

    if(month > 12){

        month = 12;

    }

    const firstDayOfMonth =
    islamicToJD(year, month, 1);

    const day =
    Math.floor(jd - firstDayOfMonth + 1);

    return {

        day: day,

        month: month,

        monthName:
        HIJRI_MONTHS[month - 1],

        monthArabic:
        HIJRI_MONTHS_AR[month - 1],

        year: year

    };

}

/* ==========================================
   GREGORIAN → HIJRI
========================================== */

function gregorianToHijri(date){

    const jd = gregorianToJD(

        date.getFullYear(),

        date.getMonth() + 1,

        date.getDate()

    );

    return jdToIslamic(jd);

}

/* ==========================================
   FORMAT HIJRI DATE
========================================== */

function formatHijri(date){

    const h = gregorianToHijri(date);

    return {

        day: h.day,

        month: h.month,

        monthName: h.monthName,

        monthArabic: h.monthArabic,

        year: h.year,

        text:
        `${h.day} ${h.monthName} ${h.year} AH`

    };

}

/* ==========================================
   TODAY'S HIJRI DATE
========================================== */

function todayHijri(){

    return gregorianToHijri(new Date());

}/* ==========================================
   HIJRI LEAP YEAR
========================================== */

function isHijriLeapYear(year){

    return ((11 * year + 14) % 30) < 11;

}

/* ==========================================
   DAYS IN HIJRI MONTH
========================================== */

function hijriMonthDays(year, month){

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

function gregorianMonthDays(year, month){

    return new Date(year, month + 1, 0).getDate();

}

/* ==========================================
   FIRST WEEKDAY
========================================== */

function firstWeekday(year, month){

    return new Date(year, month, 1).getDay();

}

/* ==========================================
   CREATE DAY OBJECT
========================================== */

function createDayObject(year, month, day){

    const date = new Date(year, month, day);

    const hijri = gregorianToHijri(date);

    return {

        date,

        gregorianDay: day,

        gregorianMonth: month,

        gregorianYear: year,

        weekday: WEEK_DAYS[date.getDay()],

        hijriDay: hijri.day,

        hijriMonth: hijri.month,

        hijriMonthName: hijri.monthName,

        hijriMonthArabic: hijri.monthArabic,

        hijriYear: hijri.year

    };

}

/* ==========================================
   GENERATE MONTH
========================================== */

function generateMonth(year, month){

    const monthData = [];

    const firstDay = firstWeekday(year, month);

    const totalDays = gregorianMonthDays(year, month);

    // Empty cells before month starts

    for(let i = 0; i < firstDay; i++){

        monthData.push(null);

    }

    // Month days

    for(let day = 1; day <= totalDays; day++){

        monthData.push(
            createDayObject(year, month, day)
        );

    }

    // Fill remaining cells

    while(monthData.length % 7 !== 0){

        monthData.push(null);

    }

    return monthData;

}/* ==========================================
   ISLAMIC EVENTS
========================================== */

const HIJRI_EVENTS = {

    /* ==========================
       MUHARRAM
    ========================== */

    "1-1":"🌙 Islamic New Year",

    "9-1":"🤲 Tasu'a",

    "10-1":"🌙 Day of Ashura",

    "11-1":"🤲 Recommended fasting continues",


    /* ==========================
       SAFAR
    ========================== */

    "1-2":"📿 Beginning of Safar",


    /* ==========================
       RABI AL-AWWAL
    ========================== */

    "1-3":"🌸 Beginning of Rabi al-Awwal",

    "12-3":"🕌 Mawlid an-Nabi ﷺ (Observed by many Muslims)",


    /* ==========================
       RABI ATH-THANI
    ========================== */

    "1-4":"📿 Beginning of Rabi ath-Thani",


    /* ==========================
       JUMADA AL-AWWAL
    ========================== */

    "1-5":"📿 Beginning of Jumada al-Awwal",


    /* ==========================
       JUMADA ATH-THANI
    ========================== */

    "1-6":"📿 Beginning of Jumada ath-Thani",


    /* ==========================
       RAJAB
    ========================== */

    "1-7":"🌙 Sacred Month Begins",

    "13-7":"🤲 White Days Fasting",

    "14-7":"🤲 White Days Fasting",

    "15-7":"🤲 White Days Fasting",

    "27-7":"🌌 Isra' & Mi'raj",


    /* ==========================
       SHA'BAN
    ========================== */

    "1-8":"🌙 Beginning of Sha'ban",

    "13-8":"🤲 White Days Fasting",

    "14-8":"🤲 White Days Fasting",

    "15-8":"🌙 Mid-Sha'ban",

    "16-8":"📿 Increase worship before Ramadan",


    /* ==========================
       RAMADAN
    ========================== */

    "1-9":"🌙 First Day of Ramadan",

    "2-9":"📖 Continue Qur'an recitation",

    "10-9":"🤲 First Ten Days of Mercy",

    "13-9":"🤲 White Days",

    "14-9":"🤲 White Days",

    "15-9":"🤲 White Days",

    "17-9":"⚔ Battle of Badr",

    "20-9":"🕌 End of Second Ashra",

    "21-9":"🌙 Last Ten Nights Begin",

    "23-9":"✨ Possible Laylatul Qadr",

    "25-9":"✨ Possible Laylatul Qadr",

    "27-9":"🌟 Laylatul Qadr (Most Commonly Observed)",

    "29-9":"🌙 Moon Sighting",

    "30-9":"🌙 End of Ramadan (if 30 days)",


    /* ==========================
       SHAWWAL
    ========================== */

    "1-10":"🎉 Eid al-Fitr",

    "2-10":"🎉 Days of Eid",

    "3-10":"🎉 Days of Eid",

    "6-10":"🤲 Six Days of Shawwal",

    "7-10":"🤲 Continue Six Days",

    "8-10":"🤲 Continue Six Days",

    "9-10":"🤲 Continue Six Days",

    "10-10":"🤲 Continue Six Days",


    /* ==========================
       DHUL QA'DAH
    ========================== */

    "1-11":"🌙 Sacred Month Begins",

    "13-11":"🤲 White Days",

    "14-11":"🤲 White Days",

    "15-11":"🤲 White Days",


    /* ==========================
       DHUL HIJJAH
    ========================== */

    "1-12":"🕋 Blessed First Ten Days Begin",

    "2-12":"🕋 Increase Good Deeds",

    "3-12":"🕋 Blessed Days",

    "4-12":"🕋 Blessed Days",

    "5-12":"🕋 Blessed Days",

    "6-12":"🕋 Blessed Days",

    "7-12":"🕋 Pilgrims Prepare for Hajj",

    "8-12":"🕋 Day of Tarwiyah",

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
    `${dayObj.hijriDay}-${dayObj.hijriMonth}`;

    return HIJRI_EVENTS[key] || "";

}

/* ==========================================
   HAS EVENT
========================================== */

function hasEvent(dayObj){

    return getHijriEvent(dayObj) !== "";

}

/* ==========================================
   HIJRI MONTH TITLE
========================================== */

function hijriMonthTitle(dayObj){

    if(!dayObj) return "";

    return `${dayObj.hijriMonthArabic} • ${dayObj.hijriYear} AH`;

}/* ==========================================
   IS TODAY
========================================== */

function isToday(dayObj){

    if(!dayObj) return false;

    const today = new Date();

    return (

        dayObj.gregorianDay === today.getDate() &&

        dayObj.gregorianMonth === today.getMonth() &&

        dayObj.gregorianYear === today.getFullYear()

    );

}

/* ==========================================
   IS FRIDAY
========================================== */

function isFriday(dayObj){

    if(!dayObj) return false;

    return dayObj.weekday === "Friday";

}

/* ==========================================
   IS WEEKEND
========================================== */

function isWeekend(dayObj){

    if(!dayObj) return false;

    return (

        dayObj.weekday === "Saturday" ||

        dayObj.weekday === "Sunday"

    );

}

/* ==========================================
   FORMAT GREGORIAN DATE
========================================== */

function formatGregorian(dayObj){

    if(!dayObj) return "";

    return (

        `${dayObj.gregorianDay} ` +

        `${months[dayObj.gregorianMonth]} ` +

        `${dayObj.gregorianYear}`

    );

}

/* ==========================================
   GET WEEKDAY
========================================== */

function getWeekday(dayObj){

    if(!dayObj) return "";

    return dayObj.weekday;

}

/* ==========================================
   EXPORT ENGINE
========================================== */

window.HijriEngine = {

    // Conversion
    gregorianToHijri,
    formatHijri,
    todayHijri,

    // Calendar
    generateMonth,
    createDayObject,
    gregorianMonthDays,
    hijriMonthDays,
    firstWeekday,

    // Events
    getHijriEvent,
    hasEvent,
    hijriMonthTitle,

    // Helpers
    isToday,
    isFriday,
    isWeekend,
    getWeekday,
    formatGregorian,

    // Data
    months,
    WEEK_DAYS,
    HIJRI_MONTHS,
    HIJRI_MONTHS_AR,
    HIJRI_EVENTS

};

/* ==========================================
   HIJRI ENGINE READY
========================================== */

console.log("☪ Muslim Bro Offline Hijri Engine Loaded");
