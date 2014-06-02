  var d=document.getElementById("mycanvas3");
  d.onselectstart = function () { return false; }
  var dtx=d.getContext("2d");

  d.addEventListener("click",close_menu,false); 

      function close_menu(e)
      {
        mouse.getCursorPosition(e,d);

        if(mouse.x >= startBtn.x && mouse.x <= startBtn.x + startBtn.w && mouse.y >= startBtn.y && mouse.y <= startBtn.y + startBtn.h)
        {
          dtx.clearRect(0,0,d.width,d.height);
          ctx.clearRect(0,0,c.width,c.height);
          mycanvas_context.clearRect(0,0,c.width,c.height);
          document.getElementById("mycanvas3").style.zIndex="0";
          document.getElementById("mycanvas2").style.zIndex="1";
          render_user_interface(); 

        }          
      }

  function Point(x,y)
  {
    this.x =x;
    this.y = y;
  }

  var startBtn = {
  w: 70,
  h: 40,
  x: 750,
  y: 420,
  
  draw: function() {
   // dtx.strokeStyle = "blue";
   dtx.beginPath();
    dtx.lineWidth = "2";
    dtx.fillStyle="white";
    dtx.fillRect(this.x, this.y, this.w, this.h);
    
    dtx.font = "bold 15px Arial, sans-serif";
    dtx.textAlign = "center";
    dtx.textBaseline = "middle";
    dtx.fillStyle = "black";
    dtx.fillText("Close", ((this.w/2)+startBtn.x), ((this.h/2)+startBtn.y) );
    dtx.closePath();
    
  }
};

function ui2()
{
  startBtn.draw();
  paint_score();
}

function paint_score()
{
  dtx.fillStyle     = $(data).find('paint_score_colour').text();
  dtx.font          =  $(data).find('paint_score_font').text();
  dtx.textAlign     =  $(data).find('paint_score_align').text();
  dtx.textBaseline  =  $(data).find('paint_score_text_baseline').text();
  paint_score_x_coordinate =  $(data).find('paint_score_x_coordinate').text();
  paint_score_y_coordinate =  $(data).find('paint_score_y_coordinate').text();
  dtx.fillText("Goblins caught: " +score_inside,paint_score_x_coordinate,paint_score_y_coordinate);    
}

