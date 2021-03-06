
let canvas;
let ctx;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 19;
let ballSpeedY = 19;

let playerScore1 = 0;
let  computerScore = 0;
const WINNING_SCORE = 5;

let showingWinScreen = false;
let playGame = false

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;




function calculateMousePos(evt)
{
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(evt)
    {
        if(showingWinScreen)
        {
            playerScore1 = 0;
            computerScore = 0;
            showingWinScreen = false;
        }
    }

    



window.onload = function playGame()
{

    
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Moves Every 30 Fps
    let framsPerSecond = 30;
    setInterval(function(){
        moveEverything();
        drawEverthing();
    }, 1000/framsPerSecond);


    canvas.addEventListener('mousedown',handleMouseClick)
    //Controls the paddle movement
    canvas.addEventListener('mousemove',
            function(evt)
            {
                let mousePos = calculateMousePos(evt);
                paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
            });
}

function ballReset()
{
    if((playerScore1 >= WINNING_SCORE) || (computerScore >= WINNING_SCORE))
    {
        
        showingWinScreen = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement()
    {
        let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
        if(paddle2YCenter < ballY -35)
        {
            paddle2Y += 60;
        }else if(paddle2Y > ballY -35)
        {
            paddle2Y -= 60;
        }
    }


function moveEverything()
{
    //Pause
    if(showingWinScreen)
    {
        return;
    }
    computerMovement();
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX <= 0) {
		if( (ballY >= paddle1Y) && (ballY <= paddle1Y+PADDLE_HEIGHT)) 
        {
            ballSpeedX = -ballSpeedX;
            
            let deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.50;
        } else 
        {
            computerScore++;	
            ballReset();
            
		}
    }

    
    
    if(ballX > canvas.width) {
    // The Next lines says if the ball hits the paddle and if it's smaller or equal to the  paddle height then 
		if( (ballY => paddle2Y) && (ballY <= paddle2Y+PADDLE_HEIGHT)) 
        {
            // This code says the ball should go in reverse
            ballSpeedX = -ballSpeedX;
            // This code says if the ball hits the conor of the paddle then it must bounch at a diagonal direction
            let deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
            // This code will be how fast the ball moves after it hits the conor of the paddle
            ballSpeedY = deltaY * 0.1;
		} else {
            // Add a score to the human player on if the ball goes past the Ai 
            playerScore1++ // Must be before ballReset()
            ballReset();	
            ;
		}
	}

    if(ballY > canvas.height)
    {
        ballSpeedY = -ballSpeedY;
    }

    if(ballY < 0)
    {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet()
{
    for(let i=0; i<canvas.height; i+=42)
    {
        colorRect(canvas.width/2-1,i,2,20, 'white');
    }

}


function drawEverthing()
{

    
    // Next lines makes the canvas
    colorRect(0,0,canvas.width,canvas.height,'green');

    // Restart Menu
    if(showingWinScreen)
    {
        if(playerScore1 >= WINNING_SCORE)
            {
                ctx.fillStyle = 'black';
                ctx.fillText("     You won Against my Bot Cheater",340,100);
            }else if(computerScore >= WINNING_SCORE)
                        {
                            ctx.fillStyle = 'black';
                            ctx.fillText("You Lost!! My bot won",350,100);
                         
                        }
        
        ctx.fillStyle = 'black';
        ctx.fillText('click to Play Again',360,350);
        return;
        
    }

     drawNet();

    // Next lines draws the Left paddle
    colorRect(0,paddle1Y, PADDLE_THICKNESS,PADDLE_HEIGHT, 'blue');

    // Next line draws the Right paddle
    colorRect(canvas.width-PADDLE_THICKNESS ,paddle2Y ,PADDLE_THICKNESS ,PADDLE_HEIGHT+10 ,'blue');

    // Next lines draws the ball
    drawCircle(ballX,ballY,10, 'red');

    // Score
    ctx.fillStyle = 'black';
    ctx.fillText('Player :', 15,60);
    ctx.fillText(playerScore1,60,60);
    ctx.fillText('Computer:', canvas.width-115,60);
    ctx.fillText(computerScore,canvas.width-60,60);
    
    
}
    
function drawCircle(centerX,centerY,radius, drawColor)
{
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius, 0,Math.PI*2,true);
    ctx.fill();

}

function colorRect(leftX,topY, width,height, drawColor)
{
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX,topY, width,height);
}