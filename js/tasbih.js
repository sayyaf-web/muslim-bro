/* ==========================================
   MUSLIM BRO
   PREMIUM DIGITAL TASBIH
   PART 1
========================================== */

/* ==========================================
   ELEMENTS
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

let recognition = null;

/* ==========================================
   STORAGE KEYS
========================================== */

const STORAGE = {

count : "tasbihCount",

today : "todayCount",

history : "tasbihHistory"

};

/* ==========================================
   LOAD SAVED DATA
========================================== */

function loadTasbih(){

count = Number(

localStorage.getItem(STORAGE.count)

) || 0;

todayCount = Number(

localStorage.getItem(STORAGE.today)

) || 0;

history = JSON.parse(

localStorage.getItem(STORAGE.history)

) || [];

updateDisplay();

}

/* ==========================================
   SAVE DATA
========================================== */

function saveTasbih(){

localStorage.setItem(

STORAGE.count,

count

);

localStorage.setItem(

STORAGE.today,

todayCount

);

localStorage.setItem(

STORAGE.history,

JSON.stringify(history)

);

}/* ==========================================
   UPDATE DISPLAY
========================================== */

function updateDisplay(){

if(counterElement){

counterElement.textContent = count;

}

if(goalText){

goalText.textContent =

`Goal: ${goal}`;

}

if(sessionInfo){

sessionInfo.textContent =

`Today's Count: ${todayCount}`;

}

if(progressBar){

const percent =

Math.min(

(count / goal) * 100,

100

);

progressBar.style.width =

percent + "%";

}

}

/* ==========================================
   MILESTONE CELEBRATION
========================================== */

function celebrateMilestone(){

if(count===33){

showMilestone(

"🌿",

"MashaAllah!",

"You completed 33 Tasbih."

);

}

else if(count===99){

showMilestone(

"✨",

"MashaAllah!",

"You completed 99 Tasbih."

);

}

else if(count===100){

showMilestone(

"🤲",

"Allahumma Barik!",

"100 Tasbih completed!"

);

}

}

/* ==========================================
   POPUP
========================================== */

function showMilestone(icon,title,message){

alert(

`${icon}\n\n${title}\n\n${message}`

);

if(navigator.vibrate){

navigator.vibrate([120,80,120]);

}

}

/* ==========================================
   COUNT
========================================== */

function incrementCount(){

count++;

todayCount++;

updateDisplay();

celebrateMilestone();

saveTasbih();

if(navigator.vibrate){

navigator.vibrate(20);

}

}/* ==========================================
   TAP BUTTON
========================================== */

if(tapBtn){

tapBtn.addEventListener(

"click",

incrementCount

);

}

/* ==========================================
   TAP COUNTER CIRCLE
========================================== */

const counterCircle =

document.querySelector(

".counterCircle"

);

if(counterCircle){

counterCircle.addEventListener(

"click",

incrementCount

);

}

/* ==========================================
   UNDO
========================================== */

if(undoBtn){

undoBtn.addEventListener(

"click",

()=>{

if(count<=0){

return;

}

count--;

if(todayCount>0){

todayCount--;

}

updateDisplay();

saveTasbih();

}

);

}

/* ==========================================
   RESET
========================================== */

if(resetBtn){

resetBtn.addEventListener(

"click",

()=>{

const confirmReset =

confirm(

"Reset Tasbih Counter?"

);

if(!confirmReset){

return;

}

count = 0;

updateDisplay();

saveTasbih();

}

);

}

/* ==========================================
   SAVE SESSION
========================================== */

if(saveBtn){

saveBtn.addEventListener(

"click",

()=>{

history.push({

dhikr: dhikrSelect.value,

count: count,

date: new Date()

.toLocaleString()

});

saveTasbih();

alert(

"✅ Tasbih session saved."

);

}

);

}

/* ==========================================
   HISTORY
========================================== */

if(historyBtn){

historyBtn.addEventListener(

"click",

()=>{

if(history.length===0){

alert(

"No saved Tasbih sessions."

);

return;

}

let text =

"📿 Tasbih History\n\n";

history.forEach(

(item,index)=>{

text +=

`${index+1}. ${item.dhikr}

Count: ${item.count}

${item.date}

\n`;

}

);

alert(text);

}

);

}

