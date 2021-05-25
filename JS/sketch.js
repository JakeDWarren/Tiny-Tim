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
    document.getElementById("WaterLevel").innerHTML = "Water Level: " + WaterLevel + "%";
    document.getElementById("Temperature").innerHTML = "Temperature: " + Temperature +"°C" ;
  };

  var $table1 = $('#upcomingAutoTable')
  var scheduled = TinyTimDataJSON.feeds.filter((x)=>x.field2 === "Scheduled");
  var upcoming = scheduled.filter(function (product) {
  var date = new Date(product.field5);
    return (date >= Date()).toLocaleString();
  });
    $(function() {
      $table1.bootstrapTable({data: scheduled.slice(scheduled.length-6, scheduled.length-1) })
    })

  var $table2 = $('#recentAutoTable')
  var triggeredScheduled = TinyTimDataJSON.feeds.filter((x)=>x.field2 === "Scheduled" || x.field2 === "Triggered");
  var recent = triggeredScheduled.filter(function (product) {
  var date = new Date(product.field6);
    return (date <= Date()).toLocaleString();
  });
  $(function() {
    $table2.bootstrapTable({data: recent[recent.length-1]})
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
