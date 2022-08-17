
// Code for changing navbar colors on Page Scroll
let nav = document.querySelector("nav");
let ctaBtn = document.querySelector(".cta-btn");
let logo = document.querySelector("#logo-img");

window.addEventListener("scroll", function () {
    if (this.window.pageYOffset > 100) {
        nav.classList.remove("navbar-dark", "grad-bg");
        nav.classList.add("navbar-light", "bg-light", "shadow");
        ctaBtn.classList.remove("btn-outline-light");
        ctaBtn.classList.add("btn-primary");
        logo.src = "img/Logo_Blue.png";
    }
    if (this.window.pageYOffset < 100) {
        nav.classList.remove("navbar-light", "bg-light", "shadow");
        nav.classList.add("navbar-dark", "grad-bg");
        ctaBtn.classList.remove("btn-primary");
        ctaBtn.classList.add("btn-outline-light");
        logo.src = "img/Logo_White.webp";
    }
})


// Code for Network Animation

const canvas = document.getElementById("network");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 70 / 100;
// canvas.height = window.innerHeight;

let particlesArray;

// Get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// Create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
    }
    // check particle position, check mouse position, move the particle, draw the particle
    update() {
        // check if the particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        // check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }
}

// create particle array 
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// check if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacityValue + ')';
                ctx.linewidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// resize event
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function () {
        mouse.x = null;
        mouse.y = null;
    }
)



init();
animate();


// Code for Animation of Module Icons

let modulesStartHeight = document.getElementById('module-icons').offsetHeight;
let modulesEndHeight = document.getElementById('visdom').offsetHeight;
let icons = document.getElementsByClassName('module-icon');
let iconTexts = document.getElementsByClassName('module-name');

window.addEventListener("scroll", function () {
    if (this.window.pageYOffset < modulesStartHeight + this.window.innerHeight) {
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.remove('animate', 'pop');
            iconTexts[i].classList.remove('animate', 'pop');
        }
    }
    if (this.window.pageYOffset > modulesStartHeight + this.window.innerHeight) {
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.add('animate', 'pop');
            iconTexts[i].classList.add('animate', 'pop');
        }
    }
    if (this.window.pageYOffset > modulesEndHeight + this.window.innerHeight) {
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.remove('animate', 'pop');
            iconTexts[i].classList.remove('animate', 'pop');
        }
    }
})