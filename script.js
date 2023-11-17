import { Blues as blues } from "./data/dots";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const RADIUS = 7;

const reds = blues.map((b) => ({ x: b.x * 4, y: b.y * 1.5 }));

function draw() {
    ctx.transform(1, 0, 0, -1, 0, canvas.height)
    ctx.translate(15, 15);

    paintPoins(blues, 'blue');
    paintPoins(reds, 'red');

    ctx.beginPath();
    ctx.lineWidth = 5

    ctx.moveTo(0, -15);
    ctx.lineTo(0, canvas.height);

    ctx.moveTo(-15, 0);
    ctx.lineTo(canvas.width, 0);

    ctx.stroke();
}

function paintPoins(points, color = 'blue') {
    ctx.fillStyle = color;

    const pi2 = Math.PI << 1;
    for (let point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, RADIUS, 0, pi2);
        ctx.fill();
    }
}

function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    requestAnimationFrame(draw)
}

function debounceResize() {
    if (this.timeout) {
        clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(resize, 200);
}

window.addEventListener('resize', debounceResize)

resize();
