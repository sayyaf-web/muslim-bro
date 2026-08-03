/* ===========================
   Muslim Bro - app.js v1.0
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    // Daily Quran Verses
    const verses = [
        "Indeed, with hardship comes ease. (Quran 94:6)",
        "So remember Me; I will remember you. (Quran 2:152)",
        "Indeed, Allah is with the patient. (Quran 2:153)",
        "And Allah is the best of planners. (Quran 8:30)",
        "My mercy encompasses all things. (Quran 7:156)"
    ];

    // Daily Hadiths
    const hadiths = [
        "The best among you are those who learn the Quran and teach it.",
        "Smiling at your brother is charity.",
        "Allah is kind and loves kindness.",
        "Actions are judged by intentions.",
        "Make things easy and do not make them difficult."
    ];

    // Today's verse
    const ayah = document.getElementById("ayah");
    if (ayah) {
        ayah.textContent = verses[new Date().getDate() % verses.length];
    }

    // Today's hadith
    const hadith = document.getElementById("hadith");
    if (hadith) {
        hadith.textContent = hadiths[new Date().getDate() % hadiths.length];
    }

    // Next prayer placeholder
    const prayer = document.getElementById("nextPrayerTime");
    if (prayer) {
        prayer.textContent = "Coming Soon";
    }

    // Button messages
    const pages = {
        btnPrayer: "Prayer Times",
        btnQuran: "Quran",
        btnDua: "Duas",
        btnQibla: "Qibla",
        btnTasbih: "Tasbih Counter",
        btnCalendar: "Hijri Calendar"
    };

    Object.keys(pages).forEach(id => {
        const button = document.getElementById(id);

        if (button) {
            button.addEventListener("click", () => {
                alert(pages[id] + " page is under development.");
            });
        }
    });

    console.log("Muslim Bro Loaded Successfully");

});