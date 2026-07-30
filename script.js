// --- 1. Magic Wand Star Cursor ---
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    createStar(e.clientX, e.clientY);
});

function createStar(x, y) {
    const star = document.createElement('i');
    star.className = 'fas fa-star star-particle';
    
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    star.style.left = (x + offsetX) + 'px';
    star.style.top = (y + offsetY) + 'px';
    
    const size = Math.random() * 10 + 6;
    star.style.fontSize = size + 'px';
    
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 800);
}

// --- 2. YouTube Audio Control (الربط بفيديو اليوتيوب) ---
const ytPlayer = document.getElementById('youtube-player');
const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        // تشغيل صوت فيديو اليوتيوب
        ytPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        musicIcon.className = 'fas fa-pause';
        isPlaying = true;
    } else {
        // إيقاف صوت فيديو اليوتيوب
        ytPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        musicIcon.className = 'fas fa-play';
        isPlaying = false;
    }
});

// --- 3. Quote Generator ---
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

// --- 4. Scroll Reveal Animations ---
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
revealCards();

// --- 5. Particle Galaxy Background ---
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
