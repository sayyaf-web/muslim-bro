const adhanToggle = document.getElementById("adhanToggle");

// Load saved setting
if (localStorage.getItem("adhanEnabled") === "true") {
    adhanToggle.checked = true;
} else {
    adhanToggle.checked = false;
}

// Save setting
adhanToggle.addEventListener("change", function () {
    localStorage.setItem("adhanEnabled", this.checked);

    if (this.checked) {
        alert("✅ Adhan notifications enabled");
    } else {
        alert("❌ Adhan notifications disabled");
    }
});
