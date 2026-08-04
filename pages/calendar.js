/* ==========================================
   MUSLIM BRO
   PREMIUM OFFLINE HIJRI CALENDAR
   PART 1
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

let currentDate = new Date();

/* ==========================================
   BUILD CALENDAR
========================================== */

function buildCalendar(){

    if(!calendarGrid) return;

    calendarGrid.innerHTML = "";

    const year =
    currentDate.getFullYear();

    const month =
    currentDate.getMonth();

    const monthData =
    HijriEngine.generateMonth(
        year,
        month
    );

    if(monthTitle){

        monthTitle.textContent =
        currentDate.toLocaleString(
            "default",
            {
                month:"long",
                year:"numeric"
            }
        );

    }

    const firstValid =
    monthData.find(d => d);

    if(firstValid && hijriTitle){

        hijriTitle.textContent =
        HijriEngine.hijriMonthTitle(firstValid);

    }

    /* =============================
       WEEK HEADERS
    ============================= */

    const weekNames = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];

    weekNames.forEach(name=>{

        const head =
        document.createElement("div");

        head.className =
        "weekHeader";

        head.textContent =
        name;

        calendarGrid.appendChild(head);

    });    /* =============================
       CALENDAR DAYS
    ============================= */

    monthData.forEach(day=>{

        const card =
        document.createElement("div");

        /* Empty cells */

        if(day === null){

            card.className =
            "calendarDay empty";

            calendarGrid.appendChild(card);

            return;

        }

        card.className =
        "calendarDay";

        /* Highlight today */

        if(HijriEngine.isToday(day)){

            card.classList.add("today");

        }

        /* Highlight Friday */

        if(HijriEngine.isFriday(day)){

            card.classList.add("friday");

        }

        /* Islamic Event */

        const event =
        HijriEngine.getHijriEvent(day);

        const hasEvent =
        HijriEngine.hasEvent(day);

        card.innerHTML = `

        <div class="gregorianDay">

            ${day.gregorianDay}

        </div>

        <div class="hijriDay">

            ${day.hijriDay}

        </div>

        ${hasEvent ?

        `<div class="eventDot"></div>`

        :

        ""

        }

        `;

        card.onclick = ()=>{

            showDay(day,event);

        };

        calendarGrid.appendChild(card);

    });

}/* ==========================================
   SHOW SELECTED DAY
========================================== */

function showDay(day,event){

    if(!eventText) return;

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

    let special = event;

    if(!special){

        special =

        "📖 No special Islamic event on this day.";

    }

    eventText.innerHTML = `

    <div class="selectedDate">

        <h2>${gregorian}</h2>

        <h3>🌙 ${hijri}</h3>

    </div>

    <div class="selectedInfo">

        <p><strong>Weekday:</strong> ${day.weekday}</p>

        <p><strong>Gregorian:</strong> ${day.gregorianDay}/${day.gregorianMonth+1}/${day.gregorianYear}</p>

        <p><strong>Hijri:</strong> ${day.hijriDay} ${day.hijriMonthName} ${day.hijriYear} AH</p>

    </div>

    <div class="selectedEvent">

        ${special}

    </div>

    `;

}/* ==========================================
   PREVIOUS MONTH
========================================== */

if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        currentDate.setMonth(

            currentDate.getMonth()-1

        );

        buildCalendar();

    });

}

/* ==========================================
   NEXT MONTH
========================================== */

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        currentDate.setMonth(

            currentDate.getMonth()+1

        );

        buildCalendar();

    });

}

/* ==========================================
   TODAY BUTTON
========================================== */

if(todayBtn){

    todayBtn.addEventListener("click",()=>{

        currentDate = new Date();

        buildCalendar();

        const today =
        HijriEngine.todayHijri();

        if(eventText){

            eventText.innerHTML = `

            <div class="selectedDate">

                <h2>📍 Today</h2>

                <h3>

                    🌙 ${today.day}
                    ${today.monthArabic}
                    ${today.year} AH

                </h3>

            </div>

            <div class="selectedEvent">

                Welcome to Muslim Bro's Offline Hijri Calendar.

            </div>

            `;

        }

    });

}

/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft"){

        currentDate.setMonth(

            currentDate.getMonth()-1

        );

        buildCalendar();

    }

    if(e.key==="ArrowRight"){

        currentDate.setMonth(

            currentDate.getMonth()+1

        );

        buildCalendar();

    }

});

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    if(typeof HijriEngine==="undefined"){

        console.error("HijriEngine not loaded.");

        return;

    }

    buildCalendar();

});

/* ==========================================
   CALENDAR READY
========================================== */

console.log("🗓 Muslim Bro Premium Offline Calendar Loaded");
