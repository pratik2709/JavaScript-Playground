<?php 
include("config.php");
include("EnDeString.php");
$EnDeStr = New EnDeString($EncryptKey);
if(!isset($_COOKIE['TestCookie']))
{
	$user_id = 'uid1'; //we get this when user account is created or when user logs in
	$quiz_level = 1;
	$user_data = $user_id. "n" .$quiz_level;
	$user_data1 = $EnDeStr->encrypt($user_data);	
	setcookie("TestCookie",$user_data1);	
}
?>
<html>
	<body>
		<canvas id="mycanvas" width=820 height=460 style="border:1px solid #000000;z-index: 3;
position:absolute;
left:0px;
top:0px;
">	
		</canvas>	
		<canvas id="mycanvas4" width=546 height=307 style="border:1px solid #000000;z-index: -1;
position:absolute;
left:140px;
top:76px;
visibility:hidden;
">				
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" ></script> 
	<script>
		//function to create canvas
		function create_canvas(canvas_id,canvas_height,canvas_width,canvas_left,canvas_top,canvas_zindex,canvas_visible)
		{
			var canvas = document.createElement('canvas');
			canvas.id = canvas_id;
			canvas.width = canvas_height;
			canvas.height = canvas_width;
			canvas.style.position = "absolute";
			canvas.style.left = canvas_left;
			canvas.style.top = canvas_top;
			canvas.style.border = "1px solid";
			canvas.style.visibility = canvas_visible;

			if(canvas_zindex)
			{
				canvas.style.zIndex = canvas_zindex;
			}
			document.body.appendChild(canvas);
		}	
	</script> 

	<script>
	//create_canvas("mycanvas",820,460,"0px","0px",3,"visible"); //base
	create_canvas("mycanvas2",820,460,"0px","0px",1,"visible"); //animation
	create_canvas("mycanvas3",820,460,"0px","0px",0,"visible"); //inside menu
	//create_canvas("mycanvas4",546,307,"140px","76px",-1,"hidden"); //different for every game
	create_canvas("canvas_buffer",820,460,"0px","0px","hidden");
	create_canvas("canvas_buffer1",820,460,"0px","0px","hidden");
	</script>	

	<script>
	//score to be painted inside the menu
	//try to make score not global variable
	var score_inside = 0;

	//mycanvas4 is global for all 
var temporary = document.getElementById("mycanvas4");
var temporary_context = temporary.getContext("2d");	
	</script>
	
<!-- *********************************GET THE CANVAS REFRENCE AND CONTEXT****************************************** -->	
		<script>
			var essentials = function()
			{
				var c,canvas_id,ctx;
				return {
					setDoc : function(canvas_id)
					{
						c = document.getElementById(canvas_id);
					},
					getDoc : function()
					{
						return c;
					},
					get2dcontext : function()
					{
						return ctx;
					},
					set2dcontext : function()
					{
						ctx = c.getContext("2d");
					}						
				};					

			}(); 
/*
			function essentials(c,canvas_id,ctx)
			{
				this.c = document.getElementById(this.canvas_id);
				this.ctx = this.c.getContext("2d");
			} */
		</script>
		
<!-- ***********************************SCRIPTS TO INCLUDE******************************* -->

	<!--	temporary code for debugging only please remove later.. 
	<script src="xyobject.js">  </script>
		<script src="corner.js">  </script>
		<script src="insideMenu.js"></script>
		<script src="grid.js"> </script>
		<script src="catch_the_monster_game.js"> </script>
		<script src="under_construction.js"> </script>
		<script src="quizjs.js"> </script> -->


<!-- ***********************************XML CONFIG******************************* -->
        <script>
        var data;

        function get_configuration_data(callback)
        {
	 	   $.ajax({
	        type: "GET",
	        url: "xml_config.xml",
	        dataType: "xml",
	        success: function(response) 
	        {
	        	//hi = $(response).find('numberOfDivsion_north_east').text();
	        	data = response;
	        	//alert(data);
	        	callback(data);
	        }

            });        	
        }

	get_configuration_data(function(){

				$.when(
			    $.getScript( "xyobject.js" ),
			    $.getScript( "corner.js" ),
			    $.getScript( "insideMenu.js" ),
			    $.getScript( "grid.js" ),
			    $.getScript( "catch_the_monster_game.js" ),
			 	$.getScript( "under_construction.js" ),
			    $.getScript( "quizjs.js" ),
			    $.Deferred(function( deferred ){
			        $( deferred.resolve );
			    })
			).done(function(){
			    console.log("loaded");		    
			}); 

		}); 

		$(document).ajaxStart(function() {
			//315,340 //546 390
		});
		$(document).ajaxStop(function() {
			//alert("end ajax");
		}); 

            </script>	            	
	</body>
</html>	
