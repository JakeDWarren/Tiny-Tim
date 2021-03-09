let TinyTimDataJSON;

//The URL is sent to the loadJSON that returns the data to the variable
fetch("http://api.thingspeak.com/channels/1322377/feed.json")
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

// Build table for all Tiny-Tim Messages
function buildTable() {

  var container = document.getElementById('example');
  var hot = new Handsontable(container, {
    data: TinyTimDataJSON.feeds,
    rowHeaders: true,
    colHeaders: true,
    filters: true,
    dropdownMenu: true,
    licenseKey: 'non-commercial-and-evaluation'
  });

}
