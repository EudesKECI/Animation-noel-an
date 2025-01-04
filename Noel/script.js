const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

const star = document.querySelector('.star')
setInterval(() => {
    if (star.classList.contains('star_light')) {
        star.classList.remove('star_light')
    }
    else {
        star.classList.add('star_light')
    }
}, 1000)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

// Crée un flocon de neige
function createSnowflake() {
    const x = Math.random() * canvas.width;
    const y = Math.random();
    const radius = Math.random() * 4 + 1;
    const speed = Math.random() * 1 + 0.5;

    snowflakes.push({ x, y, radius, speed });
}

// Dessine un flocon de neige
function drawSnowflake({ x, y, radius }) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Met à jour les flocons
function updateSnowflakes() {
    snowflakes.forEach((flake, index) => {
        flake.y += flake.speed;

        if (flake.y > canvas.height) {
            snowflakes.splice(index, 1);
            createSnowflake();
        } else {
            drawSnowflake(flake);
        }
    });
}


// Animation principale
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnowflakes();
    requestAnimationFrame(animate);
}

// Ajouter des flocons périodiquement
setInterval(createSnowflake, 100);

// Démarrer l'animation
animate();
