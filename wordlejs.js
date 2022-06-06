var currentRow = 0;
var currentCol = 0;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var randomList = [];
var word;
var lives = 3;
var radios = document.getElementsByName("level");
var button = document.getElementById("button");
button.onclick = getLevel;


function getLevel() {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    generateWord();
    createGrid();
}

function generateWord() {
    word = "APPLE";
    for (var i = 0; i < 3; i++) {
        randomList[i] = Math.floor(Math.random() * alphabet.length)
        while (word.includes(alphabet[randomList[i]])) {
            randomList[i] = Math.floor(Math.random() * alphabet.length);
        }
    }
    alert(randomList);
}

function createGrid() {
    document.getElementById("form").parentNode.removeChild(document.getElementById("form"));
    for (var row = 0; row < 6; row++ ) {
        for (var col = 0; col < 5; col++) {
            var gridTile = document.createElement("span");
            gridTile.id = row.toString() + col.toString();
            gridTile.className = "gridTile";
            gridTile.innerText = "";
            document.getElementById("grid").appendChild(gridTile);
        }
    }
}
document.addEventListener("keyup", (e) => {
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (currentCol < 5) {
            var currentGridTile = document.getElementById(currentRow.toString() + currentCol.toString());
            if (currentGridTile.innerText == "") {
                currentGridTile.innerText = e.code[3];
                currentCol += 1;
            }
        }
    }

    else if (e.code == "Backspace"){
        if (0 < currentCol && currentCol <= 5) {
            currentCol -= 1;
        }
        var currentGridTile = document.getElementById(currentRow.toString() + currentCol.toString());
        currentGridTile.innerText = "";
    }
    
    else if (e.code == "Enter") {
        update();
        
    }
})

function update() {
    var correct = 0; 
    
    for (let c = 0; c < 5; c++) {
        var currentGridTile = document.getElementById(currentRow.toString() + c.toString());
        var letter = currentGridTile.innerText;
        if (word[c] == letter) {
            //correct += 1;
            currentGridTile.className = "correct";
        }
        else if (word.includes(letter)) {
            currentGridTile.className = "inWord";
        }
        else {
            currentGridTile.className = "wrong";
            for (var i = 0; i < 3; i++ ) {
                if (letter == alphabet[randomList[i]]){
                    currentGridTile.className = "secretLetter";
                    lives--;
                    document.getElementById("lives").innerText = "Lives: " + lives.toString();
                    if (lives == 0) {
                        gameOver();
                    }
                }
            }
        }
    }
    currentRow += 1;
    currentCol = 0;
    //alert(correct + " are correct so far!");
}

function gameOver(){
    if (lives == 0) {
        alert("Game Over, you ran out of lives :(");
    }
}