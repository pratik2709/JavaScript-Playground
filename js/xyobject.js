// RequestAnimFrame: a browser API for getting smooth animations
    window.requestAnimationFrame = (function(callback)
      { return window.requestAnimationFrame || window.webkitRequestAnimationFrame 
      	|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame 
      	|| window.msRequestAnimationFrame 
      	|| function(callback){ window.setTimeout(callback, 1000 / 60); };
      })();

window.cancelRequestAnimationFrame = ( function() {
	return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
} )();

//this function is used for creating contexts and
//adding eventlistener
/*
function create_context(canvas_reference,canvas_context,canvas_name)
{
	var canvas_reference=document.getElementById(canvas_name);
	canvas_reference.onselectstart = function () { return false; }
	var canvas_context=c.getContext("2d");
}*/ 

var privileges =
{
	polygon_triangle_layer : 3,
	black_fill_layer : 1,
	menu_layer : 0,
	monster_game_layer: -1,
	under_construction_layer : -2,
	quiz_game_layer : -3,


	elevate: function(base_layer_name,elevated_canvas)
	{
		document.getElementById(elevated_canvas).style.zIndex= base_layer_name + 1;
	},
	resett: function()
	{
		document.getElementById("mycanvas4").style.visibility="hidden";
		//document.getElementById("mycanvas5").style.visibility="hidden";
		//document.getElementById("mycanvas6").style.visibility="hidden";
		document.getElementById("mycanvas").style.zIndex= 3;	
		document.getElementById("mycanvas2").style.zIndex=1;
		document.getElementById("mycanvas3").style.zIndex=0;
		document.getElementById("mycanvas4").style.zIndex=-1;	
		//document.getElementById("mycanvas5").style.zIndex=-2;
		//document.getElementById("mycanvas6").style.zIndex=-3;

	}
}; 		

//get colour
function getColor(canvas, x, y) 
{    
    var context = canvas.getContext("2d");
    var pixel = context.getImageData(x, y, 1, 1);

    // Red = rgb[0], green = rgb[1], blue = rgb[2]
    // All colors are within range [0, 255]
    var rgb = pixel.data;

    return rgb;
}

function Point(x, y)
{
	this.x = x;
	this.y = y;
}		

  var mouse = {
 
		getCursorPosition: function(e,canvas_ref)
		{ 		
			if (e.pageX != undefined && e.pageY != undefined) 
			{
			mouse.x = e.pageX;
			mouse.y = e.pageY;
			}
			
			else
			{
			mouse.x = e.clientX + document.body.scrollLeft +
					document.documentElement.scrollLeft;
			mouse.y = e.clientY + document.body.scrollTop +
					document.documentElement.scrollTop;
			}
			
			  mouse.x -= canvas_ref.offsetLeft;
			  mouse.y -= canvas_ref.offsetTop;		 
		}

};

//optimize closing process using this method
function close_button_process(event_function_name)
{
 	privileges.resett();
 	temporary_context.clearRect(0,0,temporary.width,temporary.height);
 	if(event_function_name)
 	temporary.removeEventListener("click",event_function_name,false);
 	mycanvas_context.clearRect(0,0,mycanvas.width,mycanvas.height);
 	render_user_interface();
 	game_active = 0;
}

//font creation function 

var common_functions = {

	style_text: function(given_context,alignment,baseline,font,colour)
	{
		given_context.textAlign = alignment; // very important line
		given_context.textBaseline = baseline;
		given_context.font = font;
		given_context.fillStyle = colour;
		//given_context.fillText(text,xcoordinate,ycoordinate);
	}	

}

function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

  function wrapText(context, text, x, y, maxWidth, lineHeight) 
  {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) 
    {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) 
      {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else 
      {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }	




	
