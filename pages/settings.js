"use strict";

/*==================================================
 MUSLIM BRO
 SETTINGS.JS
 VERSION 5.0
==================================================*/

/*=========================================
 STORAGE KEYS
=========================================*/

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

wifiOnlyDownloads: "mb_wifi_downloads",

autoResumeDownloads: "mb_auto_resume_downloads",

locationPermission: "mb_location_permission",

analyticsPermission: "mb_analytics_permission"

};

/*=========================================
 SAVE TO LOCAL STORAGE
=========================================*/

function saveSetting(key,value){

localStorage.setItem(

key,

JSON.stringify(value)

);

}

/*=========================================
 LOAD FROM LOCAL STORAGE
=========================================*/

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

/*=========================================
 ELEMENTS
=========================================*/

const darkToggle=document.getElementById("darkToggle");

const languageSelect=document.getElementById("languageSelect");

const fontSelect=document.getElementById("fontSelect");

const adhanToggle=document.getElementById("adhanToggle");

const prayerMethodSelect=document.getElementById("prayerMethod");

const timeFormatSelect=document.getElementById("timeFormat");

const adhanSoundSelect=document.getElementById("adhanSound");

const reciterSelect=document.getElementById("reciterSelect");

/*=========================================
 EXTRA SWITCHES
=========================================*/

const quranReminder=document.getElementById("quranReminder");

const adhkarReminder=document.getElementById("adhkarReminder");

const highAccuracyCompass=document.getElementById("highAccuracyCompass");

const autoCompassCalibration=document.getElementById("autoCompassCalibration");

const tasbihVibration=document.getElementById("tasbihVibration");

const tasbihClick=document.getElementById("tasbihClick");

const tasbihProgress=document.getElementById("tasbihProgress");

const wifiOnlyDownloads=document.getElementById("wifiOnlyDownloads");

const autoResumeDownloads=document.getElementById("autoResumeDownloads");

const locationPermission=document.getElementById("locationPermission");

const analyticsPermission=document.getElementById("analyticsPermission");

/*=========================================
 BUTTONS
=========================================*/

const manageDownloadsBtn=document.getElementById("manageDownloadsBtn");

const clearCacheBtn=document.getElementById("clearCacheBtn");

const storageUsageBtn=document.getElementById("storageUsageBtn");

const rateAppBtn=document.getElementById("rateAppBtn");

const shareAppBtn=document.getElementById("shareAppBtn");

const checkUpdatesBtn=document.getElementById("checkUpdatesBtn");/*==================================================
THEME
==================================================*/

function applyTheme(enabled){

if(enabled){

document.body.classList.add("dark-theme");

}else{

document.body.classList.remove("dark-theme");

}

}

