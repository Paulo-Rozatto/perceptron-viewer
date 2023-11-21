import { throttle } from "./utils";

const btnRun = document.querySelector("#run");
const epochs = document.querySelector("#epochs")
const w1 = document.querySelector("#w1");
const w2 = document.querySelector("#w2");
const bias = document.querySelector("#bias");

let drawFunction = () => { };

const debounceTime = 20;

function set_sanitize(field, value, min = -1, max = 1) {
    value = parseFloat(value) || 0;

    if (field === epochs) {
        min = 1;
        max = 100;
    }

    value = Math.max(value, min)
    value = Math.min(value, max);
    field.value = value;
    field.title = value;

    value = Number.isInteger(value) ? value : value.toFixed(2);
    field.setAttribute('data-value', value);
}

function getParams() {
    set_sanitize(w1, w1.value);
    set_sanitize(w2, w2.value);
    set_sanitize(bias, bias.value);
    set_sanitize(epochs, epochs.value);
    return [
        [parseFloat(w1.value), parseFloat(w2.value)],
        parseFloat(bias.value),
        parseFloat(epochs.value)
    ]
}

export function setParams(weigths, b, eps) {
    set_sanitize(w1, weigths[0]);
    set_sanitize(w2, weigths[1]);
    set_sanitize(bias, b);
    set_sanitize(epochs, eps, 1, 50);
}

export function setRunFunction(fnc) {
    btnRun.onclick = () => {
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
    set_sanitize(event.target, event.target.value);
    onUiUpdate();
}

epochs.addEventListener('input', onInput);
w1.addEventListener('input', throttle(onInput, debounceTime));
w2.addEventListener('input', onInput);
bias.addEventListener('input', onInput);
