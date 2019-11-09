fetch(
        "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.<FORMAT>?key=<3b1f16fa9f144aa1aad3e9d76b06cbbe>&siteid=<SITEID>&timewindow=<TIMEWINDOW>"
    )
    .then(res => res.json())
    .then(data => console.log(data));