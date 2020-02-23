// Create a new Mappa instance using Leaflet.
const mappa = new Mappa("Leaflet");
let myMap;
let firstVisit = true;
let Btn1,Btn2,Btn3,Btn4 = true;

// Lets put all our map options in a single object
let userMarker;
let mousePos;
let mapLoaded;
let zone;
let tarArray = [
  [50.36557170459509, -4.142242670059204],
  [50.364353495477175, -4.141899347305298],
  [50.36239094957529, -4.149017930030823],
  [50.36522609226425, -4.1428327560424805],
  [50.3652363580133, -4.141775965690613],
  [50.3647299117452, -4.1442811489105225]
];




let Marker1, Marker2, Marker3, Marker4, Marker5;

const options = {
  lat: 50.365389,
  lng: -4.142222,
  zoom: 18,
  style: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

function preload() {
 
 
  Pop = loadSound('Sound/popUp.wav');
  SeaGuls = loadSound('Sound/Seashore And Seagulls-SoundBible.com-1708097714.wav');
  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  beginLocation();
  
  myMap = mappa.tileMap(options);//map variable with options from above

  myMap.overlay(canvas, onMapLoaded);//canvas variable with onMapLoaded function
 
  

function beginLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(gotPosition);
  }
}



//user location
function gotPosition(position) {
  // Unlikely but we might get position before map is loaded!
  // That would cause an error if we tried to create the marker
  if (!mapLoaded) return;

  if (!userMarker) {
    // Create the marker
    userMarker = L.circleMarker([
      position.coords.latitude,
      position.coords.longitude
    ]).addTo(myMap.map);
  } else {
    // Move the marker
    userMarker.setLatLng([position.coords.latitude, position.coords.longitude]);
  }
}



//variables for icons below
var mem, Smeaton, Ship, Armada, Drake;

function onMapLoaded() {
  mapLoaded = true;
//geoJSON file with held coords
  L.geoJSON(zone).addTo(myMap.map);
  //icon creates and size with bind position.
  //custom icon for memorial start point.
  mem = L.icon({
    iconUrl: "images/mem.png",
    iconSize: [50, 70], // size of the icon
    iconAnchor: [20, 60]
  });
  //custom icon setup for smeaton
  Smeaton = L.icon({
    iconUrl: "images/light.gif",
    iconSize: [50, 70], // size of the icon
    iconAnchor: [25, 60]
  });
  //custom icon for boats/ships
  Ship = L.icon({
    iconUrl: "images/ship.png",
    iconSize: [80, 90], // size of the icon
    iconAnchor: [20, 60],
    
  });
  Drake = L.icon({
    iconUrl: "images/drake3.png",
    iconSize: [50, 60], // size of the icon
    iconAnchor: [15, 65]
  });
  Armada = L.icon({
    iconUrl: "images/armada.png",
    iconSize: [50, 60], // size of the icon
    iconAnchor: [15, 65]
  });
  //target markers
  BtnFalse();
  drawtmark();
  SeaGuls.play();
  //opens modal by default
  $("#myModal").modal("show");
  //Plays morse code sound to start app
 
  //variable for modal id btn1
  var btn1 = document.querySelector("#true1");

  btn1.addEventListener("click", function() {
    $("#Btn1").modal("hide");
    myMap.map.panTo(tarArray[1]);//pan to array position of next Marker
    
  });
  //variable for modal id btn2
  var btn2 = document.querySelector("#false2");

  btn2.addEventListener("click", function() {
    $("#Btn2").modal("hide");
    myMap.map.panTo(tarArray[2]);//pan to array position of next Marker
  });

  var btn3 = document.querySelector("#true3");

  btn3.addEventListener("click", function() {
    $("#Btn3").modal("hide");
    myMap.map.panTo(tarArray[3]);//pan to array position of next Marker
  });

  var btn4 = document.querySelector("#true4");

  btn4.addEventListener("click", function() {
    $("#Btn4").modal("hide");
    myMap.map.panTo(tarArray[4]);//pan to array position of next Marker
  });



//function callled when wrong anwser chosen
function BtnFalse(){
//button 1 incorrect answer button removes Marker2 and re adds Marker1 pans back to array [0]
  $("#false1").click(function(){
    $("#Btn1").modal("hide");
    Marker2.remove();
    myMap.map.panTo(tarArray[0]);
    Marker1.addTo(myMap.map);
    Wrong.play();
  });
//button 2 incorrect answer button removes Marker3 and re adds Marker1 pans back to array [0]
  $("#true2").click(function(){
    $("#Btn2").modal("hide");
    Marker3.remove();
    myMap.map.panTo(tarArray[0]);
    Marker1.addTo(myMap.map);

  });

//button 3 incorrect answer button removes Marker2,3,4 and re adds Marker1 pans back to array [0]
  $("#false3").click(function(){
    $("#Btn3").modal("hide");
    Marker4.remove();
    Marker3.remove();
    Marker2.remove();
    myMap.map.panTo(tarArray[0]);
    Marker1.addTo(myMap.map);

  });

//button 4 incorrect answer button removes Marker2,3,4,5 and re adds Marker1 pans back to array [0]
  $("#false4").click(function(){
    $("#Btn4").modal("hide");
    Marker5.remove();
    Marker4.remove();
    Marker3.remove();
    Marker2.remove();
    myMap.map.panTo(tarArray[0]);
    Marker1.addTo(myMap.map);

  });

}
  function drawtmark() {
    //Start Marker1
    Marker1 = L.marker(tarArray[0], { icon: mem } ).addTo(myMap.map);
    //click fuction modal ID 1  to show dialogue  if question is equal to true1 (button ID for true)
    //remove Marker 1 and add Marker 2.
    
    Marker1.on("click", function(e) {
      $("#Btn1").modal("show");

      if (Marker1 != true1) {
        Marker1.remove();
       
      }
      
      //Add marker2 
      Marker2 = L.marker(tarArray[1], { icon: Smeaton }).addTo(myMap.map);
      Pop.play();
     
      Marker2.on("click", function(e) {
        $("#Btn2").modal("show");
       
        if (Marker2 != false2) {
          Marker2.remove();
          
        }
        //add marker 3
        Marker3 = L.marker(tarArray[2], { icon: Ship } ).addTo(myMap.map);
        Pop.play();
        Marker3.on("click", function(e) {
          $("#Btn3").modal("show");

          if (Marker3 != false3) {
            Marker3.remove();
            
          }
          //add marker 4
          Marker4 = L.marker(tarArray[3], { icon: Drake }).addTo(myMap.map);
          Pop.play();


          Marker4.on("click", function(e) {
            $("#Btn4").modal("show");

            if (Marker4 != false4) {
              Marker4.remove();
            }
            //add marker 6
            Marker5 = L.marker(tarArray[4], { icon: Armada }).addTo(myMap.map);
            Pop.play();
          });
        });
      });
    });
  }
  function draw(){
    var pos = [];

    pos = myMap.pixelToLatLng(mouseX, mouseY);
    pos = [pos.lng, pos.lat];
    console.log(mouseX, mouseY);
  }
}

}


