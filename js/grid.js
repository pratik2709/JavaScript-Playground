//CODE FOR GRID
//essentials.setDoc("mycanvas");
//essentials.getDoc().onselectstart = function () { return false; }
//essentials.set2dcontext();
//essentials.get2dcontext().moveTo(0,0); 

var my_canvas = document.getElementById("mycanvas");

//To prevent from accidently selecting the canvas element
my_canvas.onselectstart = function () { return false; }
//2D context
var mycanvas_context = my_canvas.getContext("2d");	
my_canvas.addEventListener("click",square_detect,false);
//essentials.getDoc().addEventListener("click",square_detect,false);





//disable parts of canvas when game is active
var game_active = 0;

//this variable decides how many loops are required while drawing the lines
var impvar;

//number of divisions south east direction
//var numberOfDivsion = x[0].getElementsByTagName("numberOfDivsion_south_east")[0].childNodes[0].nodeValue;
var numberOfDivsion = $(data).find('numberOfDivsion_north_east').text();

//number of divisions north east direction
var numberOfDivsion2 = $(data).find('numberOfDivsion_south_east').text();

if(numberOfDivsion>numberOfDivsion2)
{
	impvar = numberOfDivsion;
}
else
{
	impvar = numberOfDivsion2;
}	


//function to create a line with start and end points
function Line(pointA, pointB)
{
	this.start = pointA;
	this.end = pointB;
	this.direction = getDirectionVector(pointA,pointB);
}

//function to create a point


//function to get the direction vector of the line
function getDirectionVector(pointA,pointB)
{
	return new Point(pointB.x-pointA.x, pointB.y - pointA.y);

}

//function for calculating cross product
function crossProduct2D(vectorA, vectorB)
{
	return vectorA.x*vectorB.y - vectorA.y*vectorB.x;
}

//function to check if the lines passed are intersecting
function linesAreIntersecting(lineA, lineB)
{
	var qMinusP = new Line(lineA.start, lineB.start);
	var qMinusPCrossS =  crossProduct2D(qMinusP.direction, lineA.direction);
	var qMinusPCrossR = crossProduct2D(qMinusP.direction, lineB.direction);
	var rCrossS = crossProduct2D(lineA.direction, lineB.direction);
	var t = qMinusPCrossS / rCrossS;
	var u = qMinusPCrossR / rCrossS;

	// Lines are collinear, and so intersect if they have any overlap
	if (qMinusPCrossR == 0)
	{
		return ((lineB.start.x - lineA.start.x < 0) != (lineB.start.x - lineA.end.x < 0))
		|| ((lineB.start.y - lineA.start.y < 0) != (lineB.start.y - lineA.end.y < 0));
	}

	// Lines are parallel.
	if (rCrossS == 0){
		
		return false; 
	}

	//check that only the segments are intersecting
	return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}	


