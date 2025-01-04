const canvas = document.getElementById('fire');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1; // Opacité pour effet de disparition
    }
    draw() {
        ctx.save(); // Sauvegarde l'état actuel
        ctx.globalAlpha = this.alpha; // Applique l'opacité
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore(); // Restaure l'état précédent
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01; // Réduit progressivement l'opacité
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const projectiles = [];
const particles = [];

// Crée un feu d'artifice aléatoire
function createFirework(x, y) {
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    for (let i = 0; i < 30; i++) {
        const velocity = {
            x: (Math.random() - 0.5) * 6, // Vitesse aléatoire en x
            y: (Math.random() - 0.5) * 6  // Vitesse aléatoire en y
        };
        particles.push(
            new Particle(
                x,
                y,
                Math.random() * 3 + 1, // Taille aléatoire
                color, // Couleur aléatoire
                velocity
            )
        );
    }
}

// Ajoute des feux d'artifice aléatoires à intervalle régulier
function randomFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width; // Position aléatoire en x
        const y = Math.random() * canvas.height; // Position aléatoire en y (dans la moitié supérieure)
        createFirework(x, y);
    }, 1000); // Toutes les 1,5 secondes
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`

    // Met à jour les projectiles
    projectiles.forEach((projectile, index) => {
        projectile.update();
        const height = Math.random() * canvas.height / 3
        // Détecte l'explosion (exemple : atteint une certaine hauteur)
        if (projectile.y < height) {
            // Crée des particules
            for (let i = 0; i < 20; i++) {
                const velocity = {
                    x: (Math.random() - 0.5) * 6, // Vitesse aléatoire en x
                    y: (Math.random() - 0.5) * 6  // Vitesse aléatoire en y
                };
                particles.push(
                    new Particle(
                        projectile.x,
                        projectile.y,
                        Math.random() * 3, // Taille aléatoire
                        color, // Couleur aléatoire
                        velocity
                    )
                );
            }
            // Supprime le projectile
            projectiles.splice(index, 1);
        }
    });

    // Met à jour les particules
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1); // Supprime les particules disparues
        } else {
            particle.update();
        }
    });
}

addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height,
        event.clientX - canvas.width / 2
    );
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    const velocity = {
        x: Math.cos(angle) * 8,
        y: Math.sin(angle) * 8
    };
    projectiles.push(
        new Projectile(canvas.width / 2, canvas.height, 10, color, velocity)
    );
});

setTimeout(() => {
    animate();
    randomFireworks()
}, 5000)
