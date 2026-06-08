/* ================= DOM ELEMENTS ================= */
const bg = document.getElementById("background")
const credit = document.getElementById("credit")
const panel = document.querySelector(".panel")
const settingsBtn = document.getElementById("settingsBtn")
const settings = document.getElementById("settings")
const blurRange = document.getElementById("blurRange")
const clockBlock = document.getElementById("clockBlock")
const clockToggle = document.getElementById("clockToggle")
const canvas = document.getElementById("snow")
const ctx = canvas.getContext("2d")
const snowToggle = document.getElementById("snowToggle")
const parallaxToggle = document.getElementById("parallaxToggle")

/* ================= SETTINGS ================= */
let snowEnabled = localStorage.getItem("snow") !== "off"
let parallaxEnabled = localStorage.getItem("parallax") !== "off"
let clockEnabled = localStorage.getItem("clock") !== "off"

if(snowToggle) snowToggle.checked = snowEnabled
if(parallaxToggle) parallaxToggle.checked = parallaxEnabled
if(clockToggle) clockToggle.checked = clockEnabled

if(canvas) canvas.style.display = snowEnabled ? "block" : "none"
if(clockBlock) clockBlock.style.display = clockEnabled ? "block" : "none"

/* ================= SETTINGS PANEL ================= */
if(settingsBtn) settingsBtn.onclick = () => {
    settings.style.display = settings.style.display === "flex" ? "none" : "flex"
}

/* ================= CLOCK ================= */
function updateClock() {
    const now = new Date()
    const clockEl = document.getElementById("clock")
    const dateEl = document.getElementById("date")
    if(clockEl) clockEl.textContent = now.toLocaleTimeString()
    if(dateEl) dateEl.textContent = now.toLocaleDateString()
}
setInterval(updateClock, 1000)
updateClock()

/* ================= SNOW ================= */
function resizeCanvas() {
    if(canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

let snow = []
for(let i=0;i<200;i++){
    snow.push({
        x: Math.random()*window.innerWidth,
        y: Math.random()*window.innerHeight,
        r: Math.random()*3,
        speed: Math.random()+0.5
    })
}

function drawSnow() {
    if(!snowEnabled || !canvas) return
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "white"
    snow.forEach(s=>{
        ctx.beginPath()
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
        ctx.fill()
        s.y += s.speed
        if(s.y > canvas.height) {
            s.y = 0
            s.x = Math.random()*canvas.width
        }
    })
}
setInterval(drawSnow,30)

/* ================= PARALLAX ================= */
document.addEvent