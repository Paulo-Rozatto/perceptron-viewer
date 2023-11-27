import { DATA } from "./data/dots";
import { pointIndex, shuffle, debounce, throttle, sleep } from "./src/utils";
import { trainStep } from "./src/perceptron";
import { setDrawFunction, setParams, setRunFunction } from './src/ui-controller';

// Setting canvas & context
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// colors
const OGRE = "#FA5241";
const AZURE = "#4194FA";
const OPACITY = "99";

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
            const message = document.getElementById("message");
            message.classList.remove("hide");
            setTimeout(() => {
                message.classList.add("hide");
            }, 1500);
            break;
        }

        await sleep(200);
    }
}

function draw() {
    ctx.clearRect(-15, -15, canvas.width, canvas.height);

    paintClassifier(weights, bias);

    paintPoints(DATA);

    if (hoveredPoint) {
        highlightPoint(hoveredPoint);
    }

    // paint axis
    ctx.beginPath();

    ctx.moveTo(0, -AXIS_OFFSET);
    ctx.lineTo(0, canvas.height - AXIS_OFFSET)
    ctx.lineTo(10, canvas.height - AXIS_OFFSET - 20);
    ctx.lineTo(0, canvas.height - AXIS_OFFSET)
    ctx.lineTo(-10, canvas.height - AXIS_OFFSET - 20);

    ctx.moveTo(-AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width - AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width - AXIS_OFFSET - 20, 10);
    ctx.lineTo(canvas.width - AXIS_OFFSET, 0);
    ctx.lineTo(canvas.width - AXIS_OFFSET - 20, -10);

    ctx.lineWidth = 3
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function eventToCanvasCords(event) {
    hoveredCoords[0] = (event.offsetX - AXIS_OFFSET) / canvas.clientWidth;
    hoveredCoords[1] = 1 - (event.offsetY + AXIS_OFFSET) / canvas.clientHeight;
}

function paintArea(yIntercept, endX, endY, sign) {
    let color;

    color = sign > 0 ? AZURE : OGRE;
    ctx.fillStyle = color + OPACITY;
    ctx.beginPath();
    ctx.moveTo(0, yIntercept);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(endX, canvas.height);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.fill();

    color = sign > 0 ? OGRE : AZURE;
    let min = Math.min(0, endY, yIntercept);
    ctx.fillStyle = color + OPACITY;
    ctx.beginPath();
    ctx.moveTo(0, yIntercept);
    ctx.lineTo(0, min);
    ctx.lineTo(endX, min);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.fill();
}

function paintClassifier(weights, bias) {
    const [w1, w2] = weights;

    const yIntercept = (bias / -w2) * canvas.height;
    const endX = canvas.width;
    const endY = ((w1 + bias) / -w2) * canvas.height;

    paintArea(yIntercept, endX, endY, Math.sign(w2));

    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

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

    if (hoveredCoords[0] < 0 || hoveredCoords[1] < 0) {
        return;
    }

    const label = event.button === 0 ? 1 : 0;
    DATA.push([...hoveredCoords, label]);
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
