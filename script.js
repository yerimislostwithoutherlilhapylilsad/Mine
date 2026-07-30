// --- 1. Custom Glowing Cursor ---
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// --- 2. Background Ambient Music Toggle ---
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        music.play();
        musicIcon.className = 'fas fa-pause';
    } else {
        music.pause();
        musicIcon.className = 'fas fa-play';
    }
    isPlaying = !isPlaying;
});

// --- 3. Interactive Quote Generator ---
const quotes = [
    "\"The future belongs to those who believe in the beauty of their dreams.\"",
    "\"Code is like humor. When you have to explain it, it’s bad.\"",
    "\"Adventure is not outside man; it is within.\"",
    "\"Creativity is intelligence having fun.\"",
    "\"Work hard in silence, let your success be your noise.\"",
    "\"Stay curious, stay hungry, and keep discovering the unknown.\""
];

const quoteBtn = document.getElementById('quoteBtn');
quoteBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quoteText').innerText = quotes[randomIndex];
});

// --- 4. Scroll Reveal Animations for Cards ---
const cards = document.querySelectorAll('.info-card');
const revealCards = () => {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 50) {
            card.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealCards);
revealCards(); // Run once on load

// --- 5. Interactive Particle Galaxy Background (النجوم المتحركة) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 75;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();
