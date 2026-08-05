/*==================================================
 MUSLIM BRO
 SETTINGS.JS
 PART 1
==================================================*/

"use strict";

/*==============================
 LOCAL STORAGE KEYS
==============================*/

const STORAGE_KEYS = {

theme: "mb_theme",

adhan: "mb_adhan",

language: "mb_language",

font: "mb_font"

};

/*==============================
 ELEMENTS
==============================*/

const darkToggle = document.getElementById("darkToggle");

const adhanToggle = document.getElementById("adhanToggle");

/*==============================
 LOAD SAVED SETTINGS
==============================*/

window.addEventListener("DOMContentLoaded", () => {

loadTheme();

loadAdhan();

});

/*==============================
 SAVE HELPER
==============================*/

function saveSetting(key, value){

localStorage.setItem(key, JSON.stringify(value));

}

/*==============================
 LOAD HELPER
==============================*/

function loadSetting(key, defaultValue){

const value = localStorage.getItem(key);

if(value === null) return defaultValue;

try{

return JSON.parse(value);

}catch{

return defaultValue;

}

}/*==================================================
 PART 2
 DARK MODE
==================================================*/

/*==============================
 LOAD THEME
==============================*/

function loadTheme(){

const savedTheme = loadSetting(STORAGE_KEYS.theme, false);

if(darkToggle){

darkToggle.checked = savedTheme;

}

applyTheme(savedTheme);

}

/*==============================
 APPLY THEME
==============================*/

function applyTheme(enabled){

if(enabled){

document.body.classList.add("dark-theme");

}else{

document.body.classList.remove("dark-theme");

}

}

/*==============================
 DARK TOGGLE
==============================*/

if(darkToggle){

darkToggle.addEventListener("change", function(){

const enabled = this.checked;

applyTheme(enabled);

saveSetting(STORAGE_KEYS.theme, enabled);

});

}/*==================================================
 PART 3
 ADHAN NOTIFICATIONS
==================================================*/

/*==============================
 LOAD ADHAN SETTING
==============================*/

function loadAdhan(){

const savedAdhan = loadSetting(STORAGE_KEYS.adhan, true);

if(adhanToggle){

adhanToggle.checked = savedAdhan;

}

}

/*==============================
 ADHAN TOGGLE
==============================*/

if(adhanToggle){

adhanToggle.addEventListener("change", function(){

const enabled = this.checked;

saveSetting(STORAGE_KEYS.adhan, enabled);

if(enabled){

console.log("Adhan notifications enabled.");

}else{

console.log("Adhan notifications disabled.");

}

});

}

/*==============================
 CHECK NOTIFICATION PERMISSION
==============================*/

function requestNotificationPermission(){

if(!("Notification" in window)){

console.log("Notifications are not supported on this device.");

return;

}

if(Notification.permission === "default"){

Notification.requestPermission();

}

}

/*==============================
 REQUEST PERMISSION
==============================*/

window.addEventListener("load", () => {

requestNotificationPermission();

});/*==================================================
 PART 4
 LANGUAGE & FONT SIZE
==================================================*/

/*==============================
 ELEMENTS
==============================*/

const languageSelect = document.getElementById("languageSelect");

const fontSelect = document.getElementById("fontSelect");

/*==============================
 LOAD LANGUAGE
==============================*/

function loadLanguage(){

if(!languageSelect) return;

const savedLanguage = loadSetting(
STORAGE_KEYS.language,
"English"
);

languageSelect.value = savedLanguage;

}

/*==============================
 SAVE LANGUAGE
==============================*/

if(languageSelect){

languageSelect.addEventListener(
"change",
function(){

saveSetting(
STORAGE_KEYS.language,
this.value
);

console.log(
"Language:",
this.value
);

}

);

}

/*==============================
 LOAD FONT SIZE
==============================*/

function loadFont(){

if(!fontSelect) return;

const savedFont = loadSetting(
STORAGE_KEYS.font,
"Medium"
);

fontSelect.value = savedFont;

applyFont(savedFont);

}

/*==============================
 APPLY FONT SIZE
==============================*/

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

/*==============================
 SAVE FONT
==============================*/

if(fontSelect){

fontSelect.addEventListener(
"change",
function(){

applyFont(this.value);

saveSetting(
STORAGE_KEYS.font,
this.value
);

}

);

}

/*==============================
 LOAD EVERYTHING
==============================*/

window.addEventListener(
"DOMContentLoaded",
()=>{

loadLanguage();

loadFont();

});/*==================================================
 PART 5
 ADDITIONAL SETTINGS
==================================================*/

