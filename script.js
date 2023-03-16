document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("dvdCanvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = "dvd_logo.svg";
  
  img.onload = () => {
    updateDimensions();
    animate();
  };

  let logoWidth;
  let logoHeight;
  let x = 50;
  let y = 50;
  let xSpeed = 2;
  let ySpeed = 2;
  let tintColor = randomColor();

  function updateDimensions() {
  const viewport = window.visualViewport;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  logoWidth = canvas.width * 0.25;
  logoHeight = (logoWidth * img.height) / img.width;

  // Check if the current x and y positions place the logo outside the canvas bounds
  if (x + logoWidth > canvas.width) {
    x = canvas.width - logoWidth;
  }
  if (y + logoHeight > canvas.height) {
    y = canvas.height - logoHeight;
  }

  // Update x and y speed
  const speedScale = 0.002; // Adjust this value to control the speed scaling factor
  const avgCanvasSize = (canvas.width + canvas.height) / 2;
  const speed = avgCanvasSize * speedScale;
  xSpeed = Math.sign(xSpeed) * speed;
  ySpeed = Math.sign(ySpeed) * speed;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
  function changeTintColor() {
    tintColor = randomColor();
  }


  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x += xSpeed;
    y += ySpeed;

    let hitEdge = false;

    if (x < 0 || x > canvas.width - logoWidth) {
      xSpeed = -xSpeed;
      hitEdge = true;
    }
    if (y < 0 || y > canvas.height - logoHeight) {
      ySpeed = -ySpeed;
      hitEdge = true;
    }

    if (hitEdge) {
      changeTintColor();
    }

    ctx.drawImage(img, x, y, logoWidth, logoHeight);

    // Apply the tint color
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = tintColor;
    ctx.fillRect(x, y, logoWidth, logoHeight);

    // Reset the globalCompositeOperation to the default mode
    ctx.globalCompositeOperation = 'source-over';

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", updateDimensions);
});

