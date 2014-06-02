
				function gameplay()
				{	    		

		    	//game is active
				
				game_active = 1;
				catch_monster = temporary;
				catch_monster_context = temporary_context;				
				document.getElementById("mycanvas4").style.zIndex="7";	
				document.getElementById("mycanvas4").style.visibility="visible";

				//var catch_monster = document.getElementById("mycanvas4");
				//var catch_monster_context = catch_monster.getContext("2d");

				
				catch_monster.addEventListener("click",monster_click_close,false);
				
				  var close_button = {
				  w: 30,
				  h: 30,
				  x: catch_monster.width-30,
				  y: 0
				};				

				function monster_click_close(e)
				{
					mouse.getCursorPosition(e,catch_monster);					 
					 if(mouse.x >= close_button.x && mouse.x <= close_button.x + close_button.w  && mouse.y >= close_button.y && mouse.y <= close_button.y + close_button.h)
					 {
					 	cancelRequestAnimationFrame(init);
					 	bgImage.src = "";
					 	heroImage.src = "";
					 	monsterImage.src = "";	
					 	close_button_process(monster_click_close);
					 }
				}

				
//****************************************************************************************		    		    	
				var bgReady = false;
				var bgImage = new Image();
				bgImage.onload = function()
				{
					bgReady = true;
				};

				bgImage.src = "images/background.jpg";

				//hero image
				var heroReady = false;
				var heroImage = new Image();
				heroImage.onload = function () {
					heroReady = true;
				};
				heroImage.src = "images/hero.png";

				// Monster image
				var monsterReady = false;
				var monsterImage = new Image();
				monsterImage.onload = function () {
					monsterReady = true;
				};
				monsterImage.src = "images/monster.png";

				//GAME OBJECTS
				//setup variables and set their properties

				var hero = {
					speed: 256, // movement in pixels
					x: 0,
					y: 0
				};

				var monster = {
					speed: 256, // speed of the monster
					x: 0,
					y: 0
				};

				var monstersCaught = 0;

				//HANDLE KEYBOARD INPUT
				//store the user input instead of handling it immediately
				var keysDown = {};

				addEventListener("keydown",function(e)
				{
					keysDown[e.keyCode] = true;
				},false);

				addEventListener("keyup",function(e)
				{
					delete keysDown[e.keyCode];
				},false);

				//reset the game when player catches a monster
				var reset = function()
				{
					//hero is placed at the center of the screen
					hero.x = catch_monster.width/2;
					hero.y = catch_monster.height/2;

					//throw the monster on the screen randomly
						monster.x = 32 +(Math.random()*(catch_monster.width - 64));
						monster.y = 32 +(Math.random()*(catch_monster.height - 64));

				};

				//Update the game objects
				var update = function(modifier)
				{
						window.addEventListener("keydown", function(e) {
				    // space and arrow keys
				    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				        e.preventDefault();
				    }
				}, false);
					if(38 in keysDown)
					{
						//player is holding up
						hero.y -= hero.speed*modifier;
					}

					if(40 in keysDown)
					{
						//player holding down
						hero.y += hero.speed * modifier;
					}

					if(37 in keysDown)
					{
						//player holding left
						hero.x -= hero.speed*modifier;

					}

					if (39 in keysDown) 
					{ 
						// Player holding right
						hero.x += hero.speed * modifier;
					}

					//are they touching?

					if(
						//?????
						hero.x <= (monster.x + 32)
						&& monster.x <= (hero.x + 32)
						&& hero.y <= (monster.y + 32)
						&& monster.y <= (hero.y + 32)
						)
					{
						++monstersCaught;
						reset();
					}
				};

				var render_monster = function()
				{
					if(bgReady)
					{
						catch_monster_context.drawImage(bgImage,0,0);
					}

					if (heroReady) 
					{
						catch_monster_context.drawImage(heroImage, hero.x, hero.y);
					}

					if (monsterReady) 
					{
						catch_monster_context.drawImage(monsterImage, monster.x, monster.y);
					}	

				//SCORE
				game_score();

				//paint_score("monster game",score_inside)
				};
				function game_score()
				{
					catch_monster_context.fillStyle = $(data).find('paint_Monster_score_colour').text();
					catch_monster_context.font      = $(data).find('paint_Monster_score_font').text();
					catch_monster_context.textAlign = $(data).find('paint_Monster_score_text_align').text();
					catch_monster_context.textBaseline = $(data).find('paint_Monster_score_text_baseline').text();
					paint_Monster_score_x_coordinate   = $(data).find('paint_Monster_score_x_coordinate').text();
					paint_Monster_score_y_coordinate   = $(data).find('paint_Monster_score_y_coordinate').text();
					catch_monster_context.fillText("Goblins: " +monstersCaught,paint_Monster_score_x_coordinate,paint_Monster_score_y_coordinate);
					score_inside = monstersCaught;	

				}
				//the main game loop

				var main = function()
				{
					
					//requestAnimationFrame(main);
					var now = Date.now();
					var delta = now - then;

					update(delta/1000);
					render_monster();
					then = now;
				};

				function animloop() {
					init = requestAnimationFrame(animloop);
					main();
				}				

				//play the game

					reset();
					var then = Date.now();
					animloop();					
				}


			