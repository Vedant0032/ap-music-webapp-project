song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftwrist = 0;
song_status="";
song2_status = "";
score_rightwrist=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
    }

    
function setup(){
canvas=createCanvas(600, 500);
canvas.center();
video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotposes);
}


function draw(){
image(video, 0, 0, 600, 500)
fill("#800080");
stroke("#000000")
song_status = song1.isPlaying(true)
song2_status=song2.isPlaying(true);
if(score_leftwrist > 0.2){
    circle(leftWristX, leftWristY, 20);
song2.stop();
if(song_status == false){
    song1.stop();
    song2.play()
}
if(song2_status = false){
    song2.stop()
    song1.play()
}

}
if(score_rightwrist > 0.2){
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    if(song2_status == false){
        song1.play()
        song2.stop()
    }
    if(song_status == false){
        song1.stop();
        song2.play();
    }
}
}

function modelLoaded(){
    console.log("model loaded");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x " + leftWristX + "left wrist y" + leftWristY + "right wrist x " + rightWristX + "right wrist y" + rightWristY);
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
    }
}