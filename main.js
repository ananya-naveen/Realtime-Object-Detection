img="";
status="";
objects=[];

function preload(){
    img=loadImage("https://i.postimg.cc/mkMnGV7W/CAT.jpg");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResults);
        r=random(255);
        g=random(255);
        b=random(255);
        for(z=0;z<objects.length;z++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("objects").innerHTML="Number of Objects: "+objects.length;
            fill(r,g,b);
            percent=floor(objects[z].confidence*100);
            text(objects[z].label+" "+percent+"%",objects[z].x+15,objects[z].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[z].x,objects[z].y,objects[z].width,objects[z].height);
        }
    }
}