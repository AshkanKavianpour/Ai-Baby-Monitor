video="";
status="";
objects=[];

function preload() {
    song=loadSound("Alarm.mp3");
 
}

function setup() {
    canvas=createCanvas(480, 380);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status : Objects Detected";

            if(objects[i].length==0) {
                document.getElementById("baby_found").innerHTML="Baby Not Found";
                song.play();
            }
           if(objects[i].label =="person") {
               document.getElementById("baby_found").innerHTML="Baby Found";
               
           }
           else {
               document.getElementById("baby_found").innerHTML="Baby Not Found";
               song.play();
           }
        }

    }

}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
    
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    }

    console.log(results);
    objects=results;
}