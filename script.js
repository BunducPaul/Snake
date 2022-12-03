let points = 0
let time;
let snake = [9 + "," + 11];
let rowKey = 0;
let columnKey = 0
table();
moveSnake()

function table() {
    for (let i = 0; i < 23; ++i) {
        let row = document.createElement("row");
        for (let j = 0; j < 23; ++j) {
            cell = document.createElement("cell");
            cell.id = (i + "," + j)
            cell.innerHtml = "g";
            row.appendChild(cell);
        }
        document.getElementById("table").appendChild(row);
    }
    document.addEventListener("keydown", controls);
    document.getElementById(9 + "," + 11).style.backgroundColor = "#ffb03b";
    document.getElementById(9 + "," + 11).style.border = "solid 1px black"
    document.getElementById(9 + "," + 11).style.boxSizing = "border-box"
    foodSnake()
}

function controls(toward) {
    let keyCode = toward.key;
    if (keyCode == "ArrowUp" && snake.length == 1) {
        rowKey = -1;
        columnKey = 0
    } else if (keyCode == "ArrowUp" && snake.length > 1 && (rowKey != 1 && columnKey != 0)) {
        rowKey = -1;
        columnKey = 0
    }

    if (keyCode == "ArrowLeft" && snake.length == 1) {
        rowKey = 0;
        columnKey = -1;
    } else if (keyCode == "ArrowLeft" && snake.length > 1 && (rowKey != 0 && columnKey != 1)) {
        rowKey = 0;
        columnKey = -1;
    }

    if (keyCode == "ArrowDown" && snake.length == 1) {
        rowKey = 1;
        columnKey = 0
    } else if (keyCode == "ArrowDown" && snake.length > 1 && (rowKey != -1 && columnKey != 0)) {
        rowKey = 1;
        columnKey = 0
    }

    if (keyCode == "ArrowRight" && snake.length == 1) {
        rowKey = 0;
        columnKey = 1;
    } else if (keyCode == "ArrowRight" && snake.length > 1 && (rowKey != 0 && columnKey != -1)) {
        rowKey = 0;
        columnKey = 1;
    }
}

function moveSnake() {
    let time = setTimeout(moveSnake, 100);
    if (rowKey != 0 || columnKey != 0) {
        let rowTail = snake[snake.length - 1].match(/\d+/g)[0];
        let columnTail = snake[snake.length - 1].match(/\d+/g)[1]
        let row = snake[0].match(/\d+/g)[0];
        let column = snake[0].match(/\d+/g)[1]
        if ((((document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey))) == null)) || (snake.includes(((row - 0) + (rowKey) + "," + ((column - 0) + columnKey))))) {
            end()
            document.getElementById("endAndReset").style = "display:block";
            clearInterval(time);
            return
        }
        snake.unshift((row - 0) + (rowKey) + "," + ((column - 0) + columnKey))
        document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey)).style.backgroundColor = "#ffb03b";
        document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey)).style.border = "solid 1px black"
        document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey)).style.boxSizing = "border-box"
        if ((document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey)).hasAttribute("food", true))) {
            document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey)).removeAttribute("food", true);
            document.getElementById((row - 0) + (rowKey) + "," + ((column - 0) + columnKey)).style.backgroundImage = "";
            foodSnake()
            ++points
            document.getElementById("pointsCollected").textContent = points;
        } else {
            snake.pop();
            document.getElementById(rowTail + "," + columnTail).style.background = "#40a829";
            document.getElementById(rowTail + "," + columnTail).style.border = null
            document.getElementById(rowTail + "," + columnTail).style.boxSizing = null;
        }
    }
}

function foodSnake() {
    let randomFood = (Math.floor(Math.random() * 23)) + "," + (Math.floor(Math.random() * 23));
    if (snake.includes(randomFood)) {
        foodSnake();
    } else {
        document.getElementById(randomFood).setAttribute("food", true)
        document.getElementById(randomFood).style.backgroundColor = "white";
        document.getElementById(randomFood).style.background = "url('img/food.png')";

    }
}

function end() {
    let youLost = document.createElement("end")
    youLost.innerText = "YOU LOSE" + "\n" + "YOU SCORED : " + points + "\n" + "TOUCH EVERYWHERE TO START AGAIN";
    document.getElementById("endAndReset").appendChild(youLost);
    endAndReset.onclick = () => document.location.reload();
}

