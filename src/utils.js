const isSamePoint = (p1, p2, tolerance) => {
    let x = Math.abs(p1.x - p2.x);
    let y = Math.abs(p1.y - p2.y);

    return x <= tolerance && y <= tolerance;
}

export function findPoint(src, point, tolerance = 0) {
    return src.find((srcPoint) => isSamePoint(srcPoint, point, tolerance));
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