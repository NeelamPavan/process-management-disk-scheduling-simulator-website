function drawCanvas(points) {
    // Constant values
    let minPoint = 0;
    let maxPoint = 199;
    let yValueOfXAxis = 30;
    let canvasPadding = 15;
    let xAxisStart = canvasPadding;
    let xAxisEnd = c.width - canvasPadding;
    // Vars
    let x;
    let y;

    c.height = c.height + points.length * 30;
    ctx.clearRect(0, 0, c.width, c.height);

    /*** Draw x axis ***/
    y = yValueOfXAxis; // Set where x axis will be drawn
    drawLine(xAxisStart, y, xAxisEnd, y);

    /*** Set inputs on x axis ***/
    y = yValueOfXAxis;
    let multiplier = (xAxisEnd - xAxisStart) / maxPoint;

    // x Min point
    if (points.indexOf(minPoint.toString()) == -1) {
        x = xAxisStart;
        drawLine(x, y - 5, x, y + 5); // Draw minimum value
        drawText(minPoint, x - getNumberLenght(minPoint) * 4, y - 15);
    }

    // x Max point
    if (points.indexOf(maxPoint.toString()) == -1) {
        x = xAxisStart + maxPoint * multiplier;
        drawLine(x, y - 5, x, y + 5); // Draw maximum value
        drawText(maxPoint, x - getNumberLenght(maxPoint) * 4, y - 15);
    }

    // User input points on x axis
    var uniquePoints = points.filter(onlyUnique);
    uniquePoints.forEach(point => {
        x = xAxisStart + point * multiplier;
        drawLine(x, y - 5, x, y + 5);
        drawText(point, x - getNumberLenght(point) * 4, y - 15);
    });

    // Draw user inputs based on algorithm //
    y += 30;
    switch (selected) {
        case "fcfs":
            fcfs(x, y, xAxisStart, points, multiplier);
            break;
        case "sstf":
            sstf(x, y, xAxisStart, points, multiplier);
            break;
        case "scan":
            scan(x, y, xAxisStart, points, multiplier);
            break;
        case "look":
            look(x, y, xAxisStart, points, multiplier);
            break;
        default:
            break;
    }
}

// To load canavas
window.onload = function () {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
};

// Draw functions 
// function to draw line
function drawLine(startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// To draw points this function
function drawPoint(xPos, yPos, size) {
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, Math.PI * 2, true);
    ctx.fill();
}

// To show result this function works
function showResult(count) {
    let div = document.getElementById('count-output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = `Total head movements: <b>${count}</b>`;
}

// To show head count
function drawText(text, xPos, yPos) {
    ctx.font = "14px Arial";
    ctx.fillText(text, xPos, yPos);
}