document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = [screen.width, screen.height];
    const context = canvas.getContext("2d");


    const drawLine = (startPoint, endPoint) => {
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
    }

    const matrixRotate = (point, radians, couterClockwise=false) => {
        let rotatedPoint = Object.create(null);
        if (couterClockwise) {
            let [a, b] = [Math.cos(radians), Math.sin(radians)];
            let [c, d] = [-1 * Math.sin(radians), Math.cos(radians)];
            rotatedPoint.x = (point.x * a) + (point.y * b)
            rotatedPoint.y = (point.x * c) + (point.y * d)
        } else {
            let [a, b] = [Math.cos(radians), -1 * Math.sin(radians)];
            let [c, d] = [Math.sin(radians), Math.cos(radians)];
            rotatedPoint.x = (point.x * a) + (point.y * b)
            rotatedPoint.y = (point.x * c) + (point.y * d)
        }

        return rotatedPoint;
    }

    const drawTree = (basePoint, length) => {
        if (length < 2) {
            return;
        }

        let leftPoint = Object.create(null);
        leftPoint.x = basePoint.x - length;
        leftPoint.y = basePoint.y + length;

        let rightPoint = Object.create(null);
        rightPoint.x = basePoint.x + length;
        rightPoint.y = basePoint.y + length;

        drawLine(basePoint, leftPoint);
        drawTree(leftPoint, length/2);

        drawLine(basePoint, rightPoint);
        drawTree(rightPoint, length/2);
    }


    context.fillStyle = "black";
    context.strokeStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // drawTree({x: canvas.width/2, y: 0}, 300);
    let startPoint = { x : canvas.width/2, y: 0 }
    let testPoint = { x: canvas.width/2 , y: 100 };
    let rotatedPoint = matrixRotate(testPoint, Math.PI/4, true);
    drawLine(startPoint, testPoint);
    drawLine(startPoint, rotatedPoint);

    console.log(testPoint);
    console.log(rotatedPoint);

    document.body.appendChild(canvas);
});
