import { throttle } from "./utils";

const btnRun = document.querySelector("#run");
const message = document.querySelector("#message");
const epochs = document.querySelector("#epochs")
const w1 = document.querySelector("#w1");
const w2 = document.querySelector("#w2");
const bias = document.querySelector("#bias");

epochs.label = document.querySelector('label[for="epochs"]');
w1.label = document.querySelector('label[for="w1"]');
w2.label = document.querySelector('label[for="w2"]');
bias.label = document.querySelector('label[for="bias"]');

let drawFunction = () => { };

const debounceTime = 20;

function set(field, value, min = -1, max = 1) {
    value = parseFloat(value) || 0;

    field.value = value;
    field.title = value;

    value = Number.isInteger(value) ? value : value.toFixed(2);
    field.label?.setAttribute('data-value', value);
}

function getParams() {
    return [
        [parseFloat(w1.value), parseFloat(w2.value)],
        parseFloat(bias.value),
        parseFloat(epochs.value)
    ]
}

export function setParams(weigths, b, eps) {
    set(w1, weigths[0]);
    set(w2, weigths[1]);
    set(bias, b);
    set(epochs, eps, 1, 50);
}

export function setRunFunction(fnc) {
    btnRun.onclick = () => {
        message.classList.add("hide");
        let p = getParams();
        fnc(p[0], p[1], p[2]);
    };
}

export function setDrawFunction(func) {
    drawFunction = func;
}


let onUiUpdate = () => {
    let p = getParams();
    drawFunction(p[0], p[1], p[2]);
};
function onInput(event) {
    set(event.target, event.target.value);
    onUiUpdate();
}

epochs.addEventListener('input', onInput);
w1.addEventListener('input', throttle(onInput, debounceTime));
w2.addEventListener('input', onInput);
bias.addEventListener('input', onInput);
