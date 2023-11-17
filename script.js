import { Blues as blues } from "./data/dots";
import { findPoint, debounce, throttle } from "./src/utils";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const RADIUS = 7;
const AXIS_OFFSET = 15;
const TWO_PI = 2 * Math.PI;

let hoveredPoint = null;
let selectedPoint = null;

const reds = blues.map((b) => ({ x: b.x * 4, y: b.y * 1.5 }));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paintPoins(blues, 'blue');
    paintPoins(reds, 'red');

    if (hoveredPoint) {
        highlightPoint(hoveredPoint);
    }

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

    for (let point of points) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, RADIUS, 0, TWO_PI);
        ctx.fill();
    }
}

function highlightPoint(point) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(point.x, point.y, RADIUS, 0, TWO_PI);
    ctx.stroke();

}

function hoverPoint(event) {
    let x = event.offsetX - AXIS_OFFSET;
    let y = canvas.height - event.offsetY - AXIS_OFFSET;

    if (x < 0 || y < 0) {
        return;
    }

    const point = { x, y }
    const tolerance = RADIUS << 1;
    let hover = findPoint(blues, point, tolerance) || findPoint(reds, point, tolerance);

    if (hoveredPoint !== hover) {
        hoveredPoint = hover;
        requestAnimationFrame(draw);
        canvas.style.cursor = hoveredPoint ? 'pointer' : '';
    }
}

function panSelectedPoint(event) {
    if (!selectedPoint) {
        return;
    }

    let x = event.offsetX - AXIS_OFFSET;
    let y = canvas.height - event.offsetY - AXIS_OFFSET;
    selectedPoint.x = x;
    selectedPoint.y = y;
    requestAnimationFrame(draw);
}

function handleMouseMove(event) {
    if (selectedPoint) {
        panSelectedPoint(event);
        return;
    }

    hoverPoint(event);
}

function createPointFromClick(event) {
    if (Boolean(hoveredPoint)) {
        return;
    }

    let x = event.offsetX - AXIS_OFFSET;
    let y = canvas.height - event.offsetY - AXIS_OFFSET;

    if (event.button === 1 || event.button > 2) {
        return;
    }

    if (x < 0 || y < 0) {
        return;
    }

    const target = event.button === 0 ? blues : reds;
    target.push({ x, y })
    requestAnimationFrame(draw);
}

function handleMouseDown(event) {
    if (Boolean(hoveredPoint)) {
        selectedPoint = hoveredPoint;
        return;
    }

    createPointFromClick(event);
}

function handleMouseUp() {
    hoveredPoint = null;
    selectedPoint = null;
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
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

canvas.addEventListener('contextmenu', (event) => event.preventDefault());
canvas.addEventListener('mousemove', throttle(handleMouseMove, 20));

resize();
