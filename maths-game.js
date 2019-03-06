//maths-game.js
var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;
function show(id){
    document.getElementById(id).style.display = "block";
}

function hide(id){
    document.getElementById(id).style.display = "none";
}
 document.getElementById("startreset").onclick = function(){
     if(playing == true){
//         you are playing game and clicked this button,so u wanna reset the game;
         playing = false;
         location.reload();
     }else{
//         you are nt playng the game and clicked ths button so u wanna start the game;
         playing = true;
         
         
         //initailizing scoreto 0
         score = 0;
         
         document.getElementById("scoreValue").innerHTML= score;
         
         show("timeremaining");
         hide("gameover");
         timeremaining = 60;
         document.getElementById("timeremainingvalue").innerHTML = timeremaining;
         
         document.getElementById("startreset").innerHTML = "Reset Game";
         
         //start a countdown
         startCountdown();
         
         //generate Q nd A
         generateQA();
         
     }
 }

 function startCountdown(){
     action = setInterval(function(){
         timeremaining -= 1;
         document.getElementById("timeremainingvalue").innerHTML = timeremaining;
         if(timeremaining == 0){
             //game is over
             playing = false;
             
             stopCountdown();
             hide("timeremaining");
             hide("correct");
             hide("wrong");
             show("gameover");
             document.getElementById("gameover").innerHTML="<p>Game Over</p><p>your score is "+score+".</p>";
             document.getElementById("startreset").innerHTML="Start Game";
         }
     },1000);
 }
function stopCountdown(){
    clearInterval(action);
}
function generateQA(){
    var x = 1+Math.round(9*Math.random());
     var y = 1+Math.round(9*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var correctPosition=1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    
    //fill other wrong options;
    
    var answers=[correctAnswer];
    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            
//            do{
//                wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
//            }while(wrongAnswer==correctAnswer);
             
            do{
                wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1);
            
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            
        }
    }
}

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing==true){
            if(this.innerHTML==correctAnswer){
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                
                generateQA();
                
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
                
            }
        }
        
    }
}





















