"use strict";

/*==================================================
 MUSLIM BRO SETTINGS
 VERSION 4.0
 CLEAN REBUILD
==================================================*/

/*==============================
 STORAGE KEYS
==============================*/

const STORAGE_KEYS = {

theme: "mb_theme",

language: "mb_language",

font: "mb_font",

adhan: "mb_adhan",

quranReminder: "mb_quran_reminder",

adhkarReminder: "mb_adhkar_reminder",

prayerMethod: "mb_prayer_method",

timeFormat: "mb_time_format",

adhanSound: "mb_adhan_sound",

reciter: "mb_reciter",

highAccuracyCompass: "mb_high_accuracy_compass",

autoCompassCalibration: "mb_auto_compass_calibration",

tasbihVibration: "mb_tasbih_vibration",

tasbihClick: "mb_tasbih_click",

tasbihProgress: "mb_tasbih_progress",

wifiDownloads: "mb_wifi_downloads",

autoResumeDownloads: "mb_auto_resume_downloads",

locationPermission: "mb_location_permission",

analyticsPermission: "mb_analytics_permission"

};

/*==============================
 HELPERS
==============================*/

function saveSetting(key,value){

localStorage.setItem(

key,

JSON.stringify(value)

);

}

function loadSetting(key,defaultValue){

const value=localStorage.getItem(key);

if(value===null){

return defaultValue;

}

try{

return JSON.parse(value);

}

catch{

return defaultValue;

}

}

/*==============================
 ELEMENTS
==============================*/

const darkToggle=document.getElementById("darkToggle");

const languageSelect=document.getElementById("languageSelect");

const fontSelect=document.getElementById("fontSelect");

const adhanToggle=document.getElementById("adhanToggle");

const prayerMethodSelect=document.getElementById("prayerMethod");

const timeFormatSelect=document.getElementById("timeFormat");

const adhanSoundSelect=document.getElementById("adhanSound");

const reciterSelect=document.getElementById("reciterSelect");

/*==============================
 START APP
==============================*/

document.addEventListener(

"DOMContentLoaded",

initializeSettings

);/*==================================================
PART 2
DARK MODE
==================================================*/

function applyTheme(enabled){

if(enabled){

document.body.classList.add("dark-theme");

}else{

document.body.classList.remove("dark-theme");

}

}

function loadTheme(){

const saved=loadSetting(

STORAGE_KEYS.theme,

false

);

if(darkToggle){

darkToggle.checked=saved;

}

applyTheme(saved);

}

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

if(darkToggle){

darkToggle.addEventListener(

"change",

saveTheme

);

}

/*==================================================
PART 2
ADHAN
==================================================*/

function loadAdhan(){

const saved=loadSetting(

STORAGE_KEYS.adhan,

true

);

if(adhanToggle){

adhanToggle.checked=saved;

}

}

function saveAdhan(){

if(!adhanToggle) return;

saveSetting(

STORAGE_KEYS.adhan,

adhanToggle.checked

);

}

if(adhanToggle){

adhanToggle.addEventListener(

"change",

saveAdhan

);

}

/*==================================================
NOTIFICATION PERMISSION
==================================================*/

function requestNotificationPermission(){

if(!("Notification" in window)){

return;

}

if(Notification.permission==="default"){

Notification.requestPermission();

}

}/*==================================================
PART 3
LANGUAGE
==================================================*/

function loadLanguage(){

if(!languageSelect) return;

const saved=loadSetting(

STORAGE_KEYS.language,

"English"

);

languageSelect.value=saved;

}

function saveLanguage(){

if(!languageSelect) return;

saveSetting(

STORAGE_KEYS.language,

languageSelect.value

);

console.log(

"Language:",

languageSelect.value

);

}

if(languageSelect){

languageSelect.addEventListener(

"change",

saveLanguage

);

}

/*==================================================
PART 3
FONT SIZE
==================================================*/

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

function loadFont(){

if(!fontSelect) return;

const saved=loadSetting(

STORAGE_KEYS.font,

"Medium"

);

fontSelect.value=saved;

applyFont(saved);

}

function saveFont(){

if(!fontSelect) return;

applyFont(

fontSelect.value

);

saveSetting(

STORAGE_KEYS.font,

fontSelect.value

);

}

if(fontSelect){

fontSelect.addEventListener(

"change",

saveFont

);

}/*==================================================
PART 4
PRAYER SETTINGS
==================================================*/

/*==============================
PRAYER METHOD
==============================*/

function loadPrayerMethod(){

if(!prayerMethodSelect) return;

const saved=loadSetting(

STORAGE_KEYS.prayerMethod,

"Muslim World League"

);

prayerMethodSelect.value=saved;

}

function savePrayerMethod(){

if(!prayerMethodSelect) return;

saveSetting(

STORAGE_KEYS.prayerMethod,

prayerMethodSelect.value

);

}

if(prayerMethodSelect){

prayerMethodSelect.addEventListener(

"change",

savePrayerMethod

);

}

/*==============================
TIME FORMAT
==============================*/

function loadTimeFormat(){

if(!timeFormatSelect) return;

const saved=loadSetting(

STORAGE_KEYS.timeFormat,

"24 Hour"

);

timeFormatSelect.value=saved;

}

function saveTimeFormat(){

if(!timeFormatSelect) return;

saveSetting(

STORAGE_KEYS.timeFormat,

timeFormatSelect.value

);

}

