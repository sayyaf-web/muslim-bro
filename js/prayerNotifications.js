let adhanPlayer = null;

document.addEventListener("DOMContentLoaded", () => {

    // Restore saved Adhan voice
    const select = document.getElementById("adhanVoice");

    if (select) {

        const savedVoice =
            localStorage.getItem("adhanVoice") || "adhan";

        select.value = savedVoice;

        select.addEventListener("change", changeAdhan);

    }

    // Preview button
    const previewButton =
        document.getElementById("testAdhan");

    if (previewButton) {

        previewButton.addEventListener("click", playAdhan);

    }

    // Stop button
    const stopButton =
        document.getElementById("stopAdhan");

    if (stopButton) {

        stopButton.addEventListener("click", stopAdhan);

    }

});

function changeAdhan() {

    const voice =
        document.getElementById("adhanVoice").value;

    localStorage.setItem("adhanVoice", voice);

}

function playAdhan() {

    const voice =
        localStorage.getItem("adhanVoice") || "adhan";

    // Stop any Adhan already playing
    if (adhanPlayer) {

        adhanPlayer.pause();
        adhanPlayer.currentTime = 0;

    }

    adhanPlayer = new Audio("../audio/" + voice + ".mp3");

    adhanPlayer.play().catch(error => {

        console.log(error);

        alert("Unable to play Adhan.");

    });

}

function stopAdhan() {

    if (adhanPlayer) {

        adhanPlayer.pause();

        adhanPlayer.currentTime = 0;

    }

}
