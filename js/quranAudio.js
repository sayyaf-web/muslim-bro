const API = "https://api.quran.com/api/v4";

/* Load all reciters */
async function getReciters() {

    try {

        const response = await fetch(API + "/resources/recitations");

        const json = await response.json();

        return json.recitations || [];

    } catch (e) {

        console.error("Failed to load reciters", e);

        return [];

    }

}

/* Load Surah audio */
async function getSurahAudio(reciterId, surahNumber) {

    try {

        const response = await fetch(
            API + "/chapter_recitations/" + reciterId + "/" + surahNumber
        );

        const json = await response.json();

        console.log(json);

        if (!json.audio_file) {

            return null;

        }

        if (json.audio_file.audio_url) {

            return json.audio_file.audio_url;

        }

        if (json.audio_file.url) {

            return json.audio_file.url;

        }

        return null;

    } catch (e) {

        console.error("Audio Error", e);

        return null;

    }

}

/* Fill reciter dropdown */
async function loadReciters(selectId = "reciter") {

    const select = document.getElementById(selectId);

    if (!select) return;

    const reciters = await getReciters();

    select.innerHTML = "";

    const saved = localStorage.getItem("selectedReciter");

    reciters.forEach(reciter => {

        const option = document.createElement("option");

        option.value = reciter.id;

        option.textContent = "🎙 " + reciter.reciter_name;

        if (saved && saved == reciter.id) {

            option.selected = true;

        }

        select.appendChild(option);

    });

}

/* Play Surah */
async function playSurah(playerId, reciterId, surahNumber) {

    const player = document.getElementById(playerId);

    if (!player) return;

    const audioUrl = await getSurahAudio(reciterId, surahNumber);

    if (!audioUrl) {

        alert("Unable to load audio.");

        return;

    }

    let finalUrl = audioUrl;

    if (!audioUrl.startsWith("http")) {

        finalUrl = "https://audio.qurancdn.com/" + audioUrl;

    }

    player.src = finalUrl;

    player.load();

    player.play();

}