//self executing anonmoyous 
(function()
{


//Generate the polygon in the middle
	
		stack1 = [];
		stack2 = [];
		stack3 = [];
		stack4 = [];
	

		genpoly();

		//generate a polygon using functions
		function genpoly()
		{
			find_coordinates(420,0,820,230,numberOfDivsion,1); 
			//console.log("****************");
			find_coordinates(0,230,420,460,numberOfDivsion,0);
			draw_polygon(m_context);
			//render(mycanvas_context);
			push_into_stack();
			empty();
			//console.log("****************");
			find_coordinates(420,460,820,230,numberOfDivsion2,1); 
			//console.log("****************");
			find_coordinates(0,230,420,0,numberOfDivsion2,0);		
			draw_polygon(m_context);
			//mycanvas_context.drawImage(m_canvas, 0, 0);
			point_store();
  			//draw_triangles(m_context);

  			var triangle_upper_left_colour = $(data).find('triangle_upper_left_colour').text();
  			draw_triangles(m_context,triangle_upper_left_colour,0,0,100,0,0,100);

  			var triangle_lower_left_colour = $(data).find('triangle_lower_left_colour').text();	
  			draw_triangles(m_context,triangle_lower_left_colour,0,460,90,460,0,370);  	

  			var triangle_lower_right_colour = $(data).find('triangle_lower_right_colour').text();	
  			draw_triangles(m_context,triangle_lower_right_colour,820,460,720,460,820,370);  

   			var triangle_upper_right_colour = $(data).find('triangle_upper_right_colour').text();
  			draw_triangles(m_context,triangle_upper_right_colour,820,0,730,0,820,90); 			  					

			render_user_interface();

		}			



		/* This function calculates the co-ordinates between 2 points using the formula:
		Suppose we have 2 points (x_start,y_start) and (x_end,y_end)
		For x co-ordinate:: new_x = x_start + ((x_end - x_start)/numberOfDivsion)
		For y co-ordinate:: new_y = y_start + ((y_end - y_start)/numberOfDivsion)
		(new_x,new_y) are between (x_start,y_start) and (x_end,y_end)
		numberOfDivsion tell in how many points you want to divide the line and goes on decrementing
		*/
		function find_coordinates(xc,yc,a2,b2,numberOfDivsion,version)
		{
			/*
			2 arrays are used stack1 and stack2
			stack1 stores (x,y) points of one side of the lines
			stack2 stores (x,y) points of other side of the lines
			*/

			for(var i = 0;i<=impvar;i++)
			{
				/*
				Version variable is used to divide the points into the 2 stacks
				*/
				if(version == 1)
				{
					stack1.push(new Point(xc,yc));	
					console.log(stack1[i].x,stack1[i].y);					
				}	
				else
				{
					stack2.push(new Point(xc,yc));	
					console.log(stack2[i].x,stack2[i].y);
					console.log("the elements for stack2:: " +stack2[i].x +" " +stack2[i].y);					
				}
				xc = xc + ((a2-xc)/numberOfDivsion);
				yc = yc + ((b2-yc)/numberOfDivsion);

				numberOfDivsion--;	
			}
		}		

		//*draw ploygon function outside and has context now
		function draw_polygon(pass_context)
		{
			var temp = pass_context;
			for(var i = 0;i<=impvar;i++)
			{
				temp.beginPath();
				temp.moveTo(stack1[i].x,stack1[i].y);
				temp.lineTo(stack2[i].x,stack2[i].y);
				temp.lineWidth= 3;
				temp.strokeStyle = get_random_color();	
				temp.stroke();					
				temp.closePath();
			}				
		}

		function get_random_color() 
		{
		    var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.round(Math.random() * 15)];
		    }
		    return color;
		}		

		//*push into stack outside
		function push_into_stack()
		{

			for(var i=0;i<=impvar;i++)
			{
				xc = stack1[i].x;
				yc = stack1[i].y;
				stack3.push(new Point(xc,yc));
				//console.log("the elements for stack3:: " +stack3[i].x +" " +stack3[i].y);
			}
			for(var i=0;i<=impvar;i++)
			{
				xc = stack2[i].x;
				yc = stack2[i].y;
				stack4.push(new Point(xc,yc));
				//console.log("the elements for stack4:: " +stack4[i].x +" " +stack4[i].y);
			}							
		}

		//* empty function outside
		function empty()
		{
			stack1 = [];
			stack2 = [];			
		}	

		//*store point function
		function point_store()
		{
		  store = [];
		  store.push(new Point(0,100));
		  store.push(new Point(100,0));

		  store.push(new Point(90,460));
		  store.push(new Point(0,370)); 

		  store.push(new Point(720,460));
		  store.push(new Point(820,370));

		  store.push(new Point(730,0));
		  store.push(new Point(820,90));  
		}


		//*draw_triangles function

		function draw_triangles(pass_context,colour,vertice_one_x,vertice_one_y,vertice_two_x,
		  vertice_two_y,vertice_three_x,vertice_three_y)
		{
		  var temp = pass_context;
		  temp.beginPath();
		  temp.moveTo(vertice_one_x,vertice_one_y);
		  temp.lineTo(vertice_two_x,vertice_two_y); 
		  temp.lineTo(vertice_three_x,vertice_three_y); 
		  //child node here is the text node which is the colour
		  temp.fillStyle = colour;
		  temp.fill();
		  temp.closePath();  
		}

})();		

		
		function square_detect(e)
		{
			mouse.getCursorPosition(e,my_canvas);
			//code to check if the lines intersect		
			
			  x1 = mouse.x;
			  y1 = mouse.y;
			 // alert("x:" +x +" " +"y:" +y);

			var x2,y2,l=1000,x3,y3;
			var ang = Math.atan(230/413);
			x2 = x1 + l*Math.cos(ang);
			y2 = y1 + l*Math.sin(ang);

			x3 = x1 + l*Math.cos(-ang);
			y3 = y1 + l*Math.sin(-ang);				

//comment after this
/*				mycanvas_context.beginPath();
			mycanvas_context.moveTo(x1,y1);
			mycanvas_context.lineTo(x2,y2);
			mycanvas_context.stroke();
			mycanvas_context.closePath();

			mycanvas_context.beginPath();
			mycanvas_context.moveTo(x1,y1);
			mycanvas_context.lineTo(x3,y3);
			mycanvas_context.stroke();
			mycanvas_context.closePath();			*/

		
			var testLine = new Line(new Point(x1, y1),new Point(x2, y2));

			var testLine2 = new Line(new Point(x1, y1),new Point(x3, y3));
	
			var intersections=0;
			var intersect=0;

			for(var s1=1;s1<=impvar;s1++)
			{
			var edgePoint1 = stack3[s1];
			//console.log(edgePoint1);
			var edgePoint2 = stack4[s1];
			var edgePoint3 = stack1[s1];
			var edgePoint4 = stack2[s1];					
			if (linesAreIntersecting(testLine, new Line(edgePoint1, edgePoint2)))
			{
			  intersections++;
			}

			if (linesAreIntersecting(testLine2, new Line(edgePoint3, edgePoint4)))
			{
			  intersect++;
			}			

			}
			console.log(intersections, intersect); 

			//working code for switching canvas layers
			

			if(intersections == 0 || intersect == 0)
			{
				document.getElementById("mycanvas2").style.zIndex="8";
				iter = 0;
		         for(var i = 0; i < (7); i += 2, iter++)
		         {
		            //alert(store[i],store[i+1]);
		            if(theLocation(store[i],store[i+1],new Point(mouse.x,mouse.y),iter) == 1)
		            {
		              break;
		            }

		      	 }

		      	 if(iter==4)
		      	 {
		      	 	document.getElementById("mycanvas2").style.zIndex="1";
		      	 	//privileges.resett();
		      	 } 

		    }

			else if(intersections == 2 && intersect == 1 && game_active !== 1)
			{		
				gameplay();
				 
			}	

			else if(intersections == 2 && intersect == 2 && game_active !== 1)
			{	
				play_quiz(0,1);
			}					    

			else if(game_active !== 1)
			{
				under_const();	
			}//end of else
	}



			
			