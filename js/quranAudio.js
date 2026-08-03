const API = "https://api.quran.com/api/v4";

// Get all reciters
async function getReciters(){

    const response = await fetch(
        API + "/resources/recitations"
    );

    const json = await response.json();

    return json.recitations;

}

// Get Surah audio
async function getSurahAudio(reciter, surah){

    const response = await fetch(
        API + "/chapter_recitations/" + reciter + "/" + surah
    );

    const json = await response.json();

    return json.audio_file;

}
