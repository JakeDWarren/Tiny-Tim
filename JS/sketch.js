let TinyTimDataJSON;
var WaterLevel;
var WaterLevelDate;
var Temperature;
var TemperatureDate;
var viewState = 0;

// The URL is sent to the loadJSON that returns the data to the variable
fetch("https://api.thingspeak.com/channels/1322377/feed.json")
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



// Build default table with all api data
function buildTable(){

var WaterLevelFiltered = TinyTimDataJSON.feeds.filter((x)=>x.field3 === "Water Level");
WaterLevel = WaterLevelFiltered[WaterLevelFiltered.length-1].field4;
WaterLevelDate = (new Date(WaterLevelFiltered[WaterLevelFiltered.length-1].field1)).toLocaleString();
console.log(WaterLevel,WaterLevelDate);

var TemperatureFiltered = TinyTimDataJSON.feeds.filter((x)=>x.field3 === "Temperature");
Temperature = TemperatureFiltered[TemperatureFiltered.length-1].field4;
TemperatureDate = (new Date(TemperatureFiltered[TemperatureFiltered.length-1].field1)).toLocaleString();
console.log(Temperature,TemperatureDate);

window.onload = (event) => {
  document.getElementById("Variables").innerHTML = "Water Level: " + WaterLevel + "%" + " " + "Temperature: " + Temperature +"°C" ;
};

var $table1 = $('#upcomingAutoTable')

  $(function() {
    $table1.bootstrapTable({data: TinyTimDataJSON.feeds})
  })

var $table2 = $('#recentAutoTable')

  $(function() {
    $table2.bootstrapTable({data: TinyTimDataJSON.feeds})
  })

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function toggleView() {

  if (viewState == 0) {

    console.log("Hide");

    //Show Elements
    for (i = 0; i < document.getElementsByClassName("view").length; i++) {
      document.getElementsByClassName("view")[i].style.visibility = "hidden";
    }

    viewState = !viewState;

  } else {
    
    console.log("Show");

    //Show Elements
    for (i = 0; i < document.getElementsByClassName("view").length; i++) {
      document.getElementsByClassName("view")[i].style.visibility = "visible";
    }

    viewState = !viewState;
  }

}
