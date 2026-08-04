/* ==========================================
   MUSLIM BRO
   PREMIUM DIGITAL TASBIH
   VERSION 2.0
========================================== */

/* ==========================================
   ELEMENTS
========================================== */

const counterElement = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");
const goalText = document.getElementById("goalText");
const dhikrTitle = document.getElementById("dhikrTitle");
const dhikrSelect = document.getElementById("dhikrSelect");

const tapBtn = document.getElementById("tapBtn");
const undoBtn = document.getElementById("undoBtn");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");
const historyBtn = document.getElementById("historyBtn");

const voiceStatus = document.getElementById("voiceStatus");
const sessionInfo = document.getElementById("sessionInfo");

const misbaha = document.getElementById("misbaha");

/* ==========================================
   PREMIUM MODAL
========================================== */

const premiumModal =
document.getElementById("premiumModal");

const modalIcon =
document.getElementById("modalIcon");

const modalTitle =
document.getElementById("modalTitle");

const modalMessage =
document.getElementById("modalMessage");

const modalButton =
document.getElementById("modalButton");

/* ==========================================
   SETTINGS
========================================== */

let count = 0;

let goal = 33;

let todayCount = 0;

let lifetimeCount = 0;

let history = [];

let recognition = null;

/* ==========================================
   STORAGE
========================================== */

const STORAGE = {

count:"tasbihCount",

today:"todayCount",

history:"tasbihHistory",

lifetime:"tasbihLifetime",

goal:"tasbihGoal",

day:"tasbihDay"

};

/* ==========================================
   PREMIUM MODAL
========================================== */

function showModal(

icon,

title,

message

){

modalIcon.textContent = icon;

modalTitle.textContent = title;

modalMessage.textContent = message;

premiumModal.classList.add("show");

}

function hideModal(){

premiumModal.classList.remove("show");

}

modalButton.addEventListener(

"click",

hideModal

);

premiumModal.addEventListener(

"click",

(e)=>{

if(e.target===premiumModal){

hideModal();

}

});

/* ==========================================
   LOAD DATA
========================================== */

function loadTasbih(){

count = Number(

localStorage.getItem(STORAGE.count)

) || 0;

todayCount = Number(

localStorage.getItem(STORAGE.today)

) || 0;

lifetimeCount = Number(

localStorage.getItem(STORAGE.lifetime)

) || 0;

goal = Number(

localStorage.getItem(STORAGE.goal)

) || 33;

history = JSON.parse(

localStorage.getItem(STORAGE.history)

) || [];

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

STORAGE.lifetime,

lifetimeCount

);

localStorage.setItem(

STORAGE.goal,

goal

);

localStorage.setItem(

STORAGE.history,

JSON.stringify(history)

);

}/* ==========================================
   CREATE DIGITAL MISBAHA
========================================== */

function createMisbaha(){

if(!misbaha) return;

misbaha.innerHTML="";

for(let i=0;i<goal;i++){

const bead=document.createElement("div");

bead.className="bead";

misbaha.appendChild(bead);

}

}

/* ==========================================
   UPDATE MISBAHA
========================================== */

function updateMisbaha(){

if(!misbaha) return;

const beads=

misbaha.querySelectorAll(".bead");

beads.forEach((bead,index)=>{

if(index<count){

bead.classList.add("active");

}else{

bead.classList.remove("active");

}

});

}

/* ==========================================
   UPDATE DISPLAY
========================================== */