if(timeFormatSelect){

timeFormatSelect.addEventListener(

"change",

saveTimeFormat

);

}

/*==============================
ADHAN SOUND
==============================*/

function loadAdhanSound(){

if(!adhanSoundSelect) return;

const saved=loadSetting(

STORAGE_KEYS.adhanSound,

"Default Adhan"

);

adhanSoundSelect.value=saved;

}

function saveAdhanSound(){

if(!adhanSoundSelect) return;

saveSetting(

STORAGE_KEYS.adhanSound,

adhanSoundSelect.value

);

}

if(adhanSoundSelect){

adhanSoundSelect.addEventListener(

"change",

saveAdhanSound

);

}

/*==============================
DEFAULT RECITER
==============================*/

function loadReciter(){

if(!reciterSelect) return;

const saved=loadSetting(

STORAGE_KEYS.reciter,

"Mishary Alafasy"

);

reciterSelect.value=saved;

}

function saveReciter(){

if(!reciterSelect) return;

saveSetting(

STORAGE_KEYS.reciter,

reciterSelect.value

);

}

if(reciterSelect){

reciterSelect.addEventListener(

"change",

saveReciter

);

}/*==================================================
PART 5
EXTRA TOGGLES
==================================================*/

function connectToggle(id,key,defaultValue=false){

const element=document.getElementById(id);

if(!element) return;

element.checked=loadSetting(

key,

defaultValue

);

element.addEventListener(

"change",

()=>{

saveSetting(

key,

element.checked

);

}

);

}

/*==================================================
LOAD ALL EXTRA SETTINGS
==================================================*/

function loadExtraSettings(){

connectToggle(

"quranReminder",

STORAGE_KEYS.quranReminder,

false

);

connectToggle(

"adhkarReminder",

STORAGE_KEYS.adhkarReminder,

false

);

connectToggle(

"highAccuracyCompass",

STORAGE_KEYS.highAccuracyCompass,

true

);

connectToggle(

"autoCompassCalibration",

STORAGE_KEYS.autoCompassCalibration,

true

);

connectToggle(

"tasbihVibration",

STORAGE_KEYS.tasbihVibration,

true

);

connectToggle(

"tasbihClick",

STORAGE_KEYS.tasbihClick,

false

);

connectToggle(

"tasbihProgress",

STORAGE_KEYS.tasbihProgress,

true

);

connectToggle(

"wifiOnlyDownloads",

STORAGE_KEYS.wifiDownloads,

true

);

connectToggle(

"autoResumeDownloads",

STORAGE_KEYS.autoResumeDownloads,

true

);

connectToggle(

"locationPermission",

STORAGE_KEYS.locationPermission,

true

);

connectToggle(

"analyticsPermission",

STORAGE_KEYS.analyticsPermission,

false

);

}/*==================================================
PART 6
BUTTONS & INITIALIZATION
==================================================*/

/*==============================
BUTTONS
==============================*/

const manageDownloadsBtn =
document.getElementById("manageDownloadsBtn");

const clearCacheBtn =
document.getElementById("clearCacheBtn");

const storageUsageBtn =
document.getElementById("storageUsageBtn");

const rateAppBtn =
document.getElementById("rateAppBtn");

const shareAppBtn =
document.getElementById("shareAppBtn");

const checkUpdatesBtn =
document.getElementById("checkUpdatesBtn");

/*==============================
MANAGE DOWNLOADS
==============================*/

if(manageDownloadsBtn){

manageDownloadsBtn.addEventListener("click",()=>{

alert(
"Downloaded Qur'an Manager will be available in a future update, In Sha Allah."
);

});

}

/*==============================
CLEAR CACHE
==============================*/

if(clearCacheBtn){

clearCacheBtn.addEventListener("click",()=>{

if(confirm("Clear Muslim Bro cache?")){

Object.keys(localStorage).forEach(key=>{

if(key.startsWith("mb_cache_")){

localStorage.removeItem(key);

}

});

alert("Cache cleared successfully.");

}

});

}

/*==============================
STORAGE USAGE
==============================*/

if(storageUsageBtn){

storageUsageBtn.addEventListener("click",()=>{

let total=0;

for(let i=0;i<localStorage.length;i++){

const key=localStorage.key(i);

const value=localStorage.getItem(key);

if(value){

total+=key.length+value.length;

}

}

alert(

"Storage Used:\n"+

(total/1024).toFixed(2)+" KB"

);

});

}

/*==============================
RATE APP
==============================*/

if(rateAppBtn){

rateAppBtn.addEventListener("click",(e)=>{

e.preventDefault();

alert(
"Rate Muslim Bro will be available after Play Store release."
);

});

}

/*==============================
SHARE APP
==============================*/

if(shareAppBtn){

shareAppBtn.addEventListener("click",(e)=>{

e.preventDefault();

const text="Try Muslim Bro - Your complete Islamic companion.";

if(navigator.share){

navigator.share({

title:"Muslim Bro",

text:text

});

}else{

navigator.clipboard.writeText(text);

alert("Share message copied.");

}

});

}

/*==============================
CHECK UPDATES
==============================*/

if(checkUpdatesBtn){

checkUpdatesBtn.addEventListener("click",(e)=>{

e.preventDefault();

alert(
"You are using the latest version."
);

});

}

/*==================================================
FINAL INITIALIZER
==================================================*/

function initializeSettings(){

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

console.log("Muslim Bro Settings Ready");

}
