const dvdLogo = document.querySelector(".dvd-logo");
const container = document.querySelector(".container");
const celebration = document.querySelector(".celebration");

let x = Math.random() * (container.clientWidth - dvdLogo.clientWidth);
let y = Math.random() * (container.clientHeight - dvdLogo.clientHeight);
let xSpeed = 2;
let ySpeed = 2;
let cornerHit = false;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeLogoColor() {
    const logoPath = document.querySelector('.logo-path');
    logoPath.setAttribute('fill', getRandomColor());
}

function animate() {
    x += xSpeed;
    y += ySpeed;

    let edgeHit = false;

    if (x < 0 || x > container.clientWidth - dvdLogo.clientWidth) {
        xSpeed = -xSpeed;
        edgeHit = true;
        cornerHit = x <= 0 && y <= 0 || x >= container.clientWidth - dvdLogo.clientWidth && y <= 0 || x <= 0 && y >= container.clientHeight - dvdLogo.clientHeight || x >= container.clientWidth - dvdLogo.clientWidth && y >= container.clientHeight - dvdLogo.clientHeight;
    }
    if (y < 0 || y > container.clientHeight - dvdLogo.clientHeight) {
        ySpeed = -ySpeed;
        edgeHit = true;
        cornerHit = x <= 0 && y <= 0 || x >= container.clientWidth - dvdLogo.clientWidth && y <= 0 || x <= 0 && y >= container.clientHeight - dvdLogo.clientHeight || x >= container.clientWidth - dvdLogo.clientWidth && y >= container.clientHeight - dvdLogo.clientHeight;
    }

    if (edgeHit) {
        changeLogoColor();
    }

    if (cornerHit) {
        celebrate();
    }

    dvdLogo.style.left = x + "px";
    dvdLogo.style.top = y + "px";

    requestAnimationFrame(animate);
}

function celebrate() {
    cornerHit = false;
    celebration.style.display = "block";
}

animate();
