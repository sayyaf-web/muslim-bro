let adhanPlayer = new Audio();

document.addEventListener("DOMContentLoaded", () => {

    const select = document.getElementById("adhanVoice");

    if (select) {

        select.value =
            localStorage.getItem("adhanVoice") || "adhan";

        select.addEventListener("change", changeAdhan);

    }

    const previewButton =
        document.getElementById("testAdhan");

    if (previewButton) {

        previewButton.addEventListener("click", playAdhan);

    }

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

    adhanPlayer.pause();
    adhanPlayer.currentTime = 0;

    adhanPlayer.src = "../audio/" + voice + ".mp3";

    adhanPlayer.load();

    adhanPlayer.play().catch(error => {

        console.log(error);

    });

}

function stopAdhan() {

    adhanPlayer.pause();

    adhanPlayer.currentTime = 0;

}

        
