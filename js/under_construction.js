				
				function under_const()
				{
					game_active = 1;
					const_temp = temporary;
					const_temp_context = temporary_context;

					document.getElementById("mycanvas4").style.zIndex="7";	
					document.getElementById("mycanvas4").style.visibility="visible";

					var const_temp = document.getElementById("mycanvas4");
					var const_temp_context = const_temp.getContext("2d");
					const_temp_context.clearRect(0,0,const_temp.width,const_temp.height);
					    const_temp_context.fillStyle="white";
					    const_temp_context.fillRect(0,0 ,const_temp.width ,const_temp.height );

					var close_button = {
					  w: 30,
					  h: 30,
					  x: const_temp.width-30,
					  y: 0,
					  
					  draw: function() 
					  {
					  	const_temp_context.beginPath();
					    const_temp_context.lineWidth = "2";
					    const_temp_context.fillStyle="black";
					    const_temp_context.fillRect(this.x, this.y, this.w, this.h);
					    
					    const_temp_context.font = "bold 15px Arial, sans-serif";
					    const_temp_context.textAlign = "center";
					    const_temp_context.textBaseline = "middle";
					    const_temp_context.fillStyle = "white";
					    const_temp_context.fillText("X", ((this.w/2)+close_button.x), ((this.h/2)+close_button.y) );
					    const_temp_context.closePath();
					  }
					};



					function draw_construction_message()
					{
						const_temp_context.beginPath();
						const_temp_context.fillStyle = 'white';
						const_temp_context.fillRect(0,0,const_temp.width,const_temp.height);
					    const_temp_context.font = "bold 15px Arial, sans-serif";
					    const_temp_context.fillStyle = "black";
					    const_temp_context.textAlign = "center"; // alignment is necessary
					    const_temp_context.fillText("UNDER CONSTRUCTION", (const_temp.width)/2, const_temp.height/2);
					    const_temp_context.closePath();

					    	
					}
					draw_construction_message();
					close_button.draw();				
					const_temp.addEventListener("click",cross_button,false);
					
					function cross_button(e)
					{
						mouse.getCursorPosition(e,const_temp);
						//alert(mouse.x);
						 if(mouse.x >= close_button.x && mouse.x <= close_button.x + close_button.w  && mouse.y >= close_button.y && mouse.y <= close_button.y + close_button.h)
						 {
						 	close_button_process(cross_button);
						 }
					}					
				}
