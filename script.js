import { Blues as blues } from "./data/dots";
import { hasPoint, debounce } from "./src/utils";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const RADIUS = 7;
const AXIS_OFFSET = 15;

const reds = blues.map((b) => ({ x: b.x * 4, y: b.y * 1.5 }));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paintPoins(blues, 'blue');
    paintPoins(reds, 'red');

    // paint axis
    ctx.beginPath();
    ctx.lineWidth = 5

    ctx.moveTo(0, -AXIS_OFFSET);
    ctx.lineTo(0, canvas.height);

    ctx.moveTo(-AXIS_OFFSET, 0);
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

function createPointFromClick(event) {
    if (event.button === 1 || event.button > 2) {
        return;
    }

    let x = event.offsetX - AXIS_OFFSET;
    let y = canvas.height - event.offsetY - AXIS_OFFSET;

    if (x < 0 || y < 0) {
        return;
    }

    let point = { x, y };
    
    if (hasPoint(blues, point, RADIUS << 1) || hasPoint(reds, point, RADIUS << 1)) {
        return;
    }

    const target = event.button === 0 ? blues : reds;
    target.push({ x, y })
    requestAnimationFrame(draw);
}

function resize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.transform(1, 0, 0, -1, 0, canvas.height)
    ctx.translate(AXIS_OFFSET, AXIS_OFFSET);
    requestAnimationFrame(draw)
}

window.addEventListener('resize', debounce(resize, 200))
window.addEventListener('mousedown', createPointFromClick);

canvas.addEventListener('contextmenu', (event) => event.preventDefault());

resize();
