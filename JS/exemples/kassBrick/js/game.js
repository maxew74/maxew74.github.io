// Déclaration des variables
var gameContainer, player, playerX, playerWidth, playerHeight, ball, ballX, ballY, ballWidth, ballHeight, score, lifes;
var isGamePlaying = false;
var score = 0;
var nbBalls = 10;

var bricks = [];
// Création, des éléments du jeu
function createGameElements()
{
	gameContainer = document.getElementById("game");
	
	// Creation player
	player = document.createElement("div");
	player.setAttribute("class", "player");

	// Creation ball
	ball = document.createElement("div");
	ball.setAttribute("class", "ball");
	
	gameContainer.appendChild(player);
	gameContainer.appendChild(ball);
	
	// Creation des brick
	var newBrick;
	var i;
	var j;
	
	
	for(j=0; j <= 4; j++)
	{
		for(i=0; i <= 9; i++)
		{
			newBrick = document.createElement("div");
			newBrick.setAttribute("class", "bricks");
			newBrick.setAttribute("id", "brick_" + i + "_" + j);
			newBrick.style.left = ((i) * 100) + 0 + "px";
			newBrick.style.top = ((j) * 100) + 0 + "px";

			bricks.push(newBrick);
			gameContainer.appendChild(newBrick);
		}
	}
	
	var newBall;
	var k;
	for(k=1; k <= nbBalls; k++)
	{
		newBall = document.createElement("div");
		newBall.setAttribute("class", "ball");
		document.getElementById("nbBalls").appendChild(newBall);
	}
	
	
	
}

function init()
{
	score = 0;
	lifes = 100;
		
	playerWidth = 300;
	playerHeight = 10;
	player.style.width = playerWidth + "px";
	player.style.height = playerHeight + "px";
}

// Initialisation d'un partie;
function initGame()
{
	// Initialisation variables
	isGamePlaying = false;
	$("#consigne").show();
	
	ballWidth = 20;
	ballHeight = 20;
	
	//Position initiale de la balle
	ballX = (gameContainer.offsetWidth - ballWidth)/2;
	//ballY = (gameContainer.offsetHeight - ballHeight)/2;
	ballY = (gameContainer.offsetHeight - 110);
	playerX = (gameContainer.offsetWidth - (getObjPos(player).width))/2;

	player.style.left = playerX + "px";
	ball.style.left = ballX + "px";
	ball.style.top = ballY + "px";

}

//	Déplacements de la balle
var ballSpeedX = 0;
var ballSpeedY = 10;

function moveBall()
{
	if(isGamePlaying)
	{
		ballX += ballSpeedX;
		ballY += ballSpeedY;
		
		ball.style.left = ballX + "px";
		ball.style.top = ballY + "px";
				
		reverseBallMove();
	}

}

//	Déplacements du joueur
var playerSpeed = 5;
var playerDirection = "noway";
function movePlayer()
{	if(isGamePlaying)
	{
		// Vers la gauche
		if(playerDirection=="left")
		{
			if(playerX - playerSpeed > 0)
			{
				playerX -= playerSpeed;
			}else 
			{
				playerX = 0;
				playerDirection = "noway";
				player.style.width = (getObjPos(player).width) - 20 + "px";
			}
		}
		
		// Vers la droite
		if(playerDirection=="right")
		{
			if(playerX + playerSpeed < (gameContainer.offsetWidth - getObjPos(player).width))
			{
				playerX += playerSpeed;
			}else 
			{
				playerX = (gameContainer.offsetWidth - playerWidth);
				playerDirection = "noway";
				player.style.width = (getObjPos(player).width) - 20 + "px";
			}
		}
		
		//  Nulle part
		if(playerDirection == "noway")
		{
		}else{
			player.style.left = playerX + "px";
		}
	}
}



// Définition des touches du clavier
function onUserKeyDown(ev)
{

	if(ev.keyCode == 37) // left
	{
		playerDirection = "left";
	}
	else if(ev.keyCode == 39) // right
	{
		playerDirection = "right";
	}
	else if(ev.keyCode == 32) // space
	{
		isGamePlaying = true;
		playerDirection = "noway";
		$("#consigne").hide();
	}
}

function getObjPos(obj)
{
	return obj.getBoundingClientRect();
}

// Fonction de détection de collisions
function collideDetect(obj1, obj2)
{
	var colDetect = {collision:false, top:false, bottom:false, left:false, right:false};
	var cond1, cond2, cond3, cond4;
	
	//console.log(getObjPos(obj1));
	if(getObjPos(obj1).left >= getObjPos(obj2).left && getObjPos(obj1).left <= getObjPos(obj2).right){cond1 = true;} // left inclus
	if(getObjPos(obj1).top >= getObjPos(obj2).top && getObjPos(obj1).top <= getObjPos(obj2).bottom){cond2 = true;} // top inclus
	if(getObjPos(obj1).right <= getObjPos(obj2).right && getObjPos(obj1).right >= getObjPos(obj2).left){cond3 = true;} // right inclus
	if(getObjPos(obj1).bottom <= getObjPos(obj2).bottom && getObjPos(obj1).bottom >= getObjPos(obj2).top){cond4 = true;} // bottom inclus

	if(cond1 && !cond3){colDetect.right = true;}
	if(!cond1 && cond3){colDetect.left = true;}
	if(cond2 && !cond4){colDetect.bottom = true;}
	if(!cond2 && cond4){colDetect.top = true;}
	
	if((cond1 || cond3) && (cond2 || cond4))
	{
		colDetect.collision = true;
		//alert(colDetect);
		console.log(colDetect);
		//alert("helo");
	}

	return colDetect;
}

