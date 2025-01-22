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

//parralax effect
function backgroundParallax(){
    var x = window.scrollY;
    var m = 0.9;
    var background = document.getElementById("sect1");
    var newTop = m*x;
    background.style.backgroundPositionY = newTop + "px";
}
window.addEventListener("load", backgroundParallax);
window.addEventListener("scroll", backgroundParallax);