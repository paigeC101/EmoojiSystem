var express = require("express")

//This is setting up the use of the hue api functions and variables used to control the lights
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

/*This sets up the use of the bridge and api login to control the lights through the code and the app
it also sets up the variables used in the functions for each individual light state for all the moods*/
var host = "192.168.1.64",
    username = "-LyZY842nuMG1ZHdY6X44dWaeC2A4JHxHKuasVrp",
    api = new HueApi(host, username);

var router = express.Router();

/* GET bridge Configuration. */
router.get('/', function(req, res, next) {
    api.config().then(function(bridge){
        res.send(JSON.stringify(bridge));
    }).done();
}); 
/*This will create the groupid and selectedstate as constants as we don't want this information to be changed
later on.*/
router.post('/groups/:id', function(req, res, next) {
    const groupid = parseInt(req.params.id, 10);
    const selectedState = req.body.emoojis;
/* This creates the constants for all of the light states relating to the emoji state I have created.  */
    const stateEnergised = lightState.create().brightness(100).colourTemp(157).on(),
        stateHappy = lightState.create().brightness(75).colourTemp(217).on(),
        stateNeutral = lightState.create().brightness(75).colourTemp(350).on(),
        stateBored = lightState.create().brightness(25).colourTemp(454).on(),
        stateStressed = lightState.create().brightness(50).colourTemp(315).on(),
        stateUpset = lightState.create().brightness(15).colourTemp(407).on(),
        stateOff = lightState.create().off();

    /*This sets the chosenstate to off. this means that the original state of the light is always off*/
    var chosenState = stateOff;

    /*These if and else statements take the original state of off, and change them to the set light states
     above.They create the name for the state that is called on in the html, sever-side, section*/
    if(selectedState == "energised"){
        chosenState = stateEnergised;
    }
    else if(selectedState == "happy"){
        chosenState = stateHappy;
    }
    else if(selectedState == "neutral"){
        chosenState = stateNeutral;
    }
    else if(selectedState == "tired"){
        chosenState = stateBored;
    }
    else if(selectedState == "stressed"){
        chosenState = stateStressed;
    }
    else if(selectedState == "upset"){
        chosenState = stateUpset;
    }

    /* This takes the information from what is selected server-side, and completes the actions on the group 
    of lights, also known as the two lights in my room*/
    api.setGroupLightState(groupid, chosenState)
    .then(function(result){
        res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        res.end();
    })
    .fail(function(result){
        res.writeHead(503, "unavailable", {'Content-Type': 'text/plain'});
        res.end();
    })
    .done();

});



module.exports = router;
    