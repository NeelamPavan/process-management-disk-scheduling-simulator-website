// FCFS
function fcfs(x, y, xAxisStart, points, multiplier) {
  let prevPointXValue;
  let headMovementCount = 0;

  for (let i = 0; i < points.length; i++) {
    x = xAxisStart + points[i] * multiplier;
    drawPoint(x, y, 4);

    if (i != 0) {
      drawLine(prevPointXValue, y - 30, x, y);
      headMovementCount += Math.abs(points[i] - points[i - 1]);
    }
    prevPointXValue = x;
    y += 30;
  }
  showResult(headMovementCount);
}

// SSTF
function sstf(x, y, xAxisStart, points, multiplier) {
  //Change string values to integers
  for (let i = 0; i < points.length; i++) {
    points[i] = points[i] * 1;
  }

  let prevPointXValue; // previous cordinate of x
  let headMovementCount = 0; // for counting head movements

  //Mark first point, remove from array afterwards
  let lastValue = points[0];
  x = xAxisStart + lastValue * multiplier;
  drawPoint(x, y, 4);
  prevPointXValue = x;
  y += 30;
  points.splice(0, 1);

  while (points.length > 0) {
    let difference = 999999;
    let position = 0;

    for (let i = 0; i < points.length; i++) {
      if (Math.abs(lastValue - points[i]) < difference) {
        difference = Math.abs(lastValue - points[i]);
        position = i;
      }
    }

    x = xAxisStart + points[position] * multiplier;
    drawPoint(x, y, 4);
    drawLine(prevPointXValue, y - 30, x, y);
    headMovementCount += difference;
    prevPointXValue = x;
    y += 30;

    lastValue = points[position];
    points.splice(position, 1);
  }
  showResult(headMovementCount);
}

// SCAN
function scan(x, y, xAxisStart, points, multiplier) {
  //Change string values to integers
  for (let i = 0; i < points.length; i++) {
    points[i] = points[i] * 1;
  }

  let prevPointXValue;
  let headMovementCount = 0;

  //Check nearest end
  let startOnLeft = true;
  if (points[0] > 99) {
    startOnLeft = false;
  }

  //Mark first point, remove from array afterwards
  let lastValue = points[0];
  let start = lastValue;
  x = xAxisStart + lastValue * multiplier;
  drawPoint(x, y, 4);
  prevPointXValue = x;
  y += 30;
  points.splice(0, 1);

  let valuesBeforeStart = [];
  let valuesAfterStart = [];

  if (startOnLeft) {
    //Put values in arrays for easier drawing
    for (let i = 0; i < points.length; i++) {
      if (points[i] < start) {
        valuesBeforeStart.push(points[i]);
      } else {
        valuesAfterStart.push(points[i]);
      }
    }

    //Sort values that comes before start descending
    valuesBeforeStart = valuesBeforeStart.sort((a, b) => b - a);
    if (valuesBeforeStart.indexOf(0) == -1) {
      valuesBeforeStart.push(0);
    }

    //Sort values that comes after start ascending
    valuesAfterStart = valuesAfterStart.sort((a, b) => a - b);
  } else {
    //Put values in arrays for easier drawing
    for (let i = 0; i < points.length; i++) {
      if (points[i] < start) {
        valuesAfterStart.push(points[i]);
      } else {
        valuesBeforeStart.push(points[i]);
      }
    }
    //Sort values that comes before start ascending
    valuesBeforeStart = valuesBeforeStart.sort((a, b) => a - b);
    if (valuesBeforeStart.indexOf(199) == -1) {
      valuesBeforeStart.push(199);
    }

    //Sort values that comes after start descending
    valuesAfterStart = valuesAfterStart.sort((a, b) => b - a);
  }

  let difference = 0;
  //Draw values on the left of the start
  for (let i = 0; i < valuesBeforeStart.length; i++) {
    if (i != 0) {
      difference = lastValue - valuesBeforeStart[i];
    } else {
      difference = start - valuesBeforeStart[i];
    }
    lastValue = valuesBeforeStart[i];

    headMovementCount += Math.abs(difference);
    x = xAxisStart + valuesBeforeStart[i] * multiplier;
    drawPoint(x, y, 4);
    drawLine(prevPointXValue, y - 30, x, y);
    prevPointXValue = x;
    y += 30;
  }

  //Draw values on the right of the start
  for (let i = 0; i < valuesAfterStart.length; i++) {
    difference = lastValue - valuesAfterStart[i];
    lastValue = valuesAfterStart[i];

    headMovementCount += Math.abs(difference);
    x = xAxisStart + valuesAfterStart[i] * multiplier;
    drawPoint(x, y, 4);
    drawLine(prevPointXValue, y - 30, x, y);
    prevPointXValue = x;
    y += 30;
  }
  showResult(headMovementCount);
}

//LOOK
function look(x, y, xAxisStart, points, multiplier) {
  //Change string values to integers
  for (let i = 0; i < points.length; i++) {
    points[i] = points[i] * 1;
  }

  let prevPointXValue;
  let headMovementCount = 0;

  let lastValue = points[0];
  x = xAxisStart + lastValue * multiplier;
  drawPoint(x, y, 4);
  prevPointXValue = x;
  y += 30;
  points.splice(0, 1);

  let a = [];
  let b = [];

  for (let i = 0; i < points.length; i++) {
    if (lastValue < points[i]) {
      a.push(points[i]);
    } else {
      b.push(points[i]);
    }
  }
  a = a.sort(function (a, b) {
    return a - b;
  });
  b = b.sort(function (a, b) {
    return b - a;
  });

  headMovementCount =
    a[a.length - 1] - lastValue + (a[a.length - 1] - b[b.length - 1]);
  for (let i = 0; i < a.length; i++) {
    x = xAxisStart + a[i] * multiplier;
    drawPoint(x, y, 4);
    drawLine(prevPointXValue, y - 30, x, y);
    prevPointXValue = x;
    y += 30;
  }
  for (let i = 0; i < b.length; i++) {
    x = xAxisStart + b[i] * multiplier;
    drawPoint(x, y, 4);
    drawLine(prevPointXValue, y - 30, x, y);
    prevPointXValue = x;
    y += 30;
  }
  showResult(headMovementCount);
}
