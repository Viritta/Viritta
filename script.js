const bg = document.getElementById("bg")
const canvas = document.getElementById("snow")
const ctx = canvas.getContext("2d")

const snowToggle = document.getElementById("snowToggle")
const parallaxToggle = document.getElementById("parallaxToggle")
const clockToggle = document.getElementById("clockToggle")
const blurRange = document.getElementById("blurRange")

const settingsBtn = document.getElementById("settingsBtn")
const settings = document.getElementById("settings")
const clockBlock = document.getElementById("clockBlock")
const panel = document.querySelector(".panel")

/* ========= BACKGROUND ========= */
bg.style.backgroundImage = `url(data/images/backgrounds/main/bg1.jpg)`

/* ========= SETTINGS ========= */
let snowEnabled = localStorage.getItem("snow") !== "off"
let parallaxEnabled = localStorage.getItem("parallax") !== "off"
let clockEnabled = localStorage.getItem("clock") !== "off"

snowToggle.checked = snowEnabled
parallaxToggle.checked = parallaxEnabled
clockToggle.checked = clockEnabled

canvas.style.display = snowEnabled ? "block" : "none"
clockBlock.style.display = clockEnabled ? "block" : "none"

/* ========= SETTINGS TOGGLE ========= */
settingsBtn.onclick = () => {
settings.style.display = settings.style.display === "flex" ? "none" : "flex"
}

/* ========= CLOCK ========= */
function updateClock() {
const now = new Date()
document.getElementById("clock").textContent = now.toLocaleTimeString()
document.getElementById("date").textContent = now.toLocaleDateString()
}
setInterval(updateClock, 1000)
updateClock()

/* ========= SNOW ========= */
function resize() {
canvas.width = innerWidth
canvas.height = innerHeight
}
resize()
window.addEventListener("resize", resize)

let snow = []
for (let i = 0; i < 150; i++) {
snow.push({
x: Math.random() * innerWidth,
y: Math.random() * innerHeight,
r: Math.random() * 3,
s: Math.random() + 0.5
})
}

function drawSnow() {
if (!snowEnabled) return

ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = "white"

snow.forEach(p => {
ctx.beginPath()
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
ctx.fill()

p.y += p.s
if (p.y > innerHeight) {
p.y = 0
p.x = Math.random() * innerWidth
}
})
}
setInterval(drawSnow, 30)

/* ========= PARALLAX ========= */
document.addEventListener("mousemove", e => {
if (!parallaxEnabled) return

let x = (e.clientX / innerWidth - 0.5) * 20
let y = (e.clientY / innerHeight - 0.5) * 20

bg.style.transform = `translate(${x}px, ${y}px)`
})

/* ========= EVENTS ========= */
snowToggle.onchange = () => {
snowEnabled = snowToggle.checked
canvas.style.display = snowEnabled ? "block" : "none"
localStorage.setItem("snow", snowEnabled ? "on" : "off")
}

parallaxToggle.onchange = () => {
parallaxEnabled = parallaxToggle.checked
if (!parallaxEnabled) bg.style.transform = "translate(0,0)"
localStorage.setItem("parallax", parallaxEnabled ? "on" : "off")
}

clockToggle.onchange = () => {
clockEnabled = clockToggle.checked
clockBlock.style.display = clockEnabled ? "block" : "none"
localStorage.setItem("clock", clockEnabled ? "on" : "off")
}

/* ========= BLUR ========= */
blurRange.value = localStorage.getItem("blur") || 20
panel.style.backdropFilter = `blur(${blurRange.value}px)`

blurRange.oninput = () => {
panel.style.backdropFilter = `blur(${blurRange.value}px)`
localStorage.setItem("blur", blurRange.value)
}