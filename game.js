const defaultDomState = document.body.innerHTML;

const person1 = document.getElementById('player1');
const person2 = document.getElementById('player2');
const button = document.getElementById('start-button');
const result = document.getElementById('result');


let person1data = [];
let person2data = [];


button.addEventListener('click', async function() {
    result.innerHTML = ""
    let number1 = Math.floor(Math.random() * (80 - 1)) + 1;
    let number2 = Math.floor(Math.random() * (80 - 1)) + 1;
    if (number1 == 17) {
        number1 += 1;
    }
    if (number2 == 17) {
        number2 += 1;
    }
    await fetch("https://swapi.dev/api/people/" + number1).then(response => person1data = response.json())
    .then((data) => person1data = data)
    
    await fetch("https://swapi.dev/api/people/" + number2).then(response => person2data = response.json())
    .then((data) => person2data = data)
    console.log(person1data)
    console.log(person2data)
    startGame()
});


function startGame(){
    const name1 = document.getElementById("player1Name");
    const name2 = document.getElementById('player2Name');

    name1.innerHTML = person1data.name
    name2.innerHTML = person2data.name

    
    person1.onclick = () =>{
        const taller = compareHeight(person1data.height, person2data.height);
        if (taller){
            result.innerHTML = "Congrats that was right! Push the start button to play again!"
        }
        else{
            result.innerHTML = "Uh Oh! That was wrong! You lost a life! Push the start button to play again!"
            loseLife()
            if (lostGame()){
                document.body.remove()
                alert('You lost! Reload page to start again!')
            }    
        }
    };
       



    person2.onclick = () =>{
        const taller = compareHeight(person2data.height, person1data.height);
        if (taller){
            result.innerHTML = "Congrats that was right! Push the start button to play again!"
        }
        else{
            result.innerHTML = "Uh Oh! That was wrong! You lost a life! Push the start button to play again!"
            loseLife()
            if (lostGame()){
                document.body.remove()
                setTimeout(() => {alert('You lost! Reload page to start again!');}, 1000);
                
            }    
        }
    
    };    

}

function lostGame(){
    return (document.getElementById('images').childNodes.length === 6);
}

function compareHeight(taller, shorter){
    return (parseInt(taller) > parseInt(shorter))
}

function loseLife() {
    const picture = document.getElementById("lifePic");
    picture.remove();
}


// todo:
//     fetch data from star wars api and get "stat"
//     display player name
//     once clicked:
//         compare
//         update lives
//         switch person who got clicked

//     if lives = 0 then game is over:
//         pop up big button to reset game, and continue
