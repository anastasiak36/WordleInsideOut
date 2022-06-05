var button = document.getElementById("button").onclick = getLevel;
var radios = document.getElementsByName('level');

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
            document.getElementById("grid").appendChild(gridTile);
        }
    }
}