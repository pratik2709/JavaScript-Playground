		play_quiz = function(real_score,current_level)
		{

			//var send_level_id = 1;
			//var current_level;
			var new_data;
			var change_level = 0;
			var got_data = 0;
			var current_level;
			var quiz_game_active = 0;

			function get_level(callback)
			{
				$.ajax({
		            //  async: false,
		              type: "GET",
		              url: "functions.php",
		              data: {current_level: current_level}, //for sending data to the php script
		              //contentType: "application/json",
		              success: function (data) 
					 {
						change_level = 1;
						callback();
						//remove event listener
					 }

		            });					
			}


			function caller(callback)
			{
			   $.ajax({
			      //async: false,
			      type: "GET",
			      data: {},
			      url: "quiz_dynamic_draw.php",
			      contentType: "application/json",
			      success: function (data) 
				 {
				 	got_data = 1;
					new_data = jQuery.parseJSON(data);
					callback(new_data);
				 }

			    });	
			} 

			    function get_new_level(){
			           $.ajax({
			              async: false,
			              type: "GET",
			              url: "functions.php",
			              data: {current_level: current_level}, //for sending data to the php script
			              //contentType: "application/json",
			              success: function (data) 
						 {
							change_level = 1;
						 }

			            });
			    } 							
	
			
			game_active = 1;
			flag_end_quiz = 0;//quiz has ended no more clicks			
			var quiz_canvas = temporary;
			var quiz_context = temporary_context;

			document.getElementById("mycanvas4").style.zIndex="7";	
			document.getElementById("mycanvas4").style.visibility="visible";
			quiz_canvas.onselectstart = function () { return false; }
			quiz_canvas.addEventListener("click",quiz_click,false);
			quiz_context.fillStyle = "white";
			quiz_context.fillRect(0,0,quiz_canvas.width,quiz_canvas.height);
			//load_arrays();			
			//quiz_canvas.onselectstart = function () { return false; }
			var CorrectAnswer,qnumber;
			initialize_variables = function()
			{
				CorrectAnswer = 0;
				qnumber = 0;
			}
				initialize_variables();
				var quizbg = new Image();					
				var Question = new String;
				var Option1 = new String;
				var Option2 = new String;	
				var Option3 = new String;
				var Option4 = new String;
/*
				if(!real_score)
				{
					real_score = 0; //mine
				}
				if(!current_level)
				{
					current_level = 1;
				} */

				
				var right_or_wrong = 0; //mine
				var QuizFinished = false;
				var lock = false;
				var textpos1 = 48;
				var textpos2=107+30; //107+60 add 10 for gap
				var textpos3=177+30;
				var textpos4=247+30;


				get_level(function()
				{
					caller(function()
					{
						current_level = new_data.Current_level;
					});						
				});
				
					
				//send the request


				quizbg.onload = function()
				{
					//loading image
					quiz_context.drawImage(quizbg, 315,340,231,50,((quiz_canvas.width)/2)-231/2,
						((quiz_canvas.height)/2)-50/2,231,50);
				}
				quizbg.src = "images/BG1.png";	

				
				$(document).ajaxStart(function() {
					//315,340 //546 390
				});		

				$(document).ajaxStop(function() {
					quiz_context.drawImage(quizbg,0,0);
					quiz_game_active = 1;
					SetQuestions();			  
				});								
		

		var close_button = 
		{
		  w: 30,
		  h: 30,
		  x: quiz_canvas.width-30,
		  y: 0,
		};

		function quiz_click(e)
		{
			mouse.getCursorPosition(e,quiz_canvas);
			//alert(mouse.x);
			//console.log("ProcessClick lock is:: " +lock);
			//check if the quiz has not ended
			if(flag_end_quiz !== 1 && quiz_game_active !== 0)
			{
			  if(lock)
			  {
				console.log("Question number: \n" +(qnumber+1));
				console.log("Number of rows: \n" +new_data.Number_of_rows);
				console.log("Level number: \n" +current_level);
				console.log("number of levels: \n" +new_data.Number_of_levels);				  	
				if((qnumber+1) == new_data.Number_of_rows && current_level == new_data.Number_of_levels)
				{

					EndQuiz();
				}
				else
				{
					ResetQ();
				}			  	
			  }	
			  else
			  {
			  	//coordinates are +10 and -10 for accuracy 			  	
			  	if(mouse.y >= 117 && mouse.y <= 157 )
			  	{
			  		GetFeedback(1);
			  	}
			  	if(mouse.y >= 187 && mouse.y <= 227)
			  	{
			  		GetFeedback(2);
			  	}
			  	if(mouse.y >= 257 && mouse.y <= 307)
			  	{
			  		GetFeedback(3);
			  	}					  					  	
			  }				
			}



			 if(mouse.x >= close_button.x && mouse.x <= close_button.x + close_button.w  && mouse.y >= close_button.y && mouse.y <= close_button.y + close_button.h)
			 {

			 		//quizbg.src=" ";
			 		close_button_process(quiz_click);
			 }
		}


		GetFeedback = function(a)
		{
			if(a == CorrectAnswer)
			{
               quiz_context.drawImage(quizbg, 75,322,65,55,470,107+(70*(a-1)),61,51);
               HandleScore("right");
			}

   			else
   			{ 
                quiz_context.drawImage(quizbg, 0,322,65,55,470,107+(70*(a-1)),61,51);
                HandleScore("wrong");
    		}

    		quiz_context.font = "14pt Calibri,Arial";
    		quiz_context.fillText("Click again to continue",20,380);
    		lock = true;				
		}		
//****************************************************************************
		ResetQ = function()
		{
			lock = false;
			quiz_context.clearRect(0,0,546,307);
			qnumber++;
			console.log("score_limit" +new_data.Limit_score);
			// if score is greater than the limit or questions of the particular level are over
			if(real_score >= parseInt(new_data.Limit_score) || (qnumber+1) > new_data.Number_of_rows)
			{
	
				if(current_level < new_data.Number_of_levels)
				{
	
					current_level++; //increment the level_id to be sent to the cookies
					quiz_canvas.removeEventListener("click",quiz_click,false);
					play_quiz(real_score,current_level);
				}
				else
				{
					alert("limit reached");
					EndQuiz();
				}
										
			}
			else
			{
				quiz_context.drawImage(quizbg,0,0);
				SetQuestions();
			}	
		}		

		EndQuiz = function()
		{
			alert("You are in Endquiz");
			current_level = 1;
			//get_new_level();			
			flag_end_quiz = 1;
			quiz_context.fillStyle =$(data).find('endquiz_background_colour').text();
			
			quiz_context.fillRect(0,0,quiz_canvas.width,quiz_canvas.height);

			//draw close button
			quiz_context.drawImage(quizbg, 516,0,30,30,516,0,30,30);

			quiz_context.textAlign 	  = $(data).find('endquiz_align').text(); // very important line
			quiz_context.textBaseline = $(data).find('endquiz_baseline').text();
			quiz_context.font 		  = $(data).find('endquiz_font').text();
			quiz_context.fillStyle 	  = $(data).find('endquiz_colour').text();				
			quiz_context.fillText("You have finished the quiz!",20,100);
			quiz_context.font 		  = $(data).find('endquiz_font_score').text();
			quiz_context.fillText("Your score: " +real_score,20,200);	

		}

		SetQuestions = function()
		{
			Question = new_data.Questions[qnumber];
			CorrectAnswer = 1 + Math.floor(Math.random()*3);
			if(CorrectAnswer==1)
			{
				Option1 = new_data.Options[qnumber][0];	
				Option2 = new_data.Options[qnumber][1];	
				Option3 = new_data.Options[qnumber][2];										
			}
			if(CorrectAnswer==2)
			{
				Option1 = new_data.Options[qnumber][2];	
				Option2 = new_data.Options[qnumber][0];	
				Option3 = new_data.Options[qnumber][1];			
			}	
			if(CorrectAnswer==3)
			{
				Option1 = new_data.Options[qnumber][1];	
				Option2 = new_data.Options[qnumber][2];	
				Option3 = new_data.Options[qnumber][0];		
			}
	
			quiz_context.textAlign 	  = $(data).find('quiz_question_align').text(); // very important line
			quiz_context.textBaseline = $(data).find('quiz_question_baseline').text();
			quiz_context.font 		  = $(data).find('quiz_question_font').text();
			quiz_context.fillStyle 	  = $(data).find('quiz_question_colour').text();
			//quiz_context.fillText(Question,20,textpos1);
			//wrapText(context, text, x, y, maxWidth, lineHeight);
			wrapText(quiz_context, Question, 20, textpos1, 500, 25);

			quiz_context.fillStyle = $(data).find('quiz_answer_colour').text();
			quiz_context.font 	   = $(data).find('quiz_answer_font').text();
			quiz_context.fillText(Option1,20,textpos2);
			quiz_context.fillText(Option2,20,textpos3);
			quiz_context.fillText(Option3,20,textpos4);										
		}	

		HandleScore = function(right_or_wrong)
		{
			if(right_or_wrong === "right")
			{
				real_score = real_score + parseInt(new_data.Increment_score);
				console.log("Score increments::" +real_score +"\n" +"Score is incremented by"
					 +new_data.Increment_score);
			}
			else if(right_or_wrong === "wrong")
			{
				real_score = real_score - parseInt(new_data.Decrement_score);
				console.log("Score decrements::" +real_score +"\n" +"Score is decremented by"
					 +new_data.Decrement_score);
			}

		}


	  }	

  	
		
	


			
							
