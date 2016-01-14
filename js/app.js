/**
 * Created by Pol on 2015-12-28.
 */

// the game object control guesses, anwsers, real anwsers
var gameEngineData = {
    qtyGuess : 0,
    gamePaintings : ["mona lisa", "krzyk", "słoneczniki", "adele bloch", "dama z łasiczką"],
    gameAnwser : "",
    gameArray : [],
    gamePlay : 0,
};
// targeting DOM elements
var clickInput = document.getElementById("clicker");
var formInput = document.getElementById("playerAnwserInput");
var myPicture = document.getElementById("painting");
var myDisplay = document.getElementById("display");
var myScore = document.getElementById("score");
var myJumbo = document.getElementById("jumbo");
var myTimer = document.getElementById("timer");

// click button listener and action, you click to check anwser of gamer, change all to lower case;
clickInput.addEventListener("click", function(){
    value = playerAnwserInput.value;
    valueLowCase = value.toLowerCase();
    checkAnwser (valueLowCase);
});
// keyboard enter off/on
var captureEnter = true;

function handleKeyPress(e) {
    if (e.keyCode === 13 && captureEnter) {
        clickInput.click();
        return false;
    } else if (e.keyCode == 13) {
        return false;
    }
}
// timer restart
var c = 20;
var t;
var timer_is_on = 0;

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}

function rT () {
    c = 20;
    return c;
}
// random unique picture from array, conected to correct anwser
function randomPicture() {
    myPicture.src = "img/"+gameEngineData.gameArray[gameEngineData.gamePlay] +".jpg";
    gameEngineData.gameAnwser = gameEngineData.gamePaintings[gameEngineData.gameArray[gameEngineData.gamePlay]];
}
// random painting generator  to the array
function buttonClick () {
    randomNumber = Math.floor(Math.random() * 5);
    checkArray(randomNumber);
}

function  random5Number () {
    for (var x=0; x<=4; x++) {
        buttonClick ();
    }
}

// funkcja sprawdzajaca tablice, jesli nie ma cyfry to dopisuje do tablicy, jesli jest prosi o ponowne losowanie, jesli wszystko wylosuje konczy
function checkArray (randomNumber) {
    console.log(randomNumber);
    var checkedArray = gameEngineData.gameArray.indexOf(randomNumber);
    if (checkedArray == -1) {
        gameEngineData.gameArray.push(randomNumber);
        console.log("udalo sie dopisalem do tablicy "+randomNumber);
        console.log(gameEngineData.gameArray);
    } else {
        //console.log("zmienna juz jest wylosowana, wolosuje ponownie ");
        //console.log(gameEngineData.gameArray);
        buttonClick();
    }
}

random5Number();

// restart data after winning or loseing game soft
function softRestart () {
    rT (); // time restart
    startMeUp  ();  // random picture, time start, enter ready

    // remove button
    btnGet = document.getElementById('softRestart');
    btnGet.parentNode.removeChild(btnGet);
    // restart display
    myScore.innerHTML = ("Ilosc prób: 0");
    myDisplay.className =  ("alert alert-info");
    myDisplay.innerHTML = ("nowy obraz");
    clickInput.style.visibility = 'visible';
    formInput.readOnly = false;
    playerAnwserInput.value = "";
    formInput.className = "form-control";
    gameEngineData.qtyGuess = 0;
    captureEnter = true;
    return false;
}
// generete restart button for new game and painting with listener
function createRestartButton () {
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("Wylosuj nowy obraz");       // Create a text node
    btn.appendChild(t);                                // Append the text to <button>
    btn.className = 'btn btn-info';                 //add class
    myJumbo.appendChild(btn);                    // Append <button> to jumbo
    btn.id = 'softRestart';                                // add ID to button
    btnGet = document.getElementById('softRestart');
    captureEnter = false;
    btnGet.addEventListener("click", softRestart);
}

// game success = good anwser or wrong try
function checkAnwser (value) {
    // good anwser
    if (value === gameEngineData.gameAnwser) {
        gameEngineData.qtyGuess ++;
        myScore.innerHTML = ("Ilosc prób:" + gameEngineData.qtyGuess);
        myDisplay.innerHTML = ("wygrałes! w tylu próbach: " + gameEngineData.qtyGuess);
        gameEngineData.gamePlay ++;
        checkGameNumber ();
        myDisplay.className =  ("alert alert-success");
        myPicture.style.webkitFilter = "blur(0px)";
        clickInput.style.visibility = 'hidden';
        formInput.readOnly = true;
        stopCount();
        createRestartButton ();
        // wrong anwser
    } else {
        gameEngineData.qtyGuess ++;
        myDisplay.innerHTML = ("Pudło, sprobuj ponownie.");
        myScore.innerHTML = ("Ilosc prób:" + gameEngineData.qtyGuess);
        playerAnwserInput.value = "";

    }
}

// // checking how many games you play if you seen all the end of game
function checkGameNumber () {
    if (gameEngineData.gamePlay === gameEngineData.gameArray.length) {
        alert("koniec gry");
        location.reload();
    }
}
// time counter c = seconds for anwser, if time out game over
function timedCount() {
    timer.innerHTML ="Timer pozostało: " + c;
    c = c - 1;
    myPicture.style.webkitFilter = "blur(" + c + "px)";
    t = setTimeout(function(){ timedCount() }, 1000);
    if (c==0) {
        stopCount();
        timer.innerHTML = "Time out!";
        console.log("stop");
        clickInput.style.visibility = 'hidden';
        formInput.readOnly = true;
        myDisplay.innerHTML = ("Koniec było tyle prób: " + gameEngineData.qtyGuess+",a prawidłowa odpowiedź to "+"\""+
        capitalizeFirstLetter(gameEngineData.gameAnwser+"\""));
        myDisplay.className =  ("alert alert-danger");
        gameEngineData.gamePlay ++;
        checkGameNumber ();
        createRestartButton ()
    }
}
// capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// start of game
function startMeUp () {
    randomPicture();
    formInput.onkeypress= handleKeyPress;
    startCount();
}

window.onload = startMeUp ();