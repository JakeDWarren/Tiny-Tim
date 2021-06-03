// Globa;l variables
let TinyTimDataJSON;
var WaterLevel;
var WaterLevelDate;
var Temperature;
var TemperatureDate;
var viewState = 0;
var todaysDate = new Date(Date());

// The URL is sent to the loadJSON that returns the data to the variable
fetch("https://api.thingspeak.com/channels/1322377/feeds.json?results=10000")
.then(function (response) {
  return response.json();
})
.then(function (JSONResponce) {
  console.log(JSONResponce);
  TinyTimDataJSON = JSONResponce;
  buildTable();

})
.catch(function (error) {
  console.log("Error: " + error);
});

// Build tables and format/filter api data
function buildTable(){

  // Get water level data and store in variable
  var WaterLevelFiltered = TinyTimDataJSON.feeds.filter((x)=>x.field3 === "Water Level");
  WaterLevel = WaterLevelFiltered[WaterLevelFiltered.length-1].field4;
  WaterLevelDate = (new Date(WaterLevelFiltered[WaterLevelFiltered.length-1].field1)).toLocaleString();
  console.log(WaterLevel,WaterLevelDate);

  // Get Temperature data and store in variable
  var TemperatureFiltered = TinyTimDataJSON.feeds.filter((x)=>x.field3 === "Temperature");
  Temperature = TemperatureFiltered[TemperatureFiltered.length-1].field4;
  TemperatureDate = (new Date(TemperatureFiltered[TemperatureFiltered.length-1].field1)).toLocaleString();
  console.log(Temperature,TemperatureDate);

  // Add variables to html
    document.getElementById("WaterLevel").innerHTML = "Water Level: " + WaterLevel + "%";
    document.getElementById("Temperature").innerHTML = "Temperature: " + Temperature +"°C" ;

  // Create the upcoming table
  var $table1 = $('#upcomingAutoTable')
  var scheduled = TinyTimDataJSON.feeds.filter((x)=>x.field2 === "Scheduled");
  var upcoming = scheduled.filter((x)=> new Date(x.field7) > todaysDate );
    $(function() {
      $table1.bootstrapTable({data: upcoming.slice(0, 10) })
    })

  // Create the recent table
  var $table2 = $('#recentAutoTable')
  var triggeredScheduled = TinyTimDataJSON.feeds.filter((x)=>x.field2 === "Scheduled" || x.field2 === "Triggered");
  var recent = triggeredScheduled.filter((x)=> new Date(x.field8) < todaysDate );
  $(function() {
    $table2.bootstrapTable({data: recent.slice(recent.length-1, recent.length )})
  })

}

// On toggle view, hide/display page content (for better view of Tiny-Tim)
function toggleView() {

  if (viewState == 0) {

    console.log("Hide");

    //Hide Elements
    for (i = 0; i < document.getElementsByClassName("view").length; i++) {
      document.getElementsByClassName("view")[i].style.visibility = "hidden";
    }
      document.getElementsByClassName("viewHidden")[0].style.visibility = "visible";

    viewState = !viewState;

  } else {

    console.log("Show");

    //Show Elements
    for (i = 0; i < document.getElementsByClassName("view").length; i++) {
      document.getElementsByClassName("view")[i].style.visibility = "visible";
    }
    document.getElementsByClassName("viewHidden")[0].style.visibility = "hidden";

    viewState = !viewState;
  }

}

// Get the modal
// var eventsModal = document.getElementById("eventsModal");
// var infoModal = document.getElementById("infoModal");

// Get the <span> element that closes the modal
var spanEvents = document.getElementsByClassName("close")[0];
var spanInfo = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
eventsUpcoming.onclick = function() {
eventsModal.style.display = "flex";
}

eventsRecent.onclick = function() {
eventsModal.style.display = "flex";
}

eventsRecent.onclick = function() {
eventsModal.style.display = "flex";
}

info.onclick = function() {
infoModal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
spanEvents.onclick = function() {
  eventsModal.style.display = "none";
}

spanInfo.onclick = function() {
  infoModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == eventsModal || event.target == infoModal) {
    eventsModal.style.display = "none";
    infoModal.style.display = "none";
  }
}
