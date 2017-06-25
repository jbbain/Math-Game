var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
//If you click on the start/reset button
document.getElementById("start-reset").onclick=
    function () {
        //if you are playing
        if (playing == true) {
            location.reload(); //reloads page
        } else { //if you are not playing
            //change mode to playing
            playing = true;
            //set score to 0
            score = 0;
            document.getElementById("scorevalue").innerHTML = score;
            //show countdown box
            show("time");
            timeremaining = 60;
            document.getElementById("timeRemaining").innerHTML = timeremaining;
            
            //hide game over
            hide("gameOver");
             //change button to reset
            document.getElementById("start-reset").innerHTML = "Reset Game";
            
            //start countdown
            startCountdown();
            
            //generate new Q&A
            generateQA();
        }
    }
        
for(var i=1; i<5; i++){
    //Clicking on Answer
document.getElementById("answer"+i).onclick = 
    function (){
        //check if currently playing
        if(playing == true){
            //yes
            //correct answer
            if(this.innerHTML == correctAnswer){
                
                //increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                
                //Correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                //create another question
                generateQA();
            }//wrong answer
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
}
}

//FUNCTIONS

//start Counter
//reduce time by one second in loops
function startCountdown(){
    action =setInterval(function(){
        timeremaining -= 1;
        
     document.getElementById("timeRemaining").innerHTML = timeremaining;
        
        if(timeremaining == 0){
            //Game Over
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p> Game Over!</p> <p>You Score is " + score + ".</p>"
            
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
        else{
            
        }
        
    }, 1000);
}

//stop Counter
function stopCountdown(){
    clearInterval(action);
}

//hides Element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//shows Element
function show(Id){
    document.getElementById(Id).style.display = "block";
}


//makes the Questions and Answers
function generateQA(){
    var x = 1+ Math.round(11*Math.random());
    var y =1 + Math.round(11*Math.random());
    correctAnswer = x*y;
    
    document.getElementById("question").innerHTML = x + "x" + y;
    
    var correctPosition =1+ Math.round(3*Math.random());
    document.getElementById("answer"+ correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other choices with incorrect answers
    var answers = [correctAnswer];
    
    for(var i=1; i<5; i++){
        if (i !== correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer =(1+ Math.round(11*Math.random()))*(1+ Math.round(11*Math.random())); //a wrong answer
            }
            while(answers.indexOf(wrongAnswer)>-1)
                
            document.getElementById("answer" + i).innerHTML = wrongAnswer;
            
            answers.push(wrongAnswer);
        }
    }
}