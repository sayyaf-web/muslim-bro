"use strict";

/*=========================================
MUSLIM BRO
SETTINGS.JS
Version 2.0
Part 1 - Core
=========================================*/

/*=========================================
LOCAL STORAGE KEYS
=========================================*/

const STORAGE_KEYS = {

theme: "mb_theme",

adhan: "mb_adhan",

language: "mb_language",

font: "mb_font",

prayerMethod: "mb_prayer_method",

timeFormat: "mb_time_format",

adhanSound: "mb_adhan_sound",

reciter: "mb_reciter"

};

/*=========================================
ELEMENTS
=========================================*/

const darkToggle =
document.getElementById("darkToggle");

const adhanToggle =
document.getElementById("adhanToggle");

const languageSelect =
document.getElementById("languageSelect");

const fontSelect =
document.getElementById("fontSelect");

const prayerMethodSelect =
document.getElementById("prayerMethod");

const timeFormatSelect =
document.getElementById("timeFormat");

const adhanSoundSelect =
document.getElementById("adhanSound");

const reciterSelect =
document.getElementById("reciterSelect");

/*=========================================
SAVE SETTING
=========================================*/

function saveSetting(key,value){

localStorage.setItem(

key,

JSON.stringify(value)

);

}

/*=========================================
LOAD SETTING
=========================================*/

function loadSetting(key,defaultValue){

const saved =
localStorage.getItem(key);

if(saved===null){

return defaultValue;

}

try{

return JSON.parse(saved);

}

catch{

return defaultValue;

}

}

/*=========================================
INITIALIZE
=========================================*/

document.addEventListener(

"DOMContentLoaded",

initializeSettings

);

function initializeSettings(){

console.log(

"Muslim Bro Settings Loaded"

);

}/*=========================================
PART 2
DARK MODE
=========================================*/

/*=========================================
LOAD THEME
=========================================*/

function loadTheme(){

const savedTheme = loadSetting(

STORAGE_KEYS.theme,

false

);

if(darkToggle){

darkToggle.checked = savedTheme;

}

applyTheme(savedTheme);

}

/*=========================================
APPLY THEME
=========================================*/

function applyTheme(enabled){

if(enabled){

document.body.classList.add("dark-theme");

}else{

document.body.classList.remove("dark-theme");

}

}

/*=========================================
SAVE THEME
=========================================*/

function saveTheme(){

if(!darkToggle) return;

saveSetting(

STORAGE_KEYS.theme,

darkToggle.checked

);

applyTheme(

darkToggle.checked

);

}

/*=========================================
DARK MODE EVENT
=========================================*/

if(darkToggle){

darkToggle.addEventListener(

"change",

saveTheme

);

}

/*=========================================
PART 2
ADHAN NOTIFICATIONS
=========================================*/

/*=========================================
LOAD ADHAN
=========================================*/

function loadAdhan(){

const savedAdhan = loadSetting(

STORAGE_KEYS.adhan,

true

);

if(adhanToggle){

adhanToggle.checked = savedAdhan;

}

}

/*=========================================
SAVE ADHAN
=========================================*/

function saveAdhan(){

if(!adhanToggle) return;

saveSetting(

STORAGE_KEYS.adhan,

adhanToggle.checked

);

console.log(

"Adhan:",

adhanToggle.checked

);

}

/*=========================================
ADHAN EVENT
=========================================*/

if(adhanToggle){

adhanToggle.addEventListener(

"change",

saveAdhan

);

}

/*=========================================
NOTIFICATION PERMISSION
=========================================*/

function requestNotificationPermission(){

if(!("Notification" in window)){

return;

}

if(Notification.permission==="default"){

Notification.requestPermission();

}

}

/*=========================================
UPDATE INITIALIZER
=========================================*/

function initializeSettings(){

console.log(

"Muslim Bro Settings Loaded"

);

loadTheme();

loadAdhan();

requestNotificationPermission();

}
/*=========================================
PART 3
LANGUAGE & FONT SIZE
=========================================*/

/*=========================================
LOAD LANGUAGE
=========================================*/

function loadLanguage(){

if(!languageSelect) return;

const savedLanguage = loadSetting(

STORAGE_KEYS.language,

"English"

);

languageSelect.value = savedLanguage;

}

/*=========================================
SAVE LANGUAGE
=========================================*/

function saveLanguage(){

if(!languageSelect) return;

saveSetting(

STORAGE_KEYS.language,

languageSelect.value

);

console.log(

"Language Saved:",

languageSelect.value

);

}

/*=========================================
LANGUAGE EVENT
=========================================*/

if(languageSelect){

languageSelect.addEventListener(

"change",

saveLanguage

);

}

/*=========================================
LOAD FONT
=========================================*/

function loadFont(){

if(!fontSelect) return;

const savedFont = loadSetting(

STORAGE_KEYS.font,

"Medium"

);

fontSelect.value = savedFont;

applyFont(savedFont);

}

/*=========================================
APPLY FONT
=========================================*/

function applyFont(size){

switch(size){

case "Small":

document.documentElement.style.fontSize="14px";

break;

case "Medium":

document.documentElement.style.fontSize="16px";

break;

case "Large":

document.documentElement.style.fontSize="18px";

break;

case "Extra Large":

document.documentElement.style.fontSize="20px";

break;

default:

document.documentElement.style.fontSize="16px";

}

}

