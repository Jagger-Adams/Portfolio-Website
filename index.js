// ALL menu bar swapping JS
let lastScrollY = window.scrollY;
const scrollMenu = document.getElementById('scrollMenu');
const scrollThreshold = 130;

window.addEventListener('scroll', checkMenu);
window.addEventListener('load', () => {
    if (window.scrollY > scrollThreshold) {
        scrollMenu.classList.add('show');
    }
});



function checkMenu() {
    if (window.scrollY > scrollThreshold && lastScrollY <= scrollThreshold) {
        scrollMenu.classList.add('show');
    } 
    else if (window.scrollY <= scrollThreshold && lastScrollY > scrollThreshold) {
        scrollMenu.classList.remove('show');
    }

    lastScrollY = window.scrollY;
}



// Side menu toggling for both regular menu and scroll menu
var sideMenuBox = document.getElementById("sideMenu");
var menuButton = document.getElementById("menuButton");
var scrollMenuButton = document.getElementById("scrollMenuButton");  

function sideMenu() {
    sideMenuBox.classList.toggle("show");
}


window.addEventListener("click", function(event) {
    if (!sideMenuBox.contains(event.target) && !menuButton.contains(event.target) && !scrollMenuButton.contains(event.target) && sideMenuBox.classList.contains("show")) {
        sideMenuBox.classList.remove("show");
    }
});

//Side menu ends here

//Scrollfire Fade In
function isInView(element) {
    var div = element.getBoundingClientRect();
    return div.bottom > 0 && div.top < window.innerHeight; 
}


function fadeIn() {
    var boxes = document.getElementsByClassName("fade");
    for (var element of boxes) {
        if (isInView(element)) {
            element.classList.add("visible");
        }
    }
}

window.addEventListener("scroll", fadeIn);
window.addEventListener("load", fadeIn);


//CANVAS ANIMATION

let canvas = document.getElementById("backgroundCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");
let particles = [];
let trail = [];
let trailPointSize = 4;
let waveOffset = 0;

animate();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawWaves();
    particles.forEach(p => p.update());
    drawTrail();

    context.font = "20px Arial";
    context.fillStyle = "rgba(255, 255, 255, 0.8)"; 
    context.fillText("Animation programmed by Jagger", 10, 25);
}


function drawWaves(){
    waveOffset += 0.01;
    context.beginPath();
    context.moveTo(0, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2 + 50 * Math.sin(0.02 * x - waveOffset) + 0.7*x;
        context.lineTo(x, y);
    }
    context.lineTo(canvas.width, canvas.height); // Bottom-right
    context.closePath();

    context.fillStyle = "rgba(55, 52, 52, 0.8)";
    context.fill();
    
    //2nd wave

    for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2 + 40 * Math.sin(0.02 * x + waveOffset) + 0.7*x;
        context.lineTo(x, y);
    }
    context.lineTo(canvas.width, canvas.height); 
    context.closePath();

    context.fillStyle = "rgba(40, 39, 41, 0.4)";
    context.fill();
}


//mouse trail function
let lastTrailPoint = null;

window.addEventListener("mousemove", (event) => {
    const curr = { xCoord: event.clientX, yCoord: event.clientY };

    if (lastTrailPoint) {
        const dx = curr.xCoord - lastTrailPoint.xCoord;
        const dy = curr.yCoord - lastTrailPoint.yCoord;
        const distance = Math.hypot(dx, dy);
        const steps = Math.floor(distance / 2);

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            trail.push({
                xCoord: lastTrailPoint.xCoord + dx * t,
                yCoord: lastTrailPoint.yCoord + dy * t,
                radius: trailPointSize
            });
            if (trail.length > 50) trail.shift();
        }
    }

    lastTrailPoint = curr;
});

setInterval(() => {
    trail.shift();
}, 10);



function drawTrail(){
    trail.forEach(point => {
        context.beginPath();
        context.ellipse(point.xCoord, point.yCoord, point.radius, point.radius, 0, 0, Math.PI * 2);
        context.fillStyle = "rgba(40, 40, 80, 0.5)";
        context.fill();
        context.closePath();
    });
}

class Particle {
    constructor(radius, x, y, speedX, speedY){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        particles.push(this);
    }

    update(){
        this.x += this.speedX * 0.5;
        this.y += this.speedY * 0.5;
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.speedX = -this.speedX;
        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
            this.speedY = -this.speedY;
        }
        this.draw();

        particles.forEach(p => {
            let diffX = Math.abs(this.x - p.x);
            let diffY = Math.abs(this.y - p.y);
            let diff = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            if (diff <= 150){
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(p.x, p.y);
                context.strokeStyle = "grey";
                context.stroke();
                context.closePath();
            }
        });

    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = "grey";
        context.fill();
        context.closePath();
      }
}

let p1 = new Particle(4, 500, 700, -3, 2);
let p2 = new Particle(2, 300, 400, -2, 1);
let p3 = new Particle(3, 400, 600, 1, -3);
let p4 = new Particle(5, 650, 400, -2, -1);
let p5 = new Particle(4, 800, 500, 2, 1);
let p6 = new Particle(2, 200, 200, 1, 2);
let p7 = new Particle(3, 700, 600, 3, 2);
let p8 = new Particle(4, 100, 700, 2, 2);



