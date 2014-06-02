		play_quiz = function()
		{
			//	var CorrectAnswer,qnumber,quizbg,Question,
			//	Option1,Option2,Option3,Option4,real_score,right_or_wrong,
			//	QuizFinished,lock,textpos1,textpos2,textpos3,textpos4;	
			document.getElementById("mycanvas4").style.zIndex="7";	
			document.getElementById("mycanvas4").style.visibility="visible";
			
			var quiz_canvas = temporary;
			var quiz_context = temporary_context;
			quiz_canvas.onselectstart = function () { return false; }			
			quiz_canvas.addEventListener("click",quiz_click,false);
			quiz_context.fillStyle = "white";
			quiz_context.fillRect(0,0,quiz_canvas.width,quiz_canvas.height);
			game_active = 1; // game is active
			flag_end_quiz = 0;//quiz has ended no more clicks		

			var CorrectAnswer = 0;
			var qnumber = 0;
			var quizbg = new Image();					
			var Question = new String;
			var Option1 = new String;
			var Option2 = new String;	
			var Option3 = new String;
			var Option4 = new String;
			var real_score = 0; //mine
			var right_or_wrong = 0; //mine
			var QuizFinished = false;
			var lock = false;
			var textpos1 = 48;
			var textpos2=107+30; //107+60 add 10 for gap
			var textpos3=177+30;
			var textpos4=247+30;									
			var change_level = 0;
			var got_data = 0;
			var current_level;	

			quizbg.onload = function()
			{
				quiz_context.drawImage(quizbg,0,0);
				SetQuestions();
			}
			quizbg.src = "images/BG1.png";						
					
			var new_data; // new data will contain all the data returned from server
		    function get_new_level(){
		           $.ajax({
		              async: false,
		              type: "GET",
		              url: "functions.php",
		              data: {current_level: current_level}, //for sending data to the php script
		              contentType: "application/json",
		              success: function (data) 
					 {
					 	//new_data1 = get_quiz_data2.reload_quiz_data();
						change_level = 1;
					 }

		            });
		    }	

			function caller(callback)
			{
			   $.ajax({
			      async: true,
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

			//caller can access all ajax data
			caller(function()
			{
				current_level = new_data.Current_level;							

			});

			function quiz_click(e)
			{
				mouse.getCursorPosition(e,quiz_canvas);

				if(flag_end_quiz !== 1)
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
				 		quizbg.src="";
				 		close_button_process(quiz_click);
				 }
			}

			var close_button = 
			{
			  w: 30,
			  h: 30,
			  x: quiz_canvas.width-30,
			  y: 0,
			};												

		
		}


			
							
