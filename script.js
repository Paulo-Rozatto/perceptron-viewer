import { DATA } from "./data/dots";
import { pointIndex, shuffle, debounce, throttle, sleep } from "./src/utils";
import { trainStep } from "./src/perceptron";
import { setDrawFunction, setParams, setRunFunction } from './src/ui-controller';

// Setting canvas & context
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Setting some aux constants
const RADIUS = 7;
const AXIS_OFFSET = 15;
const TWO_PI = 2 * Math.PI;

// Utils variables
const hoveredCoords = [-1, -1];
let hoveredPoint = null;
let selectedPoint = null;
let lastHoveredIndex = -1;

// Main parameters
let weights = [Math.random(), Math.random() - 1];
let bias = 0;
let epochs = 50;

async function perceptron(W, b, eps) {
    const points = shuffle(DATA);
    const inputs = points.map(e => [e[0], e[1]]);
    const labels = points.map(e => e[2])

    weights[0] = W[0];
    weights[1] = W[1];
    bias = b;
    epochs = eps;

    let result;
    for (let i = 0; i < epochs; i++) {
        result = trainStep(inputs, labels, weights, bias, 0.1)
        bias = result.bias;

        requestAnimationFrame(draw)
        setParams(weights, bias, epochs);

        if (!result.updatedWeights) {
            break;
        }

        await sleep(200);
    }
}

function draw() {
    ctx.clearRect(-15, -15, canvas.width, canvas.height);

    paintPoints(DATA);

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

function eventToCanvasCords(event) {
    hoveredCoords[0] = (event.offsetX - AXIS_OFFSET) / canvas.clientWidth;
    hoveredCoords[1] = 1 - (event.offsetY + AXIS_OFFSET) / canvas.clientHeight;
}

function paintClassifier(weights, bias) {
    const [w1, w2] = weights;

    const yIntercept = (bias / -w2) * canvas.height;
    const endX = canvas.width;
    const endY = ((w1 + bias) / -w2) * canvas.height;

    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'green';

    ctx.moveTo(0, yIntercept)
    ctx.lineTo(endX, endY)
    ctx.stroke();
}

function paintPoints(points) {
    for (let point of points) {
        ctx.fillStyle = point[2] === 1 ? 'blue' : 'red';
        ctx.beginPath();
        ctx.arc(point[0] * canvas.width, point[1] * canvas.height, RADIUS, 0, TWO_PI);
        ctx.fill();
    }
}

function highlightPoint(point) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(point[0] * canvas.width, point[1] * canvas.height, RADIUS, 0, TWO_PI);
    ctx.stroke();

}

function hoverPoint() {
    // x < 0 OR y < 0
    if (hoveredCoords[0] < 0 || hoveredCoords[1] < 0) {
        return;
    }

    const tolerance = 0.02;
    let index = pointIndex(DATA, hoveredCoords, tolerance);

    if (index !== lastHoveredIndex) {
        hoveredPoint = DATA[index];
        requestAnimationFrame(draw);
        canvas.style.cursor = hoveredCoords ? 'pointer' : '';
        lastHoveredIndex = index;
    }
}

function panSelectedPoint(event) {
    if (!selectedPoint) {
        return;
    }

    selectedPoint[0] = hoveredCoords[0]
    selectedPoint[1] = hoveredCoords[1]
    requestAnimationFrame(draw);
}

function handleMouseMove(event) {
    eventToCanvasCords(event);

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

    x /= canvas.clientWidth;
    y /= canvas.clientHeight;

    const label = event.button === 0 ? 1 : 0;
    DATA.push([x, y, label]);
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
    // that couple lines below don't guarantee that width and height will be equals to clientWidth and clientHeight
    // it looks like that when chaging width/height the clientWidth/Height changes
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.transform(1, 0, 0, -1, 0, canvas.height)
    ctx.translate(AXIS_OFFSET, AXIS_OFFSET);
    requestAnimationFrame(draw)
}

function onUiUpdate(W, b, eps) {
    weights[0] = W[0];
    weights[1] = W[1];
    bias = b;
    epochs = eps;

    requestAnimationFrame(draw);
}

window.addEventListener('resize', debounce(resize, 200))

canvas.addEventListener('contextmenu', (event) => event.preventDefault());
canvas.addEventListener('mousemove', throttle(handleMouseMove, 20));
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

setParams(weights, bias, epochs);
setRunFunction(perceptron);
setDrawFunction(onUiUpdate);
resize();
