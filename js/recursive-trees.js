document.addEventListener("DOMContentLoaded", () => {

    // Globals
    // =======
    const canvas = document.createElement("canvas");
    [canvas.width, canvas.height] = [screen.width, screen.height];
    const context = canvas.getContext("2d");


    const setupCanvasState = () => {
        context.fillStyle = "black";
        context.strokeStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.translate(canvas.width/2, canvas.height/2);
        context.scale(1, -1);
    };

    const drawLineFromOrigin = (endPoint) => {
        context.moveTo(0, 0);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
    }

    const drawTreeStem = (stemEndPoint) => {
        const invertedStem = Object.create(null);
        [invertedStem.x, invertedStem.y] = [stemEndPoint.x, -1*stemEndPoint.y];
        drawLineFromOrigin(invertedStem);
    };

    const drawTreeTop = (basePoint, branchLength, spread=2) => {
        if (branchLength < 2) {
            return;
        }

        let leftPoint = Object.create(null);
        leftPoint.x = -1 * branchLength/spread;
        leftPoint.y = branchLength;

        let rightPoint = Object.create(null);
        rightPoint.x = branchLength/spread;
        rightPoint.y = branchLength;

        drawLineFromOrigin(leftPoint);
        drawLineFromOrigin(rightPoint);

        // Handle right side of tree
        context.save();
        context.translate(rightPoint.x, rightPoint.y);
        context.rotate(-1 * Math.PI/4);
        drawTreeTop(rightPoint, branchLength*0.6);
        context.restore();

        // Handle left side of tree
        context.save();
        context.translate(leftPoint.x, leftPoint.y);
        context.rotate(Math.PI/4);
        drawTreeTop(leftPoint, branchLength*0.6);
        context.restore();
    }


    setupCanvasState();

    const stemTopIntersect = Object.create(null);
    [stemTopIntersect.x, stemTopIntersect.y] = [0, canvas.height/3];

    drawTreeStem(stemTopIntersect);
    drawTreeTop(stemTopIntersect, 150);

    document.body.appendChild(canvas);
});
