/* ==========================================
   MUSLIM BRO
   DIGITAL TASBIH
   PART 1
========================================== */

const counterElement =
document.getElementById("counter");

const progressBar =
document.getElementById("progressBar");

const goalText =
document.getElementById("goalText");

const dhikrTitle =
document.getElementById("dhikrTitle");

const dhikrSelect =
document.getElementById("dhikrSelect");

const tapBtn =
document.getElementById("tapBtn");

const undoBtn =
document.getElementById("undoBtn");

const resetBtn =
document.getElementById("resetBtn");

const saveBtn =
document.getElementById("saveBtn");

const historyBtn =
document.getElementById("historyBtn");

const voiceStatus =
document.getElementById("voiceStatus");

const sessionInfo =
document.getElementById("sessionInfo");

/* ==========================================
   SETTINGS
========================================== */

let count = 0;

let goal = 33;

let todayCount = 0;

let history = [];

/* ==========================================
   LOAD SAVED DATA
========================================== */

function loadTasbih(){

    count = Number(

        localStorage.getItem("tasbihCount")

    ) || 0;

    todayCount = Number(

        localStorage.getItem("todayCount")

    ) || 0;

    history = JSON.parse(

        localStorage.getItem("tasbihHistory")

    ) || [];

    updateDisplay();

}/* ==========================================
   UPDATE DISPLAY
========================================== */

function updateDisplay(){

    counterElement.textContent = count;

    goalText.textContent =
    `Goal: ${goal}`;

    sessionInfo.textContent =
    `Today's Count: ${todayCount}`;

    const percent =

    Math.min(

        (count / goal) * 100,

        100

    );

    progressBar.style.width =
    percent + "%";

}

/* ==========================================
   SAVE DATA
========================================== */

function saveTasbih(){

    localStorage.setItem(

        "tasbihCount",

        count

    );

    localStorage.setItem(

        "todayCount",

        todayCount

    );

    localStorage.setItem(

        "tasbihHistory",

        JSON.stringify(history)

    );

}

/* ==========================================
   COUNT
========================================== */

function incrementCount(){

    count++;

    todayCount++;

    updateDisplay();

    saveTasbih();

    if(navigator.vibrate){

        navigator.vibrate(20);

    }

}

/* ==========================================
   TAP BUTTON
========================================== */

tapBtn.addEventListener(

    "click",

    incrementCount

);

/* ==========================================
   TAP COUNTER CIRCLE
========================================== */

document.querySelector(

".counterCircle"

).addEventListener(

"click",

incrementCount

);/* ==========================================
   UNDO
========================================== */

undoBtn.addEventListener("click",()=>{

    if(count<=0) return;

    count--;

    if(todayCount>0){

        todayCount--;

    }

    updateDisplay();

    saveTasbih();

});

/* ==========================================
   RESET
========================================== */

resetBtn.addEventListener("click",()=>{

    if(!confirm("Reset Tasbih Counter?")){

        return;

    }

    count = 0;

    updateDisplay();

    saveTasbih();

});

/* ==========================================
   SAVE SESSION
========================================== */

saveBtn.addEventListener("click",()=>{

    history.push({

        dhikr: dhikrSelect.value,

        count: count,

        date: new Date().toLocaleString()

    });

    saveTasbih();

    alert("✅ Session saved.");

});

/* ==========================================
   HISTORY
========================================== */

historyBtn.addEventListener("click",()=>{

    if(history.length===0){

        alert("No saved sessions.");

        return;

    }

    let text="📿 Tasbih History\n\n";

    history.forEach((item,index)=>{

        text +=

`${index+1}. ${item.dhikr}
Count: ${item.count}
${item.date}

`;

    });

    alert(text);

});

/* ==========================================
   DHIKR SELECT
========================================== */

dhikrSelect.addEventListener("change",()=>{

    dhikrTitle.textContent =
    dhikrSelect.value;

});/* ==========================================
   VOICE COUNTING
========================================== */

let recognition = null;

const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;

if(SpeechRecognition){

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = true;

    recognition.interimResults = false;

    recognition.onstart = ()=>{

        voiceStatus.textContent =
        "🎤 Listening...";

    };

    recognition.onend = ()=>{

        const mode =

        document.querySelector(
        'input[name="mode"]:checked'
        ).value;

        if(mode==="voice"){

            recognition.start();

        }else{

            voiceStatus.textContent =
            "Microphone Off";

        }

    };

    recognition.onresult = (event)=>{

        const last =

        event.results.length - 1;

        const speech =

        event.results[last][0]
        .transcript
        .toLowerCase();

        const dhikr =

        dhikrSelect.value
        .toLowerCase();

        if(speech.includes(dhikr)){

            incrementCount();

        }

    };

}else{

    voiceStatus.textContent =
    "Voice not supported";

}

/* ==========================================
   MODE SWITCH
========================================== */

document
.querySelectorAll(
'input[name="mode"]'
)
.forEach(radio=>{

radio.addEventListener(
"change",
()=>{

const mode =

document.querySelector(
'input[name="mode"]:checked'
).value;

if(mode==="voice"){

if(recognition){

recognition.start();

}

}else{

if(recognition){

recognition.stop();

}

voiceStatus.textContent =
"Microphone Off";

}

});

});

/* ==========================================
   START APP
========================================== */

loadTasbih();

updateDisplay();
