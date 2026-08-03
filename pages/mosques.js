const status = document.getElementById("status");
const mosqueList = document.getElementById("mosque-list");

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
        position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            status.textContent = "Finding nearby mosques...";

            loadMosques(lat, lon);

        },
        () => {
            status.textContent = "Unable to get your location.";
        }
    );

} else {

    status.textContent = "Geolocation is not supported.";

}

async function loadMosques(lat, lon) {

    const query = `
    [out:json];
    (
      node["amenity"="place_of_worship"]["religion"="muslim"](around:5000,${lat},${lon});
      way["amenity"="place_of_worship"]["religion"="muslim"](around:5000,${lat},${lon});
    );
    out center;
    `;

    try {

        const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
                method: "POST",
                body: query
            }
        );

        const data = await response.json();

        mosqueList.innerHTML = "";

        if (data.elements.length === 0) {
            status.textContent = "No nearby mosques found.";
            return;
        }

        status.textContent = `${data.elements.length} mosque(s) found`;

        data.elements.forEach(mosque => {

            const latitude = mosque.lat || mosque.center.lat;
            const longitude = mosque.lon || mosque.center.lon;

            const name = mosque.tags.name || "Unnamed Mosque";

            mosqueList.innerHTML += `
                <div class="card">
                    <h3>🕌 ${name}</h3>

                    <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}','_blank')">
                        📍 Open in Google Maps
                    </button>
                </div>
            `;

        });

    } catch (error) {

        status.textContent = "Failed to load nearby mosques.";

    }

}