/*==============================
 ELEMENTS BY ID
==============================*/

const prayerMethodSelect = document.getElementById("prayerMethod");
const reciterSelect = document.getElementById("reciterSelect");

/*==============================
 STORAGE KEYS
==============================*/

STORAGE_KEYS.prayerMethod = "mb_prayer_method";
STORAGE_KEYS.reciter = "mb_reciter";

/*==============================
 LOAD PRAYER METHOD
==============================*/

function loadPrayerMethod(){

if(!prayerMethodSelect) return;

const savedMethod = loadSetting(
STORAGE_KEYS.prayerMethod,
"Muslim World League"
);

prayerMethodSelect.value = savedMethod;

}

/*==============================
 SAVE PRAYER METHOD
==============================*/

if(prayerMethodSelect){

prayerMethodSelect.addEventListener("change", function(){

saveSetting(
STORAGE_KEYS.prayerMethod,
this.value
);

});

}

/*==============================
 LOAD RECITER
==============================*/

function loadReciter(){

if(!reciterSelect) return;

const savedReciter = loadSetting(
STORAGE_KEYS.reciter,
"Mishary Alafasy"
);

reciterSelect.value = savedReciter;

}

/*==============================
 SAVE RECITER
==============================*/

if(reciterSelect){

reciterSelect.addEventListener("change", function(){

saveSetting(
STORAGE_KEYS.reciter,
this.value
);

});

}

/*==============================
 LOAD EVERYTHING
==============================*/

window.addEventListener("DOMContentLoaded", () => {

loadPrayerMethod();

loadReciter();

});/*==================================================
 PART 6
 BUTTON ACTIONS
==================================================*/

/*==============================
 BUTTONS
==============================*/

const clearCacheBtn = document.querySelector(".settingButton");
const updateLinks = document.querySelectorAll(".settingsLink");

/*==============================
 CLEAR CACHE
==============================*/

function clearAppCache(){

if(confirm("Clear temporary cache files?")){

localStorage.removeItem("mb_temp");

alert("Cache cleared successfully.");

}

}

if(clearCacheBtn){

clearCacheBtn.addEventListener("click", clearAppCache);

}

/*==============================
 CHECK FOR UPDATES
==============================*/

function checkForUpdates(){

alert(
"You are using the latest version of Muslim Bro.\n\nMore premium updates are coming soon, In Sha Allah."
);

}

/*==============================
 SHARE APP
==============================*/

function shareApp(){

const appLink="https://play.google.com/store/apps/details?id=com.muslimbro.app";

if(navigator.share){

navigator.share({

title:"Muslim Bro",

text:"Strengthen your Iman with Muslim Bro.",

url:appLink

});

}else{

navigator.clipboard.writeText(appLink);

alert("App link copied to clipboard.");

}

}

/*==============================
 RATE APP
==============================*/

function rateApp(){

window.open(

"https://play.google.com/store/apps/details?id=com.muslimbro.app",

"_blank"

);

}

/*==============================
 STORAGE INFO
==============================*/

function showStorage(){

let used=0;

for(let key in localStorage){

if(localStorage.hasOwnProperty(key)){

used+=localStorage.getItem(key).length;

}

}

alert(

"Approximate local storage used:\n"+

(used/1024).toFixed(2)+

" KB"

);

}/*==================================================
 PART 7
 SETTINGS MENU ACTIONS
==================================================*/

/*==============================
 SETTINGS LINKS
==============================*/

document.querySelectorAll(".settingsLink").forEach(link=>{

link.addEventListener("click",function(e){

const text=this.textContent.trim();

/*==============================
 RATE APP
==============================*/

if(text.includes("Rate")){

e.preventDefault();

rateApp();

return;

}

/*==============================
 SHARE APP
==============================*/

if(text.includes("Share")){

e.preventDefault();

shareApp();

return;

}

/*==============================
 CHECK UPDATES
==============================*/

if(text.includes("Update")){

e.preventDefault();

checkForUpdates();

return;

}

/*==============================
 STORAGE
==============================*/

if(text.includes("Storage")){

e.preventDefault();

showStorage();

return;

}

});

});

/*==============================
 STARTUP MESSAGE
==============================*/

console.log(
"Muslim Bro Settings Loaded Successfully."
);

/*==============================
 VERSION
==============================*/

const APP_VERSION="1.0.0";

console.log("Muslim Bro Version:",APP_VERSION);

/*==============================
 FINISHED
==============================*/

console.log(
"All Settings Ready."
);
