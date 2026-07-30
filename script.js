// --- 1. Cursor ---
const cur = document.getElementById('cur');

document.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    cs(e.clientX, e.clientY);
});

function cs(x, y) {
    const s = document.createElement('i');
    s.className = 'fas fa-star sp';
    
    const ox = (Math.random() - 0.5) * 20;
    const oy = (Math.random() - 0.5) * 20;
    
    s.style.left = (x + ox) + 'px';
    s.style.top = (y + oy) + 'px';
    
    const sz = Math.random() * 10 + 6;
    s.style.fontSize = sz + 'px';
    
    document.body.appendChild(s);

    setTimeout(() => {
        s.remove();
    }, 800);
}

// --- 2. YT Audio ---
const yt = document.getElementById('yt');
const mt = document.getElementById('mt');
const mi = document.getElementById('mi');
let ip = false;

mt.addEventListener('click', () => {
    if (!ip) {
        yt.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        mi.className = 'fas fa-pause';
        ip = true;
    } else {
        yt.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        mi.className = 'fas fa-play';
        ip = false;
    }
});

// --- 3. Quotes ---
const q = [
    "\"The future belongs to those who believe in the beauty of their dreams.\"",
    "\"Code is like humor. When you have to explain it, it’s bad.\"",
    "\"Adventure is not outside man; it is within.\"",
    "\"Creativity is intelligence having fun.\"",
    "\"Work hard in silence, let your success be your noise.\"",
    "\"Stay curious, stay hungry, and keep discovering the unknown.\""
];

const qbBtn = document.getElementById('qb-btn');
qbBtn.addEventListener('click', () => {
    const ri = Math.floor(Math.random() * q.length);
    document.getElementById('qt').innerText = q[ri];
});

// --- 4. Scroll Reveal ---
const cards = document.querySelectorAll('.ic');
const rc = () => {
    cards.forEach(c => {
        const ct = c.getBoundingClientRect().top;
        if (ct < window.innerHeight - 50) {
            c.classList.add('vis');
        }
    });
};
window.addEventListener('scroll', rc);
rc();

// --- 5. Canvas Particles ---
const cv = document.getElementById('bg');
const cx = cv.getContext('2d');

cv.width = window.innerWidth;
cv.height = window.innerHeight;

let pa = [];
const np = 75;

class P {
    constructor() {
        this.x = Math.random() * cv.width;
        this.y = Math.random() * cv.height;
        this.size = Math.random() * 2 + 1;
        this.sx = Math.random() * 1 - 0.5;
        this.sy = Math.random() * 1 - 0.5;
    }
    u() {
        this.x += this.sx;
        this.y += this.sy;

        if (this.x < 0 || this.x > cv.width) this.sx *= -1;
        if (this.y < 0 || this.y > cv.height) this.sy *= -1;
    }
    d() {
        cx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        cx.beginPath();
        cx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cx.fill();
    }
}

function ipa() {
    pa = [];
    for (let i = 0; i < np; i++) {
        pa.push(new P());
    }
}

function ap() {
    cx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < pa.length; i++) {
        pa[i].u();
        pa[i].d();
    }
    requestAnimationFrame(ap);
}

window.addEventListener('resize', () => {
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    ipa();
});

ipa();
ap();
