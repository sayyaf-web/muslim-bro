let adhanPlayer = null;

document.addEventListener("DOMContentLoaded", () => {

    // Restore saved Adhan
    const select = document.getElementById("adhanVoice");

    if (select) {

        select.value =
            localStorage.getItem("adhanVoice") || "adhan";

        select.addEventListener("change", changeAdhan);

    }

    // Preview button
    const button = document.getElementById("testAdhan");

    if (button) {

        button.addEventListener("click", playAdhan);

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

    // If an Adhan is already playing, stop it
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
