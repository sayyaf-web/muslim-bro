const API = "https://api.quran.com/api/v4";

// Load all reciters
async function getReciters() {

    const response = await fetch(
        `${API}/resources/recitations`
    );

    const data = await response.json();

    return data.recitations;

}

// Get audio for one Surah
async function getSurahAudio(reciterId, surahNumber) {

    const response = await fetch(
        `${API}/chapter_recitations/${reciterId}/${surahNumber}`
    );

    const data = await response.json();

    return data.audio_file;

}
async function loadReciterList() {

    const reciters = await getReciters();

    const select = document.getElementById("reciter");

    select.innerHTML = "";

    reciters.forEach(reciter => {

        const option = document.createElement("option");

        option.value = reciter.id;
        option.textContent = reciter.reciter_name;

        select.appendChild(option);

    });

    const saved = localStorage.getItem("reciterId");

    if(saved){
        select.value = saved;
    }

}

async function playCurrentSurah(surahNumber){

    const reciterId = document.getElementById("reciter").value;

    localStorage.setItem("reciterId", reciterId);

    const audio = await getSurahAudio(reciterId, surahNumber);

    document.getElementById("player").src = audio.audio_url;

}
