const API = "https://api.aladhan.com/v1/timings";

let playedPrayer = "";

async function loadPrayerTimes(latitude, longitude) {

    try {

        const response = await fetch(
            `${API}?latitude=${latitude}&longitude=${longitude}&method=2`
        );

        const json = await response.json();

        const timings = json.data.timings;

        document.getElementById("fajr").textContent =
            timings.Fajr;

        document.getElementById("dhuhr").textContent =
            timings.Dhuhr;

        document.getElementById("asr").textContent =
            timings.Asr;

        document.getElementById("maghrib").textContent =
            timings.Maghrib;

        document.getElementById("isha").textContent =
            timings.Isha;

        document.getElementById("today").textContent =
            json.data.date.readable;

        document.getElementById("location").textContent =
            "📍 Current Location";

        checkPrayerTime(timings);

    } catch (e) {

        console.log(e);

    }

}

function checkPrayerTime(timings) {

    setInterval(() => {

        const now = new Date();

        const current =
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0");

        let prayer = "";

        if (current === timings.Fajr.substring(0, 5))
            prayer = "Fajr";

        else if (current === timings.Dhuhr.substring(0, 5))
            prayer = "Dhuhr";

        else if (current === timings.Asr.substring(0, 5))
            prayer = "Asr";

        else if (current === timings.Maghrib.substring(0, 5))
            prayer = "Maghrib";

        else if (current === timings.Isha.substring(0, 5))
            prayer = "Isha";

        if (prayer && playedPrayer !== prayer) {

            playedPrayer = prayer;

            playAdhan();

            document.getElementById("nextPrayer").textContent =
                "🕌 It's time for " + prayer;

        }

    }, 30000);

}

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        position => {

            loadPrayerTimes(
                position.coords.latitude,
                position.coords.longitude
            );

        },

        () => {

            // Fallback to Nairobi if location is denied

            loadPrayerTimes(-1.286389, 36.817223);

        }

    );

} else {

    // Browser doesn't support location

    loadPrayerTimes(-1.286389, 36.817223);

}
