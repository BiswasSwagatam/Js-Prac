let timerId
let lastTimerStart = 0
let milisFromLastStart = 0

const startButton = document.getElementById('start-button')
const stopButton = document.getElementById('stop-button')
const resetButton = document.getElementById('reset-button')
const timer = document.getElementById('timer')

startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)

function startTimer() {
  startButton.disabled = true
  stopButton.disabled = false
  resetButton.disabled = true

  lastTimerStart = Date.now()

  timerId = requestAnimationFrame(updateTimer)
}

function stopTimer() {
  startButton.disabled = false
  stopButton.disabled = true
  resetButton.disabled = false

  milisFromLastStart += Date.now() - lastTimerStart
  
  cancelAnimationFrame(timerId)
}

function resetTimer() {
  resetButton.disabled = true
  timer.textContent = '00:00:000'
  milisFromLastStart = 0
}

function updateTimer() {
  const milis = Date.now() - lastTimerStart + milisFromLastStart
  const secs = milis / 1000
  const mins = secs / 60

  const milisText = formatNumber(milis % 1000, 3)
  const secsText = formatNumber(Math.floor(secs)%60, 2)
  const minsText = formatNumber(Math.floor(mins), 2)

  timer.textContent = `${minsText}:${secsText}:${milisText}`

  timerId = requestAnimationFrame(updateTimer)
}

function formatNumber(number, length) {
  const stringNumber = String(number)
  return stringNumber.padStart(length, '0')
}