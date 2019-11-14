
/// START DEPARTURES

function departures(SiteId)
{
avgangar();

var data1 = new Date();
var data2;
var diffWalk;
var minutediff;
var goom;


const span = document.getElementById('information');
span.innerHTML= "";
const url = "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=39c82cc54837421385bf8f2eb08f5306&siteid="+SiteId+"&timewindow=20";
fetch(url)
.then((resp) => resp.json())
.then(function (data) {
let infos = data.ResponseData.Metros;
return infos.map(function (info) {

data2 = new Date(Date.parse(info.ExpectedDateTime));

minutediff = (data2 - data1) / 1000 / 60;
console.log(minutediff);
console.log(walkingDistance.value);
diffWalk = minutediff - walkingDistance.value;
goom = " Gå om " + (Math.floor(minutediff - walkingDistance.value));
if (goom == " Gå om " + 0) {
goom = " Gå Nu";
}


console.log(goom);
if (diffWalk > 0)
{
console.log("hej");


// första if-satsen ändrar om nu till 0 min
if (info.DisplayTime == "Nu")
{ info.DisplayTime = "0 min"

span.innerHTML += "<td>" + info.LineNumber + "</td>" + " " + "<td>" + info.Destination + "</td>" + " " + "<td>" + info.DisplayTime + "</td>" + goom + " <br>";

}

// andra if-satsen som kör om tecknet : finns i displaytime
else if (info.DisplayTime.indexOf(":") >-1)
{

data2 = new Date(Date.parse(info.ExpectedDateTime));
console.log(data1);
console.log(data2);


minutediff = (data2 - data1) / 1000 / 60;
console.log(minutediff);

info.DisplayTime = Math.floor(minutediff) + " min";

span.innerHTML += "<td>" + info.LineNumber + "</td>" + " " + "<td>" + info.Destination + "</td>" + " " + "<td>" + info.DisplayTime + "</td>" + goom + " <br>";

}

// kör om inget annat stämmer.
else {
span.innerHTML += "<td>" + info.LineNumber + "</td>" + " " + "<td>" + info.Destination + "</td>" + " " + "<td>" + info.DisplayTime + "</td>" + goom + " <br>";

}
}
})
})

.catch(function (error) {
console.log(error);
});

}

/// END DEPARTURES