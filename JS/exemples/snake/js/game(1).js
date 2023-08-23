$(document).ready(function()
{
	console.log("Le fichier game.js a bien été chargé");

	// Variables
	var mainInterval; // interval de temps de rafraichissement du jeu
	var deltaTime = 120; // durée de l'intervalle
	
	var isPause = true; // Pause ?

	var gameWidth, gameHeight; // Largeur et hauteur de la fenêtre de jeu
	var gameX, gameY; // Position de la fenêtre de jeu
	var xStart, yStart; // Position de départ du serpent
	var nbWidth, nbHeight; // Nombre de divisions de la fenêtre de jeu
	var debordWidth, debordHeight; // débords

	var direction = "r"; // Direction du serpent r=right, d=down, l=left, u=up
	var partWidth = 30; // Taille d'une division.

	var speed = 1; // Affichage de la vitesse
	var score = 0; // Nombre de points
	var newPoints = 0;

	// Initialisation du jeu
	function init()
	{	
		$(window).off('keyup', init);
		$("#gameTitleContainer").slideUp(150);
		
		//Calcul des dimensions et positions de la fenetre de jeu
		debordWidth = $(window).width()%partWidth;
		debordHeight = $(window).height()%partWidth;
		
		gameWidth = $(window).width() - debordWidth;
		gameHeight = $(window).height() - debordHeight;
		
		nbWidth = gameWidth/partWidth;
		nbHeight = gameHeight/partWidth;
		
		//Position de la fenêtre de jeu
		gameX = debordWidth/2;
		gameY = debordHeight/2;
		
		//Position de départ du serpent
		xStart = (nbWidth-(nbWidth%2))/2*partWidth;
		yStart = (nbHeight-(nbHeight%2))/2*partWidth;
		
		updateCounters();
		
		console.log("init gameWidth = " + gameWidth + " gameHeight = " + gameHeight + "   " + $(window).width());
		// Application des propriétés de style aux éléments
		$("#game").css({top:gameY+"px", left:gameX+"px", width:gameWidth + "px", height:gameHeight + "px"});
		$(".snakePart").css({width:partWidth+"px", height:partWidth+"px"});
		$("#target").css({width:partWidth+"px", height:partWidth+"px"});
		$("#head").css({top:yStart+"px", left:xStart+"px"});
		
		setTarget();
	}

	// Fonction d'affichage des compteurs
	function updateCounters()
	{
		$("#speedUI").html("SPEED : " + speed);
		$("#scoreUI").html("SCORE : " + score);
	}

	// Fonction qui déplace la tête du serpent
	function moveSnake()
	{
		eatTarget();
		moveSnakeBody();

		var newPozX;
		var newPozY;
		
		// Vérification de la direction choisie
		if(direction=="r")
		{
			newPozX = $("#head").position().left + partWidth;
			newPozY = $("#head").position().top;
		}else if(direction=="d")
		{
			newPozY = $("#head").position().top + partWidth;
			newPozX = $("#head").position().left;
		}else if(direction=="l")
		{
			newPozX = $("#head").position().left - partWidth;
			newPozY = $("#head").position().top;
		
		}else if(direction=="u")
		{
			newPozY = $("#head").position().top - partWidth;
			newPozX = $("#head").position().left;
		}
		
		// Teste si sortie des limites
		if(newPozX < 0 || newPozX >= gameWidth || newPozY <  0 || newPozY >= gameHeight)
		{
			loose("Le serpent se mange un mur !");
			setTimeout(restartGame, 1500);
		}else{
			// Application du style à l'élément (tête du serpent)
			$("#head").css({top:newPozY + "px", left:newPozX + "px"});
		}
	}

	// Fonction qui teste si le serpent "se mort la queue"
	function snakeHit(part)
	{
		var xHead = $("#head").position().left;
		var yHead = $("#head").position().top;
		var xPart = $(part).position().left;
		var yPart = $(part).position().top;
		
		if(xHead == xPart && yHead == yPart)
		{
			loose("Le serpent se mort la queue !");
			setTimeout(restartGame, 1500);
		}
	}

	// Ajout d'une partie de corps au serpent (nouveau div)
	function addSnakePart()
	{
		var newPart = document.createElement("div");
		newPart.setAttribute("class", "snakePart");
		$(newPart).css({width:partWidth+"px",height:partWidth+"px"});
		snake.append(newPart);
	}

	// Déplacement de toutes les parties du serpent
	function moveSnakeBody()
	{
		var i;
		var prev, cur, newPosX, newPosY;

		for(i=snake.childNodes.length-1; i>0; i--)
		{
			//console.log("moveSnakeBody " + i +"--" + snake.childNodes[i]);
			cur = snake.childNodes[i];
			prev = snake.childNodes[i-1];
			
			newPosX = $(prev).position().left;
			newPosY = $(prev).position().top;
			
			$(cur).css({left:newPosX + "px", top:newPosY+"px"});
			
			if(i>1){snakeHit(cur);}
		}
	}

	// Positionnement aléatoire de la cible
	function setTarget()
	{
		var randomX = parseInt(Math.random()*(nbWidth-1));
		var randomY = parseInt(Math.random()*(nbHeight-1));
		
		var xTarget = randomX*partWidth;
		var yTarget = randomY*partWidth;
		console.log("setTarget - nbWidth " + nbWidth + " - nbHeight " + nbHeight);
		console.log("setTarget - randomX " + randomX + " xTarget " + xTarget + " --- randomY " + randomY + " yTarget " + yTarget);
		$("#target").css({top:yTarget+"px",left:xTarget+"px"});	
	}

	// Le serpent mange une cible ?
	function eatTarget()
	{
		let xHead = Math.floor($("#head").position().left);
		let yHead = Math.floor($("#head").position().top);
		let xTarget = Math.floor($("#target").position().left);
		let yTarget = Math.floor($("#target").position().top);
		
		console.log("eatTarget  > xHead : " + xHead + "; yHead : " + yHead + "; xTarget : " + xTarget  + "; yTarget : " + yTarget );
		// Si concordance des coordonnées
		if(xHead == xTarget && yHead == yTarget)
		{
			addSnakePart();
			
			score++;
			newPoints++;
			if(newPoints>=5)
			{
				newPoints = 0;
				if(deltaTime>20)
				{	
					speed++;
					deltaTime -= 20; // augmentation de la vitesse
					clearInterval(mainInterval);
					mainInterval = setInterval(moveSnake, deltaTime);
				}
			}
			updateCounters();
			setTarget();
		}
	}

		
	// Changement de direction du serpent
	function changeDirection(e)
	{
		/*KEY_DOWN	= 40;
		KEY_UP		= 38;
		KEY_LEFT	= 37;
		KEY_RIGHT	= 39;*/
		// e.keyCode Représente le code de la touche
		if(e.keyCode == 40){ direction = "d"; playPauseGame(true); }
		if(e.keyCode == 38){ direction = "u"; playPauseGame(true); }
		if(e.keyCode == 37){ direction = "l"; playPauseGame(true); }
		if(e.keyCode == 39){ direction = "r"; playPauseGame(true); }
		
		if(e.keyCode == 32) // si spacebar
		{
			playPauseGame();
		}
	}

	// Met le jeu en pause ou le reprend
	function playPauseGame(forcePlay)
	{
		if(forcePlay && isPause)
		{	
			isPause = false;
			mainInterval = setInterval(moveSnake, deltaTime);
		}else if(!forcePlay){
			isPause = !isPause;
			if(isPause)
			{
				clearInterval(mainInterval);
			}else{
				mainInterval = setInterval(moveSnake, deltaTime);
			}
		}
	}

	// Fonction en cas de perte
	function loose(mess)
	{
		$(".snakePart").addClass("deadSnake");
		//alert(mess);
		clearInterval(mainInterval);
	}

	function restartGame()
	{
		// rechargement de la page
		window.location.reload();
	}
	
	var snake = document.getElementById("snake");
	//move();
	$(window).on('keyup', changeDirection); // Appelée lorsqu'une touche est relâchée
	$(window).on('keyup', init); // Appelée lorsqu'une touche est relâchée
	
});
