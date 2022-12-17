let points = 0
let time;
let snake = [9 + "," + 11];
let rowKey = 0;
let columnKey = 0
let move = false;
let eatSound = new Audio('sound/soundEat.mp3');
let deadSound = new Audio('sound/soundDead.mp3')
let playSound = new Audio('sound/soundPlay.mp3')

table();
moveSnake()

function table() {
    for (let i = 0; i < 23; ++i) {
        let row = document.createElement("row");
        for (let j = 0; j < 23; ++j) {
            cell = document.createElement("cell");
            cell.id = (i + "," + j)
            row.appendChild(cell);
        }
        document.getElementById("table").appendChild(row);
    }
    document.addEventListener("keydown", controls);
    let startGamePositioning = document.getElementById(9 + "," + 11);
    startGamePositioning.style.backgroundColor = "#ffb03b";
    startGamePositioning.style.border = "solid 1px black"
    startGamePositioning.style.boxSizing = "border-box"
    foodSnake()
    playSound.play()
}

function controls(toward) {
    if (move == false) {
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
    move = true;
}

function moveSnake() {
    let time = setTimeout(moveSnake, 150);
    if ((rowKey != 0 || columnKey != 0)) {
        let row = snake[0].match(/\d+/g)[0];
        let column = snake[0].match(/\d+/g)[1]
        theCoordinatesOfTheNextCell = (row - 0) + (rowKey) + "," + ((column - 0) + columnKey)
        theNextCell = document.getElementById(theCoordinatesOfTheNextCell);
        snakeTail = document.getElementById(snake[snake.length - 1]);
        if ((theNextCell == null) || (snake.includes(theCoordinatesOfTheNextCell))) {
            deadSound.play();
            end()
            document.getElementById("endAndReset").style = "display:block";
            clearInterval(time);
            return
        }
        snake.unshift(theCoordinatesOfTheNextCell)
        theNextCell.style.backgroundColor = "#ffb03b";
        theNextCell.style.border = "solid 1px black"
        theNextCell.style.boxSizing = "border-box"
        if ((theNextCell).hasAttribute("food", true)) {
            eatSound.play();
            theNextCell.removeAttribute("food", true);
            theNextCell.style.backgroundImage = "";
            foodSnake()
            ++points
            document.getElementById("pointsCollected").textContent = points;
        } else {
            snake.pop();
            snakeTail.style.background = "#40a829";
            snakeTail.style.border = null
            snakeTail.style.boxSizing = null;
        }
        move = false
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