/* ==========================================
   DHIKR SELECT
========================================== */

if(dhikrSelect){

dhikrSelect.addEventListener(

"change",

()=>{

dhikrTitle.textContent =

dhikrSelect.value;

}

);

}/* ==========================================
   PREMIUM SMART VOICE RECOGNITION
========================================== */

const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;

if(SpeechRecognition){

recognition = new SpeechRecognition();

recognition.lang = "en-US";

recognition.continuous = true;

recognition.interimResults = false;

recognition.maxAlternatives = 1;

/* ==========================================
   START
========================================== */

recognition.onstart = ()=>{

if(voiceStatus){

voiceStatus.textContent =

"🎤 Listening...";

}

};

/* ==========================================
   STOP
========================================== */

recognition.onend = ()=>{

const mode =

document.querySelector(

'input[name="mode"]:checked'

);

if(

mode &&

mode.value==="voice"

){

recognition.start();

}

else{

if(voiceStatus){

voiceStatus.textContent =

"🎤 Microphone Off";

}

}

};

/* ==========================================
   ERROR
========================================== */

recognition.onerror = (event)=>{

if(voiceStatus){

voiceStatus.textContent =

"⚠ " + event.error;

}

};

/* ==========================================
   SMART DHIKR DETECTION
========================================== */

recognition.onresult = (event)=>{

const last =

event.results.length-1;

const speech =

event.results[last][0]

.transcript

.toLowerCase()

.trim();

const dhikrs=[

"subhanallah",

"alhamdulillah",

"allahu akbar",

"la ilaha illallah",

"astaghfirullah",

"allahumma salli ala muhammad"

];

let found=false;

dhikrs.forEach(dhikr=>{

const escaped =

dhikr.replace(

/[.*+?^${}()|[\]\\]/g,

"\\$&"

);

const regex =

new RegExp(

escaped,

"gi"

);

const matches =

speech.match(regex);

if(matches){

found=true;

dhikrSelect.value=dhikr;

dhikrTitle.textContent=dhikr;

for(

let i=0;

i<matches.length;

i++

){

incrementCount();

}

if(voiceStatus){

voiceStatus.textContent=

`🎤 ${matches.length} × ${dhikr}`;

}

}

});

if(!found){

if(voiceStatus){

voiceStatus.textContent=

"🎤 Listening...";

}

}

};

}else{

if(voiceStatus){

voiceStatus.textContent=

"❌ Voice Recognition Not Supported";

}

}/* ==========================================
   VOICE / TAP MODE
========================================== */

document
.querySelectorAll(

'input[name="mode"]'

)

.forEach(radio=>{

radio.addEventListener(

"change",

()=>{

const selected =

document.querySelector(

'input[name="mode"]:checked'

);

if(!selected) return;

if(selected.value==="voice"){

if(recognition){

recognition.start();

}

if(voiceStatus){

voiceStatus.textContent=

"🎤 Voice Mode Enabled";

}

}

else{

if(recognition){

recognition.stop();

}

if(voiceStatus){

voiceStatus.textContent=

"👆 Tap Mode Enabled";

}

}

}

);

});

/* ==========================================
   CUSTOM DHIKR
========================================== */

if(dhikrSelect){

dhikrSelect.addEventListener(

"change",

()=>{

if(dhikrTitle){

dhikrTitle.textContent=

dhikrSelect.value;

}

}

);

}

/* ==========================================
   DAILY RESET
========================================== */

const today =

new Date()

.toDateString();

const savedDay =

localStorage.getItem(

"tasbihDay"

);

if(savedDay!==today){

todayCount=0;

localStorage.setItem(

"tasbihDay",

today

);

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

loadTasbih();

updateDisplay();

if(voiceStatus){

voiceStatus.textContent=

"👆 Tap Mode Enabled";

}

console.log(

"📿 Muslim Bro Tasbih Ready"

);

}

);
