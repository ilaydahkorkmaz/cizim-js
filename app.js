// Canvas elementini ve 2D bağlamını al
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Butonları ve giriş alanını al
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const clearBtn = document.getElementById('clear')
const colorInput = document.getElementById('color')
const sizeRange = document.getElementById('size')

// Başlangıçta kullanılacak çizgi boyutu ve rengi
let size = 8
let color = 'black'
// Mouse'un canvas üzerindeki konumu ve basılı olup olmadığına dair kontrol değişkenleri
let x
let y
let isPressed = false

// Daire çizen fonksiyon
function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

// Çizgi çizen fonksiyon
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

// Mouse basıldığında
canvas.addEventListener('mousedown', (e) => {
  isPressed = true
  x = e.offsetX
  y = e.offsetY
})

// Mouse bırakıldığında
canvas.addEventListener('mouseup', (e) => {
  isPressed = false
  x = undefined
  y = undefined
})

// Mouse hareket ettiğinde
canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})

// Renk seçimi değiştiğinde
colorInput.addEventListener('change', (e) => (color = e.target.value))

// Boyut arttır butonuna tıklandığında
increaseBtn.addEventListener('click', () => {
  size += 4
  if (size > 64) {
    size = 64
  }
  updateSizeOnScreen()
})

// Boyut azalt butonuna tıklandığında
decreaseBtn.addEventListener('click', () => {
  size -= 4
  if (size < 4) {
    size = 4
  }
  updateSizeOnScreen()
})

// Ekran üzerinde boyutu güncelleme
function updateSizeOnScreen() {
  sizeRange.innerText = size
}

// Temizle butonuna tıklandığında
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})
