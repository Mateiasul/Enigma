var KEY_CURRENT_TYPE = "messagetype";
var KEY_CURRENT_NAME = "name";
var KEY_CURRENT_PHONE = "phone";
var KEY_CURRENT_MESSAGE = "message";

var APP_ID = "amzn1.ask.skill.755e3133-262f-4920-97a6-aea90c641f4b"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var https = require('https');
var helpText = "Say INTERACTIVE if you want to talk with Alexa or PLAY if you would like to play on your phone";
var helpTextAdd = "Enigma is a quiz that gives you interesting information about some great places around the world.";
var helpNameText = "To who I should send the message?";
var helpMessageText = "What message I should send?";

var ok = 0;
var triesLeft = 3;
var city = 0;


var TM = function () {
    AlexaSkill.call(this, APP_ID);
};


// Extend AlexaSkill
TM.prototype = Object.create(AlexaSkill.prototype);
TM.prototype.constructor = TM;

TM.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Session Started");
};


TM.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechOutput = "Welcome, you have started Enigma" + helpText; //Start text
    var repromptText = helpTextAdd;
	
    response.ask(speechOutput, repromptText);
    
};


TM.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Session Closed");
};


TM.prototype.intentHandlers = {
	"EnigmaIntent": function (intent, session, response) {
		if(ok === 0)
		{
    		var message1 = "You have entered a game of Enigma, reply with PLAY to start!";
    		var name1 = "Amelia";
    		//var messageType = session.attributes[KEY_CURRENT_TYPE];
    		
    		console.log("Message " + "You have entered a game of Enigma, reply with PLAY to start!");
    		console.log("Name " + name1);
    		//#console.log("Type " + messageType);
    		
    		var url = "https://hook.io/pawker/sendmessage?text=" + encodeURIComponent(message1) + "&number=" + name1 + "&messagetype=" + "text";
    		
    		console.log("URL " + url);
    		
    		https.get(url, function(res) {
    			var body = '';
    
    			res.on('data', function (chunk) {
    				body += chunk;
    			});
    
    			res.on('end', function () {
    				var stringResult = body;
    				
    				var output = {
    					speech: stringResult,
    					type: AlexaSkill.speechOutputType.SSML
    				}
    				
    				response.tellWithCard(output, "Messanger", "Twilio Messenger");
    			});
    			
    		});
		}
    },
    "InteractiveIntent": function (intent, session, response) {
        var text="Think of a city.";
        response.ask(text);
        ok = 0;
        triesLeft = 3;
        city = 0;
    },
    "NextIntent": function (intent, session, response) {
        var text = intent.slots.Answer.value;
        text = text.toLowerCase();
        
        var question1 = "You will need to answer 4 related questions! First question: "
                        + "You are standing in a place which was formally called Longacre Square, "
                        + "and that is also known as The Crossroads of the world. What is the name of this place?";
        var question2 = "You are standing in front of a colossal sculpture that holds a torch in its right hand. What is its name?";
        var question3 = "You are watching a Knicks home game in an amazing stadium. What is the name of the stadium?";
        var question4 = "You decided to take a walk in one of the 10 greatest parks in the world. What is the name of this park?";
        
        var questionp1 = "You will need to answer 4 related questions! First question: "
                         + "During WW2, when Hitler visited Paris, the French cut the lift cables on this monument so that Hitler would "
                         + "have to climb the steps if he wanted to reach the top. What is this significant monument?";
        var questionp2 = "Paris beat Barcelona 4-0 in their 2017 Champions League home game in this stadium. What is it called?";
        var questionp3 = "The ashes of Joan of Arc were scattered here and this river was the inspiration "
                         + "for lots of Impressionist painters, such as Henri Matisse. What is the name of this river?";
        var questionp4 = "What is the name of the biggest museum in the world, so big that it is impossible to visit in only one day?";

        var bravo = "Well done, you advanced to the next level! Now, to the next question: ";
        var lose = "Sorry, you lost!";
        var win = "Congratulations! You win! If you want to play again, say a new city!";
        var idleMsg = "Are you still there?";

        var mistakeMsg = "Incorrect answer. ";
        if ((triesLeft - 1) <= 0) {
            response.tell(lose);
        }
        else if ((triesLeft - 1) > 1) {
            mistakeMsg += "You are still allowed to make " + (triesLeft - 1) + " more mistakes";
        }
        else if ((triesLeft - 1) == 1) {
            mistakeMsg += "You are still allowed to make one more mistake";
        }
        mistakeMsg += "! Try again!";

        if (ok === 0 && city === 0)
        {
            if (text == "new york")
            {
                city = 1;
                response.ask(question1, idleMsg);
            }
            else if (text == "paris")
            {   city = 2;
                response.ask(questionp1, idleMsg);
            }
            else
            {   
                response.ask("This one will be added soon, meanwhile, think of a different city.", idleMsg);
                ok--;
            }
        }  

        if (city == 1)
        {
            if (ok == 1)   
            {
                if (text == "times square" || text == "time square") {
                    response.ask(bravo + question2, idleMsg);
                }
                else
                {  
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
            else if (ok == 2) 
            {
                if (text == "statue of liberty" || text == "the statue of liberty") {
                    response.ask(bravo + question3, idleMsg);
                }
                else
                {
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
            else if (ok == 3)
            {
                if (text == "madison square garden") {
                    response.ask(bravo + question4, idleMsg);
                }
                else
                {
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
            else if (ok == 4)
            {
                if (text == "central park") {
                    response.ask(win, idleMsg);
                }
                else
                {
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
        }

        if (city == 2)
        {
            if (ok == 1)
            {
                if (text == "eiffel tower" || text == "the eiffel tower")
                    response.ask(bravo + questionp2, idleMsg);
                else
                {  
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
            else if (ok == 2)
            {
                if (text == "stade de france" || text == "stadium of france") {
                    response.ask(bravo + questionp3, idleMsg);
                }
                else
                {
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
            else if (ok == 3)
            {
                if(text == "the seine" || text == "seine" || text == "seine river" || text == "river seine") {
                    response.ask(bravo + questionp4, idleMsg);
                }
                else
                {
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
            else if (ok == 4)
            {
                if (text == "the louvre" || text == "louvre") {
                    response.tell(win);
                }
                else
                {
                    triesLeft--;
                    response.ask(mistakeMsg, idleMsg);
                    ok--;
                }
            }
        }
        
        ok++;
    }
};


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the TM skill.
    var tm = new TM();
    tm.execute(event, context);
};