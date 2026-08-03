// Quran.com Audio Engine

const AUDIO_API = "https://api.quran.com/api/v4";

let RECITERS = [];

// Load all available reciters
async function loadReciters(){

    try{

        const response = await fetch(
            `${AUDIO_API}/resources/recitations`
        );

        const json = await response.json();

        RECITERS = json.recitations;

        const select =
        document.getElementById("reciter");

        if(!select) return;

        select.innerHTML = "";

        RECITERS.forEach(reciter=>{

            const option =
            document.createElement("option");

            option.value = reciter.id;

            option.textContent =
            reciter.reciter_name;

            select.appendChild(option);

        });

        // Restore last selected reciter
        const saved =
        localStorage.getItem("reciter");

        if(saved){

            select.value = saved;

        }

    }catch(e){

        console.log(e);

    }

}

// Play Surah
function playSurah(surah){

    const reciter =
    document.getElementById("reciter").value;

    localStorage.setItem(
        "reciter",
        reciter
    );

    const player =
    document.getElementById("player");

    player.src =
`https://verses.quran.com/${reciter}/${surah}.mp3`;

    player.load();

    player.play();

}
