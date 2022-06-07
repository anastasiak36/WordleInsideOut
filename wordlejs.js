var currentRow = 0;
var currentCol = 0;
var level;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var randomList = [];
var word;
var lives = 3;
var currentGridTile;
var gameStop = false;
var radios = document.getElementsByName("level");
var button = document.getElementById("button");
button.onclick = getLevel;


function getLevel() {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            //alert(radios[i].value);

            // only one radio can be logically checked, don't check the rest
            level = radios[i].value;
            break;
            
        }
    }
    fetch(level).then(response => response.text()).then(data => {
        var words = data.split('\n');
        word = words[Math.floor(Math.random() * words.length)];
        generateWord(word);
    });
    
    createGrid();
}

function generateWord(w) {
    word = w.toUpperCase();
    console.log(word);
    var randomLetters = "";
    for (var i = 0; i < 3; i++) {
        randomList[i] = Math.floor(Math.random() * alphabet.length);
        while (word.includes(alphabet[randomList[i]]) || randomLetters.includes(alphabet[randomList[i]])) {
            randomList[i] = Math.floor(Math.random() * alphabet.length);
        }
        randomLetters += alphabet[randomList[i]];
        //alphabet = alphabet.substring(0, randomList[i]) + alphabet.substring(randomList[i] + 1);
        console.log(randomLetters);
        //console.log(alphabet);
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
    if (!gameStop) {
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (currentCol < 5) {
                currentGridTile = document.getElementById(currentRow.toString() + currentCol.toString());
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
            currentGridTile = document.getElementById(currentRow.toString() + currentCol.toString());
            currentGridTile.innerText = "";
        }
        
        else if (e.code == "Enter") {
            var currentUserWord = getWord();
            fetch('words.txt').then(response => response.text()).then(data => {
                var dict = data.split('\r\n');
                //console.log(currentUserWord.toLowerCase());
                if (dict.indexOf(currentUserWord.toLowerCase()) != -1) {
                    update(currentUserWord);
                }
                else {
                    alert("The word you typed is not a word, please try again");
                }
            });
            
            
            
        }
    }
    
})

function update(userWord) {
    var correct = 0; 
    for (let c = 0; c < 5; c++) {
        currentGridTile = document.getElementById(currentRow.toString() + c.toString());
        //console.log(word);
        //console.log(userWord[c]);
        if (word[c] == userWord[c]) {
            correct += 1;
            currentGridTile.className = "correct";
        }
        else if (word.includes(userWord[c])) {
            currentGridTile.className = "inWord";
        }
        else {
            currentGridTile.className = "wrong";
            for (var i = 0; i < 3; i++ ) {
                if (userWord[c] == alphabet[randomList[i]]){
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
    if (correct == 5) {
        gameWin();
    }
    currentRow += 1;
    if (currentRow > 5) {
        gameOver();
    }
    currentCol = 0;
    //alert(correct + " are correct so far!");
}
function getWord() {
    currentGridTile = document.getElementById(currentRow.toString() + '0');
    var letter = currentGridTile.innerText;
    var string = letter;
    for (var i = 1; i < 5; i++) {
        //console.log(string);
        currentGridTile = document.getElementById(currentRow.toString() + i.toString());
        letter = currentGridTile.innerText;
        string += letter;
    }
    return string;
}

function gameOver(){
    if (lives == 0) {
        gameStop = true;
        alert("Game Over, you ran out of lives :(");
    }
    else {
        gameStop = true;
        alert("Game Over, you ran out of guesses :/");
    }
}
function gameWin() {
    alert("congrats you won :)");
}