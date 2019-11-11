var station;
var siteId;

function myPlats(){
    const url = "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=93b313c352944b7590052248617514e0&searchstring="+station+"&stationsonly=True&maxresults=1";
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let infos = data.ResponseData;
        return infos.map(function (info) {
            station = document.getElementById("resa").value;
            siteId = info.SiteId;
            innerHTML = "";
            console.log("1");
            myAvgang(siteId);
        })
      })
      .catch(function (error) {
        console.log(error);
      });
}

    
function myAvgang(siteId) {
    const span = document.getElementById('info');
    const url = "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=3b1f16fa9f144aa1aad3e9d76b06cbbe&siteid=" + siteId + "&timewindow=60";
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let infos = data.ResponseData.Trams;
        return infos.map(function (info) {
            console.log("2");
          span.innerHTML += info.Destination + " " + info.DisplayTime +"<br>";
        })
      })
      .catch(function (error) {
        console.log(error);
      });
}





