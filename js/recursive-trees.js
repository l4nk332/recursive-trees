document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = [screen.width, screen.height];
    const context = canvas.getContext("2d");


    const drawLine = (startPoint, endPoint) => {
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
    }

    const matrixRotate = (point, radians) => {
        // Apply Matrix
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

    drawTree({x: canvas.width/2, y: 0}, 300);

    document.body.appendChild(canvas);
});
