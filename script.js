import { Blues as blues, Reds as reds } from "./data/dots";
import { findPoint, debounce, throttle } from "./src/utils";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const RADIUS = 7;
const AXIS_OFFSET = 15;
const TWO_PI = 2 * Math.PI;

let hoveredPoint = null;
let selectedPoint = null;

const weights = [0, -1];
const bias = 300;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paintPoins(blues, 'blue');
    paintPoins(reds, 'red');

    if (hoveredPoint) {
        highlightPoint(hoveredPoint);
    }

    paintClassifier(weights, bias);

    // paint axis
    ctx.beginPath();
    ctx.lineWidth = 5
    ctx.strokeStyle = 'black';

    ctx.moveTo(0, -AXIS_OFFSET);
    ctx.lineTo(0, canvas.height);

    ctx.moveTo(-AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width, 0);

    ctx.stroke();
}

function paintClassifier(weights, bias) {
    let [w1, w2] = weights;

    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'green';

    let start = bias / -w2;
    let end = (canvas.width * w1 + bias) / -w2;

    ctx.moveTo(0, start)
    ctx.lineTo(canvas.width, end)
    ctx.stroke();
}

function paintPoins(points, color = 'blue') {
    ctx.fillStyle = color;

    for (let point of points) {
        ctx.beginPath();
        ctx.arc(point.x * canvas.width, point.y * canvas.height, RADIUS, 0, TWO_PI);
        ctx.fill();
    }
}

function highlightPoint(point) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(point.x * canvas.width, point.y * canvas.height, RADIUS, 0, TWO_PI);
    ctx.stroke();

}

function hoverPoint(event) {
    let x = event.offsetX - AXIS_OFFSET;
    let y = canvas.height - event.offsetY - AXIS_OFFSET;

    if (x < 0 || y < 0) {
        return;
    }

    const point = { x: x / canvas.width, y: y / canvas.height };
    const tolerance = 0.02;
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
    selectedPoint.x = x / canvas.width;
    selectedPoint.y = y / canvas.height;
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

    if (event.button === 1 || event.button > 2) {
        return;
    }

    let x = event.offsetX - AXIS_OFFSET;
    let y = canvas.height - event.offsetY - AXIS_OFFSET;

    if (x < 0 || y < 0) {
        return;
    }

    x /= canvas.width;
    y /= canvas.height;

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

window.addEventListener('keydown', () => {
    const mapper = (p) => ({ x: p.x * canvas.width, y: p.y * canvas.height })
    console.log(blues.map(mapper))
    console.log(reds.map(mapper));
})

canvas.addEventListener('contextmenu', (event) => event.preventDefault());
canvas.addEventListener('mousemove', throttle(handleMouseMove, 20));

resize();
