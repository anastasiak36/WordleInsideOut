var currentRow = 0;
var currentCol = 0;
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
    createGrid();
}

function createGrid() {
    // document.parentNode.removeChild(button);
    // for (var i = 0, length = radios.length; i < length; i++) {
    //     document.parentNode.removeChild(radios[i]);
    // }
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
        currentRow += 1;
        currentCol = 0;
    }
})

function update() {
    var correct = 0; 
    var word = "APPLE";
    //random letter generating... doesn't work right now
    // const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // var randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
    // while (word.includes(randomCharacter)) {
    //     var randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
    // }
    // console.log(randomCharacter);
    for (let c = 0; c < innerWidth; c++) {
        var currentGridTile = document.getElementById(currentRow.toString() + c.toString());
        let letter = currentGridTile.innerText;
        if (word[c] == letter) {
            correct += 1;
        }
        else if (word.includes(letter)) {
            currentGridTile.innerText = "W";
        }
        //part of random letter generation
        // if (letter == randomCharacter){
        //     currentGridTile.innerText = ":(";
        // }
        else {
            currentGridTile.innerText = "N";
        }
    }
    alert(correct + " are correct so far!");
}