function loadTheme(){

const value=loadSetting(

STORAGE_KEYS.theme,

false

);

if(darkToggle){

darkToggle.checked=value;

}

applyTheme(value);

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
LANGUAGE
==================================================*/

function loadLanguage(){

if(!languageSelect) return;

const value=loadSetting(

STORAGE_KEYS.language,

"English"

);

languageSelect.value=value;

}

function saveLanguage(){

if(!languageSelect) return;

saveSetting(

STORAGE_KEYS.language,

languageSelect.value

);

alert(

"Saved: " + languageSelect.value

);

}
if(languageSelect){

languageSelect.addEventListener(

"change",

saveLanguage

);

}

/*==================================================
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

const value=loadSetting(

STORAGE_KEYS.font,

"Medium"

);

fontSelect.value=value;

applyFont(value);

}

function saveFont(){

if(!fontSelect) return;

saveSetting(

STORAGE_KEYS.font,

fontSelect.value

);

applyFont(

fontSelect.value

);

}

if(fontSelect){

fontSelect.addEventListener(

"change",

saveFont

);

}/*==================================================
PART 3
ADHAN & PRAYER SETTINGS
==================================================*/

/*==============================
ADHAN
==============================*/

function loadAdhan(){

if(!adhanToggle) return;

const value=loadSetting(

STORAGE_KEYS.adhan,

true

);

adhanToggle.checked=value;

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

/*==============================
PRAYER METHOD
==============================*/

function loadPrayerMethod(){

if(!prayerMethodSelect) return;

const value=loadSetting(

STORAGE_KEYS.prayerMethod,

"Muslim World League"

);

prayerMethodSelect.value=value;

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

const value=loadSetting(

STORAGE_KEYS.timeFormat,

"24 Hour"

);

timeFormatSelect.value=value;

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

const value=loadSetting(

STORAGE_KEYS.adhanSound,

"Default Adhan"

);

adhanSoundSelect.value=value;

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

const value=loadSetting(

STORAGE_KEYS.reciter,

"Mishary Alafasy"

);

reciterSelect.value=value;

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
PART 4
EXTRA SWITCHES
==================================================*/

function bindToggle(element,key,defaultValue){

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

/*==============================
LOAD ALL EXTRA SWITCHES
==============================*/

function loadExtraSwitches(){

bindToggle(

quranReminder,

STORAGE_KEYS.quranReminder,

false

);

bindToggle(

adhkarReminder,

STORAGE_KEYS.adhkarReminder,

false

);

bindToggle(

highAccuracyCompass,

STORAGE_KEYS.highAccuracyCompass,

true

);

bindToggle(

autoCompassCalibration,

STORAGE_KEYS.autoCompassCalibration,

true

);

bindToggle(

tasbihVibration,

STORAGE_KEYS.tasbihVibration,

true

);

bindToggle(

tasbihClick,

STORAGE_KEYS.tasbihClick,

false

);

bindToggle(

tasbihProgress,

STORAGE_KEYS.tasbihProgress,

true

);

bindToggle(

wifiOnlyDownloads,

STORAGE_KEYS.wifiOnlyDownloads,

true

);

bindToggle(

autoResumeDownloads,

STORAGE_KEYS.autoResumeDownloads,

true

);

bindToggle(

locationPermission,

STORAGE_KEYS.locationPermission,

true

);

bindToggle(

analyticsPermission,

STORAGE_KEYS.analyticsPermission,

false

);

}/*==================================================
PART 5
BUTTONS + INITIALIZATION
==================================================*/

/*==============================
NOTIFICATION PERMISSION
==============================*/

function requestNotificationPermission(){

if(!("Notification" in window)) return;

if(Notification.permission==="default"){

Notification.requestPermission();

}

}

/*==============================
BUTTONS
==============================*/

if(manageDownloadsBtn){

manageDownloadsBtn.addEventListener("click",()=>{

alert("Downloaded Qur'an Manager coming soon.");

});

}

if(clearCacheBtn){

clearCacheBtn.addEventListener("click",()=>{

if(confirm("Clear cache?")){

Object.keys(localStorage).forEach(key=>{

if(key.startsWith("mb_cache_")){

localStorage.removeItem(key);

}

});

alert("Cache cleared.");

}

});

}

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

if(rateAppBtn){

rateAppBtn.addEventListener("click",(e)=>{

e.preventDefault();

alert("Play Store version coming soon.");

});

}

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

alert("Copied to clipboard.");

}

});

}

if(checkUpdatesBtn){

checkUpdatesBtn.addEventListener("click",(e)=>{

e.preventDefault();

alert("You are using the latest version.");

});

}

/*==============================
INITIALIZE
==============================*/

function initializeSettings(){

loadTheme();

loadLanguage();

loadFont();

loadAdhan();

loadPrayerMethod();

loadTimeFormat();

loadAdhanSound();

loadReciter();

loadExtraSwitches();

requestNotificationPermission();

console.log("Muslim Bro Settings Loaded");

}

/*==============================
START
==============================*/

document.addEventListener(

"DOMContentLoaded",

initializeSettings

);
