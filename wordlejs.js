var currentRow = 0;
var currentCol = 0;
 
var level;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var randomList = [];
var word;
var lives = 3;
var currentGridTile;
var gameStop = false;
var tileDict = {};
var imgID = [];
var imgIDIndex = 0;
var radios = document.getElementsByName("level");
var button = document.getElementById("button");
button.onclick = getLevel;


function getLevel() {
    var selected = true;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            level = radios[i].value;
            break;
        }
        if (i == 2 && !radios[i].checked) {
            alert("please select a choice before clicking start");
            selected = false;
        }
    }
    fetch(level).then(response => response.text()).then(data => {
        var words = data.split('\n');
        word = words[Math.floor(Math.random() * words.length)];
        generateWord(word);
    });
    if (selected) {
        createGrid();
    }
    
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
    }
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
                var dict = data.split('\n');
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
    var result = {};
    for (i in word) {
        if (word[i] in result) {
            result[word[i]] += 1;
        }
        else {
            result[word[i]] = 1;
        }
    }
    var userResult = {};
    for (j in userWord) {
        if (word.includes(userWord[j])) {
            if (userWord[j] in userResult) {
                userResult[userWord[j]] += 1;
            }
            else {
                userResult[userWord[j]] = 1;
            }
        }
    }
    for (let c = 0; c < 5; c++) {
        currentGridTile = document.getElementById(currentRow.toString() + c.toString());
            if (word[c] == userWord[c]) {
                correct += 1;
                var temp = currentGridTile.innerText;
                currentGridTile.className = "correct";
                currentGridTile.innerText = "";
                var joy = document.createElement("img");
                joy.src = "images/joy.gif";
                joy.height = 60;
                joy.width = 60;
                joy.id = "joy" + currentGridTile.id;
                imgID[imgIDIndex] = joy.id;
                imgIDIndex++;
                tileDict[currentGridTile.id] = temp;
                currentGridTile.appendChild(joy);
                result[word[c]]--;
                if (word[c] in userResult) {
                    userResult[word[c]]--;
                }
            }
            else if (word.includes(userWord[c])) {
                if (userWord[c] in result) {
                    if (userResult[userWord[c]] <= result[userWord[c]]) {
                        var temp = currentGridTile.innerText;
                        currentGridTile.className = "inWord";
                        currentGridTile.innerText = "";
                        var disgust = document.createElement("img");
                        disgust.src = "images/disgust.gif";
                        disgust.height = 60;
                        disgust.width = 60;
                        disgust.id = "disgust" + currentGridTile.id;
                        imgID[imgIDIndex] = disgust.id;
                        imgIDIndex++;
                        tileDict[currentGridTile.id] = temp;
                        currentGridTile.appendChild(disgust);
                    }
                    else {
                        currentGridTile.className = "wrong";
                    }
                }
                else {
                    var temp = currentGridTile.innerText;
                    currentGridTile.className = "inWord";
                    currentGridTile.innerText = "";
                    var disgust = document.createElement("img");
                    disgust.src = "images/disgust.gif";
                    disgust.height = 60;
                    disgust.width = 60;
                    disgust.id = "disgust" + currentGridTile.id;
                    imgID[imgIDIndex] = disgust.id;
                    imgIDIndex++;
                    tileDict[currentGridTile.id] = temp;
                    currentGridTile.appendChild(disgust);
                }
            }
        else {
            currentGridTile.className = "wrong";
            for (var i = 0; i < 3; i++ ) {
                if (userWord[c] == alphabet[randomList[i]]){
                    var temp = currentGridTile.innerText;
                    currentGridTile.className = "secretLetter";
                    currentGridTile.innerText = "";
                    var fear = document.createElement("img");
                    fear.src = "images/fear.gif";
                    fear.height = 60;
                    fear.width = 60;
                    fear.id = "fear" + currentGridTile.id;
                    imgID[imgIDIndex] = fear.id;
                    imgIDIndex++;
                    tileDict[currentGridTile.id] = temp;
                    currentGridTile.appendChild(fear);
                    lives--;
                    if (lives < 0) {
                        lives = 0;
                    }
                    document.getElementById("lives").innerText = "Lives: " + lives.toString();
                }
            }
        }
    }
    setTimeout(setBackText, 5000);
    currentRow += 1;
    if (correct == 5) {
        gameWin();
    }
    else if (lives == 0) {
        gameOver();
    }
    else if (currentRow > 5) {
        gameOver();
    }
    currentCol = 0;
}
function setBackText() {
    for (var i = 0; i < imgID.length; i++) {
        var currentImg = document.getElementById(imgID[i]);
        var tileID = imgID[i].substring(imgID[i].length - 2);
        var tile = document.getElementById(tileID);
        currentImg.parentNode.removeChild(currentImg);
        tile.innerText = tileDict[tileID];
    }
    imgID = [];
    imgIDIndex = 0;
    tileDict = {};
}
function getWord() {
    currentGridTile = document.getElementById(currentRow.toString() + '0');
    var letter = currentGridTile.innerText;
    var string = letter;
    for (var i = 1; i < 5; i++) {
        currentGridTile = document.getElementById(currentRow.toString() + i.toString());
        letter = currentGridTile.innerText;
        string += letter;
    }
    return string;
}

function gameOver(){
    var message = document.getElementById("gameFinishMessage");
    var divider = document.getElementById("gameFinish");
    var character = document.createElement("img");
    if (lives == 0) {
        gameStop = true;
        message.innerText = "GAME OVER\n You ran out of lives :( click the button to play again\n The word was: " + word;
        character.src = "images/anger.gif";
    }
    else {
        gameStop = true;
        message.innerText = "GAME OVER\n You ran out of guesses :/ click the button to play again\n The word was: " + word;
        character.src = "images/sadness.gif";
    }
    character.id = "character";
    character.height = 100;
    character.width = 100;
    divider.appendChild(character);
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Play Again";
    button.id= "playAgain";

    document.getElementById("gameFinish").appendChild(button);
    button.onclick = reload;
}
function gameWin() {
    var divider = document.getElementById("gameFinish");
    var bingBong = document.createElement("img");
    bingBong.src = "images/bingbong.gif";
    bingBong.id = "character";
    bingBong.height = 100;
    bingBong.width = 100;
    divider.appendChild(bingBong);

    var button = document.createElement("input");
    button.type = "button";
    button.value = "Play Again";
    button.id = "playAgain";
    divider.appendChild(button);
    button.onclick = reload;

    var message = document.getElementById("gameFinishMessage");
    gameStop = true;
    message.innerText = "Congrats! You Won!\n click the button to play again";
 
}
function reload() {
    document.location.reload();
}