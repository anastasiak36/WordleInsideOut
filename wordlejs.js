var currentRow = 0;
var currentCol = 0;
 
var level;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var randomList = [];
var word;
var lives = 3;
var currentGridTile;
var gameStop = false;
// var tileJoy;
// var letterJoy; 
// var characterJoy;
// var tileFear;
// var letterFear;
// var cahracterFear;
// var tileDisgust;
// var letterDisgust;
// var characterDisgust; 
var tileDict = {};
var imgID = [];
var imgIDIndex = 0;
var radios = document.getElementsByName("level");
var button = document.getElementById("button");
button.onclick = getLevel;


function getLevel() {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
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
    word = "PIZZA";//w.toUpperCase();
    
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
    //alert(randomList);
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
    var result = {};
    for (i in word) {
        if (word[i] in result) {
            result[word[i]] += 1;
        }
        else {
            result[word[i]] = 1;
        }
        console.log(word[i]);
        console.log(result[word[i]]);
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
            console.log(userWord[j]);
            console.log(userResult[userWord[j]]);
        }
    }
    // console.log(result);
    // console.log(userResult);
    for (let c = 0; c < 5; c++) {
        currentGridTile = document.getElementById(currentRow.toString() + c.toString());
        // if (word.includes(userWord[c])) {
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
                //tileJoy = currentGridTile;
                // letterJoy = temp;
                // characterJoy = joy;
                // setTimeout(function() {setBackTextJoy(currentGridTile, temp, joy)}, 2000);
                
                // currentGridTile.innerText = joy;
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
                        // tileDisgust = currentGridTile;
                        // letterDisgust = temp;
                        // characterDisgust = disgust;
                        // setTimeout(function() {setBackTextDisgust(currentGridTile, temp, disgust)}, 3000);
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
                    // tileDisgust = currentGridTile;
                    // letterDisgust = temp;
                    // characterDisgust = disgust;
                    // setTimeout(function() {setBackTextDisgust(currentGridTile, temp, disgust)}, 3000);
                }
            }
            // else if (word.includes(userWord[c])) {
            //     var letterArray = word.split;
            //     for (let checkLetter = 0; checkLetter < letterArray.length; checkLetter++) {
            //         if (userWord[c] == letterArray[checkLetter]) {
            //             currentGridTile.className = "inWord";
            //             letterArray = letterArray.filter(e => e !== letterArray[checkLetter]);
            //         }
            //     }
            // }
            
        // }
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
                    // tileFear = currentGridTile;
                    // letterFear = temp;
                    // characterFear = fear;
                    // setTimeout(function() {setBackTextFear(currentGridTile, temp, fear)}, 4500);
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
    //alert(correct + " are correct so far!");
}
function setBackText() {
    //console.log("removed");
    for (var i = 0; i < imgID.length; i++) {
        var currentImg = document.getElementById(imgID[i]);
        var tileID = imgID[i].substring(imgID[i].length - 2);
        var tile = document.getElementById(tileID);
        console.log(imgID[i]);
        console.log(tileID);
        currentImg.parentNode.removeChild(currentImg);
        tile.innerText = tileDict[tileID];
    }
    imgID = [];
    imgIDIndex = 0;
    tileDict = {};
    // console.log(tile.id);
    // console.log(letter);
}

// function setBackTextDisgust(tile, letter, character) {
//     //console.log("removed");
//     console.log(tile.id);
//     console.log(letter);
//     character.parentNode.removeChild(character);
//     tile.innerText = letter;
// }

// function setBackTextFear(tile, letter, character) {
//     //console.log("removed");
//     console.log(tile.id);
//     console.log(letter);
//     character.parentNode.removeChild(character);
//     tile.innerText = letter;
// }

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
    var message = document.getElementById("gameFinishMessage");
    if (lives == 0) {
        gameStop = true;
        message.innerText = "GAME OVER\n You ran out of lives :( click the button to play again\n The word was: " + word;
    }
    else {
        gameStop = true;
        message.innerText = "GAME OVER\n You ran out of guesses :/ click the button to play again\n The word was: " + word;
    }
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Play Again";
    button.id= "playAgain";

    document.getElementById("gameFinish").appendChild(button);
    button.onclick = reload;
}
function gameWin() {
    var message = document.getElementById("gameFinishMessage");
    gameStop = true;
    message.innerText = "Congrats! You Won!\n click the button to play again";
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Play Again";
    button.id = "playAgain";

    document.getElementById("gameFinish").appendChild(button);
    button.onclick = reload;
}
function reload() {
    document.location.reload();
}