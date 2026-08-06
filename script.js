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

/* ================= 2. MAGICAL CANVAS PARTICLES ================= */
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

    class MagicLine {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = width / 2;
            this.y = 120; 
            this.targetX = Math.random() * width;
            this.targetY = Math.random() * height;
            this.progress = 0;
            this.speed = 0.015 + Math.random() * 0.025;
            this.opacity = 1;
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            let currentX = this.x + (this.targetX - this.x) * this.progress;
            let currentY = this.y + (this.targetY - this.y) * this.progress;
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = `rgba(255, 182, 193, ${this.opacity})`;
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#ff4081";
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

    const lines = Array.from({ length: 15 }, () => new MagicLine());

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        lines.forEach(line => {
            line.update();
            line.draw();
        });
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
}

/* ================= 3. FIREWORKS EFFECT ================= */
function createFireworks() {
    const cakePage = document.querySelector(".cake-page");
    if (!cakePage) return;

    for (let i = 0; i < 35; i++) {
        const fire = document.createElement("div");
        fire.innerHTML = Math.random() > 0.5 ? "✨" : "💖";
        fire.style.position = "absolute";
        fire.style.left = Math.random() * 100 + "%";
        fire.style.top = (20 + Math.random() * 50) + "%";
        fire.style.fontSize = (15 + Math.random() * 20) + "px";
        fire.style.transition = "all 1.5s ease-out";
        fire.style.opacity = "1";
        fire.style.zIndex = "10";

        cakePage.appendChild(fire);

        setTimeout(() => {
            const moveX = (Math.random() - 0.5) * 250;
            const moveY = (Math.random() - 0.5) * 250;
            fire.style.transform = `translate(${moveX}px, ${moveY}px) scale(2)`;
            fire.style.opacity = "0";
        }, 50);

        setTimeout(() => {
            fire.remove();
        }, 1500);
    }
}

/* ================= 4. GRAND FINALE FIREWORKS & INTERACTIVE STEPS ================= */
function triggerFinaleFireworks() {
    const container = document.getElementById('finaleFireworks');
    if (!container) return;

    const colors = ['#ff4568', '#ffd700', '#00ffff', '#ff69b4', '#7c4dff', '#ffffff'];

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // Start from center of the screen
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 220;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}

function showInteractiveStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.card-box').forEach(card => card.classList.add('hidden'));
    
    // Show specific step
    const targetCard = document.getElementById(`step${stepNumber}`);
    if (targetCard) {
        targetCard.classList.remove('hidden');
    }
}

function dodgeNoButton(btn) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 100;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function showFinale() {
    const container = document.getElementById('interactiveContainer');
    const finale = document.getElementById('finaleSection');
    
    if (container) container.classList.add('hidden');
    if (finale) {
        finale.classList.remove('hidden');
        triggerFinaleFireworks();
        // Keep launching fireworks periodically
        setInterval(triggerFinaleFireworks, 1500);
    }
}

/* ================= 5. GLOBAL INTERACTION FUNCTIONS ================= */

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

/* ================= 6. EVENT LISTENERS ================= */
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    initWebCanvas();

    // Music Toggle Button
    const musicBtn = document.getElementById('musicBtn');
    const music = document.getElementById('music');

    if (musicBtn && music) {
        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicBtn.innerText = '⏸️';
            } else {
                music.pause();
                musicBtn.innerText = '🎵';
            }
        });
    }

    // Blow Candle Button
    const blowBtn = document.getElementById('blowBtn');
    if (blowBtn) {
        blowBtn.addEventListener('click', () => {
            const flame = document.querySelector('.flame');
            if (flame) {
                flame.style.display = 'none';
            }

            blowBtn.innerText = '✨ Wish Made! ❤️';
            blowBtn.disabled = true;

            createFireworks();
        });
    }

    // Next Page Scroll Button
    const nextBtn = document.getElementById('nextBtn');
    const letterPage = document.querySelector('.letter-page');

    if (nextBtn && letterPage) {
        nextBtn.addEventListener('click', () => {
            letterPage.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
