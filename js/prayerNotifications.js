function playAdhan(type = "normal") {

    const audio = new Audio();

    if(type === "fajr"){

        audio.src = "../audio/fajr.mp3";

    }else{

        audio.src = "../audio/adhan.mp3";

    }

    audio.play();

}
