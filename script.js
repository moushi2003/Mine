/* ================= 1. TYPING EFFECT ================= */
const text = "A little universe made only for you... ❤️";
let index = 0;
const typingText = document.getElementById("typing");

function typeWriter() {
    if (typingText && index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
    }
}

/* ================= 2. SPIDER CANVAS WEB SHOOTER ================= */
function initWebCanvas() {
    const canvas = document.getElementById('webCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class WebLine {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = width / 2;
            this.y = 130; 
            this.targetX = Math.random() * width;
            this.targetY = Math.random() * height;
            this.progress = 0;
            this.speed = 0.02 + Math.random() * 0.03;
            this.opacity = 1;
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            let currentX = this.x + (this.targetX - this.x) * this.progress;
            let currentY = this.y + (this.targetY - this.y) * this.progress;
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#0066ff";
            ctx.stroke();
        }
        update() {
            if (this.progress < 1) {
                this.progress += this.speed;
            } else {
                this.opacity -= 0.02;
                if (this.opacity <= 0) {
                    this.reset();
                }
            }
        }
    }

    const webs = Array.from({ length: 14 }, () => new WebLine());

    function animateWebs() {
        ctx.clearRect(0, 0, width, height);
        webs.forEach(web => {
            web.update();
            web.draw();
        });
        requestAnimationFrame(animateWebs);
    }
    animateWebs();
}

/* ================= 3. FIREWORKS EFFECT ================= */
function createFireworks() {
    const cakePage = document.querySelector(".cake-page");
    if (!cakePage) return;

    for (let i = 0; i < 30; i++) {
        const fire = document.createElement("div");
        fire.innerHTML = "✨";
        fire.style.position = "absolute";
        fire.style.left = Math.random() * 100 + "%";
        fire.style.top = Math.random() * 60 + "%";
        fire.style.fontSize = (15 + Math.random() * 25) + "px";
        fire.style.transition = "all 1.5s ease-out";
        fire.style.opacity = "1";

        cakePage.appendChild(fire);

        setTimeout(() => {
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            fire.style.transform = `translate(${moveX}px, ${moveY}px) scale(2)`;
            fire.style.opacity = "0";
        }, 50);

        setTimeout(() => {
            fire.remove();
        }, 1500);
    }
}

/* ================= 4. GLOBAL INTERACTION FUNCTIONS ================= */

function openLetter() {
    const envelope = document.getElementById('envelopeContainer');
    const letterStage = document.getElementById('letterStage');

    if (envelope && letterStage) {
        envelope.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        envelope.style.opacity = '0';
        envelope.style.transform = 'scale(0.8)';

        setTimeout(() => {
            envelope.style.display = 'none';
            letterStage.classList.add('active');
            letterStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
    }
}

function spawnHearts(event) {
    const icons = ['💋', '💖', '🤍', '✨'];

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];

        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;

        heart.style.left = `${event.clientX + offsetX}px`;
        heart.style.top = `${event.clientY + offsetY}px`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

/* ================= 5. EVENT LISTENERS ================= */
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    initWebCanvas();

    const musicBtn = document.getElementById('musicBtn');
    const music = document.getElementById('music');

    if (musicBtn && music) {
        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicBtn.innerText = '⏸️ Pause Theme';
            } else {
                music.pause();
                musicBtn.innerText = '🎵 Play Theme';
            }
        });
    }

    const blowBtn = document.getElementById('blowBtn');
    if (blowBtn) {
        blowBtn.addEventListener('click', () => {
            const flames = document.querySelectorAll('.candle span');
            flames.forEach((flame) => {
                flame.style.display = 'none';
            });

            blowBtn.innerText = '✨ Wish Made! ❤️';
            blowBtn.disabled = true;

            createFireworks();
        });
    }

    const nextBtn = document.getElementById('nextBtn');
    const letterPage = document.querySelector('.letter-page');

    if (nextBtn && letterPage) {
        nextBtn.addEventListener('click', () => {
            letterPage.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