/*=========================================
SAVE FONT
=========================================*/

function saveFont(){

if(!fontSelect) return;

applyFont(

fontSelect.value

);

saveSetting(

STORAGE_KEYS.font,

fontSelect.value

);

console.log(

"Font Size:",

fontSelect.value

);

}

/*=========================================
FONT EVENT
=========================================*/

if(fontSelect){

fontSelect.addEventListener(

"change",

saveFont

);

}

/*=========================================
UPDATE INITIALIZER
=========================================*/

function initializeSettings(){

console.log(

"Muslim Bro Settings Loaded"

);

loadTheme();

loadAdhan();

loadLanguage();

loadFont();

requestNotificationPermission();

}/*=========================================
PART 4
PRAYER SETTINGS
=========================================*/

/*=========================================
LOAD PRAYER METHOD
=========================================*/

function loadPrayerMethod(){

if(!prayerMethodSelect) return;

const saved = loadSetting(

STORAGE_KEYS.prayerMethod,

"Muslim World League"

);

prayerMethodSelect.value = saved;

}

/*=========================================
SAVE PRAYER METHOD
=========================================*/

function savePrayerMethod(){

if(!prayerMethodSelect) return;

saveSetting(

STORAGE_KEYS.prayerMethod,

prayerMethodSelect.value

);

}

/*=========================================
LOAD TIME FORMAT
=========================================*/

function loadTimeFormat(){

if(!timeFormatSelect) return;

const saved = loadSetting(

STORAGE_KEYS.timeFormat,

"24 Hour"

);

timeFormatSelect.value = saved;

}

/*=========================================
SAVE TIME FORMAT
=========================================*/

function saveTimeFormat(){

if(!timeFormatSelect) return;

saveSetting(

STORAGE_KEYS.timeFormat,

timeFormatSelect.value

);

}

/*=========================================
LOAD ADHAN SOUND
=========================================*/

function loadAdhanSound(){

if(!adhanSoundSelect) return;

const saved = loadSetting(

STORAGE_KEYS.adhanSound,

"Default Adhan"

);

adhanSoundSelect.value = saved;

}

/*=========================================
SAVE ADHAN SOUND
=========================================*/

function saveAdhanSound(){

if(!adhanSoundSelect) return;

saveSetting(

STORAGE_KEYS.adhanSound,

adhanSoundSelect.value

);

}

/*=========================================
LOAD RECITER
=========================================*/

function loadReciter(){

if(!reciterSelect) return;

const saved = loadSetting(

STORAGE_KEYS.reciter,

"Mishary Alafasy"

);

reciterSelect.value = saved;

}

/*=========================================
SAVE RECITER
=========================================*/

function saveReciter(){

if(!reciterSelect) return;

saveSetting(

STORAGE_KEYS.reciter,

reciterSelect.value

);

}

/*=========================================
EVENTS
=========================================*/

if(prayerMethodSelect){

prayerMethodSelect.addEventListener(

"change",

savePrayerMethod

);

}

if(timeFormatSelect){

timeFormatSelect.addEventListener(

"change",

saveTimeFormat

);

}

if(adhanSoundSelect){

adhanSoundSelect.addEventListener(

"change",

saveAdhanSound

);

}

if(reciterSelect){

reciterSelect.addEventListener(

"change",

saveReciter

);

}

/*=========================================
UPDATE INITIALIZER
=========================================*/

function initializeSettings(){

console.log(
"Muslim Bro Settings Loaded"
);

loadTheme();

loadAdhan();

loadLanguage();

loadFont();

loadPrayerMethod();

loadTimeFormat();

loadAdhanSound();

loadReciter();

loadExtraSettings();

requestNotificationPermission();

}
}/*=========================================
PART 5
REMAINING SWITCHES
=========================================*/

/*=========================================
HELPER
=========================================*/

function connectToggle(id,key,defaultValue=false){

const toggle=document.getElementById(id);

if(!toggle) return;

toggle.checked=loadSetting(key,defaultValue);

toggle.addEventListener("change",()=>{

saveSetting(

key,

toggle.checked

);

});

}

/*=========================================
CONNECT ALL SWITCHES
=========================================*/

function loadExtraSettings(){

connectToggle(

"quranReminder",

"mb_quran_reminder",

false

);

connectToggle(

"adhkarReminder",

"mb_adhkar_reminder",

false

);

connectToggle(

"highAccuracyCompass",

"mb_high_accuracy_compass",

true

);

connectToggle(

"autoCompassCalibration",

"mb_auto_compass",

true

);

connectToggle(

"tasbihVibration",

"mb_tasbih_vibration",

true

);

connectToggle(

"tasbihClick",

"mb_tasbih_click",

false

);

connectToggle(

"tasbihProgress",

"mb_tasbih_progress",

true

);

connectToggle(

"wifiOnlyDownloads",

"mb_wifi_downloads",

true

);

connectToggle(

"autoResumeDownloads",

"mb_resume_downloads",

true

);

connectToggle(

"locationPermission",

"mb_location_permission",

true

);

connectToggle(

"analyticsPermission",

"mb_analytics",

false

);

}
