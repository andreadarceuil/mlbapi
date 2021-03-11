var i = 0;
var j = 0;
function startMeUp() {
    for (var j = 1; j <= 31; j++) {
        var day = j;

        if (day < 10) {
            day = "0" + day;
        }
        document.getElementById("lstDays").options[j] = new Option(day);
    }


};

// JavaScript for MLBDemo

// AJAX synchronous XMLHttpRequest to get the JSON
// from the site defined by url
function getJSONSynch(url) {
    var resp;
    var xmlHttp;

    resp = ""; //does this ensure data is always a string
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp !== null) {
        xmlHttp.open("GET", url, false); //what is "GET"
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    return resp;
}



   

// onload event handler creates the URL
// for a given year month and day
function getBaseballDataSynch() {
    var ref = document.getElementById("years");
    var year = parseInt(ref.options[ref.selectedIndex].text);
    var ref2 = document.getElementById("lstDays");
    var day = parseInt(ref2.options[ref2.selectedIndex].text);
    if (day < 10)
        day = "0" + day;
    var ref1 = document.getElementById("months");
    var monthText = ref1.options[ref1.selectedIndex].text;
    var month;
    switch (monthText) {
        case "Jan":
            month = "01";
            break;
        case "Feb":
            month = "02";
            break;
        case "March":
            month = "03";
            break;
        case "April":
            month = "04";
            break;
        case "May":
            month = "05";
            break;
        case "June":
            month = "06";
            break;
        case "July":
            month = "07";
            break;
        case "August":
            month = "08";
            break;
        case "September":
            month = "09";
            break;
        case "October":
            month = "10";
            break;
        case "November":
            month = "11";
            break;
        case "December":
            month = "12";
            break;
        default: month = "01";

    }



            var tempURL = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
            //var tempURL1 = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day;

            // this is what the actual URL will look like
            // http://gd2.mlb.com/components/game/mlb/year_2017/month_07/day_08/master_scoreboard.json

            // get the data for the specified date with a synchronous call
            // and assigned the returned JSON to a local variable

            // blanking out the div doesn't work here because the synchronous call
            // to getJSONSync will block the processing of the next line of code
            //document.getElementById("jsonDiv").innerHTML = ""; // blank out the div
            var baseballJson = getJSONSynch(tempURL);

            // display all the data
            //document.getElementById("jsonDiv").innerHTML = baseballJson;

            // finally convert the returned data to a JavaScript object
            // use the Chrome debugger to inspect this variable
            var jsObject = JSON.parse(baseballJson);
  
        var test = jsObject.data.games;
    
  
    try {
    
    var test1 = jsObject.data.games.game[i].home_team_name;
    var test2 = jsObject.data.games.game[i].away_team_name;
    var test3 = jsObject.data.games.game[i].winning_pitcher.last;
    var test4 = jsObject.data.games.game[i].winning_pitcher.first;
    var test5 = jsObject.data.games.game[i].losing_pitcher.last;
    var test6 = jsObject.data.games.game[i].losing_pitcher.first;
    var test7 = jsObject.data.games.game[i].venue;

    


    document.getElementById("homeTeam").value = test1;
    document.getElementById("awayTeam").value = test2;
    document.getElementById("winningPitcherName").value=test4+" "  + test3;
    document.getElementById("losingPitcherName").value = test6 + " " + test5;
    document.getElementById("venue").value = test7;
    }

    catch (err) {
        alert("No games found on the date submitted");
    }

    return jsObject.data.games;
}
//onclick event handler to load the next game
function getNtxGame() {
    //var test = [getBaseballDataSynch()];
    //var gamesArraysize = test.length;
    //if(i<gamesArraysize-1) 
    i += 1;
    getBaseballDataSynch();
    //return i;
}


function getPrevGame() {
    if (i > 0)
        i -= 1;
    else
        i = 0;
    getBaseballDataSynch();

}

//function filterText() {
    var alphas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    var alphas_ampersand = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ& ";

    var filterSet = "";

    // find out what type of browser we have by using the window.navigator.userAgent
    var isIE11 = ((window.navigator.userAgent).indexOf("Trident") !== -1);
    var isChrome = ((window.navigator.userAgent).indexOf("Chrome") !== -1);
    var isSafari = ((window.navigator.userAgent).indexOf("Safari") !== -1);

    // Cross browser code to filter data entry on numeric fields
    // (not including Firefox)
    // The window.event.keyCode is the character that is generated
    // with every keystroke
    function filterText(ref) {
        // choose the value of filterSet based
        // on the text box that sent the character
        if (ref.id === "homeTeam" || ref.id === "awayTeam" || ref.id === "winningPitcherName" || ref.id ==="losingPitcherName")
            filterSet = alphas;
        else if (ref.id === "venue")
            filterSet = alphas_ampersand;
        // IE11 uses the .preventDefault() to discard the last key typed
        if (isIE11) {
            if (window.event.keyCode === 13)
                alert("You pressed the enter key");
            else if (!nCharOK(window.event.keyCode))
                window.event.preventDefault();
        }
        else {
            // Chrome, Edge and Safari use returnValue to discard the last key typed
            // set window.event.returnValue to null and the character is discarded
            if (window.event.keyCode === 13)
                alert("Changes have been submitted");
            else if (!nCharOK(window.event.keyCode))
                window.event.returnValue = null;
        }
    }

    // filter the currently entered character to see that it is part
    // of the acceptable character set
    function nCharOK(c) {
        var ch = String.fromCharCode(c);
        //ch = ch.toUpperCase();

        // if the current character is not found in the set of all numbers
        // set the flag variable to fail
        if (filterSet.indexOf(ch) !== -1)
            return true;
        else
            return false;
    }



