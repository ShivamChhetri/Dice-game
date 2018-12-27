let matrix= document.getElementById("matrix");
let player= document.getElementById("player");
let canvas=document.querySelector("canvas");
let grid=5;

matrix.style.gridTemplate="repeat("+grid+",1fr)/repeat("+grid+",1fr)";
for(let i=0;i<grid*grid;i++){
    let d= document.createElement("div");
    d.innerHTML=i+1;
    d.classList.add("grid-box");
    matrix.appendChild(d);
}

let middle;
let chance;
let diceValue;
let shake;
function initiallize(){
    middle= ((grid*grid)+1)/2;
    matrix.childNodes[middle].style.background="red";
    chance=0;
    diceValue=4;
    shake=0;
    player.innerHTML="Player "+1+" Chance";
}
initiallize();

canvas.addEventListener("click",()=>{
    diceValue= Math.floor(Math.random()*6) +1;
    console.log(diceValue);
    shake=0;
    update();
    if(chance==0){
        matrix.childNodes[middle].style.background="blue";
        if((middle+diceValue) <= (grid*grid)) middle+=diceValue;
        chance=1;
    }else if(chance==1){
        matrix.childNodes[middle].style.background="blue";
        if((middle-diceValue) > 0) middle-=diceValue;
        chance=0;
    }
    matrix.childNodes[middle].style.background="red";
    player.innerHTML="Player "+(chance+1)+" Chance";
    if(middle==1){
        alert("player 2 wins");
        restart();
    }else if(middle==(grid*grid)){
        alert("player 1 wins");
        restart();
    }
});

function restart(){
    matrix.childNodes[middle].style.background="blue";
    initiallize();
}

// let canvas=document.querySelector("canvas");
let W= 100;
let H= 100;
canvas.width=W;
canvas.height=H;
let c= canvas.getContext('2d');

let dice= new Image();
dice.src="./images/dice.png";

function draw(val){
    c.beginPath();
    // c.fillStyle="blue";
    // c.fillRect(0,0,W,H);
    c.drawImage(dice,
        0+(557*(val-1)),0,557,557,
        0,0,W,H);
    c.fill();   
}

let anime;

// let diceValue=5;
function update(){
    c.clearRect(0,0,W,H);
    if(shake<50){
        draw((Math.floor(Math.random()*6)+1));
    }
    else{
        draw(diceValue);
        cancelAnimationFrame(update);
    }
    shake++;
    anime= requestAnimationFrame(update);
}
draw(6);


// function animate(){
//     update();
    
// }

