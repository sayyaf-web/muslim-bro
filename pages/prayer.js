// Detect user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            loadPrayerTimes(
                position.coords.latitude,
                position.coords.longitude
            );
        },
        error => {
            document.getElementById("location").textContent =
                "Location Error: " + error.message;
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
} else {
    document.getElementById("location").textContent =
        "Geolocation is not supported by this browser.";
}
        }
    );
} else {
    document.getElementById("location").textContent =
        "Geolocation not supported.";
}

async function loadPrayerTimes(lat, lon) {

    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        const t = data.data.timings;

        document.getElementById("fajr").textContent = t.Fajr;
        document.getElementById("dhuhr").textContent = t.Dhuhr;
        document.getElementById("asr").textContent = t.Asr;
        document.getElementById("maghrib").textContent = t.Maghrib;
        document.getElementById("isha").textContent = t.Isha;

        document.getElementById("today").textContent =
            `${data.data.date.gregorian.date} | ${data.data.date.hijri.date}`;

        document.getElementById("location").textContent =
            `${data.data.meta.timezone}`;

        highlightPrayer(t);

    } catch (e) {
        document.getElementById("location").textContent =
            "Failed to load prayer times.";
    }
}

function highlightPrayer(times) {

    const rows = document.querySelectorAll(".row");
    rows.forEach(r => r.classList.remove("active"));

    const prayers = [
        ["Fajr", times.Fajr],
        ["Dhuhr", times.Dhuhr],
        ["Asr", times.Asr],
        ["Maghrib", times.Maghrib],
        ["Isha", times.Isha]
    ];

    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    let active = 0;
    let next = 0;

    for (let i = 0; i < prayers.length; i++) {

        const [h, m] = prayers[i][1].split(":").map(Number);
        const minutes = h * 60 + m;

        if (current >= minutes) {
            active = i;
        } else {
            next = i;
            break;
        }
    }

    rows[active].classList.add("active");

    document.getElementById("nextPrayer").textContent =
        "Next Prayer: " + prayers[next][0] + " - " + prayers[next][1];
}
