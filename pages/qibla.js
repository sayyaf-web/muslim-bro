const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

const status = document.getElementById("status");
const angleText = document.getElementById("angle");
const compass = document.getElementById("compass");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            status.textContent = "Location found.";

            const qibla = getQiblaDirection(lat, lon);

            angleText.textContent =
                "Qibla Direction: " + qibla.toFixed(1) + "° from North";

            if (window.DeviceOrientationEvent) {

                window.addEventListener("deviceorientation", function(event) {

                    const heading = event.alpha;

                    if (heading !== null) {

                        const rotation = qibla - heading;

                        compass.style.transform =
                            `rotate(${rotation}deg)`;
                    }

                });

            }

        },
        error => {
            status.textContent = error.message;
        }
    );
}

function getQiblaDirection(lat, lon) {

    const toRad = d => d * Math.PI / 180;
    const toDeg = r => r * 180 / Math.PI;

    const φ1 = toRad(lat);
    const φ2 = toRad(KAABA_LAT);

    const Δλ = toRad(KAABA_LON - lon);

    const y = Math.sin(Δλ);

    const x =
        Math.cos(φ1) * Math.tan(φ2) -
        Math.sin(φ1) * Math.cos(Δλ);

    return (toDeg(Math.atan2(y, x)) + 360) % 360;
}
