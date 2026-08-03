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