function updateDisplay(){

if(counterElement){

counterElement.textContent=count;

}

if(goalText){

goalText.textContent=

`Goal: ${goal}`;

}

if(sessionInfo){

sessionInfo.textContent=

`Today's Count: ${todayCount}

• Lifetime: ${lifetimeCount}`;

}

if(progressBar){

const percent=

Math.min(

(count/goal)*100,

100

);

progressBar.style.width=

percent+"%";

}

updateMisbaha();

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounter(){

const circle=

document.querySelector(

".counterCircle"

);

if(!circle) return;

circle.style.transform="scale(.92)";

setTimeout(()=>{

circle.style.transform="scale(1)";

},120);

}

/* ==========================================
   PREMIUM MILESTONES
========================================== */

function celebrateMilestone(){

switch(count){

case 33:

showModal(

"🌿",

"MashaAllah",

"You completed 33 Tasbih."

);

break;

case 99:

showModal(

"✨",

"MashaAllah",

"You completed 99 Tasbih."

);

break;

case 100:

showModal(

"🤲",

"Allahumma Barik",

"100 Tasbih completed!"

);

break;

}

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

lifetimeCount++;

animateCounter();

updateDisplay();

celebrateMilestone();

saveTasbih();

if(navigator.vibrate){

navigator.vibrate(20);

}

}/* ==========================================
   TAP BUTTON
========================================== */

tapBtn?.addEventListener(

"click",

incrementCount

);

/* ==========================================
   COUNTER CIRCLE
========================================== */

document

.querySelector(".counterCircle")

?.addEventListener(

"click",

incrementCount

);

/* ==========================================
   UNDO
========================================== */

undoBtn?.addEventListener(

"click",

()=>{

if(count===0) return;

count--;

if(todayCount>0) todayCount--;

updateDisplay();

saveTasbih();

}

);

/* ==========================================
   RESET
========================================== */

resetBtn?.addEventListener(

"click",

()=>{

const answer=

confirm(

"Reset the Tasbih counter?"

);

if(!answer) return;

count=0;

updateDisplay();

saveTasbih();

showModal(

"🔄",

"Counter Reset",

"The Tasbih counter has been reset."

);

}

);

/* ==========================================
   SAVE SESSION
========================================== */

saveBtn?.addEventListener(

"click",

()=>{

history.push({

dhikr:dhikrSelect.value,

count:count,

date:new Date().toLocaleString()

});

saveTasbih();

showModal(

"💾",

"Session Saved",

`"${dhikrSelect.value}"\n\nCount: ${count}`

);

}

);

/* ==========================================
   HISTORY
========================================== */

historyBtn?.addEventListener(

"click",

()=>{

if(history.length===0){

showModal(

"📚",

"No History",

"No Tasbih sessions have been saved yet."

);

return;

}

let message="";

history

.slice()

.reverse()

.forEach((item,index)=>{

message +=

`${index+1}. ${item.dhikr}

Count: ${item.count}

${item.date}

\n`;

});

showModal(

"📿",

"Session History",

message

);

}

);

/* ==========================================
   CHANGE DHIKR
========================================== */

dhikrSelect?.addEventListener(

"change",

()=>{

dhikrTitle.textContent=

dhikrSelect.value;

}

);/* ==========================================
   PREMIUM AI VOICE RECOGNITION
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

voiceStatus.textContent =
"🎤 Listening...";

voiceStatus.classList.add(
"listening"
);

};

/* ==========================================
   STOP
========================================== */

recognition.onend = ()=>{

voiceStatus.classList.remove(
"listening"
);

const mode =
document.querySelector(
'input[name="mode"]:checked'
);

if(mode && mode.value==="voice"){

recognition.start();

}else{

voiceStatus.textContent =
"👆 Tap Mode Enabled";

}

};

/* ==========================================
   ERROR
========================================== */

recognition.onerror = (event)=>{

voiceStatus.classList.remove(
"listening"
);

voiceStatus.textContent =
"⚠ " + event.error;

};

/* ==========================================
   SMART DETECTION
========================================== */

recognition.onresult = (event)=>{

const speech =
event.results[
event.results.length-1
][0]
.transcript
.toLowerCase();

/* English + Arabic */

const dhikrs=[

{
name:"subhanallah",
words:[
"subhanallah",
"سبحان الله"
]
},

{
name:"alhamdulillah",
words:[
"alhamdulillah",
"الحمد لله"
]
},

{
name:"allahu akbar",
words:[
"allahu akbar",
"الله أكبر"
]
},

{
name:"la ilaha illallah",
words:[
"la ilaha illallah",
"لا اله الا الله",
"لا إله إلا الله"
]
},

{
name:"astaghfirullah",
words:[
"astaghfirullah",
"استغفر الله"
]
}

];

let detected=false;

dhikrs.forEach(item=>{

item.words.forEach(word=>{

const escaped =

word.replace(

/[.*+?^${}()|[\]\\]/g,

"\\$&"

);

const matches =

speech.match(

new RegExp(

escaped,

"gi"

)

);

if(matches){

detected=true;

dhikrSelect.value=item.name;

dhikrTitle.textContent=item.name;

for(

let i=0;

i<matches.length;

i++

){

incrementCount();

}

voiceStatus.textContent=

`🎤 ${matches.length} × ${item.name}`;

}

});

});

if(!detected){

voiceStatus.textContent=

"🎤 Listening...";

}

};

}else{

voiceStatus.textContent=

"❌ Voice Recognition Unsupported";

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

voiceStatus.textContent=

"🎤 Voice Mode Enabled";

}

else{

if(recognition){

recognition.stop();

}

voiceStatus.classList.remove(

"listening"

);

voiceStatus.textContent=

"👆 Tap Mode Enabled";

}

}

);

});

/* ==========================================
   DAILY RESET
========================================== */

const today =

new Date().toDateString();

const savedDay =

localStorage.getItem(

STORAGE.day

);

if(savedDay!==today){

todayCount = 0;

localStorage.setItem(

STORAGE.day,

today

);

saveTasbih();

}

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

loadTasbih();

/* Create Digital Beads */

createMisbaha();

/* Update Counter */

updateDisplay();

/* Default Status */

if(voiceStatus){

voiceStatus.textContent =

"👆 Tap Mode Enabled";

}

/* Default Dhikr */

if(

dhikrSelect &&

dhikrTitle

){

dhikrTitle.textContent =

dhikrSelect.value;

}

console.log(

"📿 Muslim Bro Premium Tasbih Ready"

);

});
