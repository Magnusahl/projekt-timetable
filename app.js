var station;
var siteId;
var gatime;
var datum = new Date();
var min;
var data1;

//Ladda tidigare sökning vid start
loadData();

//Hanterar sökningen efter station
function myPlats(save) {
    //Hämtar info från stations fältet
    station = document.getElementById("resa").value;

    //Spara sökt station
    if (save == true) {
        saveData();
    }

    //Hämtar station när användaren söker
    const url =
        "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=93b313c352944b7590052248617514e0&searchstring=" +
        station +
        "&stationsonly=True&maxresults=1";
    fetch(url)
        .then(resp => resp.json())
        .then(function(data) {
            let infos = data.ResponseData;
            return infos.map(function(info) {
                siteId = info.SiteId;
                console.log("1");
                myAvgang(siteId);
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Hämta Destination, linjenummer och tid
function myAvgang(siteId) {
    const span = document.getElementById("info");

    //Tömmer värdet i tabellen
    span.innerHTML = "";
    const url =
        "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=3b1f16fa9f144aa1aad3e9d76b06cbbe&siteid=" +
        siteId +
        "&timewindow=30";
    fetch(url)
        .then(resp => resp.json())
        .then(function(data) {
            let infos = data.ResponseData.Trains;

            return infos.map(function(info) {
                // Datum
                data1 = new Date(Date.parse(info.ExpectedDateTime));
                console.log("2");

                //Ta bort klocktid och bara visa minuter
                if (info.DisplayTime.indexOf(":") > -1) {
                    data1 = new Date(Date.parse(info.ExpectedDateTime));
                    min = (data1 - datum) / 1000 / 60;
                    info.DisplayTime = Math.floor(min) + " min";

                    //Skapa tabell
                    span.innerHTML +=
                        "<tr><td>" +
                        info.GroupOfLine +
                        "</td><td>" +
                        info.LineNumber +
                        "</td><td>" +
                        info.Destination +
                        "</td><td>" +
                        info.DisplayTime +
                        "</td></tr>";
                } else {
                    //Skapa tabell
                    span.innerHTML +=
                        "<tr><td>" +
                        info.GroupOfLine +
                        "</td><td>" +
                        info.LineNumber +
                        "</td><td>" +
                        info.Destination +
                        "</td><td>" +
                        info.DisplayTime +
                        "</td></tr>";
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Laddar senaste sökningen
function loadData() {
    const url =
        "https://cors-anywhere.herokuapp.com/http://primat.se/services/data/fluhay@gmail.com-magnusA_resa.json";
    fetch(url)
        .then(resp => resp.json())
        .then(function(data) {
            let infos = data.data;
            return infos.map(function(info) {
                resa.value = info.stations;
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Sparar senaste sökning
function saveData() {
    const url =
        "https://cors-anywhere.herokuapp.com/http://primat.se/services/sendform.aspx?xid=magnusA_resa&xmail=fluhay@gmail.com&stations=" +
        station;
    fetch(url)
        .then(resp => resp.json())
        .then(function(data) {
            let infos = data.data;
            return infos.map(function(info) {});
        })
        .catch(function(error) {
            console.log(error);
        });
}