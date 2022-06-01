function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet" , modelloaded);
}
function modelloaded() {
console.log("model is loaded");
}

function draw() {
  image(video , 0 , 0 , 300 , 300);
 classifier.classify(video , getResult);
}
var previous_result=""
function getResult(error , results) {
  if(error) {
    console.log(error);

  }
  else{
    if(results[0].confidence>0.5&&previous_result!=results[0].label){
      console.log(results);
      previous_result=results[0].label;
      document.getElementById("result_object").innerHTML=results[0].label;
      document.getElementById("result_accuracy").innerHTML=results[0].confidence.toFixed(3);
     var synth=window.speechSynthesis;
     speakdata="object detected is "+results[0].label
     var utter=new SpeechSynthesisUtterance(speakdata)
     synth.speak(utter)
    }
    

  }
}