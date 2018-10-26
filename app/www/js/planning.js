$(document).ready(function(){
    var urlString = window.location.href,
        url = new URL(urlString),
        planning = url.searchParams.get('planning');

    if(planning) {
        planning = JSON.parse(planning);

        if(planning) {
            var planningTimeLabel = document.getElementById("planningTime"),
                planningNameLabel = document.getElementById("planningName"),
                planningAddressLabel = document.getElementById("planningAddress");
            
            planningTimeLabel.innerHTML = moment(planning.startTime).format('HH:mm') + ' - ' + moment(planning.endTime).format('HH:mm')
            planningNameLabel.innerHTML = planning.name;
            planningAddressLabel.innerHTML = planning.address;

            console.log(planning);
        } else {
            alert('Error, please try again!');

            window.location = "index.html";
        }
    } else {
        alert('Error, please try again!');

        window.location = "index.html";
    }

    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
});