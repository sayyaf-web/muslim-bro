document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("testAdhan");

    if (!button) {
        alert("Test button not found.");
        return;
    }

    button.addEventListener("click", () => {

        

        const audio = new Audio("../audio/adhan.mp3");

        audio.play()
            .then(() => {
                console.log("Adhan playing...");
            })
            .catch(err => {
                alert("Could not play audio: " + err.message);
            });

    });

});
