let divs = document.querySelectorAll(".tic-tac-area");
let spans = document.querySelectorAll(".spn");
var turnoTag = document.querySelector(".turno__player");
var turnoBtn = document.querySelector(".turno__btn");
let result = document.querySelector(".resultado");
var winSound = new Audio('../../public/sounds/win.mp3');
var drawSound = new Audio('../../public/sounds/draw.mp3');
var turno ;
var counter;

for(let i=0; i<divs.length;i++){
    divs[i].addEventListener("click", ()=>{
        if(counter>=1){
            if(!divs[i].classList.contains("disabled")){
                writeContent(turno,i);
                disableCell(i);
                let winner = verifyWinner(i)
                winner ? 
                                (
                                    displayResult(winner),
                                    endGame()
                                )
                                :
                                switchTurns();
                                incrementCounter();
                                if(counter==divs.length && !winner){
                                    displayResult(winner);
                                    endGame();
                                }
                
            }
            
        }else{
            if(!divs[i].classList.contains("disabled")){
                writeContent(turno,i);
                disableCell(i);
                switchTurns();
                incrementCounter();;
            }
        }
    })
}

turnoBtn.addEventListener("click", ()=>{
    iniciarJuego();
    winSound.pause();
    winSound.currentTime =0;
    drawSound.pause();
    drawSound.currentTime =0;
})

const switchTurns=()=>{
    if(turno=="X"){
        turno="O";
        turnoTag.textContent =`Turno jugador ${turno}`;
        return turno;
    }else{
        turno="X";
        turnoTag.textContent =`Turno jugador ${turno}`;
        return turno;
    }
}
const iniciarJuego=()=>{
    turno = "X";
    turnoTag.style.display="block"
    turnoTag.textContent =`Turno jugador ${turno}`;
    turnoBtn.style.display="none";
    counter=0;
    result.classList.add("hidden");
   
    
    for(let i=0; i<divs.length;i++){
        spans[i].textContent="";
        divs[i].classList.remove("disabled");
    }
    console.clear();
}

const writeContent=(turno, i)=>{
    if(turno=="X"){
        spans[i].textContent = "close";
    }else{
        spans[i].textContent = "radio_button_unchecked";
    }
}

const incrementCounter=()=>{
    counter++;
}

const disableCell=(i)=>{
    divs[i].classList.add("disabled");
}

const deleteContent=(i)=>{
    spans[i].textContent = "";
}

const checkContent=(i)=>{
    return spans[i].textContent;
}

const verifyWinner=(i)=>{
    let result = false;
    switch (i){
        case 0: 
            if(checkContent(i) == checkContent(1) && checkContent(i) == checkContent(2)){
                result= true;
            }else if(checkContent(i)== checkContent(4)  && checkContent(i) == checkContent(8)){
                result= true;
            }else if(checkContent(i)== checkContent(3) && checkContent(i) == checkContent(6)){
                result= true;
            }
            return result;
            
        case 1: 
            if(checkContent(i)== checkContent(0) && checkContent(i) == checkContent(2)){
                result= true;
            }else if(checkContent(i)== checkContent(4) && checkContent(i) == checkContent(7)){
                result= true;
            }
            return result;
        case 2: 
            if(checkContent(i)== checkContent(1) && checkContent(i) == checkContent(0)){
                result= true;
            }else if(checkContent(i)== checkContent(4) && checkContent(i) == checkContent(6)){
                result= true;
            }else if(checkContent(i)== checkContent(5) && checkContent(i) == checkContent(8)){
                result= true;
            }
            return result;
        case 3: 
            if(checkContent(i)== checkContent(0) && checkContent(i) == checkContent(6)){
                result= true;
            }else if(checkContent(i)== checkContent(4) && checkContent(i) == checkContent(5)){
                result= true;
            }
            return result;
        case 4: 
            if(checkContent(i)== checkContent(0) && checkContent(i) == checkContent(8)){
                result= true;
            }else if(checkContent(i)== checkContent(1) && checkContent(i) == checkContent(7)){
                result= true;
            }else if(checkContent(i)== checkContent(2) && checkContent(i) == checkContent(6)){
                result= true;
            }else if(checkContent(i)== checkContent(3) && checkContent(i) == checkContent(5)){
                result= true;
            }
            return result;
        case 5: 
            if(checkContent(i)== checkContent(2) && checkContent(i) == checkContent(8)){
                result= true;
            }else if(checkContent(i)== checkContent(3) && checkContent(i) == checkContent(4)){
                result= true;
            }
            return result;
        case 6: 
            if(checkContent(i)== checkContent(0) && checkContent(i) == checkContent(3)){
                result= true;
            }else if(checkContent(i)== checkContent(2) && checkContent(i) == checkContent(4)){
                result= true;
            }else if(checkContent(i)== checkContent(7) && checkContent(i) == checkContent(8)){
                result= true;
            }
            return result;
        case 7: 
            if(checkContent(i)== checkContent(1) && checkContent(i) == checkContent(4)){
                result= true;
            }else if(checkContent(i)== checkContent(6) && checkContent(i) == checkContent(8)){
                result= true;
            }
            return result;
        case 8: 
            if(checkContent(i)== checkContent(0) && checkContent(i) == checkContent(4)){
                result= true;
            }else if(checkContent(i)== checkContent(2) && checkContent(i) == checkContent(5)){
                result= true;
            }else if(checkContent(i)== checkContent(6) && checkContent(i) == checkContent(7)){
                result= true;
            }
            return result;
    }
    return result;
}

const endGame=()=>{
    console.log("juego finalizado");
    for(let i=0; i<divs.length;i++){
        disableCell(i);
    }
    turnoTag.style.display="none";
    turnoBtn.style.display="block";
}

const displayResult=(winner)=>{
    if (winner){
        throwConfetti();
        winSound.play();
        if(result.childElementCount>0){
            for(let i=0;i=result.childElementCount;i++){
                result.removeChild(result.firstChild);
            }

        }
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        p1.innerText = `Felicitaciones Jugador ${turno}`;
        p2.innerText = "has ganado la partida!";
        result.appendChild(p1);
        result.appendChild(p2);
        result.classList.remove("hidden")
    }else{
        drawSound.play();
        if(result.childElementCount>0){
            for(let i=0;i=result.childElementCount;i++){
                result.removeChild(result.firstChild);
            }

        }
        let p1 = document.createElement("p");
        p1.innerText = `Empate!`;
        result.appendChild(p1);
        result.classList.remove("hidden")
    }
    
}

const throwConfetti=()=>{
    const end = Date.now() + 2 * 1000;

const colors = ["#7FFF00", "#FF00FF", "#ADFF2F","#FF0000","#FFFF00","#0000FF","#00FFFF" ];

(function frame() {
  confetti({
    particleCount: 10,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 10,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}

iniciarJuego();

