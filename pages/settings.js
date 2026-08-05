"use strict";

/*=========================================
MUSLIM BRO
SETTINGS.JS
PART 1
CORE
=========================================*/

/*
-----------------------------------------
LOCAL STORAGE KEYS
-----------------------------------------
*/

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

/*
-----------------------------------------
ELEMENTS
-----------------------------------------
*/

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

/*
-----------------------------------------
SAVE HELPER
-----------------------------------------
*/

function saveSetting(key,value){

localStorage.setItem(

key,

JSON.stringify(value)

);

}

/*
-----------------------------------------
LOAD HELPER
-----------------------------------------
*/

function loadSetting(

key,

defaultValue

){

const value=

localStorage.getItem(key);

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

/*
-----------------------------------------
STARTUP
-----------------------------------------
*/

document.addEventListener(

"DOMContentLoaded",

initializeSettings

);

function initializeSettings(){

console.log(
"Muslim Bro Settings Initializing..."
);

loadTheme();

loadAdhan();

loadLanguage();

loadFont();

requestNotificationPermission();

}
/*=========================================
PART 2
DARK MODE
=========================================*/

/*
-----------------------------------------
LOAD THEME
-----------------------------------------
*/

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

/*
-----------------------------------------
APPLY THEME
-----------------------------------------
*/

function applyTheme(enabled){

if(enabled){

document.body.classList.add("dark-theme");

}else{

document.body.classList.remove("dark-theme");

}

}

/*
-----------------------------------------
SAVE THEME
-----------------------------------------
*/

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

/*
-----------------------------------------
EVENT
-----------------------------------------
*/

if(darkToggle){

darkToggle.addEventListener(

"change",

saveTheme

);

}/*=========================================
PART 3
ADHAN NOTIFICATIONS
=========================================*/

/*
-----------------------------------------
LOAD ADHAN SETTING
-----------------------------------------
*/

function loadAdhan(){

const savedAdhan = loadSetting(

STORAGE_KEYS.adhan,

true

);

if(adhanToggle){

adhanToggle.checked = savedAdhan;

}

}

/*
-----------------------------------------
SAVE ADHAN
-----------------------------------------
*/

function saveAdhan(){

if(!adhanToggle) return;

saveSetting(

STORAGE_KEYS.adhan,

adhanToggle.checked

);

if(adhanToggle.checked){

console.log("Adhan notifications enabled.");

}else{

console.log("Adhan notifications disabled.");

}

}

/*
-----------------------------------------
NOTIFICATION PERMISSION
-----------------------------------------
*/

function requestNotificationPermission(){

if(!("Notification" in window)){

console.log(

"This device does not support notifications."

);

return;

}

if(Notification.permission==="default"){

Notification.requestPermission();

}

}

/*
-----------------------------------------
EVENT
-----------------------------------------
*/

if(adhanToggle){

adhanToggle.addEventListener(

"change",

saveAdhan

);

}/*=========================================
PART 4
LANGUAGE & FONT SIZE
=========================================*/

/*
-----------------------------------------
LOAD LANGUAGE
-----------------------------------------
*/

function loadLanguage(){

const savedLanguage = loadSetting(

STORAGE_KEYS.language,

"English"

);

if(languageSelect){

languageSelect.value = savedLanguage;

}

}

/*
-----------------------------------------
SAVE LANGUAGE
-----------------------------------------
*/

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

/*
-----------------------------------------
LOAD FONT SIZE
-----------------------------------------
*/

function loadFont(){

const savedFont = loadSetting(

STORAGE_KEYS.font,

"Medium"

);

if(fontSelect){

fontSelect.value = savedFont;

}

applyFont(savedFont);

}

/*
-----------------------------------------
APPLY FONT
-----------------------------------------
*/

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

/*
-----------------------------------------
SAVE FONT
-----------------------------------------
*/

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

/*
-----------------------------------------
EVENTS
-----------------------------------------
*/

if(languageSelect){

languageSelect.addEventListener(

"change",

saveLanguage

);

}

if(fontSelect){

fontSelect.addEventListener(

"change",

saveFont

);

}