var collideDetected = false;
// Rebonds de la balle
function reverseBallMove()
{
	var brickCollision = false;
	var brickCollisionData;
	for(i=0;i<bricks.length;i++)
	{
		brickCollisionData = collideDetect(ball, bricks[i])
		if(brickCollisionData.collision && !collideDetected)
		{
			// Réduction de la taille de la brick
			var newDim = $(bricks[i]).width() - 20;
			//var newBorderRadius = (parseInt(bricks[i].style.borderRadius) || 0) + 1;
			var newPosX = getObjPos(bricks[i]).x + 10;
			var newPosY = getObjPos(bricks[i]).y + 10;

			// Si brick détruite
			if(newDim < 10)
			{
				$(bricks[i]).hide();
			}else{
				//$(bricks[i]).css({width:newDim + "px", height:newDim + "px", top:newPosY + "px", left:newPosX + "px", borderRadius:newBorderRadius+"px"});
				$(bricks[i]).css({width:newDim + "px", height:newDim + "px", top:newPosY + "px", left:newPosX + "px"});
			}
			
			if(brickCollisionData.top){		$(bricks[i]).css({borderTopColor:"#ecf2f9"}); }
			if(brickCollisionData.bottom){	$(bricks[i]).css({borderBottomColor:"#ecf2f9"}); }
			if(brickCollisionData.left){	$(bricks[i]).css({borderLeftColor:"#ecf2f9"}); }
			if(brickCollisionData.right){	$(bricks[i]).css({borderRightColor:"#ecf2f9"}); }
			
			if(brickCollisionData.top || brickCollisionData.bottom)
			{
				ballSpeedY = -ballSpeedY;
				ballY += ballSpeedY; 
			}
			if(brickCollisionData.left || brickCollisionData.right)
			{
				ballSpeedX = -ballSpeedX;
				ballX += ballSpeedX; 
			}
			
			if(brickCollision)
			{
				collideDetected = true;
			}
		}
	}
	

	// Collision balle / player
	if(collideDetect(ball, player).collision && !collideDetected)
	{
		collideDetected = true;
		ballSpeedY = -ballSpeedY;
		ballY += ballSpeedY; 
	}
	/*if((getObjPos(ball).left+getObjPos(ball).width/2 >= getObjPos(player).left) && (getObjPos(ball).left+getObjPos(ball).width/2 <= getObjPos(player).right) && (getObjPos(ball).bottom>= getObjPos(player).top))
	{
		collideDetected = true
		ballSpeedY = -ballSpeedY;
		ballY += ballSpeedY; 
	}*/

	// collision mur gauche
	else if(getObjPos(ball).left<0 && !collideDetected)
	{
		collideDetected = true
		ballSpeedX = -ballSpeedX;
	}
	// collision mur droit
	else if(getObjPos(ball).left + getObjPos(ball).width >= getObjPos(gameContainer).width && !collideDetected)
	{
		collideDetected = true
		ballSpeedX = -ballSpeedX;
	}
	// collision plafond
	else if(getObjPos(ball).top <= getObjPos(gameContainer).top && !collideDetected)
	{
		collideDetected = true
		ballSpeedY = -ballSpeedY;
	}else if(!brickCollision){
		collideDetected = false;
	}
	
	if(collideDetected && ballSpeedX == 0)
	{
		ballSpeedX = Math.floor(Math.random() * Math.floor(3))*5 - 5;
	}
	
	if(getObjPos(ball).top > getObjPos(gameContainer).bottom)
	{
		nbBalls--;
		document.getElementById("nbBalls").getElementsByClassName("ball")[nbBalls].style.top = "100%";
		if(nbBalls>=0)
		{
			initGame();
		}else{
			lose();
		}
	}	
	console.log(collideDetected);
}

function lose()
{
	isGamePlaying = false;
	window.cancelAnimationFrame(requestID);
}

// Fonction rappellée systématiquement pour mettre à jour l'écran de jeu
var requestID;
function refresh()
{
	movePlayer();
	moveBall();
	requestID = window.requestAnimationFrame(refresh);  
}

$(document).ready(function()
{
	// Ici le document est chargé, je peux écrire mon code jquery...
	
	/*
		NB : Ceci est un commentaire javascript
		Chaque instruction doit être terminée par " ; "
	*/
	createGameElements();
	init();
	initGame();
	window.addEventListener("keydown", onUserKeyDown);
	refresh();
	
	console.log("Le fichier game.js a bien été chargé");
	
});