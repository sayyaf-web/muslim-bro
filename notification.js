// Ask for notification permission
if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Prevent duplicate notifications
let notifiedPrayer = "";

// Check prayer times every minute
setInterval(checkPrayerTime, 60000);

async function checkPrayerTime() {

    // Only run if user enabled Adhan
    if (localStorage.getItem("adhanEnabled") !== "true") return;

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {

            const response = await fetch(
                `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
            );

            const data = await response.json();
            const timings = data.data.timings;

            const now = new Date();
            const current =
                String(now.getHours()).padStart(2, "0") +
                ":" +
                String(now.getMinutes()).padStart(2, "0");

            for (const prayer in timings) {

                if (timings[prayer] === current && notifiedPrayer !== prayer) {

                    notifiedPrayer = prayer;

                    // Show notification
                    if (Notification.permission === "granted") {
                        new Notification("🕌 Time for " + prayer, {
                            body: "It's time to pray " + prayer,
                            icon: "icons/icon-192.png"
                        });
                    }

                    // Play Adhan
                    const adhan = new Audio("adhan.mp3");
                    adhan.play();
                }
            }

        } catch (err) {
            console.log(err);
        }

    });

}
