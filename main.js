
/*
TODO
1. Ball collision off of the ceiling
2. Control (player / computer -- choose one) of paddle two
3. Display and track scores (ball should reset after score)
4. Ball-paddle collisions (tricky!)
*/
var paddle_1_element = document.getElementById("paddle_1");
var paddle_1_model = {
  x: 20,
  y: 200
};
var paddle_2_element = document.getElementById("paddle_2");
var paddle_2_model = {
  x: 760,
  y: 200
};
var ball_element = document.getElementById("ball");
var ball_model = {
  x: 300,
  y: 300,
  vx: -5,
  vy: 5
}

var player_1_score_element = document.getElementById("player_1_score");
var player_1_score = 0;

var player_2_score_element = document.getElementById("player_2_score");
var player_2_score = 0;

function onMouseMove(evt) {
  paddle_1_model.y = evt.pageY - evt.target.offsetTop - 50;
}
function reset(){
  paddle_1_model.x = 20;
  paddle_2_model.x = 760;
  paddle_1_model.y = 200;
  paddle_2_model.y = 200;
  ball_model.x = 300;
  ball_model.y = 300;
  ball_model.vy = 5;
  ball_model.vx = 5;
}
//update
function update(){
  if ((ball_model.x + 20 > paddle_1_model.x) && (ball_model.x < paddle_1_model.x + 20)){
        if((ball_model.y < paddle_1_model.y+100) && (ball_model.y
          +20 > paddle_1_model.y)){
          ball_model.vx = ball_model.vx * -1;
        }
      }
  if ((ball_model.x + 20 > paddle_2_model.x) && (ball_model.x < paddle_2_model.x+20)){
      if((ball_model.y < paddle_2_model.y+100) && (ball_model.y +20> paddle_2_model.y)){
          ball_model.vx = ball_model.vx * -1;
        }
   }
  //update the ball model position
  ball_model.x = ball_model.x + ball_model.vx;
  ball_model.y = ball_model.y + ball_model.vy;


  //check if the ball is colliding with the edge
  if (ball_model.y > 580 || ball_model.y < 20) {
    //bottom edge
    //flip the y direction
    ball_model.vy = ball_model.vy * -1;
  }

  if (ball_model.x > 799){

    player_1_score = player_1_score + 1;
    reset();
  }
  if (ball_model.x < 1){

    player_2_score = player_2_score +1;
    reset();
  }

}
//draw
function draw() {
  //draw paddle 1
  paddle_1_element.style.top = paddle_1_model.y + "px";
  paddle_1_element.style.left = paddle_1_model.x + "px";

  //draw paddle 2
  paddle_2_element.style.top = paddle_2_model.y + "px";
  paddle_2_element.style.left = paddle_2_model.x + "px";

  //draw the ball
  ball_element.style.top = ball_model.y + "px";
  ball_element.style.left = ball_model.x + "px";

  //draw the players' scores
  player_1_score_element.innerHTML = player_1_score;
  player_2_score_element.innerHTML = player_2_score;
}

function loop() {
  update();
  draw();
}

document.getElementById("screen").onmousemove = onMouseMove;
setInterval(loop, 1000/30);

document.addEventListener('keydown', function(event){
  if (event.keyCode === 38){
    event.preventDefault();
    paddle_2_model.y = paddle_2_model.y-20;
  } else if(event.keyCode === 40){
    event.preventDefault();
    paddle_2_model.y = paddle_2_model.y+20;
  }
});
