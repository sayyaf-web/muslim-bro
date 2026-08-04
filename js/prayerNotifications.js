let adhanPlayer = null;

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("testAdhan");

    if (button) {
        button.addEventListener("click", playAdhan);
    }

    const adhanSelect = document.getElementById("adhanVoice");

    if (adhanSelect) {

        const saved =
            localStorage.getItem("adhanVoice") || "adhan";

        adhanSelect.value = saved;

        adhanSelect.addEventListener("change", changeAdhan);

    }

});

function playAdhan() {

    // Stop previous Adhan if it's still playing
    if (adhanPlayer) {

        adhanPlayer.pause();
        adhanPlayer.currentTime = 0;

    }

    const voice =
        localStorage.getItem("adhanVoice") || "adhan";

    adhanPlayer = new Audio(`../audio/${voice}.mp3`);

    adhanPlayer.play().catch(err => {

        console.error("Audio Error:", err);

    });

}

function changeAdhan() {

    const voice =
        document.getElementById("adhanVoice").value;

    localStorage.setItem("adhanVoice", voice);

}
