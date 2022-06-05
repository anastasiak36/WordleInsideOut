document.getElementById("button").onclick = getLevel;

function getLevel() {
    var radios = document.getElementsByName('level');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            alert(radios[i].value);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
}