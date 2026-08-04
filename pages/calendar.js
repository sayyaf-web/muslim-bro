/* ==========================================
   MUSLIM BRO
   PREMIUM OFFLINE HIJRI CALENDAR
========================================== */

const monthTitle = document.getElementById("monthTitle");
const hijriTitle = document.getElementById("hijriTitle");
const calendarGrid = document.getElementById("calendarGrid");
const eventText = document.getElementById("eventText");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const todayBtn = document.getElementById("todayBtn");

let currentDate = new Date();

/* ==========================================
   BUILD CALENDAR
========================================== */

function buildCalendar() {

    if (!calendarGrid) return;

    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthData = HijriEngine.generateMonth(year, month);

    if (monthTitle) {

        monthTitle.textContent = currentDate.toLocaleString(
            "default",
            {
                month: "long",
                year: "numeric"
            }
        );

    }

    const firstValid = monthData.find(day => day);

    if (firstValid && hijriTitle) {

        hijriTitle.textContent =
            HijriEngine.hijriMonthTitle(firstValid);

    }

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    weekDays.forEach(day => {

        const header = document.createElement("div");

        header.className = "weekHeader";
        header.textContent = day;

        calendarGrid.appendChild(header);

    });

    monthData.forEach(day => {

        const card = document.createElement("div");

        if (day === null) {

            card.className = "calendarDay empty";

            calendarGrid.appendChild(card);

            return;

        }

        card.className = "calendarDay";

        if (HijriEngine.isToday(day)) {
            card.classList.add("today");
        }

        if (HijriEngine.isFriday(day)) {
            card.classList.add("friday");
        }

        const event =
            HijriEngine.getHijriEvent(day);
        card.innerHTML = `

            <div class="gregorianDay">
                ${day.gregorianDay}
            </div>

            <div class="hijriDay">
                ${day.hijriDay}
            </div>

        `;

        card.addEventListener("click", () => {

            showDay(
                day,
                HijriEngine.getHijriEvent(day)
            );

        });

        calendarGrid.appendChild(card);

    });

}

/* ==========================================
   SHOW SELECTED DAY
========================================== */

function showDay(day, event){

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

    eventText.innerHTML = `

        <div class="selectedDate">

            <h3>${gregorian}</h3>

            <p>🌙 ${hijri}</p>

        </div>

        <div class="selectedEvent">

            ${event || "No special Islamic event"}

        </div>

    `;

}/* ==========================================
   SHOW SELECTED DAY
========================================== */

function showDay(day, event){

    if(!eventText) return;

    const gregorian = day.date.toLocaleDateString(
        undefined,
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    const hijri =
        `${day.hijriDay} ${day.hijriMonthArabic} ${day.hijriYear} AH`;

    eventText.innerHTML = `

        <div class="selectedDate">

            <h3>${gregorian}</h3>

            <p>🌙 ${hijri}</p>

        </div>

        <div class="selectedEvent">

            ${event || "No special Islamic event"}

        </div>

    `;

}

/* ==========================================
   BUTTONS
========================================== */

if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        currentDate.setMonth(
            currentDate.getMonth()-1
        );

        buildCalendar();

    });

}

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        currentDate.setMonth(
            currentDate.getMonth()+1
        );

        buildCalendar();

    });

}

if(todayBtn){

    todayBtn.addEventListener("click",()=>{

        currentDate = new Date();

        buildCalendar();

    });

}/* ==========================================
   START APPLICATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof HijriEngine === "undefined") {

        console.error("HijriEngine failed to load.");

        if (eventText) {

            eventText.innerHTML =
            "❌ Hijri Engine failed to load.";

        }

        return;

    }

    buildCalendar();

    // Automatically select today's date

    const today = new Date();

    const todayObject = {

        date: today,

        gregorianDay: today.getDate(),

        gregorianMonth: today.getMonth(),

        gregorianYear: today.getFullYear(),

        ...HijriEngine.gregorianToHijri(today)

    };

    showDay(
        todayObject,
        HijriEngine.getHijriEvent(todayObject)
    );

});
