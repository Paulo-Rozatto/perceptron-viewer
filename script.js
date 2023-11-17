const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const main = document.querySelector("main");

function draw() {
    ctx.transform(1, 0, 0, -1, 0, canvas.height)
    ctx.translate(15, 15);

    ctx.lineWidth = 5

    ctx.moveTo(0, -15);
    ctx.lineTo(0, canvas.height);

    ctx.moveTo(-15, 0);
    ctx.lineTo(canvas.width, 0);

    ctx.stroke();
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
