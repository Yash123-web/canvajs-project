// Get canvas and context
const canvas = document.getElementById('bubblesCanvas');
const ctx = canvas.getContext('2d');

// Get buttons
const hitButton = document.getElementById('hitButton');
const resetButton = document.getElementById('resetButton');

// Circle properties
let circle = {
    x: 100,
    y: canvas.height / 2,
    radius: 30,
    color: getRandomColor()
};

// Arrow properties
let arrow = {
    x: canvas.width - 60,
    y: canvas.height / 2,
    width: 40,
    height: 10,
    speed: 5,
    moving: false
};

let collisionDetected = false;

// Function to generate random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to draw circle
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// Function to draw arrow
function drawArrow() {
    ctx.beginPath();
    ctx.rect(arrow.x, arrow.y - arrow.height / 2, arrow.width, arrow.height);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

// Function to detect collision
function detectCollision() {
    const distance = Math.sqrt(
        (arrow.x - circle.x) ** 2 + (arrow.y - circle.y) ** 2
    );
    return distance <= circle.radius;
}

// Function to move arrow
function moveArrow() {
    if (arrow.moving && !collisionDetected) {
        arrow.x -= arrow.speed; // Move arrow towards the circle
        if (detectCollision()) {
            collisionDetected = true;
            circle.color = getRandomColor(); // Change circle color on collision
            arrow.moving = false; // Stop the arrow after collision
        }
        draw(); // Redraw canvas
        requestAnimationFrame(moveArrow); // Continue animation
    }
}

// Function to reset application state
function resetApp() {
    circle.color = getRandomColor(); // Assign a new random color
    circle.x = 100; // Reset circle position
    arrow.x = canvas.width - 60; // Reset arrow position
    arrow.moving = false; // Stop arrow movement
    collisionDetected = false; // Reset collision state
    draw();
}

// Function to draw entire canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawCircle(); // Draw circle
    drawArrow(); // Draw arrow
}

// Add event listeners
hitButton.addEventListener('click', () => {
    if (!arrow.moving) {
        arrow.moving = true;
        moveArrow();
    }
});

resetButton.addEventListener('click', resetApp);

// Initial draw
draw();
