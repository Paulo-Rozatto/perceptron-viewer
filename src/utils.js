const isSamePoint = (p1, p2, tolerance) => {
    let x = Math.abs(p1[0] - p2[0]);
    let y = Math.abs(p1[1] - p2[1]);

    return x <= tolerance && y <= tolerance;
}

export function findPoint(src, point, tolerance = 0) {
    return src.find((srcPoint) => isSamePoint(srcPoint, point, tolerance));
}

export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce(callback, time) {
    let timeout;

    return () => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(callback, time)
    }
}

export function throttle(callback, time) {
    let isPaused = false;

    const togglePause = () => { isPaused = !isPaused };

    return (event) => {
        if (isPaused) return;
        togglePause();
        callback(event);
        setTimeout(togglePause, time)
    }
}