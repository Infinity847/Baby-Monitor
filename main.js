
var ready = false;
var babyescaped = false;
var babyfound = false;
var loaded = false;
var password = null;
function setup() {
  loaded = false;
    canvas = createCanvas(screen.width/2,screen.height/2);
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    capture = createCapture(VIDEO);
  capture.hide();
}
function modelLoaded() {
  loaded = true;
  document.getElementById("start").innerHTML = "Start Monitoring Baby"
console.log("Cocossd is loaded");
document.getElementById("title").innerHTML = "AI baby monitoring app"
}
function draw() {
image(capture, 0 ,0,screen.width/2,screen.height/2);
if (ready == true) {
  objectDetector.detect(capture,gotResult);
}
}

function start() {
  if (loaded == true) {
  //START FUNCTION
  if (document.getElementById("code").value == null) 
  {
    ready = false;
  }else {
    password = document.getElementById("code").value;
    ready = true;
    send();
  }
}
}
function gotResult(error,results) {
  if (error) {
    console.log("Error");
  }else {
    babyfound=false;
for(i = 0; i< results.length; i ++) {
  if (results[i].label == "Baby") {
babyfound = true;
  }else {
  }
}
if (babyfound == false) {
  babyescaped = true
}else {
  babyescaped = false;
}
  }
  //UPDATE DATA
updateitem(password);
}
function GetData(key) {
  firebase.database().ref("/" + key).on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          //start code here

          //end code here
     }
    });
});
}
function send() {
  firebase.database().ref("/").push({
escaped:babyescaped,
live:capture
  });}
  function updateitem(key)
{
    firebase.database().ref("/").child(key).update({
        escaped:babyescaped,
        live:capture
    });
}