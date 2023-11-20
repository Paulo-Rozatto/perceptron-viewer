const header = document.querySelector("header");
const formParameters = document.querySelector("#parameters");
const btnRun = document.querySelector("#run");
const btnToggle = document.querySelector("#toggle");

const epochs = document.querySelector("#epochs")
const w1 = document.querySelector("#w1");
const w2 = document.querySelector("#w2");
const bias = document.querySelector("#bias");

function set_sanitize(field, value, min = -1, max = 1) {
    value = parseFloat(value) || 0;
    value = Math.max(value, min)
    value = Math.min(value, max);
    field.value = value;
}

function getParams() {
    set_sanitize(w1, w1.value);
    set_sanitize(w2, w2.value);
    set_sanitize(bias, bias.value);
    set_sanitize(epochs, epochs.value, 1, 50);
    return [
        [parseFloat(w1.value), parseFloat(w2.value)],
        parseFloat(bias.value),
        parseFloat(epochs.value)
    ]
}

function toggle() {
    header.classList.toggle("show-column");
    formParameters.classList.toggle("show-column");
    btnToggle.classList.toggle("show-column");
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

btnToggle.addEventListener('click', toggle);