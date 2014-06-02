 var c=document.getElementById("mycanvas2");
 c.onselectstart = function () { return false; }
 var ctx=c.getContext("2d");

 // c.addEventListener("click",getCursorPosition,false);

 //canvas for pre-render buffer
var m_canvas = document.getElementById('canvas_buffer');
var m_context = m_canvas.getContext("2d");

var anim_canvas = document.getElementById('canvas_buffer1');
var anim_context = anim_canvas.getContext("2d");


function animate(iter,lastTime,endpoint1_x,endpoint1_y,endpoint2_x,endpoint2_y,colour,timer)
{
     timer++;
     date = new Date();
     time = date.getTime();

     timeDiff = time - lastTime;

     linearSpeed = 1500;

     distEachFrame = linearSpeed*timeDiff/1000;

     if(iter==0)
     {
       endpoint1_x += distEachFrame;
       endpoint2_y += distEachFrame;      
     }
     else if(iter==1)
     {
       endpoint1_x += distEachFrame;
       endpoint2_y -= distEachFrame;      
     }
     else if(iter==2)
     {
       endpoint1_x -= distEachFrame;
       endpoint2_y -= distEachFrame;      
     }
     else if(iter==3)
     {
       endpoint1_x -= distEachFrame;
       endpoint2_y += distEachFrame;      
     }     

      lastTime = time;
      anim_context.beginPath(); //important

      anim_context.moveTo(endpoint1_x,endpoint1_y);
      anim_context.lineTo(endpoint2_x,endpoint2_y);    
      anim_context.lineWidth = 150;
      anim_context.strokeStyle = colour
      anim_context.lineCap = 'square';
      anim_context.stroke();
      anim_context.closePath();
      ctx.drawImage(anim_canvas, 0, 0);


      if(timer < 60)
      {
        console.log(endpoint1_x);
        requestAnimationFrame(function()
        {
          animate(iter,lastTime,endpoint1_x,endpoint1_y,endpoint2_x,endpoint2_y,colour,timer);
        });
      }

      else
      {
        timer = 0;
        anim_context.clearRect(0,0,anim_canvas.width,anim_canvas.height);
        document.getElementById("mycanvas3").style.zIndex="9";
        cancelRequestAnimationFrame(animate);
        ui2();
      }  


 }


function theLocation(a,b,c,iter)
{
   //get current time
   var timer = 0;
   var date = new Date();
   var time = date.getTime();

    var res = (((b.x - a.x)*(c.y - a.y)) - ((b.y - a.y)*(c.x - a.x)));


   if((res>0) == false && iter==0)
   {
    var result = (res>0);
    colour =  $(data).find('triangle_upper_left_animation').text(); //red
   
    animate(iter,time,0,0,0,0,colour,timer);
    return 1;
   }

    if((res>0) == false && iter==1)
   {
    var result = (res>0);
    colour = $(data).find('triangle_lower_left_animation').text(); 
    
    animate(iter,time,0,460,0,460,colour,timer); 
    return 1;

   }  

    if((res<0) == false && iter==2)
   {
    var result = (res<0); 
    colour = $(data).find('triangle_lower_right_animation').text();
    
    animate(iter,time,820,460,820,460,colour,timer);     
    return 1;
   }       

    if((res>0) == false && iter==3)
   {
    var result = (res>0);
    colour =  $(data).find('triangle_upper_right_animation').text();

    animate(iter,time,820,0,820,0,colour,timer);         
     return 1;

   } 

}

//*Pre-rendering code
// Renders the Entire User Interface as an image 
function render_user_interface()
{
  mycanvas_context.drawImage(m_canvas, 0, 0);
} 
