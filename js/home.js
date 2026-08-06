/* ==========================================
   MUSLIM BRO - HOME.JS
   PART 1
   APP INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHome();
});

function initHome() {

    hideLoadingScreen();

    updateGreeting();

    updateTodayDate();

    updateConnectionStatus();

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    setInterval(updateGreeting, 60000);
}

/* ==========================================
   LOADING SCREEN
========================================== */

function hideLoadingScreen() {

    const loading = document.getElementById("loadingScreen");

    if (!loading) return;

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 500);

    }, 1200);

}

/* ==========================================
   GREETING
========================================== */

function updateGreeting() {

    const greeting = document.getElementById("greetingText");

    if (!greeting) return;

    const hour = new Date().getHours();

    let text = "Assalamu Alaikum";

    if (hour >= 5 && hour < 12) {

        text = "Good Morning 🌅";

    }

    else if (hour >= 12 && hour < 17) {

        text = "Good Afternoon ☀️";

    }

    else if (hour >= 17 && hour < 20) {

        text = "Good Evening 🌇";

    }

    else {

        text = "Good Night 🌙";

    }

    greeting.textContent = text;

}

/* ==========================================
   TODAY'S DATE
========================================== */

function updateTodayDate() {

    const el = document.getElementById("dashboardDate");

    if (!el) return;

    const today = new Date();

    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };

    el.textContent = today.toLocaleDateString(undefined, options);

}

/* ==========================================
   INTERNET STATUS
========================================== */

function updateConnectionStatus() {

    const box = document.getElementById("connectionStatus");

    if (!box) return;

    box.style.display = "block";

    if (navigator.onLine) {

        box.textContent = "🟢 Online";

        box.style.background = "#0B8457";

    }

    else {

        box.textContent = "🔴 Offline";

        box.style.background = "#b42318";

    }

    setTimeout(() => {

        box.style.display = "none";

    }, 2500);

}

/* ==========================================
   PLACEHOLDERS
   (Implemented in Parts 2 & 3)
========================================== */

function loadPrayerTimes(){}

function startPrayerCountdown(){}

function loadHijriDate(){}

function loadLocation(){}

function loadDailyAyah(){}

function loadDailyHadith(){}

function loadDailyTip(){}

function loadContinueReading(){}
